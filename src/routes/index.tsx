import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowDownRight, ArrowRight, Check, ChevronDown, CircleDot, Download, Mail, Menu, ShieldCheck, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  evaluationDimensions,
  evaluationScenarios,
  getAverageRating,
  type EvaluationDimension,
} from "@/lib/evaluation-scenarios";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Favour Dike — AI Response Evaluator & Content Analyst" },
      { name: "description", content: "A portfolio demonstrating Favour Dike's analytical approach to AI response quality, context, accuracy, and helpfulness." },
      { property: "og:title", content: "Favour Dike — AI Response Evaluator" },
      { property: "og:description", content: "Making AI more accurate, relevant, and genuinely helpful." },
    ],
  }),
  component: Portfolio,
});

const competencies = [
  ["01", "AI response evaluation", "Assessing relevance, accuracy, and usefulness against the actual ask."],
  ["02", "Contextual personalization", "Using personal context only when it is relevant and helpful."],
  ["03", "English language comprehension", "Reading for clarity, nuance, tone, and meaning."],
  ["04", "Critical thinking & reasoning", "Checking logic, assumptions, and internal consistency."],
  ["05", "Accuracy & instruction following", "Verifying details and honoring every stated constraint."],
  ["06", "Quality assurance & feedback", "Turning observations into clear, actionable feedback."],
  ["07", "AI prompt engineering", "Shaping prompts for focused, useful AI-assisted content."],
  ["08", "Research & information analysis", "Working through complex topics and assessing information quality."],
];

const processSteps = ["Understand user intent", "Analyze the response", "Assess quality", "Identify errors", "Provide structured feedback"];

