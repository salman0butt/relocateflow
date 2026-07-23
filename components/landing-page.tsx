"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  Check,
  ChevronRight,
  FileCheck2,
  Globe2,
  MapPin,
  Menu,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
  WalletCards,
  X,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";

const destinations = [
  {
    city: "Berlin",
    country: "Germany",
    match: "94% match",
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80",
  },
  {
    city: "Amsterdam",
    country: "Netherlands",
    match: "88% match",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1200&q=80",
  },
  {
    city: "Lisbon",
    country: "Portugal",
    match: "82% match",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80",
  },
];

const features = [
  { icon: Sparkles, title: "A plan that fits you", text: "Answer a few thoughtful questions and receive a relocation roadmap shaped around your career, family, budget and timeline." },
  { icon: CalendarDays, title: "Every deadline, visible", text: "Turn a complicated move into a calm, visual timeline with milestones, dependencies and timely reminders." },
  { icon: WalletCards, title: "Know the real cost", text: "Model deposits, visa fees, flights and living costs before committing to your destination." },
  { icon: FileCheck2, title: "Documents under control", text: "Track what is ready, missing, expiring or awaiting translation in one beautifully organized vault." },
  { icon: BarChart3, title: "Compare cities clearly", text: "Balance salary, rent, job demand, transport and lifestyle without jumping between dozens of tabs." },
  { icon: MessageCircleMore, title: "Guidance in context", text: "Get plain-language answers connected to your personal plan, not generic relocation advice." },
];

