# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `iota-client-gen`, a tool for generating TypeScript SDKs for IOTA Move smart contracts. It supports code generation both for source code and on-chain packages without requiring IDLs or ABIs.

## Architecture

The project consists of two main components:

1. **Rust Generator** (`/generator`): Core code generation logic that parses Move packages and generates TypeScript bindings
2. **TypeScript SDK** (`/ts`): Generated TypeScript code with tests and examples

### Key Components

- **Package Resolution**: Handles both source packages (git/local) and on-chain packages via RPC
- **Model Building**: Uses Move compiler's model2 to build comprehensive type information
- **Code Generation**: Uses `genco` for structured TypeScript code generation
- **Type Safety**: Generates fully type-safe code including reified types for generics

## Common Commands

### Building the Generator
```bash
cd generator
cargo build --release
```

### Installing the Generator
```bash
cargo install --locked --git https://github.com/3MateLabs/iota-client-gen.git
```

### Running Tests
```bash
# TypeScript tests
cd ts
npm install
npm test

# Run specific test
npm test -- --grep "test name"
```

### Linting and Type Checking
```bash
cd ts
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues
npm run check       # TypeScript type checking
```

### Building Examples
```bash
cd ts
npm run build:example
```

### Generating Code
```bash
# From project root with gen.toml
iota-client-gen

# With specific output directory
iota-client-gen --out ./generated

# Clean existing output before generating
iota-client-gen --clean
```

## Code Generation Workflow

1. Create a `gen.toml` configuration file specifying packages to generate
2. Run `iota-client-gen` to generate TypeScript code
3. Generated code structure:
   - `_framework/`: Core utilities and type system
   - `_dependencies/`: Transitive dependencies
   - `<package>/`: Generated package code with modules
   - Each module contains `functions.ts` and `structs.ts`

## Key Implementation Details

- **Reified Types**: The generated code uses a reified type system for full type safety with generics
- **Special Type Handling**: Automatic handling for `String`, `ID`, `vector<T>`, and `Option<T>` types
- **Transaction Building**: Generated functions integrate with IOTA's Transaction pattern
- **Dependency Management**: Separate graphs for source and on-chain packages (temporary limitation)

## Development Notes

- When modifying the generator, changes require rebuilding the Rust binary
- Generated TypeScript code should be formatted with ESLint after generation
- The project uses IOTA SDK develop branch dependencies
- Test coverage includes both unit tests for the generator and integration tests for generated code