function Portfolio() {
  const [scenarioId, setScenarioId] = useState(evaluationScenarios[0]?.id ?? "intent");
  const [dimension, setDimension] = useState<EvaluationDimension>("Relevance");
  const [responseId, setResponseId] = useState<"A" | "B">("A");
  const [showImproved, setShowImproved] = useState(false);
  const scenario = useMemo(
    () => evaluationScenarios.find((item) => item.id === scenarioId) ?? evaluationScenarios[0],
    [scenarioId],
  );

  if (!scenario) return null;

  const selectedResponse = scenario.responses.find((response) => response.id === responseId) ?? scenario.responses[0];
  const recommendation = scenario.responses.find((response) => response.id === scenario.recommendation);

  function chooseScenario(id: string) {
    setScenarioId(id);
    setResponseId("A");
    setDimension("Relevance");
    setShowImproved(false);
  }

  return (
    <main className="overflow-hidden">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#home" className="flex items-center gap-3" aria-label="Favour Dike home">
            <span className="flex size-9 items-center justify-center rounded-full border border-border font-display text-xl">F</span>
            <span className="text-sm font-semibold">Favour Dike<span className="text-electric">.</span></span>
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#about">About</a>
            <a className="transition-colors hover:text-foreground" href="#competencies">Competencies</a>
            <a className="transition-colors hover:text-foreground" href="#showcase">Evaluation work</a>
            <a className="transition-colors hover:text-foreground" href="#contact">Contact</a>
          </nav>
          <Button asChild variant="outline" size="sm" className="hidden rounded-full sm:inline-flex">
            <a href="/Favour-Dike-CV.pdf" download><Download aria-hidden="true" /> Download CV</a>
          </Button>
          <a aria-label="Go to contact" href="#contact" className="flex size-10 items-center justify-center rounded-full border border-border md:hidden"><Menu size={18} /></a>
        </div>
      </header>

      <section id="home" className="editorial-grid relative scroll-mt-20">
        <div className="mx-auto grid min-h-[690px] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-24">
          <div className="relative z-10 max-w-3xl">
            <p className="eyebrow mb-7 flex items-center gap-2"><span className="size-1.5 rounded-full bg-primary" /> AI response evaluator <span className="text-border">/</span> content analyst</p>
            <h1 className="max-w-3xl text-5xl font-medium leading-[1.08] text-foreground sm:text-6xl lg:text-7xl">I help AI understand context, <span className="font-display text-electric italic">evaluate quality,</span> and deliver better responses.</h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Combining language expertise, analytical thinking, and practical AI experience to assess relevance, accuracy, helpfulness, and contextual personalization.</p>
            <p className="mt-5 font-display text-2xl italic text-foreground sm:text-3xl">“Making AI more accurate, relevant, and genuinely helpful.”</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full px-6"><a href="#showcase">Explore my evaluation work <ArrowDownRight /></a></Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6"><a href="/Favour-Dike-CV.pdf" download>Download CV <Download /></a></Button>
            </div>
            <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-border pt-6 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-electric" /> Fictional, self-directed examples</span>
              <span className="inline-flex items-center gap-2"><CircleDot size={12} className="text-electric" /> Focused on quality and context</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[430px] lg:justify-self-end">
            <div className="absolute -right-3 -top-4 z-10 flex size-[5.5rem] rotate-6 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <span className="font-display text-3xl">5</span><span className="text-[9px] uppercase tracking-wider">quality lenses</span>
            </div>
            <div className="border border-border bg-card p-6 shadow-[0_22px_75px_-42px_oklch(0.3_0.03_255/0.4)] sm:p-8">
              <div className="flex items-center justify-between border-b border-border pb-5">
                <div><p className="eyebrow">Evaluator’s lens</p><h2 className="mt-1 font-display text-3xl">Beyond the answer.</h2></div>
                <Sparkles className="text-electric" size={20} />
              </div>
              <div className="space-y-5 py-6">
                {["Did it answer the real question?", "Is the reasoning sound?", "Was context used with care?", "Can the user act on it?"].map((question, index) => (
                  <div key={question} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-electric-soft text-electric"><Check size={12} strokeWidth={2.5} /></span>
                    <span className="text-sm leading-5">{question}</span>
                    <span className="ml-auto font-mono text-[10px] text-muted-foreground">0{index + 1}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-border pt-5 text-xs">
                <span className="text-muted-foreground">A practical quality standard</span>
                <a href="#showcase" className="inline-flex items-center gap-1 font-semibold text-primary">See it in action <ArrowRight size={13} /></a>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between px-1 text-[10px] uppercase tracking-wider text-muted-foreground"><span>Independent portfolio demonstration</span><span>01 — 03</span></div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-8 sm:px-8 lg:px-12"><a href="#about" className="inline-flex items-center gap-2 text-xs text-muted-foreground"><ArrowDown size={14} /> Scroll to explore</a></div>
      </section>

      <section id="about" className="section-rule scroll-mt-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-12 lg:py-28">
          <div><p className="eyebrow">01 / A little about me</p><h2 className="mt-5 max-w-sm font-display text-5xl leading-tight sm:text-6xl">Curiosity, with a critical eye.</h2></div>
          <div className="max-w-3xl">
            <p className="text-xl leading-8 text-foreground sm:text-2xl sm:leading-9">I’m a writer, AI prompt specialist, and analytical thinker who cares about the difference between an answer that sounds right and one that <span className="font-display text-electric italic">actually helps.</span></p>
            <div className="mt-7 grid gap-7 text-sm leading-7 text-muted-foreground sm:grid-cols-2">
              <p>My work includes researching complex topics, developing AI-assisted content, and examining information quality. I bring close reading, clear communication, and a consistent eye for detail to every task.</p>
              <p>I look for errors, irrelevant information, and assumptions a response cannot support—then explain what should change in practical, objective language.</p>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-border pt-6">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">AI company experience</span>
              <span className="font-semibold tracking-tight text-foreground">micro1<span className="text-electric">.</span></span>
              <span className="text-xs text-muted-foreground">Experience with Micro1</span>
            </div>
          </div>
        </div>
      </section>

      <section id="competencies" className="section-rule scroll-mt-20 bg-secondary/45">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="eyebrow">02 / Core competencies</p><h2 className="mt-4 font-display text-5xl sm:text-6xl">Good judgment, in practice.</h2></div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">A complementary set of language, reasoning, and AI skills—applied with clarity and care.</p>
          </div>
          <div className="mt-14 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {competencies.map(([number, title, description]) => (
              <article key={number} className="group flex min-h-[195px] flex-col border-b border-r border-border bg-background/60 p-5 transition-colors hover:bg-background sm:p-6">
                <span className="font-mono text-[10px] text-primary">{number}</span><h3 className="mt-7 text-base font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="showcase" className="section-rule scroll-mt-16">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div><p className="eyebrow">03 / Evaluation showcase</p><h2 className="mt-4 max-w-xl font-display text-5xl leading-[1.05] sm:text-6xl">Good answers are <span className="text-electric italic">earned.</span></h2></div>
            <p className="max-w-xl pb-1 text-sm leading-6 text-muted-foreground">A closer look at how I compare responses, check context, catch inconsistencies, and give specific, useful feedback. Each scenario below is fictional and self-directed.</p>
          </div>

          <div className="mt-12 overflow-hidden border border-border bg-card shadow-[0_26px_90px_-55px_oklch(0.3_0.03_255/0.45)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/55 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2"><span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground"><Sparkles size={13} /></span><span className="text-xs font-semibold">Response evaluation workspace</span><span className="hidden rounded-full border border-border px-2 py-1 text-[9px] uppercase tracking-wider text-muted-foreground sm:inline-flex">Portfolio demo</span></div>
              <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground"><span className="size-1.5 rounded-full bg-primary" /> Self-directed • Fictional data only</span>
            </div>
            <div className="grid lg:grid-cols-[250px_1fr]">
              <aside className="border-b border-border bg-secondary/25 p-4 sm:p-5 lg:border-b-0 lg:border-r">
                <p className="eyebrow mb-3 px-2">Choose a scenario</p>
                <div className="flex gap-2 overflow-x-auto lg:flex-col">
                  {evaluationScenarios.map((item, index) => (
                    <Button key={item.id} type="button" variant="ghost" onClick={() => chooseScenario(item.id)} aria-pressed={scenario.id === item.id} className={`h-auto min-w-[180px] justify-start gap-3 whitespace-normal rounded-md px-3 py-3 text-left lg:w-full ${scenario.id === item.id ? "bg-background text-foreground shadow-sm ring-1 ring-border" : "text-muted-foreground"}`}>
                      <span className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-[10px] ${scenario.id === item.id ? "border-primary text-primary" : "border-border"}`}>0{index + 1}</span><span><span className="block text-xs font-semibold">{item.title}</span><span className="mt-1 block text-[10px] font-normal text-muted-foreground">{item.category.split(" / ")[1]}</span></span>
                    </Button>
                  ))}
                </div>
                <div className="mt-5 border-t border-border pt-4"><p className="eyebrow">Fictional context</p><p className="mt-2 text-xs leading-5 text-muted-foreground">{scenario.context}</p></div>
                <div className="mt-5 flex items-start gap-2 rounded-md border border-border bg-background p-3 text-[10px] leading-4 text-muted-foreground"><ShieldCheck size={14} className="mt-0.5 shrink-0 text-primary" />No real personal account, Google Photos, or user information is used.</div>
              </aside>

              <div className="min-w-0 p-4 sm:p-6 lg:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div><p className="eyebrow">{scenario.category}</p><h3 className="mt-2 max-w-2xl font-display text-3xl sm:text-4xl">{scenario.title}</h3></div>
                  <div className="border border-border px-3 py-2 text-center"><span className="block font-display text-2xl">{scenario.responses.length}</span><span className="text-[9px] uppercase tracking-wider text-muted-foreground">responses</span></div>
                </div>
                <div className="mt-6 border-l-2 border-primary bg-electric-soft/60 px-4 py-3">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-primary">User request</p><p className="mt-1 text-sm leading-6">“{scenario.prompt}”</p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <p className="eyebrow">Compare responses</p>
                  <span className="text-[10px] text-muted-foreground">Select a response to inspect feedback</span>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {scenario.responses.map((response) => {
                    const isSelected = responseId === response.id;
                    const average = getAverageRating(response.ratings);
                    return (
                      <button type="button" key={response.id} onClick={() => setResponseId(response.id)} aria-pressed={isSelected} className={`min-w-0 border p-4 text-left transition-colors ${isSelected ? "border-primary bg-electric-soft/50 ring-1 ring-primary/20" : "border-border bg-background hover:border-primary/50"}`}>
                        <span className="flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-xs font-semibold"><span className={`flex size-6 items-center justify-center rounded-full border text-[10px] ${isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{response.id}</span>{response.label}</span><span className="font-mono text-xs text-muted-foreground">{average}<span className="text-[9px]"> / 5</span></span></span>
                        <span className="mt-3 block text-xs leading-5 text-muted-foreground">“{response.text}”</span>
                        <span className="mt-4 flex items-center justify-between gap-2 border-t border-border/80 pt-3"><span className="text-[10px] text-muted-foreground">Overall quality</span><span className="score-track w-24"><span className="score-fill block" style={{ width: `${average * 20}%` }} /></span></span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-7 border-t border-border pt-5">
                  <div className="flex flex-wrap items-center justify-between gap-3"><p className="eyebrow">Rating by dimension <span className="font-normal normal-case tracking-normal text-muted-foreground">/ 5</span></p><span className="text-[10px] text-muted-foreground">Select a lens to compare</span></div>
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                    {evaluationDimensions.map((item) => (
                      <Button key={item} type="button" variant={dimension === item ? "default" : "outline"} size="sm" onClick={() => setDimension(item)} aria-pressed={dimension === item} className="shrink-0 rounded-full px-3 text-[10px]">{item}</Button>
                    ))}
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {scenario.responses.map((response) => (
                      <div key={response.id} className="flex items-center gap-3 border border-border/70 px-3 py-2.5">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-[10px]">{response.id}</span><span className="min-w-0 flex-1 truncate text-xs">{response.label}</span><span className="score-track w-16 sm:w-24"><span className="score-fill block" style={{ width: `${response.ratings[dimension] * 20}%` }} /></span><span className="w-7 text-right font-mono text-xs">{response.ratings[dimension]}<span className="text-muted-foreground">/5</span></span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 grid gap-5 border-t border-border pt-5 md:grid-cols-[0.85fr_1.15fr]">
                  <div><p className="eyebrow">Reviewer notes · Response {selectedResponse.id}</p><ul className="mt-3 space-y-2.5">
                    {selectedResponse.findings.map((finding, index) => (
                      <li key={finding} className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"><span className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full ${selectedResponse.id === scenario.recommendation ? "bg-electric-soft text-primary" : "bg-destructive/10 text-destructive"}`}>{selectedResponse.id === scenario.recommendation ? <Check size={10} /> : <X size={10} />}</span><span><span className="mr-1 font-mono text-[9px] text-muted-foreground/70">0{index + 1}</span>{finding}</span></li>
                    ))}
                  </ul></div>
                  <div className="bg-secondary/45 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2"><p className="eyebrow">Structured feedback</p><span className="border border-border bg-background px-2 py-1 text-[9px] uppercase tracking-wider">Prefer {scenario.recommendation}</span></div>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{recommendation?.findings[0]}. {recommendation?.findings[1]}.</p>
                    <Button type="button" variant="link" onClick={() => setShowImproved((show) => !show)} aria-expanded={showImproved} className="mt-2 h-auto gap-1 px-0 text-xs">{showImproved ? "Hide improved response" : "View improved response"}<ChevronDown size={13} className={`transition-transform ${showImproved ? "rotate-180" : ""}`} /></Button>
                    {showImproved && <p className="mt-2 border-l-2 border-primary bg-background px-3 py-2 text-xs leading-5">“{scenario.improved}”</p>}
                  </div>
                </div>
                <p className="mt-6 border-t border-border pt-3 text-[10px] leading-4 text-muted-foreground">Self-directed portfolio demonstration. Scenarios and response samples are fictional; scores illustrate a consistent evaluation framework, not external performance claims.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-rule bg-secondary/45">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-12 lg:py-28">
          <div><p className="eyebrow">04 / Evaluation process</p><h2 className="mt-4 max-w-md font-display text-5xl leading-tight sm:text-6xl">A clear path to a better answer.</h2></div>
          <ol className="grid gap-0 sm:grid-cols-5">
            {processSteps.map((step, index) => (
              <li key={step} className="relative border-t border-border pt-4 sm:mr-3">
                <span className="font-mono text-[10px] text-primary">0{index + 1}</span><h3 className="mt-3 max-w-[150px] text-sm font-semibold leading-5">{step}</h3>{index < processSteps.length - 1 && <ArrowRight aria-hidden="true" size={14} className="absolute right-1 top-4 hidden text-muted-foreground sm:block" />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="contact" className="section-rule scroll-mt-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12 lg:py-28">
          <div><p className="eyebrow">05 / Let’s connect</p><h2 className="mt-4 max-w-3xl font-display text-5xl leading-tight sm:text-7xl">Thoughtful evaluation. <span className="text-electric italic">Better AI.</span></h2><p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">I’d welcome the opportunity to contribute careful judgment, clear writing, and a user-first perspective to AI response evaluation.</p></div>
          <Button asChild size="lg" className="w-fit rounded-full px-6"><a href="mailto:favourdike143@gmail.com"><Mail /> Email Favour <ArrowRight /></a></Button>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span className="font-medium text-foreground">Favour Dike<span className="text-electric">.</span></span><span>AI Response Evaluator · Content Analyst · AI Prompt Specialist</span><a className="inline-flex items-center gap-1 transition-colors hover:text-primary" href="mailto:favourdike143@gmail.com">favourdike143@gmail.com <ArrowRight size={12} /></a>
        </div>
      </footer>
    </main>
  );
}