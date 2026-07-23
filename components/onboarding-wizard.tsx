"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Compass,
  HeartHandshake,
  Home,
  Languages,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";
import { Logo } from "./logo";

type Answers = {
  destination: string;
  profession: string;
  experience: string;
  moveType: string;
  priorities: string[];
  budget: string;
  timeline: string;
};

const destinationOptions = [
  { value: "Germany", city: "Berlin", flag: "🇩🇪", note: "Strong tech market · EU Blue Card" },
  { value: "Netherlands", city: "Amsterdam", flag: "🇳🇱", note: "English-friendly · Innovative economy" },
  { value: "Portugal", city: "Lisbon", flag: "🇵🇹", note: "Warm lifestyle · Growing startup scene" },
  { value: "Sweden", city: "Stockholm", flag: "🇸🇪", note: "Family-friendly · Excellent work-life balance" },
];

const priorities = [
  { value: "Career growth", icon: BriefcaseBusiness },
  { value: "Affordable living", icon: WalletCards },
  { value: "Family wellbeing", icon: HeartHandshake },
  { value: "Safety", icon: ShieldCheck },
  { value: "Housing", icon: Home },
  { value: "English-friendly", icon: Languages },
];

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    destination: "Germany",
    profession: "Senior Frontend Engineer",
    experience: "6–10 years",
    moveType: "Just me",
    priorities: ["Career growth", "Safety", "English-friendly"],
    budget: "€8,000–€12,000",
    timeline: "3–6 months",
  });

  const completion = ((step + 1) / 5) * 100;
  const selectedDestination = useMemo(() => destinationOptions.find((item) => item.value === answers.destination), [answers.destination]);

  const togglePriority = (priority: string) => {
    setAnswers((current) => ({
      ...current,
      priorities: current.priorities.includes(priority)
        ? current.priorities.filter((item) => item !== priority)
        : [...current.priorities, priority].slice(-4),
    }));
  };

  const continueFlow = () => {
    if (step < 4) {
      setStep((current) => current + 1);
      return;
    }
    window.localStorage.setItem("relocateflow-profile", JSON.stringify(answers));
    router.push("/dashboard");
  };

  return (
    <main className="onboarding-shell">
      <header className="onboarding-header">
        <Logo />
        <div className="onboarding-progress-wrap">
          <span>Step {step + 1} of 5</span>
          <div className="onboarding-progress"><i style={{ width: `${completion}%` }} /></div>
        </div>
        <button className="save-exit" onClick={() => router.push("/")}>Save & exit</button>
      </header>

      <div className="onboarding-layout">
        <section className="question-panel">
          <div className="question-content" key={step}>
            {step === 0 && (
              <>
                <div className="question-icon"><Compass /></div>
                <span className="question-kicker">Your destination</span>
                <h1>Where are you thinking<br />of building your next chapter?</h1>
                <p>Choose the country at the top of your list. You can compare alternatives later.</p>
                <div className="destination-options">{destinationOptions.map((option) => <button key={option.value} className={answers.destination === option.value ? "option-card selected" : "option-card"} onClick={() => setAnswers({ ...answers, destination: option.value })}><span className="flag-tile">{option.flag}</span><span><strong>{option.city}</strong><small>{option.note}</small></span><span className="radio-dot">{answers.destination === option.value && <i />}</span></button>)}</div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="question-icon"><BriefcaseBusiness /></div>
                <span className="question-kicker">Your professional profile</span>
                <h1>What expertise are you<br />bringing with you?</h1>
                <p>This helps us shape your visa pathway, salary expectations and best-fit cities.</p>
                <div className="form-stack">
                  <label>Current or target role<div className="input-wrap"><BriefcaseBusiness size={19} /><input value={answers.profession} onChange={(event) => setAnswers({ ...answers, profession: event.target.value })} /></div></label>
                  <label>Years of professional experience<div className="input-wrap"><Clock3 size={19} /><select value={answers.experience} onChange={(event) => setAnswers({ ...answers, experience: event.target.value })}><option>0–2 years</option><option>3–5 years</option><option>6–10 years</option><option>10+ years</option></select><ChevronDown size={18} /></div></label>
                </div>
                <div className="insight-card"><Sparkles /><div><strong>Strong pathway signal</strong><p>Experienced technology professionals are commonly eligible for skilled-worker and EU Blue Card routes.</p></div></div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="question-icon"><Users /></div>
                <span className="question-kicker">Your moving setup</span>
                <h1>Who is making this<br />move with you?</h1>
                <p>We will include the right housing, insurance, schooling and document steps.</p>
                <div className="large-choice-grid">
                  {[{ value: "Just me", icon: Plane, note: "A focused plan for one" }, { value: "With my partner", icon: HeartHandshake, note: "A shared relocation plan" }, { value: "With family", icon: Users, note: "Including children or dependants" }].map(({ value, icon: Icon, note }) => <button key={value} className={answers.moveType === value ? "large-choice selected" : "large-choice"} onClick={() => setAnswers({ ...answers, moveType: value })}><span><Icon /></span><strong>{value}</strong><small>{note}</small>{answers.moveType === value && <b><Check size={13} /></b>}</button>)}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="question-icon"><Sparkles /></div>
                <span className="question-kicker">What matters most</span>
                <h1>What would make this move<br />feel right for you?</h1>
                <p>Select up to four priorities. We will use these to calculate your destination match.</p>
                <div className="priority-grid">{priorities.map(({ value, icon: Icon }) => <button key={value} className={answers.priorities.includes(value) ? "priority-option selected" : "priority-option"} onClick={() => togglePriority(value)}><Icon /><span>{value}</span><span className="check-square">{answers.priorities.includes(value) && <Check size={13} />}</span></button>)}</div>
                <span className="selection-count">{answers.priorities.length} of 4 selected</span>
              </>
            )}

            {step === 4 && (
              <>
                <div className="question-icon"><CalendarDays /></div>
                <span className="question-kicker">Budget and timing</span>
                <h1>Let’s make your plan<br />realistic from day one.</h1>
                <p>Rough estimates are perfect. You will be able to adjust both later.</p>
                <div className="form-stack two-column">
                  <label>Relocation budget<div className="input-wrap"><CircleDollarSign size={19} /><select value={answers.budget} onChange={(event) => setAnswers({ ...answers, budget: event.target.value })}><option>Under €5,000</option><option>€5,000–€8,000</option><option>€8,000–€12,000</option><option>€12,000+</option></select><ChevronDown size={18} /></div></label>
                  <label>Ideal move timeline<div className="input-wrap"><CalendarDays size={19} /><select value={answers.timeline} onChange={(event) => setAnswers({ ...answers, timeline: event.target.value })}><option>Within 3 months</option><option>3–6 months</option><option>6–12 months</option><option>Just exploring</option></select><ChevronDown size={18} /></div></label>
                </div>
                <div className="ready-card"><div className="ready-orbit"><Check /></div><div><strong>Your first roadmap is ready to generate</strong><p>We found a strong initial match for {selectedDestination?.city}, with a plan shaped around {answers.priorities.slice(0, 2).join(" and ").toLowerCase()}.</p></div></div>
              </>
            )}
          </div>

          <div className="wizard-actions">
            <button className="button-back" onClick={() => step === 0 ? router.push("/") : setStep((current) => current - 1)}><ArrowLeft size={18} /> Back</button>
            <button className="button button-primary" onClick={continueFlow}>{step === 4 ? "Generate my roadmap" : "Continue"} <ArrowRight size={18} /></button>
          </div>
        </section>

        <aside className="plan-preview-panel">
          <div className="preview-map-glow" />
          <div className="plan-preview-top"><span className="live-pill"><i /> YOUR PLAN, TAKING SHAPE</span><span>{Math.round(completion)}%</span></div>
          <div className="route-visual">
            <div className="route-point origin"><span>PK</span><small>Current home</small><strong>Pakistan</strong></div>
            <div className="flight-path"><i /><Plane size={20} /></div>
            <div className="route-point destination"><span>{selectedDestination?.flag}</span><small>Destination</small><strong>{selectedDestination?.city}</strong></div>
          </div>
          <div className="preview-summary-card">
            <div><span><MapPin /></span><p>Destination<strong>{selectedDestination?.city}, {answers.destination}</strong></p></div>
            <div><span><BriefcaseBusiness /></span><p>Professional profile<strong>{answers.profession || "Not added yet"}</strong></p></div>
            <div><span><Users /></span><p>Moving setup<strong>{answers.moveType}</strong></p></div>
            <div><span><CalendarDays /></span><p>Target timeline<strong>{answers.timeline}</strong></p></div>
          </div>
          <div className="personalization-note"><Sparkles /><p><strong>Personalization active</strong>Your choices are shaping visa, city, budget and timeline recommendations in real time.</p></div>
          <div className="secure-note"><ShieldCheck size={16} /> Your information stays private and is only stored in this browser demo.</div>
        </aside>
      </div>
    </main>
  );
}
