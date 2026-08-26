# Sutra UI — TODO

Backlog for upcoming work on the `@sutra_ui` design system monorepo.

## Component documentation

- [ ] Add documentation for each component in `@sutra_ui/ui`
- [ ] Ensure every component has Ladle stories covering meaningful variants and states
- [ ] Add usage notes (props, a11y, token dependencies) alongside stories where helpful

## CI/CD — publish

- [x] Add CI/CD automation for npm publish (`@sutra_ui/tokens`, `@sutra_ui/ui`)
- [x] Wire changesets publish into the pipeline
- [ ] Store `NPM_TOKEN` (granular, `@sutra_ui/*` read/write, bypass 2FA) as a GitHub secret, or
      configure npm Trusted Publishing for `.github/workflows/release.yml`

## Auto-release workflow

- [x] Add GitHub Actions workflow: **release.yml**
- [x] On merge to `production`: run `changeset version` when changesets exist
- [x] Publish to npm via `changeset publish` (`pnpm release`)
- [x] Open/update release PR for version bumps (changesets/action)

## CI — test, lint, typecheck

- [x] Add GitHub Actions workflow: **ci.yml**
- [x] Run on pull requests (to `main` / `production`) and pushes to `main`:
  - `pnpm install`
  - `pnpm build`
  - `pnpm test`
  - `pnpm lint`
  - `pnpm typecheck`
- [x] Fail the check if any step is red (match the gate in [CLAUDE.md](./CLAUDE.md))

## Notes

- Package scope on npm: **`@sutra_ui`** (org `sutra_ui`)
- Local gate before merge: `pnpm build && pnpm test && pnpm lint && pnpm typecheck`
