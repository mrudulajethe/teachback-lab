# Teachback Lab

### Teach a little robot. Discover a big idea.

#### ** Try the Game First! - (https://learning-lab-mrudula.mrudulajethe.chatgpt.site/) ** 

Teachback Lab is a playful **learning-by-teaching adventure for elementary learners**. Children explore a short lesson, explain it to Pip (a curious robot), revise their thinking, and apply the idea in a new situation. Discovery badges and effort stars reward the learning process rather than speed or a high-stakes score.

![Discovery Island](public/images/science-island.png)

**Status:** working full-stack MVP for supervised demos. The game, anonymous notebooks, saved badges, transfer questions, and practice feedback work end to end. The server supports Vercel AI Gateway (selected for this deployment) and direct OpenAI. A Gateway key is configured, but the first live test returned HTTP 403 `customer_verification_required`: Vercel requires account/card verification. Until that is completed and retested, feedback falls back to the clearly labeled practice guide.

## The learning loop

1. **Discover:** pick a mystery and explore three short learning notes, with optional read-aloud.
2. **Teach:** explain the idea to Pip in everyday words. A clue and sentence starter help with the blank page.
3. **Reflect:** read Pip’s feedback, answer its follow-up by revising your explanation, and try again.
4. **Transfer:** apply the idea in a different situation. Incorrect choices lead to a clue and another try.
5. **Celebrate:** earn a badge and up to three effort stars. Return to your notebook later.

The first two stars recognize an explanation and a correct transfer answer. A third recognizes a changed, resubmitted explanation. Stars **are not a validated mastery score**. Replaying a mission keeps the best star count; it does not farm additional rewards.

### Six launch missions

| Mission              | Learning idea                                            | Transfer example            |
| -------------------- | -------------------------------------------------------- | --------------------------- |
| The puddle puzzle    | Evaporation and the water cycle                          | A towel drying in sunshine  |
| The hungry sunflower | Plants make sugar using light, water, and carbon dioxide | A seedling kept in darkness |
| Light up Pip’s lab   | Closed circuits and electrical energy                    | Opening a switch            |
| The sneaky shadow    | Objects block light                                      | Moving a flashlight         |
| The mystery magnet   | Magnets attract certain materials                        | Choosing an iron object     |
| The picnic problem   | Halves are equal parts                                   | Sharing a sandwich equally  |

Younger learners can listen to the notes and dictate their explanation to a grown-up. The app does not record speech. Browser read-aloud depends on the device’s available voices.

## Quick start

**Requirements:** Node.js 24 LTS recommended (minimum 22.18), npm, Git. No API key is required for practice mode.

```bash
git clone https://github.com/mrudulajethe/teachback-lab.git
cd teachback-lab
nvm use                     # optional, if you use nvm
npm ci
cp .env.example .env
npm run build               # also generates the local Worker/D1 configuration
npm run db:migrate:local    # creates the local notebook database
npm run dev
```

Open the URL printed by the dev server (normally `http://localhost:5173`). Start a mission, write an explanation, revise it, and solve the transfer question. Check **My badges**, then reload: your badge should still be there.

The local preview simulates the hosting identity for development. It is not production authentication. Local D1 lives in `.wrangler/state/`, is ignored by Git, and is separate from the hosted database.

### Useful commands

| Command                    | Purpose                                                               |
| -------------------------- | --------------------------------------------------------------------- |
| `npm run dev`              | Local interactive development                                         |
| `npm run build`            | Build browser assets and the Cloudflare Worker                        |
| `npm start`                | Serve the compiled Worker locally; use its printed URL                |
| `npm run typecheck`        | Strict TypeScript checking                                            |
| `npm test`                 | Mission, feedback-validation, privacy-filter, and reward tests        |
| `npm run test:api`         | Local API integration checks; requires a running practice-mode server |
| `npm run db:generate`      | Generate a migration after editing the schema                         |
| `npm run db:migrate:local` | Apply pending migrations to the local database                        |

`TEST_BASE_URL=http://localhost:8787 npm run test:api` targets another local port. The test script rejects remote hosts, uses synthetic examples, and deletes its test notebooks afterward. Keep `ENABLE_AI=false` for these tests.

## Project structure

```text
app/
  page.tsx                  # Small route entrypoint
  layout.tsx                # Metadata and shared styles
  globals.css               # Shared UI tokens/utilities
  product.css               # Game visual system and responsive layouts
  api/
    progress/route.ts       # Read/create anonymous notebook; delete notebook
    teachback/route.ts      # Validate and evaluate a mission explanation
    complete/route.ts      # Check transfer answer and save best reward
    coach/route.ts         # Retired prototype endpoint (410)
components/
  teachback/
    teachback-game.tsx      # Island, badges, grown-up view
    mission-play.tsx        # Discover → explain → reflect → transfer → reward
  ui/                      # Existing accessible UI primitives
features/teachback/
  missions.ts              # Lesson content, facts, misconceptions, transfer items
  evaluation.ts            # Feedback contract and pure reward/validation helpers
  use-notebook.ts          # Client API and progress state
lib/server/
  coach.ts                 # Server-only AI provider adapter and practice fallback
  database.ts              # D1 binding access
  http.ts                  # Bounded request parsing and safe errors
  session.ts               # Anonymous cookie/session handling
db/                       # Drizzle schema
drizzle/                  # Versioned SQL migrations and snapshots
public/images/            # Original Pip and island artwork
scripts/                  # Build/runtime helpers and local migration runner
tests/                    # Domain tests and API smoke test
docs/                     # Architecture, demo guide, and production roadmap
.github/workflows/ci.yml   # Automated typecheck, tests, and production build
.env.example              # Safe, empty environment template
.openai/hosting.json      # Existing Sites identity and logical DB binding
```

