use crate::manifest::{self as GM};
use crate::package_cache::PackageCache;
use anyhow::{bail, Context, Result};
use codespan_reporting::term::termcolor::{ColorChoice, StandardStream};
use colored::*;
use core::fmt;
use futures::future;
use move_compiler::editions as ME;
use move_core_types::account_address::AccountAddress;
use move_model_2::source_model::Model;
use move_package::compilation::model_builder;
use move_package::resolution::resolution_graph::ResolvedGraph;
use move_package::source_package::parsed_manifest as PM;
use move_package::BuildConfig as MoveBuildConfig;
use move_binary_format::file_format::{CompiledModule, Visibility, AbilitySet, Ability};
use move_binary_format::normalized::{Module as NormalizedModule, Type as NormalizedType};
use std::collections::{BTreeMap, HashSet, VecDeque};
use std::fs::{self, File};
use std::io::{self, Write};
use std::path::Path;
use iota_json_rpc_types::IotaRawMovePackage;
use iota_move_build::gather_published_ids;
use iota_sdk::types::base_types::SequenceNumber;
use iota_sdk::types::move_package::UpgradeInfo;
use tempfile::tempdir;

const STUB_PACKAGE_NAME: &str = "IotaClientGenRootPackageStub";

/// Generate a minimal Move source file from a compiled module
/// This creates native function declarations and struct definitions that match the module's interface
fn generate_source_stub(module: &CompiledModule) -> String {
    
    let mut source = String::new();
    
    // Module header  
    let module_id = module.self_id();
    let addr = module_id.address();
    let name = module_id.name();
    // Ensure address has 0x prefix
    let addr_str = if addr.to_string().starts_with("0x") {
        addr.to_string()
    } else {
        format!("0x{}", addr)
    };
    source.push_str(&format!("module {}::{} {{\n", addr_str, name));
    
    // Add use statements for common types
    if name.as_str() != "object" && name.as_str() != "tx_context" {
        source.push_str("    use 0x2::object::{Self, ID};\n");
        source.push_str("    use 0x2::tx_context::TxContext;\n");
    }
    
    // Add struct definitions
    let normalized = NormalizedModule::new(module);
    for (struct_name, struct_def) in &normalized.structs {
        source.push_str(&format!("\n    struct {}", struct_name));
        
        // Add type parameters if any
        if !struct_def.type_parameters.is_empty() {
            source.push_str("<");
            for (i, type_param) in struct_def.type_parameters.iter().enumerate() {
                if i > 0 {
                    source.push_str(", ");
                }
                if type_param.is_phantom {
                    source.push_str("phantom ");
                }
                source.push_str(&format!("T{}", i));
            }
            source.push_str(">");
        }
        
        // Add abilities
        let abilities = format_abilities(&struct_def.abilities);
        if !abilities.is_empty() {
            source.push_str(&format!(" has {}", abilities));
        }
        
        source.push_str(" {\n");
        
        // Add fields - the fields are a Vec<Field> not a map
        for field in &struct_def.fields {
            source.push_str(&format!("        {}: {},\n", field.name, format_type(&field.type_)));
        }
        
        source.push_str("    }\n");
    }
    
    // Add function declarations
    source.push_str("\n");
    for (func_name, func_def) in &normalized.functions {
        // Skip private functions
        match func_def.visibility {
            Visibility::Public | Visibility::Friend => {},
            _ => continue,
        }
        
        // Add native keyword
        source.push_str("    native public ");
        
        // Add entry modifier if applicable
        if func_def.is_entry {
            source.push_str("entry ");
        }
        
        source.push_str(&format!("fun {}", func_name));
        
        // Add type parameters
        if !func_def.type_parameters.is_empty() {
            source.push_str("<");
            for (i, _) in func_def.type_parameters.iter().enumerate() {
                if i > 0 {
                    source.push_str(", ");
                }
                source.push_str(&format!("T{}", i));
            }
            source.push_str(">");
        }
        
        source.push_str("(");
        
        // Add parameters
        for (i, param_type) in func_def.parameters.iter().enumerate() {
            if i > 0 {
                source.push_str(", ");
            }
            source.push_str(&format!("a{}: {}", i, format_type(param_type)));
        }
        
        source.push_str(")");
        
        // Add return type if not unit
        if !func_def.return_.is_empty() {
            source.push_str(": ");
            if func_def.return_.len() == 1 {
                source.push_str(&format_type(&func_def.return_[0]));
            } else {
                source.push_str("(");
                for (i, ret_type) in func_def.return_.iter().enumerate() {
                    if i > 0 {
                        source.push_str(", ");
                    }
                    source.push_str(&format_type(ret_type));
                }
                source.push_str(")");
            }
        }
        
        source.push_str(";\n");
    }
    
    source.push_str("}\n");
    source
}

