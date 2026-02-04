[README](../README.md) | [Abstracts](./api/abstracts.md) | [Figures](./api/figures.md) | [Utilities](./api/utilities.md) | [Types](./api/types.md) | [Architecture](./architecture.md) | **Contributing**

---

# Contributing

This project is open to contribution.

## Bug Reports

If you have found a bug, please open an issue so it can be tracked and addressed. Include:

- Steps to reproduce the issue
- Expected result
- Actual result
- Library version and environment details

## Feature Requests

If you believe there's a missing feature, feel free to open an issue detailing the feature request and its value to the users of this library.

## Pull Requests

If you want to directly contribute to the library, feel free to do so by opening a pull request with your changes, as long as there's a related issue tracking the bug or feature request.

### Coding Standards

The project includes automated scripts for linting, formatting, testing, and building. Please adhere to the existing standards:

- **Code style**: Single quotes, semicolons, 2-space indent, explicit member accessibility, alphabetical member ordering
- **Naming**: Follow existing conventions in the codebase
- **Directory structure**: Abstracts in `src/abstracts/`, figures in `src/figures/`, types in `src/types/`
- **Principles**: SOLID, KISS, single source of truth
- **Tests**: Colocated with source files, flat `it()` blocks (no `describe`), Vitest globals

### Pre-commit Hook

The pre-commit hook runs automatically and will:

1. Lint the code (`npm run lint`)
2. Format the code (`npm run prettier`)
3. Run all tests (`npm test`)
4. Build the project (`npm run build`)
5. Stage the `dist/` output

If any step fails, the commit will be aborted. Fix the issue and commit again.

### Development Commands

```sh
npm test              # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage (80% threshold)
npm run lint          # Lint source files
npm run lint:fix      # Lint and auto-fix
npm run prettier      # Format all files
npm run build         # Clean and build all outputs
```

---

[README](../README.md) | [Abstracts](./api/abstracts.md) | [Figures](./api/figures.md) | [Utilities](./api/utilities.md) | [Types](./api/types.md) | [Architecture](./architecture.md) | **Contributing**