## Feedback modes

### Practice mode — works without a key

`ENABLE_AI=false` is the default. The app returns authored lesson prompts and a misconception question. It does **not** grade free text, perform keyword-based comprehension scoring, or claim that a model reviewed the learner’s writing. Transfer answers are checked against authored answer keys.

### Live AI mode — requires server configuration

Set these values in your local `.env` or as production runtime secrets/settings:

```dotenv
AI_PROVIDER=vercel
AI_GATEWAY_API_KEY=your-server-side-gateway-key
AI_GATEWAY_MODEL=openai/gpt-4.1-mini
ENABLE_AI=true
```

Never commit the real key, put it in a public browser variable, or enter it in a child-facing screen. `.env` and `.env.*` are ignored; only `.env.example` is committed.

The server sends the mission facts, misconception, and learner explanation through Vercel AI Gateway’s Responses-compatible endpoint, with `store: false`. For direct OpenAI, set `AI_PROVIDER=openai`, `OPENAI_API_KEY`, and `OPENAI_MODEL=gpt-4.1-mini` instead. A strict JSON schema and Zod validation constrain the returned feedback. This does not guarantee educational accuracy or eliminate provider-side retention; review provider policies before real learner use. The app itself never stores raw explanations or generated feedback in D1.

If the provider times out, refuses, returns malformed data, or is unavailable, the response switches to **Practice guide**. The client displays that mode explicitly. Secrets and provider error bodies never reach the child-facing UI.

Run `npm run test:ai` with a running AI-enabled local server to require actual AI responses (practice fallbacks fail the test). `AI_TEST_REPORT=work/live-ai.json npm run test:ai` saves synthetic responses for human quality review. These calls consume provider credits. Vercel must have an active key and account verification/credits.

See the [Vercel structured outputs guide](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs) and [OpenAI Structured Outputs guide](https://developers.openai.com/api/docs/guides/structured-outputs) for the response format used by the adapter.

## Persistence and privacy

- A random, HttpOnly, SameSite cookie links this browser to a notebook. HTTPS adds `Secure`.
- D1 stores a hash-derived anonymous learner ID, mission completion, best stars, timestamps, and minimal attempt metadata.
- Explanation hashes distinguish revisions. Raw explanations and AI feedback are not stored in the app database or intentionally logged.
- Attempt IDs are checked against the current notebook; another browser cannot redeem them.
- Requests have size/schema checks, same-origin checks, and a per-notebook attempt-rate guard. Public deployment needs additional edge rate limiting.
- Obvious email addresses and phone numbers are rejected before provider calls. This is a limited heuristic, **not comprehensive PII detection**.
- **Grown-ups → Clear this notebook** deletes that browser’s progress and attempt records.
- Clearing browser cookies loses access to the notebook; cross-device accounts and recovery are not implemented.
- Cookie lifetime is 30 days. Automatic deletion of abandoned server records is not implemented yet; plan a retention job before real child use.

This is a supervised MVP, not a claim of COPPA/FERPA compliance or readiness for unsupervised school deployment. Use synthetic examples for the hackathon. See [the production roadmap](docs/ROADMAP.md) for the remaining work.

## Deployment

The existing deployment uses **Sites on Cloudflare Workers + D1**. `.openai/hosting.json` declares the logical `DB` binding. Keep the existing project ID when updating this deployment; do not replace it to create a second copy accidentally.

1. Run the checks and production build.
2. Commit the exact source.
3. Publish that source and its build through Sites. Sites provisions D1 and applies the versioned migrations before uploading the Worker.
4. Set production secrets separately; local `.env` does not configure hosted secrets.
5. Verify a complete learning loop and persistent badge in the published version.

For deployment outside Sites, supply your own Cloudflare Worker/D1 configuration, provision the database, apply migrations, bind `DB`, and configure secrets/access controls. The generated local configuration contains a placeholder database ID and must not be treated as production configuration. See [architecture](docs/ARCHITECTURE.md).

## GitHub workflow

This repository is organized for normal GitHub development. The default workflow runs type checking, domain tests, and a production build on pushes and pull requests. It does not deploy or require an API secret.

```bash
git checkout -b feature/your-change
# edit files and add meaningful tests
npm run typecheck
npm test
npm run build
git add <changed-files>
git commit -m "Describe the behavior change"
git push -u origin feature/your-change
```

The first four-prototype version is preserved in Git history. The current main app is Teachback Lab only.

## Demo and next steps

- [Two-minute demo walkthrough](docs/DEMO.md)
- [Architecture and API contracts](docs/ARCHITECTURE.md)
- [Production roadmap](docs/ROADMAP.md)
- [Third-party and AI-assistance disclosures](THIRD_PARTY_NOTICES.md)
- [LGPL resolution and additional license findings](docs/DEPENDENCIES.md)
- [Detailed demo-video generation prompt](docs/VIDEO_PROMPT.md)

Original app code is not assigned an open-source license by this repository. Dependency licenses remain their respective authors’ licenses. Choose an application license deliberately, considering the hackathon’s submission terms, before advertising this as an open-source project.