fn format_abilities(abilities: &AbilitySet) -> String {
    let mut ability_strs = vec![];
    if abilities.has_ability(Ability::Copy) {
        ability_strs.push("copy");
    }
    if abilities.has_ability(Ability::Drop) {
        ability_strs.push("drop");
    }
    if abilities.has_ability(Ability::Store) {
        ability_strs.push("store");
    }
    if abilities.has_ability(Ability::Key) {
        ability_strs.push("key");
    }
    ability_strs.join(", ")
}

fn format_type(ty: &NormalizedType) -> String {
    use move_binary_format::normalized::Type as NT;
    match ty {
        NT::Bool => "bool".to_string(),
        NT::U8 => "u8".to_string(),
        NT::U16 => "u16".to_string(),
        NT::U32 => "u32".to_string(),
        NT::U64 => "u64".to_string(),
        NT::U128 => "u128".to_string(),
        NT::U256 => "u256".to_string(),
        NT::Address => "address".to_string(),
        NT::Signer => "signer".to_string(),
        NT::Struct { address, module, name, type_arguments } => {
            let base = format!("0x{}::{}::{}", address, module, name);
            if type_arguments.is_empty() {
                base
            } else {
                format!("{}<{}>", base, 
                    type_arguments.iter()
                        .map(format_type)
                        .collect::<Vec<_>>()
                        .join(", ")
                )
            }
        },
        NT::Vector(inner) => format!("vector<{}>", format_type(inner)),
        NT::TypeParameter(idx) => format!("T{}", idx),
        NT::Reference(inner) => format!("&{}", format_type(inner)),
        NT::MutableReference(inner) => format!("&mut {}", format_type(inner)),
    }
}

/// Wrapper struct to display a package as an inline table in the stub Move.toml.
/// This is necessary becase the `toml` crate does not currently support serializing
/// types as inline tables.
struct DependencyTOML<'a>(PM::PackageName, &'a PM::InternalDependency);
struct SubstTOML<'a>(&'a PM::Substitution);

pub type TypeOriginTable = BTreeMap<AccountAddress, BTreeMap<String, AccountAddress>>;
pub type VersionTable = BTreeMap<AccountAddress, BTreeMap<AccountAddress, SequenceNumber>>;

pub type SourceModelResult = ModelResult;
pub type OnChainModelResult = ModelResult;

pub struct ModelResult {
    /// Move model for packages defined in gen.toml
    pub env: Model,
    /// Map from id to package name
    pub id_map: BTreeMap<AccountAddress, PM::PackageName>,
    /// Map from original package ID to the published at ID
    pub published_at: BTreeMap<AccountAddress, AccountAddress>,
    /// Map from original package ID to type origins
    pub type_origin_table: TypeOriginTable,
    /// Map from original package ID to all versions referenced by type origins
    pub version_table: VersionTable,
}

