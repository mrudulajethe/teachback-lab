# Teachback Lab: 2–3 minute demo-video prompt

Copy the prompt below into a video editor or video-making AI that accepts screen recordings, images, narration, and text overlays. A generative-video model alone cannot reliably recreate working interface text; supply actual recordings from the live app. Never substitute invented screens for product evidence.

**Recording status:** Vercel AI Gateway is integrated and its credential is configured, but the first real API request was blocked by Vercel account verification (HTTP 403). Use the practice-mode narration below unless a fresh successful live test and recording establish otherwise. The final video must accurately show whichever mode is operating during recording.

---

You are a product-demo director, instructional storyteller, motion designer, and video editor. Create a polished **2 minute 40 second (160-second)** English demo of **Teachback Lab — Discovery Island**, an elementary learning-by-teaching game. The audience is the Nerdy AI Hackathon judging panel. The video should show a real, functioning product, explain why the learning loop matters, and distinguish implemented features from future plans. Deliver an MP4 at 1920×1080, 16:9, 30 fps, with clear English narration and accurate captions. Hard maximum: 180 seconds, including end cards. Target: 160 seconds.

## Product and source of truth

- Live app: https://learning-lab-mrudula.mrudulajethe.chatgpt.site
- Source: https://github.com/mrudulajethe/teachback-lab (private unless the owner grants you access).
- Use supplied screen recordings, original `public/images/pip.png`, and original `public/images/science-island.png`. If you cannot access the URL or assets, ask for a screen recording. Do not invent working UI.
- Brand line: **“Teach a little robot. Discover a big idea.”**
- Pip is a friendly mint-green robot with a coral backpack. Keep the supplied character’s proportions, colors, face, and accessories consistent. Do not redesign it or use a copyrighted mascot.
- The product is a colorful island adventure for elementary children, with adult support where needed. Learners discover a concept, explain it to Pip, improve their explanation, answer a transfer question, and collect discovery badges and effort stars.
- Six existing missions: The puddle puzzle; The hungry sunflower; Light up Pip’s lab; The sneaky shadow; The mystery magnet; The picnic problem. Focus the main demonstration on **The puddle puzzle**.
- Navigation includes **Explore**, **My badges**, and **Grown-ups**. Follow actual visible labels if the recording differs slightly from this brief.
- The learner types an explanation. “Read to me” uses browser speech synthesis. There is **no microphone recording, speech recognition, camera, teacher dashboard, class roster, cross-device login, multiplayer mode, or adaptive curriculum**. Do not depict these.
- The backend validates requests, stores anonymous notebook progress in Cloudflare D1, and requests lesson-grounded, structured feedback through Vercel AI Gateway when available. The selected model is `openai/gpt-4.1-mini`. Hosting stays on Sites/Cloudflare; do not label the website as hosted on Vercel.
- If AI is unavailable, the UI explicitly displays **Practice guide** and explains that prepared prompts are being used. Never remove, cover, rename, or crop out that label to imply live AI.
- Stars recognize an explanation, a correct transfer answer, and a changed/resubmitted explanation. They are **effort stars**, not verified mastery, test scores, or evidence of learning gains.
- Badges persist in the same browser through an anonymous cookie. Do not imply progress syncs across devices or identifies a named child.

## Required recordings and preparation

Use synthetic explanations typed by an adult; no real child’s identity, voice, school, or personal data. Start from a fresh demo notebook so the first reward makes sense. Record the following:

1. Full island overview with Pip and six mission cards.
2. Opening The puddle puzzle and reading its lesson notes and concept sequence.
3. Optional “Read to me” interaction, with one brief real audio excerpt if available.
4. First explanation submitted: **“The Sun warms the puddle and the water goes into the air.”**
5. The actual feedback returned, including its mode label and follow-up question. Leave enough time to read it. Do not write a plausible fake response over the screen.
6. Click **Make my idea clearer**. Revise to: **“The Sun warms the puddle. Some liquid water changes into water vapor in the air. This is evaporation, like a wet towel drying.”** Submit again and capture the real response.
7. Click **Try a new challenge**. Show the towel question. Select the existing correct option, **“It becomes water vapor in the air.”**, and click **Check my idea**.
8. Capture the real badge and three-star celebration. The third star requires the actual revision above; do not manufacture it by editing the display.
9. Open **My badges**, then reload the page and show that progress remains. Do not clear cookies between these shots.
10. Open **Grown-ups** and show the actual mode/privacy explanation. Do not delete the notebook during the main demo.
11. Optional narrow-screen recording for the final montage, using the actual responsive layout.

