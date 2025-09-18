# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Placeholder for upcoming changes.

## [1.0.0] - 2025-01-01

### Added

- **Recipe management** — create, edit, and delete recipes through an intuitive modal-based form.
- **Recipe grid & cards** — browse recipes in a responsive card grid with rich detail views.
- **Ingredient lists** — structured ingredient management per recipe with quantities and units.
- **Category filtering** — filter the recipe collection by category.
- **Search & filtering** — filter recipes by category and other criteria via the `filtering` module.
- **Persistence** — recipes are stored locally using the `localStorage` repository, with an in-memory repository for testing.
- **Seed data** — the app seeds a starter set of mock recipes when storage is empty.
- **Validation** — user input is validated with Zod before being persisted.
- **Structured logging** — a dependency-free logger (`src/lib/logger.ts`) with configurable log levels.
- **Domain error handling** — typed application errors (`AppError`, `NotFoundError`, `BadRequestError`, etc.) for consistent failure handling.
- **Global error safety** — uncaught exceptions and unhandled promise rejections are logged at startup.
- **React Query integration** — server-state management via `@tanstack/react-query`.
- **Routing** — client-side routing with `react-router-dom`.

### Changed

- Initial release.

[Unreleased]: https://github.com/example/recipe-manager/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/example/recipe-manager/releases/tag/v1.0.0