pub async fn build_models<Progress: Write>(
    cache: &mut PackageCache<'_>,
    packages: &GM::Packages,
    manifest_path: &Path,
    progress_output: &mut Progress,
) -> Result<(Option<SourceModelResult>, Option<OnChainModelResult>)> {
    // separate source and on-chain packages
    let mut source_pkgs: Vec<(PM::PackageName, PM::InternalDependency)> = vec![];
    let mut on_chain_pkgs: Vec<(PM::PackageName, GM::OnChainPackage)> = vec![];
    for (name, pkg) in packages.iter() {
        match pkg.clone() {
            GM::Package::Dependency(PM::Dependency::Internal(mut dep)) => match &dep.kind {
                PM::DependencyKind::Local(relative_path) => {
                    let absolute_path =
                        fs::canonicalize(manifest_path.parent().unwrap().join(relative_path))
                            .with_context(|| {
                                format!(
                                    "gen.toml: Failed to resolve \"{}\" package path \"{}\".",
                                    name,
                                    relative_path.display()
                                )
                            })?;
                    dep.kind = PM::DependencyKind::Local(absolute_path);
                    source_pkgs.push((*name, dep));
                }
                PM::DependencyKind::Git(_) => {
                    source_pkgs.push((*name, dep));
                }
                PM::DependencyKind::OnChain(_) => {
                    bail!("Encountered an on-chain dependency {} in gen.toml. On-chain dependencies are not supported.", name)
                }
            },
            GM::Package::Dependency(PM::Dependency::External(_)) => {
                bail!("Encountered an external dependency {} in gen.toml. External dependencies are not supported.", name)
            }
            GM::Package::OnChain(pkg) => {
                on_chain_pkgs.push((*name, pkg));
            }
        }
    }

    let source_model = if !source_pkgs.is_empty() {
        Some(build_source_model(source_pkgs, cache, progress_output).await?)
    } else {
        None
    };

    let on_chain_model = if !on_chain_pkgs.is_empty() {
        Some(build_on_chain_model(on_chain_pkgs, cache, progress_output).await?)
    } else {
        None
    };

    Ok((source_model, on_chain_model))
}

// build a model for source packages -- create a stub Move.toml with packages listed as dependencies
// to build a single ResolvedGraph.
async fn build_source_model<Progress: Write>(
    pkgs: Vec<(PM::PackageName, PM::InternalDependency)>,
    cache: &mut PackageCache<'_>,
    progress_output: &mut Progress,
) -> Result<SourceModelResult> {
    writeln!(
        progress_output,
        "{}",
        "BUILDING SOURCE MODEL".green().bold()
    )?;

    let temp_dir = tempdir()?;
    let stub_path = temp_dir.path();
    fs::create_dir(stub_path.join("sources"))?;

    let mut stub_manifest = File::create(stub_path.join("Move.toml"))?;

    writeln!(stub_manifest, "[package]")?;
    writeln!(stub_manifest, "name = \"{}\"", STUB_PACKAGE_NAME)?;
    writeln!(stub_manifest, "version = \"0.1.0\"")?;

    writeln!(stub_manifest, "\n[dependencies]")?;
    for (name, dep) in pkgs.iter() {
        writeln!(stub_manifest, " {}", DependencyTOML(*name, dep))?;
    }

    // TODO: allow some of these options to be passed in as flags
    let build_config = MoveBuildConfig {
        skip_fetch_latest_git_deps: true,
        default_flavor: Some(ME::Flavor::Iota),
        ..Default::default()
    };
    let resolved_graph =
        build_config.resolution_graph_for_package(stub_path, None, &mut io::stderr())?;

    let source_id_map = find_address_origins(&resolved_graph);
    let source_published_at = resolve_published_at(&resolved_graph, &source_id_map);

    let mut stderr = StandardStream::stderr(ColorChoice::Always);
    let source_env = model_builder::build(resolved_graph, &mut stderr)?;

    // resolve type origins
    let type_origin_table = resolve_type_origin_table(
        cache,
        &source_id_map,
        &source_published_at,
        &source_env,
        progress_output,
    )
    .await?;
    let version_table = resolve_version_table(cache, &type_origin_table).await?;

    Ok(ModelResult {
        env: source_env,
        id_map: source_id_map,
        published_at: source_published_at,
        type_origin_table,
        version_table,
    })
}

