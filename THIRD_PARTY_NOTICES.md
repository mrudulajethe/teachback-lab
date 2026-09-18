# Third-party materials and AI assistance

## Original project work

Teachback Lab’s application flow, lesson content, prompts, tests, documentation, and game styling were created with Codex generative-AI assistance under the project owner’s direction. The owner should review and be able to explain the submitted work.

`public/images/pip.png` and `public/images/science-island.png` were generated specifically for this project using OpenAI image generation on September 17, 2026. They are fictional artwork, not photographs of real people or student data. The images were selected and visually reviewed. No image metadata is used to make factual scientific claims.

## Software

The project extends an existing Sites/Vinext starter. Principal components include React, Next.js, Vinext, Vite, TypeScript, Tailwind CSS, Radix UI/shadcn components, Lucide icons, Zod, Drizzle, Wrangler, and Cloudflare runtime tooling. Exact versions are pinned by `package-lock.json`; each package retains its own license. Vendored license notices are retained alongside their files.

See `docs/DEPENDENCY_LICENSES.csv` for declared package license metadata extracted from installed packages, and audit actual license texts before submission. Metadata is an inventory aid, not legal clearance. Development tools and transitive packages must be considered as well as direct runtime dependencies.

**Audit finding:** the installed macOS tooling includes `@img/sharp-libvips-darwin-arm64@1.3.3`, whose metadata declares `LGPL-3.0-or-later`. It is not a browser UI asset, but it is in the installed dependency graph. The hackathon prohibits reciprocal/copyleft components; resolve this dependency question before submitting. This inventory does not certify eligibility.

No external web fonts, stock photography, prerecorded audio, or real learner datasets are used. Emoji and speech-synthesis voices are supplied by the user’s operating system/browser.

## External services

- Sites/Cloudflare Workers and D1 host the application and anonymous notebook records.
- OpenAI Responses API is optional and disabled until the server is configured. The default model setting is `gpt-4.1-mini`; deployments may override it. Practice mode does not call a generative model.
- GitHub hosts source and runs CI; this is separate from runtime hosting.

Do not claim live AI was tested when demonstrating only practice mode. Include the nature and extent of AI assistance and relevant third-party components in the hackathon submission disclosures.
