"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lightbulb,
  Volume2,
  Star,
  RotateCcw,
  LoaderCircle,
} from "lucide-react";
import type { Feedback, Mission } from "@/features/teachback/missions";
import { api } from "@/features/teachback/use-notebook";
export function ReadButton({ text }: { text: string }) {
  const [supported, S] = useState(false);
  useEffect(() => {
    S("speechSynthesis" in window);
    return () => {
      if ("speechSynthesis" in window) speechSynthesis.cancel();
    };
  }, []);
  return supported ? (
    <Button
      variant="ghost"
      className="read-button"
      onClick={() => {
        speechSynthesis.cancel();
        const voice = new SpeechSynthesisUtterance(text);
        voice.rate = 0.85;
        voice.lang = "en-US";
        speechSynthesis.speak(voice);
      }}
    >
      <Volume2 size={17} />
      Read to me
    </Button>
  ) : null;
}
export function MissionPlay({
  mission,
  onExit,
  onComplete,
  onNext,
  available,
}: {
  mission: Mission;
  onExit: () => void;
  onComplete: () => Promise<void>;
  onNext: () => void;
  available: boolean;
}) {
  const [stage, S] = useState<"learn" | "teach" | "check" | "done">("learn"),
    [draft, D] = useState(""),
    [feedback, F] = useState<Feedback | null>(null),
    [attempt, A] = useState(""),
    [revisions, V] = useState(0),
    [busy, B] = useState(false),
    [error, E] = useState(""),
    [hint, H] = useState(false),
    [choice, C] = useState<number | null>(null),
    [checkMessage, M] = useState(""),
    [stars, T] = useState(0);
  const step = stage === "learn" ? 0 : stage === "teach" ? 1 : 2;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if ("speechSynthesis" in window) speechSynthesis.cancel();
  }, [stage]);
  async function teach() {
    E("");
    B(true);
    try {
      const result = await api<{
        attemptId: string;
        feedback: Feedback;
        revisions: number;
      }>("/api/teachback", {
        missionId: mission.id,
        explanation: draft,
        ...(attempt ? { previousAttemptId: attempt } : {}),
      });
      A(result.attemptId);
      F(result.feedback);
      V(result.revisions);
    } catch (e) {
      E(e instanceof Error ? e.message : "Please try again.");
    } finally {
      B(false);
    }
  }
  async function finish() {
    if (choice === null) return;
    E("");
    B(true);
    try {
      const result = await api<{
        correct: boolean;
        stars?: number;
        explanation: string;
      }>("/api/complete", { attemptId: attempt, answer: choice });
      M(result.explanation);
      if (result.correct) {
        T(result.stars || 2);
        S("done");
        await onComplete();
      }
    } catch (e) {
      E(e instanceof Error ? e.message : "Please try again.");
    } finally {
      B(false);
    }
  }
  return (
    <div className="play-wrap">
      <div className="play-top">
        <Button variant="ghost" onClick={onExit}>
          <ArrowLeft size={17} />
          Back to island
        </Button>
        <span>
          {mission.world} · {mission.title}
        </span>
        <span className="pill-soft">No timer. Just curiosity.</span>
      </div>
      <ol className="journey-steps">
        {["Discover", "Teach Pip", "Try it out"].map((label, i) => (
          <li
            key={label}
            aria-current={i === step ? "step" : undefined}
            className={i <= step ? "reached" : ""}
          >
            <span>{i < step || stage === "done" ? <Check size={16} /> : i + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      <Progress
        value={stage === "done" ? 100 : (step + 1) * 25}
        aria-label="Mission progress"
        className="journey-progress"
      />
      {stage === "learn" && (
        <>
          <div className="mission-title">
            <span className={"topic-icon " + mission.color}>
              {mission.emoji}
            </span>
            <div>
              <p className="eyebrow">A MYSTERY FOR YOUR BRILLIANT BRAIN</p>
              <h1>{mission.title}</h1>
            </div>
          </div>
          <div className="play-columns">
            <section className="lesson-panel">
              <div className="panel-heading">
                <h2>First, let’s explore.</h2>
                <ReadButton
                  text={mission.intro + " " + mission.facts.join(" ")}
                />
              </div>
              <p>{mission.intro}</p>
              <div className="learning-flow" aria-label="How it works">
                {mission.steps.map((x, i) => (
                  <div key={x}>
                    <span>{i + 1}</span>
                    <b>{x}</b>
                    {i < mission.steps.length - 1 && <ArrowRight size={16} />}
                  </div>
                ))}
              </div>
              <div className="lesson-facts">
                {mission.facts.map((fact, i) => (
                  <div key={fact}>
                    <span>{i + 1}</span>
                    <p>{fact}</p>
                  </div>
                ))}
              </div>
              <div className="mission-actions">
                <span>You can come back to these clues.</span>
                <Button onClick={() => S("teach")}>
                  I’m ready to teach Pip
                  <ArrowRight />
                </Button>
              </div>
            </section>
            <aside className="pip-panel">
              <img src="/images/pip.png" alt="Pip is ready to learn from you" />
              <div className="speech-bubble">
                <b>Hey, explorer!</b>
                <p>{mission.question}</p>
              </div>
              <p>
                I don’t need fancy words.
                <br />
                Your ideas are the superpower!
              </p>
            </aside>
          </div>
        </>
      )}
      {stage === "teach" && (
        <>
          <div className="mission-title">
            <span className={"topic-icon " + mission.color}>
              {mission.emoji}
            </span>
            <div>
              <p className="eyebrow">YOUR TURN TO BE THE TEACHER</p>
              <h1>{mission.question}</h1>
            </div>
          </div>
          <div className="play-columns">
            <section className="lesson-panel">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void teach();
                }}
              >
                <div className="panel-heading">
                  <label htmlFor="teach-answer">Explain it to Pip</label>
                  <ReadButton text={mission.question + " " + mission.hint} />
                </div>
                <p>Use your own words. Tell Pip what happens and why.</p>
                <Textarea
                  id="teach-answer"
                  maxLength={1600}
                  value={draft}
                  disabled={busy}
                  onChange={(e) => {
                    D(e.target.value);
                    F(null);
                    E("");
                  }}
                  placeholder={mission.starter}
                  aria-describedby="answer-guidance"
                />
                <div id="answer-guidance" className="answer-guidance">
                  <span>A sentence or two is a great start.</span>
                  <span>{draft.length}/1600</span>
                </div>
                <div className="writing-tools">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => H(!hint)}
                  >
                    <Lightbulb size={17} />
                    {hint ? "Hide clue" : "I need a clue"}
                  </Button>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => S("learn")}
                  >
                    See the discovery notes
                  </Button>
                </div>
                {hint && (
                  <div className="clue-box">
                    {mission.hint}
                    <br />
                    <b>Sentence starter:</b> {mission.starter}
                  </div>
                )}
                <p className="privacy-note">
                  Just your ideas—no names, addresses, or contact details.
                </p>
                <Button
                  type="submit"
                  disabled={draft.trim().length < 20 || busy || !available}
                  className="wide-button"
                >
                  {busy ? (
                    <>
                      <LoaderCircle className="spin" />
                      Pip is thinking…
                    </>
                  ) : (
                    <>
                      Teach Pip
                      <ArrowRight />
                    </>
                  )}
                </Button>
                {!available && (
                  <p role="status">
                    Open your notebook on the island before teaching.
                  </p>
                )}
              </form>
              {error && (
                <p className="error-box" role="alert">
                  {error}
                </p>
              )}
              {feedback && (
                <div className="feedback-card" aria-live="polite">
                  <div className="panel-heading">
                    <h2>Pip’s thinking cap</h2>
                    <span className={"mode-tag " + feedback.mode}>
                      {feedback.mode === "ai"
                        ? "AI feedback"
                        : "Practice guide"}
                    </span>
                  </div>
                  <p>{feedback.notice}</p>
                  <div className="next-idea">
                    <Lightbulb size={19} />
                    <p>{feedback.nextStep}</p>
                  </div>
                  <p className="followup">{feedback.question}</p>
                  {feedback.mode === "practice" && (
                    <p className="mode-explainer">
                      These are prepared learning prompts. Pip isn’t checking
                      your writing with AI right now.
                    </p>
                  )}
                  <ReadButton
                    text={
                      feedback.notice +
                      " " +
                      feedback.nextStep +
                      " " +
                      feedback.question
                    }
                  />
                  <div className="mission-actions">
                    <Button
                      variant="outline"
                      onClick={() => {
                        F(null);
                        document.getElementById("teach-answer")?.focus();
                      }}
                    >
                      <RotateCcw size={16} />
                      Make my idea clearer
                    </Button>
                    <Button
                      onClick={() => {
                        S("check");
                        C(null);
                        M("");
                      }}
                    >
                      Try a new challenge
                      <ArrowRight />
                    </Button>
                  </div>
                  <span className="tiny-note">
                    {revisions
                      ? "You revised your explanation. That’s a learning superpower!"
                      : "Revise your explanation for an extra effort star."}
                  </span>
                </div>
              )}
            </section>
            <aside className="pip-panel">
              <img
                src="/images/pip.png"
                alt="Pip, your curious robot student"
              />
              <div className="speech-bubble">
                <b>I’m all ears!</b>
                <p>Can you give me an example?</p>
              </div>
              <div className="teaching-tips">
                <h3>A great explanation…</h3>
                <p>
                  <Check size={16} />
                  Uses everyday words
                </p>
                <p>
                  <Check size={16} />
                  Explains “because”
                </p>
                <p>
                  <Check size={16} />
                  Tries an example
                </p>
              </div>
            </aside>
          </div>
        </>
      )}
      {stage === "check" && (
        <section className="challenge-panel">
          <span className="challenge-icon">✦</span>
          <p className="eyebrow">A NEW SITUATION. SAME BIG IDEA.</p>
          <h1>Let’s try it out!</h1>
          <p className="challenge-question">{mission.check.question}</p>
          <ReadButton
            text={
              mission.check.question + " " + mission.check.choices.join(". ")
            }
          />
          <div
            className="challenge-choices"
            role="group"
            aria-label="Choose an answer"
          >
            {mission.check.choices.map((x, i) => (
              <Button
                key={x}
                variant="outline"
                aria-pressed={choice === i}
                className={choice === i ? "chosen" : ""}
                disabled={busy}
                onClick={() => {
                  C(i);
                  M("");
                }}
              >
                <span>{String.fromCharCode(65 + i)}</span>
                {x}
                {choice === i && <Check size={18} />}
              </Button>
            ))}
          </div>
          {checkMessage && (
            <p className="clue-box" role="status">
              {checkMessage}
            </p>
          )}
          {error && (
            <p className="error-box" role="alert">
              {error}
            </p>
          )}
          <Button
            disabled={choice === null || busy}
            onClick={() => void finish()}
            className="wide-button"
          >
            {busy ? "Saving your discovery…" : "Check my idea"}
            <ArrowRight />
          </Button>
          <Button variant="ghost" onClick={() => S("teach")}>
            Back to my explanation
          </Button>
        </section>
      )}
      {stage === "done" && (
        <section className="celebration">
          <div className="earned-badge">
            <span>{mission.emoji}</span>
            <b>
              DISCOVERY
              <br />
              EXPLORER
            </b>
          </div>
          <div
            className="reward-stars"
            aria-label={`${stars} effort stars earned`}
          >
            {[1, 2, 3].map((i) => (
              <Star
                key={i}
                size={39}
                fill={i <= stars ? "#ffc94f" : "transparent"}
                color={i <= stars ? "#daa126" : "#cbd6dd"}
              />
            ))}
          </div>
          <p className="eyebrow">YOU HELPED PIP LEARN SOMETHING NEW</p>
          <h1>Look at you, teacher!</h1>
          <p>
            Badge earned: <b>{mission.title}</b>.
          </p>
          <p className="success-explanation">{checkMessage}</p>
          <div className="reward-breakdown">
            <span>
              <Check />
              Shared an explanation
            </span>
            <span>
              <Check />
              Solved a new challenge
            </span>
            <span>
              {stars === 3 ? <Check /> : <Star />}
              {stars === 3
                ? "Made your explanation clearer"
                : "Try a revision next time"}
            </span>
          </div>
          <p className="tiny-note">
            Stars celebrate your learning steps, not a grade.
          </p>
          <div className="mission-actions">
            <Button variant="outline" onClick={onExit}>
              Back to my island
            </Button>
            <Button onClick={onNext}>
              Another discovery
              <ArrowRight />
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
