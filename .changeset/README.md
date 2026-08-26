# Changesets

This folder is managed by [Changesets](https://github.com/changesets/changesets).

To record a change that should trigger a version bump and changelog entry, run:

```bash
pnpm changeset
```

Pick the affected packages (`@sutra_ui/tokens`, `@sutra_ui/ui`), choose a semver bump,
and describe the change. Merging to `production` versions packages and publishes
them to npm via GitHub Actions (see CONTRIBUTING.md).

See the [common questions](https://github.com/changesets/changesets/blob/main/docs/common-questions.md)
for more detail.
