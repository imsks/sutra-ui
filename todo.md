# Sutra UI — TODO

Backlog for upcoming work on the `@sutra_ui` design system monorepo.

## Component documentation

- [ ] Add documentation for each component in `@sutra_ui/ui`
- [ ] Ensure every component has Ladle stories covering meaningful variants and states
- [ ] Add usage notes (props, a11y, token dependencies) alongside stories where helpful

## CI/CD — publish

- [ ] Add CI/CD automation for npm publish (`@sutra_ui/tokens`, `@sutra_ui/ui`)
- [ ] Wire changesets publish into the pipeline
- [ ] Store `NPM_TOKEN` (granular, `@sutra_ui/*` read/write, bypass 2FA) as a GitHub secret

## Auto-release workflow

- [ ] Add GitHub Actions workflow: **auto-release.yml**
- [ ] On merge to `main`: run `changeset version` when changesets exist
- [ ] Publish to npm via `changeset publish` (or `pnpm release`)
- [ ] Open/update release PR for version bumps when using the changesets bot pattern (optional)

## CI — test, lint, typecheck

- [ ] Add GitHub Actions workflow: **ci.yml** (or split per concern)
- [ ] Run on pull requests and pushes to `main`:
  - `pnpm install`
  - `pnpm build`
  - `pnpm test`
  - `pnpm lint`
  - `pnpm typecheck`
- [ ] Fail the check if any step is red (match the gate in [CLAUDE.md](./CLAUDE.md))

## Notes

- Package scope on npm: **`@sutra_ui`** (org `sutra_ui`)
- Local gate before merge: `pnpm build && pnpm test && pnpm lint && pnpm typecheck`