export function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="landing-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Logo />
          <nav className={mobileOpen ? "main-nav open" : "main-nav"} aria-label="Main navigation">
            <a href="#how-it-works">How it works</a>
            <a href="#destinations">Destinations</a>
            <a href="#features">Features</a>
            <a href="#stories">Stories</a>
            <Link className="nav-login" href="/dashboard">View demo</Link>
            <Link className="button button-sm button-dark mobile-cta" href="/plan">Build my plan <ArrowRight size={16} /></Link>
          </nav>
          <div className="header-actions">
            <Link className="nav-login desktop-only" href="/dashboard">View demo</Link>
            <Link className="button button-sm button-dark desktop-only" href="/plan">Build my plan <ArrowRight size={16} /></Link>
            <button className="menu-button" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle navigation">
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span><Sparkles size={14} /></span> Relocation, finally made personal</div>
            <h1>Your next chapter,<br /><em>beautifully mapped.</em></h1>
            <p className="hero-lead">From visa paperwork to your first morning in a new city, RelocateFlow turns every moving part into one calm, personalized plan.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/plan">Create my free plan <ArrowRight size={18} /></Link>
              <Link className="text-link" href="/dashboard"><span className="play-dot">▶</span> Explore the live demo</Link>
            </div>
            <div className="trust-row">
              <div className="avatar-stack"><span>MK</span><span>AS</span><span>JR</span><span>+2k</span></div>
              <div><div className="stars">★★★★★</div><p>Trusted by professionals moving across Europe</p></div>
            </div>
          </div>

          <div className="hero-product-wrap" aria-label="RelocateFlow product preview">
            <div className="floating-note note-one"><span><BadgeCheck size={17} /></span><div><strong>Visa pathway found</strong><small>EU Blue Card · 91% fit</small></div></div>
            <div className="floating-note note-two"><span><Check size={17} /></span><div><strong>3 tasks completed</strong><small>You are ahead this week</small></div></div>
            <div className="product-window">
              <div className="product-topbar">
                <div className="mini-brand"><span><Globe2 size={14} /></span> RelocateFlow</div>
                <div className="window-tools"><span /><span /><div className="tiny-avatar">AM</div></div>
              </div>
              <div className="product-body">
                <aside className="preview-sidebar">
                  <span className="preview-nav active" /><span className="preview-nav" /><span className="preview-nav" /><span className="preview-nav" />
                </aside>
                <div className="preview-main">
                  <div className="preview-welcome"><div><small>GOOD MORNING, ALEX</small><h3>Your Berlin move</h3></div><span>87 days to go</span></div>
                  <div className="preview-grid">
                    <article className="readiness-card">
                      <div className="card-label"><span>Relocation readiness</span><span className="positive">+8%</span></div>
                      <div className="readiness-content">
                        <div className="score-ring"><div><strong>72</strong><small>/100</small></div></div>
                        <div className="score-copy"><strong>Looking great</strong><p>Complete 2 priority tasks to reach the next milestone.</p><div className="mini-progress"><i /></div></div>
                      </div>
                    </article>
                    <article className="budget-card"><div className="card-label"><span>Move budget</span><WalletCards size={16} /></div><strong>€4,120 <small>of €9,800</small></strong><div className="budget-bars"><i /><i /><i /><i /></div><p><span /> Visa & legal <b>€1,250</b></p><p><span /> Housing <b>€3,850</b></p></article>
                  </div>
                  <article className="preview-tasks"><div className="card-label"><span>Next steps</span><a>View plan</a></div>{["Book visa appointment", "Compare health insurance", "Prepare blocked account"].map((task, index) => <div className="preview-task" key={task}><span className={index === 0 ? "task-check checked" : "task-check"}>{index === 0 && <Check size={11} />}</span><div><strong>{task}</strong><small>{index === 0 ? "Due today" : index === 1 ? "Due Aug 02" : "Due Aug 08"}</small></div><ChevronRight size={15} /></div>)}</article>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container proof-strip"><span>Built for ambitious moves to</span><div><b>🇩🇪 Germany</b><b>🇳🇱 Netherlands</b><b>🇵🇹 Portugal</b><b>🇸🇪 Sweden</b><b>🇫🇷 France</b></div></div>
      </section>

      <section className="section how-section" id="how-it-works">
        <div className="container">
          <div className="section-heading centered"><span className="section-kicker">A calmer way to move</span><h2>Clarity from the first question<br />to your first day there.</h2><p>RelocateFlow turns uncertainty into a simple, guided experience that always shows what matters next.</p></div>
          <div className="steps-grid">
            <article><span className="step-number">01</span><div className="step-icon"><MessageCircleMore /></div><h3>Tell us about your move</h3><p>Your career, priorities, family, budget and ideal timeline — captured in a five-minute conversation.</p></article>
            <article><span className="step-number">02</span><div className="step-icon"><MapPin /></div><h3>Meet your personal roadmap</h3><p>See a tailored pathway, destination score and every task organized in the right order.</p></article>
            <article><span className="step-number">03</span><div className="step-icon"><BadgeCheck /></div><h3>Move forward with confidence</h3><p>Track progress, compare decisions and arrive knowing the important details are handled.</p></article>
          </div>
        </div>
      </section>

      <section className="section destinations-section" id="destinations">
        <div className="container">
          <div className="section-heading heading-row"><div><span className="section-kicker">Find your place</span><h2>Where opportunity<br />meets quality of life.</h2></div><p>Compare the cities that fit your career and the life you want — with practical numbers, not guesswork.</p></div>
          <div className="destination-grid">{destinations.map((destination, index) => <article className="destination-card" key={destination.city} style={{ backgroundImage: `linear-gradient(180deg, transparent 20%, rgba(9,18,31,.82) 100%), url(${destination.image})` }}><div className="destination-index">0{index + 1}</div><div><span className="match-pill"><Sparkles size={13} /> {destination.match}</span><h3>{destination.city}</h3><p><MapPin size={14} /> {destination.country}</p></div><button aria-label={`Explore ${destination.city}`}><ArrowRight /></button></article>)}</div>
        </div>
      </section>

      <section className="section features-section" id="features">
        <div className="container">
          <div className="section-heading centered"><span className="section-kicker">Everything in one place</span><h2>Complex move.<br /><em>Remarkably simple experience.</em></h2></div>
          <div className="feature-grid">{features.map(({ icon: Icon, title, text }) => <article key={title}><span className="feature-icon"><Icon /></span><h3>{title}</h3><p>{text}</p><a href="#how-it-works">Learn more <ArrowRight size={15} /></a></article>)}</div>
        </div>
      </section>

      <section className="story-section" id="stories">
        <div className="container story-grid">
          <div className="story-photo"><div className="story-badge"><ShieldCheck /><div><strong>Move completed</strong><span>Amsterdam · May 2026</span></div></div></div>
          <div className="story-copy"><span className="section-kicker">A move that felt manageable</span><blockquote>“Instead of twenty open tabs and a notes app full of anxiety, I had one plan that told me exactly what to do next.”</blockquote><div className="story-author"><div className="author-avatar">SN</div><div><strong>Sofia N.</strong><span>Product Manager · Pakistan → Netherlands</span></div></div><div className="story-stats"><div><strong>6 weeks</strong><span>saved in planning</span></div><div><strong>100%</strong><span>documents ready</span></div><div><strong>€1,800</strong><span>under budget</span></div></div></div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container cta-card"><div className="cta-glow" /><span className="eyebrow dark"><Sparkles size={14} /> Your next chapter is waiting</span><h2>Make your move feel<br /><em>possible.</em></h2><p>Create a personal relocation plan in minutes. No credit card. No overwhelm.</p><Link className="button button-light" href="/plan">Start planning for free <ArrowRight size={18} /></Link><small><Check size={14} /> Free personalized roadmap <Check size={14} /> Takes about 5 minutes</small></div>
      </section>

      <footer className="site-footer"><div className="container footer-grid"><div><Logo /><p>Thoughtful tools for life-changing moves.</p></div><div><strong>Product</strong><a href="#features">Features</a><a href="#destinations">Destinations</a><Link href="/dashboard">Live demo</Link></div><div><strong>Resources</strong><a href="#how-it-works">How it works</a><a href="#stories">Stories</a><a href="#">Relocation guide</a></div><div><strong>Company</strong><a href="#">About</a><a href="#">Careers</a><a href="#">Contact</a></div></div><div className="container footer-bottom"><span>© 2026 RelocateFlow. Portfolio concept by Salman Butt.</span><div><a href="#">Privacy</a><a href="#">Terms</a></div></div></footer>
    </main>
  );
}
