# Separate Repositories with Shared npm Package

Rajniti, Saransh, and Sutra remain independent repositories. Products (Rajniti, Saransh) consume Sutra as a published npm package rather than via monorepo workspace links.

**Context**: We considered merging all three repos into a single monorepo for easier cross-cutting changes. However, the products have different deployment targets (Vercel + Cloud Run for Rajniti, TBD for Saransh), different backend frameworks (Flask vs FastAPI), and different release cadences.

**Decision**: Keep all three repos independent. Sutra publishes to npm; products install it like any other dependency. This keeps CI simple, avoids cross-repo dependency hell, and lets each product evolve at its own pace.

**Considered Alternative**: Single monorepo with Turborepo. Rejected because the shared code is relatively stable (design tokens, UI primitives) and the overhead of coordinating releases across disparate backends isn't worth the coupling.
