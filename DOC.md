# Docs

## gen.toml

`gen.toml` is the configuration file for the generator. It has two sections: `config` and `packages`. The `config` section contains the optional `rpc` field which specifies the RPC URL to use for fetching on-chain packages. If not specified, it defaults to `https://api.mainnet.iota.org`.

The `packages` section contains a list of packages to generate code for. For source packages, the syntax is the same as in `Move.toml`, while for on-chain packages, the `id` is specified (see examples above).

The dependency resolution for source packages works the same as in `Move.toml` -- if there are packages that transitively depend on the same package of a different version, this needs to be resolved by specifying the version explicitly in `gen.toml` (see https://docs.iota.org/build/dependency-overrides).

In case of on-chain packages, if the same package is specified multiple times with different versions, the version resolution will be done automatically by using the latest version in the dependency graph (not the latest version on-chain).

Better support for package versions will be added in the future.

## Overview of the generated code

The generated code has the following structure:

```
<root>
├── _dependencies
│    ├── source
│    │   ├── 0x1
│    │   ├── 0x2
│    │   └── ...
│    └── onchain
│        └── ...
├── _framework
│    └── ...
├── <package>
│    ├── <module-1>
│    │   ├── functions.ts
│    │   └── structs.ts
│    ├── <module-2>
│    │   └── ...
│    ├── index.ts
│    └── init.ts
├── <other packages from gen.toml>
└── .eslintrc.json
```

**`_framework`** directory contains functions and utilities required for the operation of the generated SDK.

**`_dependencies`** contains generated code of the direct and transitive dependencies of packages listed in `gen.toml`. While their contents are similar to those of listed packages, these are not intended to be imported or used directly as its APIs are not guaranteed to be stable and may change. Any package code that's inteded to be used directly in the app should be listed in `gen.toml`.

Due to a technical detail, the generator currently generates two separate dependency graphs for on-chain and source packages under `_dependencies`. This causes the code for some of the dependencies to be unnecessarily duplicated but will be fixed in a future version (see https://github.com/3MateLabs/iota-client-gen/issues/1#issuecomment-1554754842).

Each **`<package>`** directory contains a separate directory for each of its modules and `index.ts` and `init.ts` files.

`index.ts` contains the `PACKAGE_ID` and `PUBLISHED_AT` constants referring to the original package ID and the address of the current version (as per `gen.toml`).

`init.ts` contains some internal initialization functionalities that are not intended to be used directly.

Each module directory further contains `functions.ts` and `structs.ts` corresponding to the functions and structs defined in the module.

**`.eslintrc.json`** is generated in order to turn off the `@typescript-eslint/ban-types` rule which breaks the generated code.

## Functions

Function binding are generated for each function in packages listed in `gen.toml`, including non-public functions as these can be used with `devInspect` calls.

For each function, an `Args` interface is generated whose field names match function parameter names (for on-chain modules where they're generated based on parameter types since the names aren't available in the bytecode).

### Primitive parameters

In case of primitive types (`bool`, `u8`, `u16`, `u32`, `u64`, `u128`, `u256`, `address`), the values can be passed in directly. Here's how primitive Move types map to TS types in function bindings:

| Move                  | TS                              
| --------------------- | -----------
| `u8`, `u16`, `u32`    | `number`   
| `u64`, `u128`, `u256` | `bigint`   
| `bool`                | `boolean`  
| `address`             | `string`   

It's also possible to pass them in form of `TransactionArgument` which makes it possible to use the return values of previous calls as inputs to this call with a `TransactionBlock`.

### Object parameters

Passing in object references can be done with an ID string (e.g., `"0x12345"`), `ObjectCallArg`, or `TransactionArgument` (as defined in  `@iota/iota-sdk`). This makes it composable with return values from other calls in the `TransactionBlock` and allows manual construction using `txb.object(...)`.

### Vectors

Vector arguments can also be passed in directly as TS arrays. When non-primitive types are used, the framework will internally convert the array using `txb.makeMoveVec`.

When the argument is passed in as `TransactionArgument` instead of an array, the value will be used as is and not converted using `makeMoveVec`. This makes it possible to pass in return values from previous calls in the `TransactionBlock` or construct arguments using `makeMoveVec` manually (this applies to vectors of primitive types also).

### Strings and ID

String types (`0x1::string::String` and `0x1::ascii::String`) and ID (`0x2::object::ID`) have special handling in that they can be passed in directly as a `string` (and not need to be constructed manually using related function calls). Similar to other types, they can also be passed in as `TransactionArgument` allowing for composability within a `TransactionBlock`.

### Option

Option type (`0x1::option::Option`) also has special handling in that the underlying value can be passed in directly and it will be automatically wrapped into `Option<T>` where passing in `null` corresponds to `none`. In the case of non-primitive types, this means that the framework will call `0x1::option::some` or `0x1::option:none` internally to do the wrapping (with primitive types this is not necessary as it will be done by the IOTA runtime).

If the value is passed in as `TransactionArgument` no wrapping will be done and the argument will be used as is. This allows for the argument to be constructed manually and for composability with other function calls in the `TransactionBlock`.

In the case of option vectors `vector<Option<T>>`, if the value is passed in as array, the conversion described above will be applied to each element, while if it's passed in as `TransactionArgument` no conversion will be done and the argument will be used as is.

## Structs

There are multiple things generated for each struct.

First, each struct's bcs definition is registered with a global `bcs` object, which can be found under `_framework/bcs.ts`. It's OK to use it directly for deserialization but recommended to fork it with `new BCS(bcs)`.

Each struct also has an `is<struct name>` function generated that is used for checking whether the given type is the struct.

The `Fields` interface holds the field names and types of the struct. The `Fields` interface is also used as a constructor argument for the struct class.

Move field types are mapped to TS types as follows:

| Move                        | TS           |
| --------------------------- | ------------ |
| `u8`, `u16`, `u32`          | `number`     |
| `u64`, `u128`, `u256`       | `bigint`     |
| `bool`                      | `boolean`    |
| `address`                   | `string`     |
| `0x1::string::String`       | `string`     |
| `0x1::ascii::String`        | `string`     |
| `0x2::object::ID`           | `string`     |
| `0x2::object::UID`          | `string`     |
| `0x2::url::Url`             | `string`     |
| `0x1::option::Option<T>`    | `T \| null`   |
| `vector<T>`                 | `T[]`        |

The struct class holds the above fields as well as the `$typeName` and `$numTypeParams` static fields and the `$typeArgs` field in case the struct has type parameters. The `$typeName` field holds the full name of the type with the address but without type parameters (e.g., `0x2::balance::Balance` and not `0x2::balance::Balance<T>`).

The struct class can be instantiated in multiple ways:
- using the constructor by passing in the fields manually
- using the `fromFields` static method by passing in the fields as when decoded from bcs
- using the `fromFieldsWithTypes` static method by passing in the fields as returned by the RPC response with `showContent` option set to `true`
- using the `fromSuiParsedData` which is a wrapper around `fromFieldsWithTypes` that takes in the `content` field of the RPC response
- using the `fromBcs` static method by passing in the bcs bytes

For structs with the `key` ability, the `fetch` static method is also generated, which fetches the object from the chain by its ID.

## Design Doc

For more technical details and reasoning behind the design decisions, see the design doc https://github.com/3MateLabs/iota-client-gen/issues/1.
