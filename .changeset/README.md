# Changesets

This folder is managed by [Changesets](https://github.com/changesets/changesets).

To record a change that should trigger a version bump and changelog entry, run:

```bash
pnpm changeset
```

Pick the affected packages (`@sutra/tokens`, `@sutra/ui`), choose a semver bump,
and describe the change. On release, run `pnpm version-packages` then `pnpm release`.

See the [common questions](https://github.com/changesets/changesets/blob/main/docs/common-questions.md)
for more detail.
