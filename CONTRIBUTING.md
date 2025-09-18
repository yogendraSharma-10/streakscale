# Contributing to Recipe Manager

Thank you for your interest in contributing! This guide covers how to set up the project locally, run the tests, follow the code style, and submit a pull request.

## Table of Contents

- [Development Setup](#development-setup)
- [Running Tests](#running-tests)
- [Code Style](#code-style)
- [Pull Request Guidelines](#pull-request-guidelines)

## Development Setup

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+ (bundled with Node.js)

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

This starts the Vite dev server with hot module replacement (HMR). Open the printed URL (usually `http://localhost:5173`) in your browser.

### Build the project

```bash
npm run build
```

This type-checks the project with `tsc -b` and produces an optimized production build in `dist/`.

### Preview the production build

```bash
npm run preview
```

## Running Tests

The project uses **Vitest** for unit and component tests. Tests live alongside the source files using the `*.test.ts` / `*.test.tsx` naming convention.

Run the full test suite once:

```bash
npm test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

Run tests with coverage:

```bash
npm run test:coverage
```

> **Note:** If the `test` scripts are not yet defined in `package.json`, add them to the `scripts` section:
>
> ```json
> "test": "vitest run",
> "test:watch": "vitest",
> "test:coverage": "vitest run --coverage"
> ```

## Code Style

- **Language:** TypeScript with strict mode enabled.
- **Formatting:** 2-space indentation, single quotes, semicolons, trailing commas. An `.editorconfig` and `.vscode/settings.json` are provided to keep formatting consistent.
- **Linting:** The project uses **Oxlint**. Run it before committing:

  ```bash
  npm run lint
  ```

- **Imports:** Prefer the `@/` path alias for imports from `src/` (e.g. `import { logger } from '@/lib/logger'`).
- **Error handling:** Throw domain errors from `src/lib/errors.ts` (`AppError`, `NotFoundError`, etc.) rather than raw `Error` objects where appropriate.
- **Logging:** Use the structured `logger` from `src/lib/logger.ts` instead of raw `console` calls.

## Pull Request Guidelines

1. **Create a branch** from `main` with a descriptive name, e.g. `feat/add-recipe-import` or `fix/empty-state-crash`.
2. **Keep changes focused.** A PR should address a single concern. If you have multiple unrelated changes, split them into separate PRs.
3. **Write a good description.** Use the pull request template and explain *what* changed and *why*.
4. **Add tests** for new functionality or bug fixes where practical.
5. **Run the checks locally** before pushing:

   ```bash
   npm run lint
   npm test
   npm run build
   ```

6. **Update documentation** (README, CHANGELOG) if your change affects user-facing behavior.
7. **Open the PR** and reference any related issues (e.g. `Closes #123`).
8. **Respond to review feedback.** Keep the conversation focused and address all requested changes.

Thank you for contributing!