If a live AI test succeeds, capture the successful on-screen AI feedback and use the live-AI wording below. If a call is slow, shorten idle time with a labeled “Waiting time shortened” edit; do not imply a measured response speed. If the provider fails, use the truthful practice branch. Stop and ask for missing evidence rather than fabricating it.

## Look, sound, and motion

Use the app’s teal, mint, sky-blue, warm yellow, and coral palette. Friendly rounded typography, generous whitespace, soft shadows, small star accents, and gentle movement should echo the existing interface. The video must still feel credible to adult product/engineering judges. Keep actual UI sharp and readable; use crops and slow zooms instead of shrinking a whole browser into a tiny decorative frame.

Use a warm, clear adult English voice, at roughly 125–140 words per minute during spoken passages. Avoid exaggerated baby talk, sales hype, and a synthetic child impersonation. Do not clone a real person’s voice. Light instrumental music may sit quietly under narration; use licensed or original music, no lyrics. Brief soft click/chime effects can reinforce real actions. Duck music under speech and read-aloud. Leave small pauses for viewers to read feedback.

Use cuts and 150–250 ms crossfades; at most three gentle zooms. No flashing transitions, rapid camera orbit, fake 3D device fly-throughs, or animated text obscuring app controls. Captions should be high-contrast, sentence case, two lines maximum, within safe margins. Keep captions away from the feedback and buttons. Only animate Pip gently in the opening/end card using the supplied art; do not make the gameplay character act in ways the product does not implement.

## Timeline, narration, and screen direction

### 0:00–0:12 — Hook

**Visual:** Begin on the real island. Bring Pip and the title into focus. Add a small title overlay, then dissolve it to leave the product visible.

**Overlay:** “Teachback Lab” / “Teach a little robot. Discover a big idea.”

**Narration:** “Choosing the right answer is one thing. Explaining why is another. Teachback Lab gives elementary learners someone curious to teach: Pip, a little robot with big questions.”

### 0:12–0:28 — Show the adventure

**Visual:** Pan gently across the six mission cards. Hover briefly, then open The puddle puzzle. Show the real transition into the mission.

**Overlay:** “Discover → Explain → Reflect → Apply”

**Narration:** “On Discovery Island, children explore six short science and math mysteries. Each mission follows a simple loop: discover an idea, explain it, improve the explanation, and try it in a new situation.”

### 0:28–0:47 — Discover

**Visual:** Show the puddle lesson, three concise notes, and the concept sequence. Briefly activate read-aloud if available. Highlight existing lesson text with a subtle editorial outline; do not rewrite the science.

**Overlay:** “A small lesson. A clear question.”

**Narration:** “Let’s investigate a disappearing puddle. The lesson connects sunlight, evaporation, and water vapor. Short notes and optional read-aloud give learners a starting point. Then Pip asks them to explain the idea in their own words.”

### 0:47–1:14 — Teach Pip and show truthful feedback

**Visual:** Click “I’m ready to teach Pip.” Show the first synthetic explanation being entered and submitted. Reveal the real returned feedback; keep its mode label readable. Hold the follow-up for at least four seconds.

**Overlay if live AI really succeeded:** “Lesson-grounded AI feedback”

**Live-AI narration, ONLY when evidenced:** “The learner teaches Pip: ‘The Sun warms the puddle and the water goes into the air.’ The server sends that explanation and the lesson facts through Vercel AI Gateway. Pip responds with a specific observation, one next step, and a follow-up question. The child stays the explainer.”

**Practice overlay and replacement narration if AI is unavailable:** “Practice guide · prepared prompts” / “Here, the learner teaches Pip: ‘The Sun warms the puddle and the water goes into the air.’ This recording uses the clearly labeled practice guide. The Vercel AI Gateway integration is built, but account verification is still pending. Prepared prompts keep the learning loop usable without pretending that AI reviewed the answer.”