async fn build_on_chain_model<Progress: Write>(
    pkgs: Vec<(PM::PackageName, GM::OnChainPackage)>,
    cache: &mut PackageCache<'_>,
    progress_output: &mut Progress,
) -> Result<OnChainModelResult> {
    writeln!(
        progress_output,
        "{}",
        "BUILDING ON-CHAIN MODEL".green().bold()
    )?;

    // Create a temporary directory with stub package that depends on on-chain packages
    let temp_dir = tempdir()?;
    let stub_path = temp_dir.path();
    fs::create_dir(stub_path.join("sources"))?;

    // Fetch on-chain packages and create local directories for them
    let (pkg_ids, _original_map) =
        resolve_on_chain_packages(cache, pkgs.iter().map(|(_, pkg)| pkg.id).collect()).await?;

    writeln!(
        progress_output,
        "{}",
        "FETCHING ON-CHAIN PACKAGES".green().bold()
    )?;
    
    // Create dependency packages
    let deps_dir = stub_path.join("deps");
    fs::create_dir(&deps_dir)?;
    
    // Fetch the actual modules from chain
    let raw_pkgs = cache.get_multi(pkg_ids.clone()).await?;
    let mut pkg_modules: BTreeMap<AccountAddress, Vec<(String, Vec<u8>)>> = BTreeMap::new();
    let mut all_dependencies: HashSet<AccountAddress> = HashSet::new();
    
    for (idx, pkg_result) in raw_pkgs.into_iter().enumerate() {
        let pkg = pkg_result?;
        let IotaRawMovePackage { module_map, linkage_table, .. } = pkg;
        let modules: Vec<(String, Vec<u8>)> = module_map.into_iter().collect();
        pkg_modules.insert(pkg_ids[idx], modules);
        
        // Collect dependencies from linkage table
        for (dep_id, _) in linkage_table {
            all_dependencies.insert(dep_id.into());
        }
    }
    
    // Fetch dependency packages
    let dep_ids: Vec<AccountAddress> = all_dependencies.into_iter().collect();
    if !dep_ids.is_empty() {
        writeln!(
            progress_output,
            "Fetching {} dependency packages",
            dep_ids.len()
        )?;
        let dep_raw_pkgs = cache.get_multi(dep_ids.clone()).await?;
        for (idx, pkg_result) in dep_raw_pkgs.into_iter().enumerate() {
            let pkg = pkg_result?;
            let IotaRawMovePackage { module_map, .. } = pkg;
            let modules: Vec<(String, Vec<u8>)> = module_map.into_iter().collect();
            pkg_modules.insert(dep_ids[idx], modules);
        }
    }
    
    // Create directories for all packages (both main packages and their dependencies)
    for (addr, modules) in pkg_modules.iter() {
        // Determine package name
        let pkg_name = if *addr == AccountAddress::from_hex_literal("0x1").unwrap() {
            "MoveStdlib"
        } else if *addr == AccountAddress::from_hex_literal("0x2").unwrap() {
            "Iota"
        } else {
            // Find name from pkgs
            pkgs.iter()
                .find(|(_, pkg)| pkg.id == *addr)
                .map(|(name, _)| name.as_str())
                .unwrap_or("Unknown")
        };
        
        let pkg_dir = deps_dir.join(pkg_name);
        fs::create_dir(&pkg_dir)?;
        let sources_dir = pkg_dir.join("sources");
        fs::create_dir(&sources_dir)?;
        
        // Generate source stubs for each module
        for (module_name, bytecode) in modules {
            // Deserialize the module
            let module = CompiledModule::deserialize_with_defaults(bytecode)?;
            
            // Generate source stub
            let source_stub = generate_source_stub(&module);
            
            // Write source file
            let source_path = sources_dir.join(format!("{}.move", module_name));
            std::fs::write(&source_path, source_stub)?;
            
            writeln!(
                progress_output,
                "Generated source stub for {} at {:?}",
                module_name,
                source_path
            )?;
        }
        
        // Create a minimal Move.toml for the dependency
        let mut dep_manifest = File::create(pkg_dir.join("Move.toml"))?;
        writeln!(dep_manifest, "[package]")?;
        writeln!(dep_manifest, "name = \"{}\"", pkg_name)?;
        writeln!(dep_manifest, "version = \"0.1.0\"")?;
        writeln!(dep_manifest, "published-at = \"{}\"", addr.to_hex_literal())?;
        
        // Add addresses section for framework packages
        if *addr == AccountAddress::from_hex_literal("0x1").unwrap() || 
           *addr == AccountAddress::from_hex_literal("0x2").unwrap() {
            writeln!(dep_manifest, "\n[addresses]")?;
            writeln!(dep_manifest, "{} = \"{}\"", pkg_name, addr.to_hex_literal())?;
        }
    }

    let mut stub_manifest = File::create(stub_path.join("Move.toml"))?;

    writeln!(stub_manifest, "[package]")?;
    writeln!(stub_manifest, "name = \"{}\"", STUB_PACKAGE_NAME)?;
    writeln!(stub_manifest, "version = \"0.1.0\"")?;

    writeln!(stub_manifest, "\n[dependencies]")?;
    
    // Create local dependencies for all packages
    for (addr, _) in pkg_modules.iter() {
        let pkg_name = if *addr == AccountAddress::from_hex_literal("0x1").unwrap() {
            "MoveStdlib"
        } else if *addr == AccountAddress::from_hex_literal("0x2").unwrap() {
            "Iota"
        } else {
            pkgs.iter()
                .find(|(_, pkg)| pkg.id == *addr)
                .map(|(name, _)| name.as_str())
                .unwrap_or("Unknown")
        };
        
        writeln!(stub_manifest, "{} = {{ local = \"./deps/{}\" }}", 
            pkg_name, 
            pkg_name
        )?;
    }

    // Write addresses section to map package names to addresses
    writeln!(stub_manifest, "\n[addresses]")?;
    for (addr, _) in pkg_modules.iter() {
        let pkg_name = if *addr == AccountAddress::from_hex_literal("0x1").unwrap() {
            "MoveStdlib"
        } else if *addr == AccountAddress::from_hex_literal("0x2").unwrap() {
            "Iota"
        } else {
            pkgs.iter()
                .find(|(_, pkg)| pkg.id == *addr)
                .map(|(name, _)| name.as_str())
                .unwrap_or("Unknown")
        };
        
        writeln!(stub_manifest, "{} = \"{}\"", pkg_name, addr.to_hex_literal())?;
    }

    let build_config = MoveBuildConfig {
        skip_fetch_latest_git_deps: true,
        default_flavor: Some(ME::Flavor::Iota),
        ..Default::default()
    };
    
    let resolved_graph =
        build_config.resolution_graph_for_package(stub_path, None, &mut io::stderr())?;

    // Build the id map from our original packages
    let mut on_chain_id_map: BTreeMap<AccountAddress, PM::PackageName> = BTreeMap::new();
    let mut on_chain_published_at: BTreeMap<AccountAddress, AccountAddress> = BTreeMap::new();
    
    // First, add the packages from gen.toml
    for (name, pkg) in pkgs {
        on_chain_id_map.insert(pkg.id, name);
        on_chain_published_at.insert(pkg.id, pkg.id);
    }
    
    writeln!(
        progress_output,
        "Building model with {} top-level packages",
        on_chain_id_map.len()
    )?;
    for (addr, name) in on_chain_id_map.iter() {
        writeln!(
            progress_output,
            "  - {}: {}",
            name,
            addr.to_hex_literal()
        )?;
    }

    let mut stderr = StandardStream::stderr(ColorChoice::Always);
    let env = model_builder::build(resolved_graph, &mut stderr)?;

    writeln!(
        progress_output,
        "Model contains {} packages",
        env.packages().count()
    )?;
    for pkg in env.packages() {
        writeln!(
            progress_output,
            "  Package: {:?} at {}",
            pkg.name(),
            pkg.address().to_hex_literal()
        )?;
        for module in pkg.modules() {
            writeln!(
                progress_output,
                "    Module: {}",
                module.name()
            )?;
        }
    }

    // resolve type origins
    let type_origin_table = resolve_type_origin_table(
        cache,
        &on_chain_id_map,
        &on_chain_published_at,
        &env,
        progress_output,
    )
    .await?;
    let version_table = resolve_version_table(cache, &type_origin_table).await?;

    Ok(ModelResult {
        env,
        id_map: on_chain_id_map,
        published_at: on_chain_published_at,
        type_origin_table,
        version_table,
    })
}

