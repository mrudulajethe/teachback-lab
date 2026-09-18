# Dependency audit

## Resolved: Sharp/libvips LGPL dependency

The game serves original PNG assets directly and never uses server image transformations. Next.js and Miniflare previously installed Sharp, which pulled platform-specific libvips binaries with LGPL metadata. The root npm override now resolves both consumers to `packages/image-transforms-disabled`, an original MIT-licensed module with no dependencies. It deliberately throws on import, so accidentally enabling an unsupported transform cannot silently return wrong data. Next image optimization is explicitly disabled as well.

This is a disabled optional capability, **not an implementation of Sharp**. Do not remove the override or add image optimization without reviewing the replacement's complete dependency graph. No Sharp/libvips source or binary is copied into the replacement.

`npm run audit:licenses` checks every platform's locked package metadata, rejects GPL/LGPL/AGPL/SSPL and native Sharp/libvips packages, and detects an out-of-date inventory. Unit tests check that both consuming packages resolve to the deliberate disabled module. `npm ci`, the game build, and local API checks validate compatibility.

Regenerate the inventory after dependency changes with:

```sh
node scripts/audit-dependencies.mjs --write
```

## Separate finding: MPL dependencies remain

The broader lockfile audit found MPL-2.0 metadata on Lightning CSS (used by Tailwind/Vite), axe-core (used by accessibility lint tooling), and the Vinext Open Graph image stack (`@vercel/og`, `satori`, `@resvg/resvg-wasm`), including platform variants. These are listed explicitly in `DEPENDENCY_LICENSES.csv`; the original installed-only inventory did not clearly flag them.

The LGPL fix does **not** establish that the project is free of every reciprocal license. Contest terms §7.6 prohibit reciprocal components. Do not claim full license clearance: these additional packages need removal or a determination from the organizer before submission. Merely not shipping development binaries is not treated here as proof of eligibility.

Sources: [contest terms](https://hackathon.nerdy.com/terms), [npm overrides](https://docs.npmjs.com/files/package.json/). Package licenses remain governed by their own license texts; metadata checks are not legal certification.
