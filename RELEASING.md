# Releasing

Releases are automated by `.github/workflows/publish.yml`. The package is published to npm with trusted publishing (OIDC): no npm token is stored in the repository, and the package gets a provenance attestation.

## One time setup

On npmjs.com, in the settings of `@boxraiser/visual-editor`, add a trusted publisher:

- Provider: GitHub Actions
- Organization or user: `ciklik`
- Repository: `visual-editor`
- Workflow filename: `publish.yml`
- Environment: leave empty

The workflow file must keep this name, renaming it breaks the publication.

Fallback, only if trusted publishing is not available: create a granular npm access token with publish rights on the package and store it as the `NPM_TOKEN` repository secret. The workflow uses it when OIDC is not possible.

## Release a version

1. Run `pnpm release:prepare patch` (or `minor`, `major`, `X.Y.Z`): it bumps `visual-editor/package.json` and adds the version section to `docs/docs/changelog.mdx` with the commits since the last tag.
2. Edit the changelog entries, commit `bump: X.Y.Z` and open a pull request to `main`.
3. Merge it. On the push to `main` that changes the version, the `Publish` workflow:
   - stops if the tag `X.Y.Z` exists or if the version is already on npm,
   - runs the tests (`test.yml`: type check, build, vitest, Cypress),
   - creates the `X.Y.Z` tag on the merged commit,
   - builds `visual-editor/dist` and publishes it with `npm publish --provenance`,
   - creates the GitHub release, with the changelog section of the version as notes (the commits since the previous tag when the section is missing).

A push to `main` that touches `visual-editor/package.json` without changing the version releases nothing.

## Fallbacks

- **Release the current version by hand**: run the `Publish` workflow from the Actions tab on `main`. It releases the version of `visual-editor/package.json` if it has no tag yet.
- **Retry a failed publication**: once the tag exists, run the `Publish` workflow with "Use workflow from" set to the tag, or push a tag yourself (`git tag X.Y.Z && git push origin X.Y.Z`). On a tag, the workflow checks that it matches the package version, runs the tests, publishes and creates the release if it is missing. If only the release step failed, re-run the failed job.
