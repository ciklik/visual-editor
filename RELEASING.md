# Releasing

Releases are published to npm by GitHub Actions on every `X.Y.Z` tag (`.github/workflows/publish.yml`) with npm trusted publishing (OIDC): no npm token is stored in the repository, and the package gets a provenance attestation.

## One time setup

On npmjs.com, in the settings of `@boxraiser/visual-editor`, add a trusted publisher:

- Provider: GitHub Actions
- Organization or user: `ciklik`
- Repository: `visual-editor`
- Workflow filename: `publish.yml`
- Environment: leave empty

Fallback, only if trusted publishing is not available: create a granular npm access token with publish rights on the package and store it as the `NPM_TOKEN` repository secret. The workflow uses it when OIDC is not possible.

## Release a version

1. Update `version` in `visual-editor/package.json` and add the entry in `docs/docs/changelog.mdx`, then merge to `main`.
2. Tag the merged commit with the bare version and push the tag:

   ```bash
   git tag 0.2.1
   git push origin 0.2.1
   ```

3. The `Publish` workflow builds `visual-editor/dist` and publishes it. It fails if the tag does not match the package version.

If a run fails after the tag is pushed, fix the cause and run the `Publish` workflow again from the Actions tab with "Use workflow from" set to the tag (manual runs are only allowed on tags).
