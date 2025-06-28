# Test Analysis and Plan for iota-client-gen

## Current Test Coverage Analysis

### Existing Tests
1. **manifest.rs** - Has one unit test:
   - `test_parse_gen_manifest`: Tests parsing of gen.toml manifest files
   - Already updated for IOTA (uses iota.io RPC and iotaledger git repo)

### Missing Test Coverage
Based on the codebase analysis, the following critical components lack tests:

1. **model_builder.rs** - Core functionality that needs testing:
   - `generate_source_stub()` - Generates Move source from bytecode
   - `build_from_on_chain()` - Builds model from on-chain packages
   - Struct and function extraction from normalized modules

2. **gen.rs** - TypeScript generation logic:
   - `StructsGen` - Generates TypeScript struct classes
   - `FunctionsGen` - Generates TypeScript function bindings
   - Import path generation (especially the onchain/source logic)
   - Type mapping from Move to TypeScript

3. **main.rs** - Integration flow:
   - Package fetching from RPC
   - Model building orchestration
   - File generation and directory structure

4. **framework_sources.rs** - Framework file generation

## Test Plan

### 1. Unit Tests for model_builder.rs

```rust
#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_generate_source_stub_basic_struct() {
        // Test generating Move source for a simple struct
    }
    
    #[test]
    fn test_generate_source_stub_with_generics() {
        // Test struct with type parameters
    }
    
    #[test]
    fn test_generate_source_stub_functions() {
        // Test function signature generation
    }
    
    #[test]
    fn test_extract_struct_info() {
        // Test extracting struct information from normalized module
    }
}
```

### 2. Unit Tests for gen.rs

```rust
#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_import_path_for_struct_onchain() {
        // Test that dependency imports use "onchain" not "source"
    }
    
    #[test]
    fn test_type_to_ts_primitive() {
        // Test Move primitive type to TypeScript mapping
    }
    
    #[test]
    fn test_type_to_ts_struct() {
        // Test struct type references
    }
    
    #[test]
    fn test_gen_field_name() {
        // Test field name generation (camelCase conversion)
    }
}
```

### 3. Integration Tests

Create `generator/tests/integration_test.rs`:

```rust
use std::fs;
use std::path::Path;
use tempfile::TempDir;

#[test]
fn test_generate_simple_package() {
    // Test end-to-end generation for a simple package
}

#[test]
fn test_dependency_path_generation() {
    // Verify dependencies use correct "onchain" paths
}

#[test]
fn test_struct_generation() {
    // Verify struct TypeScript classes are generated correctly
}

#[test]
fn test_function_generation() {
    // Verify function bindings with correct parameter names
}
```

### 4. Test Fixtures

Create test Move packages in `generator/tests/fixtures/`:
- `simple_struct/` - Package with basic structs
- `generic_types/` - Package with generic structs and functions
- `dependencies/` - Package that imports from 0x1 and 0x2

### 5. Snapshot Tests

Use `insta` crate for snapshot testing generated TypeScript:
- Capture generated output for test packages
- Verify output matches expected TypeScript structure
- Easy to update when output format changes intentionally

## Implementation Priority

1. **High Priority** (Core functionality):
   - `model_builder::generate_source_stub` tests
   - `gen.rs` import path tests
   - Integration test for basic package generation

2. **Medium Priority** (Type safety):
   - Type conversion tests
   - Generic type handling tests
   - Function parameter generation tests

3. **Low Priority** (Nice to have):
   - Snapshot tests for complete output
   - Performance benchmarks
   - Error case handling tests

## Test Dependencies to Add

Add to `Cargo.toml`:
```toml
[dev-dependencies]
tempfile = "3"
insta = { version = "1.34", features = ["json", "toml"] }
pretty_assertions = "1.4"
```

## Running Tests

```bash
# Run all tests
cargo test

# Run specific test module
cargo test model_builder::tests

# Run with output
cargo test -- --nocapture

# Run integration tests only
cargo test --test integration_test
```

## Benefits

1. **Regression Prevention**: Ensure IOTA-specific changes don't break
2. **Documentation**: Tests serve as usage examples
3. **Confidence**: Safe refactoring with test coverage
4. **CI/CD**: Enable automated testing in GitHub Actions

## Next Steps

1. Create test module structure
2. Implement high-priority unit tests
3. Add integration test framework
4. Set up GitHub Actions for CI
5. Add test coverage reporting