/**
 * Finds the packagages where each address was first declared by descending down the
 * dependency graph breadth-first and populating the given map. This is to map package
 * names to their addresses.
 */
fn find_address_origins(graph: &ResolvedGraph) -> BTreeMap<AccountAddress, PM::PackageName> {
    let mut addr_map: BTreeMap<AccountAddress, PM::PackageName> = BTreeMap::new();

    let root = graph.root_package();
    let mut queue = VecDeque::from(vec![root]);

    while let Some(current) = queue.pop_front() {
        let pkg = graph.get_package(current);
        for name in pkg.resolved_table.values() {
            addr_map.insert(*name, current);
        }

        for dep in pkg.immediate_dependencies(graph) {
            queue.push_back(dep);
        }
    }

    addr_map
}

/// Resolve published_at addresses by gathering published ids from the graph and matching
/// them with package ids using the package name -> address map.
fn resolve_published_at(
    graph: &ResolvedGraph,
    id_map: &BTreeMap<AccountAddress, PM::PackageName>,
) -> BTreeMap<AccountAddress, AccountAddress> {
    let (_, dependency_ids) = gather_published_ids(graph, None);

    let mut published_at: BTreeMap<AccountAddress, AccountAddress> = BTreeMap::new();
    for (pkg_id, name) in id_map {
        if let Some(published_id) = dependency_ids.published.get(name) {
            published_at.insert(*pkg_id, **published_id);
        }
    }

    published_at
}