Never splice the live-AI wording over practice feedback. If the technical issue has changed, describe the current observed issue in one plain sentence instead of retaining stale wording.

### 1:14–1:34 — Reflection through revision

**Visual:** Click “Make my idea clearer.” Enter the revised explanation verbatim, submit, and show the real second response. Use a restrained split text overlay to emphasize “goes into the air” becoming “changes into water vapor,” while keeping the actual app evidence visible.

**Overlay:** “Make the thinking clearer”

**Narration:** “Now the learner makes the idea clearer: liquid water changes into water vapor. A familiar example—a towel drying—connects the explanation to everyday life. Revision is part of the adventure, so learners have a reason to reflect and try again.”

### 1:34–1:54 — Apply the idea

**Visual:** Click “Try a new challenge.” Show the complete wet-towel question and available choices. Select the correct option and click “Check my idea.” Do not obscure the reasoning with celebration graphics before the choice is submitted.

**Overlay:** “Can you use the idea somewhere new?”

**Narration:** “The next challenge checks transfer: where does a wet towel’s water go? The learner applies the idea of evaporation to choose water vapor in the air. Incorrect choices offer another clue and another try, rather than ending the mission.”

### 1:54–2:12 — Reward and persistence

**Visual:** Show the real badge and stars. Open My badges. Reload and show the saved result. Let the interface’s own celebration lead; avoid adding fake points or streak counters.

**Overlay:** “Effort stars, not mastery scores”

**Narration:** “The learner earns a discovery badge and effort stars for explaining, applying, and revising. These rewards recognize the learning process; they are not mastery scores. The anonymous notebook keeps the badge when the learner returns in the same browser.”

### 2:12–2:32 — Implementation and honest boundaries

**Visual:** Show Grown-ups, then a clean editorial diagram: “React game → Validated server → Vercel AI Gateway,” with a separate “D1 notebook” branch from the server. Label this diagram as architecture, not a product screen. Keys stay off-screen. A small “Next” strip lists curriculum review, model evaluation, and privacy work.

**Overlay:** “Working MVP · supervised demo”

**Narration:** “Behind the game are a React interface, validated server routes, structured feedback, and a D1 notebook. Raw explanations are not stored in the app database. This is a supervised MVP. Next come broader model testing, educator review, and the privacy work needed before use with real children.”

### 2:32–2:40 — Finish

**Visual:** Return to the island and Pip. Hold a readable end card for the final five seconds. Include the exact live URL as selectable text in the accompanying video description. A QR code is optional only if generated from and tested against the exact URL.

**Overlay:** “Teachback Lab” / “Learn it. Explain it. Discover it.” / “Try the live demo”

**Narration:** “Teachback Lab turns explaining into an adventure. Teach a little robot. Discover a big idea.”

## Accuracy and final quality checks

- Total runtime 150–175 seconds, never over 180. Adjust pauses and transitions before cutting core evidence.
- At least two-thirds of the video should show real gameplay or actual saved progress, not decorative animation.
- Verify all displayed button names, lesson wording, and feedback against recordings. Preserve the actual mode badge.
- Do not claim improved grades, measured learning gains, validated mastery, comprehensive privacy protection, regulatory compliance, or full contest-license clearance.
- Do not show a terminal running mock tests as proof of real AI. Successful live feedback must come from the actual app and active provider.
- Do not expose `.env`, API keys, account dashboards, payment data, notebook cookies, internal credentials, or private repository access tokens.
- Avoid real children or stock classroom footage that could imply a user study. If a hand cursor appears, make it a simple screen pointer.
- For architecture, distinguish implemented functions from roadmap items. Do not include multi-agent tutoring, retrieval from textbooks, voice input, or teacher analytics.
- Include a small, readable end-credit line: “Built with generative-AI assistance; original Pip and island artwork generated with AI.” Add fuller disclosures in the submission form, not as tiny unreadable video text.
- Deliver final MP4, accurate SRT subtitles, the final narration transcript, an editable project/timeline if available, and one cover image made from a real app frame.
- Provide a final note identifying whether the video demonstrates real AI or authored practice feedback, and flag any scene that lacked actual source footage.
