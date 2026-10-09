# Contributing

Thanks for helping! Issues and pull requests are welcome, in English or French.

## Setup

Requirements: Node 24, pnpm 10 (`corepack enable` picks the version from `package.json`) and PHP (the end to end tests use `php -S`).

```bash
pnpm install
cd visual-editor
pnpm dev        # Vite playground + PHP preview server on :8000
pnpm check      # TypeScript
pnpm build      # dist/, what is published on npm
pnpm test       # vitest, then Cypress (needs a build)
pnpm format     # Prettier
```

To run Cypress against another port: start `php -S localhost:8765` in `visual-editor/` and run `CYPRESS_BASE_URL=http://localhost:8765 npx cypress run`.

## Pull requests

- One topic per pull request, with a short description of the behaviour change.
- Commit messages follow the existing style: `feat:`, `fix:`, `chore:`, `docs:`, `test:`...
- Keep the public API and the stored JSON format stable. `cypress/e2e/compat.cy.js` replays how an existing host uses the library: if it fails, the change breaks existing users and must be discussed first.
- Add or update the documentation in `docs/docs/` and an entry in `docs/docs/changelog.mdx`.