/**
 * Returns a list of all packages (including dependencies) where each package is mentioned only once
 * (resolved so that the highest version is used), and a mapping of all package ids to their original
 * package id (address of version 1 of the package).
 */
async fn resolve_on_chain_packages(
    dl: &mut PackageCache<'_>,
    ids: Vec<AccountAddress>,
) -> Result<(
    Vec<AccountAddress>,
    BTreeMap<AccountAddress, AccountAddress>,
)> {
    let top_level_origins = future::join_all(ids.iter().map(|addr| {
        let mut dl = dl.clone();
        async move { resolve_original_package_id(&mut dl, *addr).await.unwrap() }
    }))
    .await;

    let mut original_map: BTreeMap<_, _> = ids.clone().into_iter().zip(top_level_origins).collect();
    let mut highest_versions: BTreeMap<AccountAddress, UpgradeInfo> = BTreeMap::new();

    for pkg in dl.get_multi(ids.clone()).await? {
        let pkg = pkg?;
        let original_id = original_map.get(&pkg.id.into()).cloned().unwrap();
        match highest_versions.get(&original_id) {
            None => {
                highest_versions.insert(
                    original_id,
                    UpgradeInfo {
                        upgraded_id: pkg.id,
                        upgraded_version: pkg.version,
                    },
                );
            }
            Some(info) => {
                if info.upgraded_version < pkg.version {
                    highest_versions.insert(
                        original_id,
                        UpgradeInfo {
                            upgraded_id: pkg.id,
                            upgraded_version: pkg.version,
                        },
                    );
                }
            }
        }
    }

    let mut processed: HashSet<AccountAddress> = HashSet::new();
    let mut pkg_queue: HashSet<AccountAddress> = ids.into_iter().collect();

    while !pkg_queue.is_empty() {
        for pkg in pkg_queue.iter() {
            processed.insert(*pkg);
        }

        let pkgs = dl.get_multi(pkg_queue.drain().collect::<Vec<_>>()).await?;
        for pkg in pkgs {
            let pkg = pkg?;
            for (original_id, info) in pkg.linkage_table {
                original_map.insert(info.upgraded_id.into(), original_id.into());
                match highest_versions.get(&original_id) {
                    None => {
                        highest_versions.insert(original_id.into(), info.clone());
                    }
                    Some(existing_info) => {
                        if existing_info.upgraded_version < info.upgraded_version {
                            highest_versions.insert(original_id.into(), info.clone());
                        }
                    }
                }

                if !processed.contains(&info.upgraded_id.into()) {
                    pkg_queue.insert(info.upgraded_id.into());
                }
            }
        }
    }

    Ok((
        highest_versions
            .values()
            .map(|info| info.upgraded_id.into())
            .collect(),
        original_map,
    ))
}

