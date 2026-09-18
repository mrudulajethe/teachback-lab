# Third-party materials and AI assistance

## Original project work

Teachback Lab’s application flow, lesson content, prompts, tests, documentation, and game styling were created with Codex generative-AI assistance under the project owner’s direction. The owner should review and be able to explain the submitted work.

`public/images/pip.png` and `public/images/science-island.png` were generated specifically for this project using OpenAI image generation on September 17, 2026. They are fictional artwork, not photographs of real people or student data. The images were selected and visually reviewed. No image metadata is used to make factual scientific claims.

## Software

The project extends an existing Sites/Vinext starter. Principal components include React, Next.js, Vinext, Vite, TypeScript, Tailwind CSS, Radix UI/shadcn components, Lucide icons, Zod, Drizzle, Wrangler, and Cloudflare runtime tooling. Exact versions are pinned by `package-lock.json`; each package retains its own license. Vendored license notices are retained alongside their files.

See `docs/DEPENDENCY_LICENSES.csv` for declared package license metadata extracted from installed packages, and audit actual license texts before submission. Metadata is an inventory aid, not legal clearance. Development tools and transitive packages must be considered as well as direct runtime dependencies.

**LGPL finding resolved:** Sharp and all native Sharp/libvips packages have been removed from the lockfile. Unused image-transform functionality is explicitly disabled using original MIT-licensed project code. Both tooling consumers resolve to that replacement; see `docs/DEPENDENCIES.md` for the mechanism and verification.

**Additional audit finding:** MPL-2.0 packages remain in the build/lint/Open Graph tooling. The full lockfile inventory now includes every platform, not just packages installed on this Mac. These additional reciprocal components need resolution before claiming compliance with contest §7.6. Removing LGPL alone does not certify contest eligibility.

No external web fonts, stock photography, prerecorded audio, or real learner datasets are used. Emoji and speech-synthesis voices are supplied by the user’s operating system/browser.

## External services

- Sites/Cloudflare Workers and D1 host the application and anonymous notebook records.
- Vercel AI Gateway is the selected optional model service, using `openai/gpt-4.1-mini`. It routes requests to the model provider. Direct OpenAI Responses API is also supported. Account verification is still required before live responses can be tested successfully. Practice feedback is authored, not model-generated.
- GitHub hosts source and runs CI; this is separate from runtime hosting.

Do not claim live AI was tested when demonstrating only practice mode. Include the nature and extent of AI assistance and relevant third-party components in the hackathon submission disclosures.
