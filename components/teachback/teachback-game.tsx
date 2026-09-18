"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  Star,
  Compass,
  Sparkles,
  BookOpen,
  ShieldCheck,
  RefreshCw,
  Check,
} from "lucide-react";
import { missions } from "@/features/teachback/missions";
import { useNotebook, api } from "@/features/teachback/use-notebook";
import { MissionPlay } from "./mission-play";
export function TeachbackGame() {
  const [tab, T] = useState("explore"),
    [selected, S] = useState(missions[0]),
    [playing, P] = useState(false),
    [run, R] = useState(0),
    [resetError, E] = useState(""),
    [resetBusy, B] = useState(false);
  const notebook = useNotebook();
  const totalStars = notebook.progress.reduce((n, p) => n + p.stars, 0);
  const completed = new Set(notebook.progress.map((p) => p.missionId));
  function start(mission = selected) {
    S(mission);
    P(true);
    R((r) => r + 1);
    T("explore");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function reset() {
    B(true);
    E("");
    try {
      await api("/api/progress", undefined, "DELETE");
      await notebook.reload();
      P(false);
    } catch (e) {
      E(e instanceof Error ? e.message : "Please try again.");
    } finally {
      B(false);
    }
  }
  return (
    <main className="game-shell">
      <Tabs
        value={tab}
        onValueChange={(value) => {
          T(value);
          if ("speechSynthesis" in window) speechSynthesis.cancel();
        }}
      >
        <header className="game-header">
          <a className="game-brand" href="/" aria-label="Teachback Lab home">
            <span className="brand-icon">
              <Sparkles />
            </span>
            Teachback<span>Lab</span>
          </a>
          <TabsList className="main-nav" aria-label="Main navigation">
            <TabsTrigger value="explore">
              <Compass size={18} />
              Explore
            </TabsTrigger>
            <TabsTrigger value="badges">
              <Star size={18} />
              My badges
            </TabsTrigger>
            <TabsTrigger value="grownups">
              <ShieldCheck size={18} />
              Grown-ups
            </TabsTrigger>
          </TabsList>
          <span className="learner-chip">
            <Star size={17} fill="currentColor" />
            {totalStars} stars
          </span>
        </header>
        <div className="game-content">
          {notebook.error && (
            <div className="notebook-error" role="alert">
              <p>{notebook.error}</p>
              <Button variant="outline" onClick={() => void notebook.reload()}>
                <RefreshCw size={16} />
                Try again
              </Button>
            </div>
          )}
          <TabsContent value="explore" forceMount>
            {playing ? (
              <MissionPlay
                key={selected.id + "-" + run}
                mission={selected}
                available={!notebook.loading && !notebook.error}
                onExit={() => {
                  P(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onComplete={notebook.reload}
                onNext={() =>
                  start(
                    missions[
                      (missions.findIndex((m) => m.id === selected.id) + 1) %
                        missions.length
                    ],
                  )
                }
              />
            ) : (
              <>
                <div className="welcome">
                  <div>
                    <p className="eyebrow">
                      BIG IDEAS START WITH LITTLE QUESTIONS
                    </p>
                    <h1>
                      A little teaching.
                      <br />
                      <span>A big adventure.</span>
                    </h1>
                    <p>
                      Meet Pip! Your curious robot friend has a lot to learn.{" "}
                      <br />
                      Can you help explain how the world works?
                    </p>
                  </div>
                  <img
                    src="/images/pip.png"
                    alt="Pip, a friendly mint-green robot, waving"
                    className="welcome-pip"
                  />
                </div>
                <div className="adventure-grid">
                  <section className="island-scene">
                    <img
                      src="/images/science-island.png"
                      alt="A colorful science island with a waterfall, garden, windmill, and glowing bulb"
                      fetchPriority="high"
                    />
                    <div className="island-label">
                      YOUR WORLD OF WONDER <b>Discovery Island</b>
                    </div>
                    <span className="scene-sticker">
                      6 little mysteries.
                      <br />
                      So much to discover!
                    </span>
                    <Button
                      className="island-cta"
                      onClick={() => start()}
                      disabled={notebook.loading}
                    >
                      Play with Pip
                      <ArrowRight />
                    </Button>
                  </section>
                  <section className="mission-feature">
                    <span className="eyebrow">
                      {completed.has(selected.id)
                        ? "EXPLORE IT AGAIN"
                        : "YOUR NEXT MISSION"}
                    </span>
                    <div className={"topic-icon " + selected.color}>
                      {selected.emoji}
                    </div>
                    <span className="world-name">{selected.world}</span>
                    <h2>{selected.title}</h2>
                    <p>{selected.question}</p>
                    <div className="mission-meta">
                      <span>
                        <BookOpen size={16} />
                        Learn by teaching
                      </span>
                      <span>5–8 min</span>
                    </div>
                    <Button onClick={() => start()} disabled={notebook.loading}>
                      {notebook.loading
                        ? "Opening your notebook…"
                        : "Let’s explore"}
                      <ArrowRight />
                    </Button>
                    <span className="tiny-note">No timer. Take your time.</span>
                  </section>
                </div>
                <div className="island-progress">
                  <span>
                    <Star size={19} fill="#ffc94f" />
                    {completed.size} of 6 discoveries
                  </span>
                  <Progress
                    value={(completed.size / 6) * 100}
                    aria-label="Completed discoveries"
                  />
                  <span>{totalStars}/18 effort stars</span>
                </div>
                <div className="section-heading">
                  <h2>Pick your next discovery</h2>
                  <span>Every question is a good place to start.</span>
                </div>
                <div className="mission-grid">
                  {missions.map((m) => (
                    <button
                      key={m.id}
                      className={
                        "mission-card " + (m.id === selected.id ? "active" : "")
                      }
                      onClick={() => start(m)}
                    >
                      <span className={"topic-icon " + m.color}>{m.emoji}</span>
                      <div>
                        <span className="world-name">{m.world}</span>
                        <h3>{m.title}</h3>
                        <p>
                          {completed.has(m.id)
                            ? "Badge earned · Play again"
                            : "Teach Pip something new"}
                        </p>
                      </div>
                      {completed.has(m.id) ? (
                        <Check size={19} />
                      ) : (
                        <ArrowRight size={19} />
                      )}
                    </button>
                  ))}
                </div>
                <div className="how-to-play">
                  <span className="how-icon">
                    <Sparkles size={27} />
                  </span>
                  <div>
                    <h3>When you teach, your brain grows ideas.</h3>
                    <p>
                      Explore a mystery. Explain it to Pip. Try a new challenge.
                    </p>
                  </div>
                  <span className="mode-tag">
                    {notebook.mode === "ai"
                      ? "AI coach on"
                      : "Practice adventure"}
                  </span>
                </div>
              </>
            )}
          </TabsContent>
          <TabsContent value="badges">
            <div className="badge-heading">
              <p className="eyebrow">YOUR LITTLE BOOK OF BIG DISCOVERIES</p>
              <h1>Look what you’ve explored!</h1>
              <p>Every badge tells the story of an idea you shared with Pip.</p>
              <div className="badge-summary">
                <span>
                  <Star fill="#ffc94f" />
                  {totalStars} effort stars
                </span>
                <span>{completed.size} discovery badges</span>
              </div>
            </div>
            <div className="badges-grid">
              {missions.map((m) => {
                const saved = notebook.progress.find(
                  (p) => p.missionId === m.id,
                );
                return (
                  <section
                    key={m.id}
                    className={
                      "badge-card " + (saved ? "unlocked" : "not-earned")
                    }
                  >
                    <div className={"badge-medallion " + m.color}>
                      {m.emoji}
                    </div>
                    <h2>{m.title}</h2>
                    <p>
                      {saved
                        ? "Discovery completed!"
                        : "A new adventure is waiting."}
                    </p>
                    <div
                      className="mini-stars"
                      aria-label={
                        saved ? `${saved.stars} stars earned` : "Not yet earned"
                      }
                    >
                      {[1, 2, 3].map((i) => (
                        <Star
                          key={i}
                          size={20}
                          fill={saved && i <= saved.stars ? "#ffc94f" : "none"}
                          color={
                            saved && i <= saved.stars ? "#cc9626" : "#b9cad4"
                          }
                        />
                      ))}
                    </div>
                    <Button variant="outline" onClick={() => start(m)}>
                      {saved ? "Explore again" : "Start this mission"}
                      <ArrowRight size={16} />
                    </Button>
                  </section>
                );
              })}
            </div>
            <p className="center-note">
              Stars celebrate explaining, trying a new situation, and
              revising—not a test score.
            </p>
          </TabsContent>
          <TabsContent value="grownups">
            <div className="badge-heading">
              <p className="eyebrow">A LITTLE CONTEXT FOR THE GROWN-UPS</p>
              <h1>Big learning. Small steps.</h1>
              <p>
                Teachback Lab is a guided learning-by-teaching adventure for
                elementary learners.
              </p>
            </div>
            <div className="grownup-grid">
              <section className="lesson-panel">
                <h2>How to play together</h2>
                <ol className="grownup-list">
                  <li>
                    Choose a mission and read or listen to the discovery notes.
                  </li>
                  <li>
                    Let your child explain the idea to Pip in their own words.
                    Younger children can dictate to a grown-up.
                  </li>
                  <li>
                    Use Pip’s prompt to ask “why?” or “can you give an example?”
                  </li>
                  <li>
                    Revise the explanation, then try the transfer question.
                  </li>
                </ol>
                <h3>What the stars mean</h3>
                <p>
                  One for sharing an explanation, one for solving a new
                  situation, and one for revising. They reward learning actions
                  and are not a validated measure of mastery.
                </p>
              </section>
              <section className="lesson-panel">
                <h2>Notebook & feedback</h2>
                <p>
                  <b>Feedback mode:</b>{" "}
                  {notebook.mode === "ai"
                    ? "Live AI coach enabled. Explanations are sent to the configured AI provider."
                    : "Practice mode. Prepared prompts work without sending explanations to an AI provider."}
                </p>
                <p>
                  Badges are saved on the server and linked to an anonymous
                  cookie in this browser. There are no child names, emails,
                  voice recordings, or classroom accounts.
                </p>
                <p>
                  Explanations are processed to provide feedback but are not
                  stored in the app database. Clear the notebook below to delete
                  this browser’s saved progress and attempt records.
                </p>
                <p>
                  AI feedback can be wrong. Review it with a grown-up. This
                  version is intended for supervised demos and testing before a
                  real classroom rollout.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={resetBusy || notebook.loading}
                    >
                      {resetBusy ? "Clearing…" : "Clear this notebook"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Start a fresh notebook?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This deletes the saved badges, stars, and attempt
                        records linked to this browser. You can explore every
                        mission again.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep my notebook</AlertDialogCancel>
                      <AlertDialogAction onClick={() => void reset()}>
                        Clear notebook
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                {resetError && (
                  <p role="alert" className="error-box">
                    {resetError}
                  </p>
                )}
              </section>
            </div>
          </TabsContent>
        </div>
      </Tabs>
      <footer>
        Made for curious minds. Powered by your explanations.{" "}
        <span>Teachback Lab · Supervised learning adventure</span>
      </footer>
    </main>
  );
}