async fn resolve_original_package_id(
    dl: &mut PackageCache<'_>,
    id: AccountAddress,
) -> Result<AccountAddress> {
    let pkg = dl.get(id).await?;

    if pkg.version == 1.into() {
        return Ok(id);
    }

    let origin_pkgs = pkg
        .type_origin_table
        .iter()
        .map(|origin| AccountAddress::from(origin.package))
        .collect();

    // in case of framework packages which get upgraded through a system upgrade, the first version can be != 1
    let mut min_version: SequenceNumber = u64::MAX.into();
    let mut id = id;
    for pkg in dl.get_multi(origin_pkgs).await? {
        let pkg = pkg?;
        if pkg.version < min_version {
            min_version = pkg.version;
            id = pkg.id.into();
        }
    }

    Ok(id)
}

async fn resolve_type_origin_table<Progress: Write>(
    cache: &mut PackageCache<'_>,
    id_map: &BTreeMap<AccountAddress, PM::PackageName>,
    published_at: &BTreeMap<AccountAddress, AccountAddress>,
    model: &Model,
    progress_output: &mut Progress,
) -> Result<TypeOriginTable> {
    let mut type_origin_table = BTreeMap::new();
    let mut packages_to_fetch = vec![];
    for (addr, name) in id_map.iter() {
        let published_at = published_at.get(addr);
        let published_at = match published_at {
            Some(addr) => addr,
            None => addr,
        };
        if published_at == &AccountAddress::ZERO {
            continue;
        };
        packages_to_fetch.push((addr, name, *published_at));
    }
    let raw_pkgs = cache
        .get_multi(packages_to_fetch.iter().map(|(_, _, addr)| *addr).collect())
        .await?
        .into_iter()
        .zip(packages_to_fetch)
        .collect::<Vec<_>>();
    for (pkg_res, (original_id, name, published_at)) in raw_pkgs {
        let pkg = match pkg_res {
            Ok(pkg) => pkg,
            Err(_) => {
                writeln!(
                    progress_output,
                    "{} Package \"{}\" published at {} couldn't be fetched from chain for type origin resolution", "WARNING ".yellow().bold(),
                    name, published_at.to_hex_literal()
                )?;
                continue;
            }
        };
        let origin_map: BTreeMap<String, AccountAddress> = pkg
            .type_origin_table
            .into_iter()
            .map(|origin| {
                (
                    format!("{}::{}", origin.module_name, origin.datatype_name),
                    origin.package.into(),
                )
            })
            .collect();
        type_origin_table.insert(*original_id, origin_map);
    }
    // populate type origin table with remaining modules from the model (that couldn't be resolved from chain).
    // in this case we set origin of all types to the package's original id.
    for module in model.modules() {
        let original_id = module.package().address();
        let module_name = module.name();
        type_origin_table
            .entry(original_id)
            .or_insert_with(BTreeMap::new);
        let origin_map = type_origin_table.get_mut(&original_id).unwrap();
        for s in module.structs() {
            let name = s.name();
            let full_name = format!("{module_name}::{name}");
            origin_map.entry(full_name).or_insert(original_id);
        }
    }

    Ok(type_origin_table)
}

async fn resolve_version_table(
    cache: &mut PackageCache<'_>,
    type_origin_table: &TypeOriginTable,
) -> Result<VersionTable> {
    // this is slow and inefficient but can be made faster by fetching package versions
    // from an index (if there is such an index) or using graphql api
    let mut version_table = BTreeMap::new();
    let mut packages_to_fetch = vec![];
    for (_, origins) in type_origin_table.iter() {
        for origin in origins.values() {
            packages_to_fetch.push(*origin);
        }
    }
    // pre-fetch
    cache.get_multi(packages_to_fetch).await?;

    for (original_id, origins) in type_origin_table.iter() {
        let mut versions = BTreeMap::new();
        versions.insert(*original_id, 1.into());
        for (_, origin) in origins.iter() {
            if origin == &AccountAddress::ZERO {
                continue;
            }
            let pkg = cache.get(*origin).await?;
            versions.insert(*origin, pkg.version);
        }
        version_table.insert(*original_id, versions);
    }

    Ok(version_table)
}

impl fmt::Display for DependencyTOML<'_> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let DependencyTOML(
            name,
            PM::InternalDependency {
                kind,
                subst,
                digest,
                dep_override,
            },
        ) = self;

        write!(f, "{} = {{ ", name)?;

        match kind {
            PM::DependencyKind::Local(local) => {
                write!(f, "local = ")?;
                f.write_str(&path_escape(local)?)?;
            }

            PM::DependencyKind::Git(PM::GitInfo {
                git_url,
                git_rev,
                subdir,
            }) => {
                write!(f, "git = ")?;
                f.write_str(&str_escape(git_url.as_str())?)?;

                write!(f, ", rev = ")?;
                f.write_str(&str_escape(git_rev.as_str())?)?;

                write!(f, ", subdir = ")?;
                f.write_str(&path_escape(subdir)?)?;
            }
            PM::DependencyKind::OnChain(_) => {
                unreachable!("not supported")
            }
        }

        if let Some(digest) = digest {
            write!(f, ", digest = ")?;
            f.write_str(&str_escape(digest.as_str())?)?;
        }

        if let Some(subst) = subst {
            write!(f, ", addr_subst = {}", SubstTOML(subst))?;
        }

        if *dep_override {
            write!(f, ", override = true")?;
        }

        f.write_str(" }")?;

        Ok(())
    }
}

impl fmt::Display for SubstTOML<'_> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        /// Write an individual key value pair in the substitution.
        fn write_subst(
            f: &mut fmt::Formatter<'_>,
            addr: &PM::NamedAddress,
            subst: &PM::SubstOrRename,
        ) -> fmt::Result {
            f.write_str(&str_escape(addr.as_str())?)?;
            write!(f, " = ")?;

            match subst {
                PM::SubstOrRename::RenameFrom(named) => {
                    f.write_str(&str_escape(named.as_str())?)?;
                }

                PM::SubstOrRename::Assign(account) => {
                    f.write_str(&str_escape(&account.to_canonical_string(true))?)?;
                }
            }

            Ok(())
        }

        let mut substs = self.0.iter();

        let Some((addr, subst)) = substs.next() else {
            return f.write_str("{}");
        };

        f.write_str("{ ")?;

        write_subst(f, addr, subst)?;
        for (addr, subst) in substs {
            write!(f, ", ")?;
            write_subst(f, addr, subst)?;
        }

        f.write_str(" }")?;

        Ok(())
    }
}

/// Escape a string to output in a TOML file.
fn str_escape(s: &str) -> Result<String, fmt::Error> {
    toml::to_string(s).map_err(|_| fmt::Error)
}

/// Escape a path to output in a TOML file.
fn path_escape(p: &Path) -> Result<String, fmt::Error> {
    str_escape(p.to_str().ok_or(fmt::Error)?)
}
