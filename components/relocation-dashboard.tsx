"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  FileText,
  FolderLock,
  Home,
  LayoutDashboard,
  Map,
  MapPin,
  Menu,
  MessageCircleMore,
  MoreHorizontal,
  Plane,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  Upload,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import { activity, budget, cities, documents, relocationPlan, tasks as initialTasks, timeline } from "@/data/mock-data";
import { Logo } from "./logo";

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "My roadmap", icon: Map },
  { label: "Tasks", icon: CheckCircle2, badge: "7" },
  { label: "Documents", icon: FolderLock, badge: "3" },
  { label: "Budget", icon: WalletCards },
  { label: "Cities", icon: MapPin },
];

export function RelocationDashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Overview");
  const [assistantOpen, setAssistantOpen] = useState(false);

  const completed = useMemo(() => tasks.filter((task) => task.done).length, [tasks]);
  const toggleTask = (id: number) => setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task));

  return (
    <main className="dashboard-shell">
      <aside className={sidebarOpen ? "dashboard-sidebar open" : "dashboard-sidebar"}>
        <div className="sidebar-head"><Logo /><button onClick={() => setSidebarOpen(false)}><X /></button></div>
        <nav className="dashboard-nav">
          <span className="nav-section-label">WORKSPACE</span>
          {navItems.map(({ label, icon: Icon, badge }) => <button key={label} className={activeNav === label ? "active" : ""} onClick={() => setActiveNav(label)}><Icon size={19} /><span>{label}</span>{badge && <b>{badge}</b>}</button>)}
          <span className="nav-section-label second">ACCOUNT</span>
          <button><UserRound size={19} /><span>Profile</span></button><button><Settings size={19} /><span>Settings</span></button>
        </nav>
        <div className="sidebar-upgrade"><span><Sparkles /></span><strong>RelocateFlow Plus</strong><p>Unlock expert reviews and unlimited city comparisons.</p><button>Explore Plus <ArrowRight size={14} /></button></div>
        <div className="sidebar-user"><div className="user-avatar">{relocationPlan.user.initials}</div><div><strong>{relocationPlan.user.name}</strong><span>Free plan</span></div><MoreHorizontal size={18} /></div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-topbar">
          <button className="dashboard-menu" onClick={() => setSidebarOpen(true)}><Menu /></button>
          <div className="topbar-route"><span>MY MOVE</span><strong><span>🇵🇰</span> Pakistan <ArrowRight size={14} /> <span>🇩🇪</span> Berlin</strong></div>
          <div className="topbar-actions"><label><Search size={17} /><input placeholder="Search your plan..." /><kbd>⌘ K</kbd></label><button className="icon-button"><Bell size={19} /><i /></button><button className="topbar-avatar">AM</button></div>
        </header>

        <div className="dashboard-content">
          <div className="dashboard-welcome">
            <div><span className="dashboard-kicker"><Sparkles size={14} /> THURSDAY, 23 JULY</span><h1>Good afternoon, Alex.</h1><p>Your Berlin move is gaining momentum. Here is what deserves your attention today.</p></div>
            <div className="move-countdown"><span><Plane /></span><div><small>MOVE COUNTDOWN</small><strong>{relocationPlan.user.daysLeft} days</strong><p>{relocationPlan.user.moveDate}</p></div><ChevronRight /></div>
          </div>

          <div className="dashboard-stats">
            <article className="readiness-stat featured"><div className="stat-head"><span>Relocation readiness</span><button><MoreHorizontal /></button></div><div className="stat-content"><div className="dashboard-ring"><div><strong>{relocationPlan.readiness}</strong><span>/100</span></div></div><div><span className="trend-positive"><TrendingUp size={13} /> 8% this month</span><h3>You’re on track</h3><p>Two priority actions will move you into the “Visa ready” stage.</p></div></div><div className="readiness-milestones"><span className="complete"><i /><b>Profile</b></span><span className="complete"><i /><b>Documents</b></span><span className="current"><i /><b>Visa ready</b></span><span><i /><b>Move ready</b></span></div></article>
            <article className="mini-stat"><div className="mini-stat-head"><span className="stat-icon lavender"><CheckCircle2 /></span><span className="trend-positive">+3 this week</span></div><strong>{relocationPlan.tasksCompleted}<small> / {relocationPlan.totalTasks}</small></strong><h3>Tasks completed</h3><div className="simple-progress"><i style={{ width: `${(relocationPlan.tasksCompleted / relocationPlan.totalTasks) * 100}%` }} /></div><p>{relocationPlan.totalTasks - relocationPlan.tasksCompleted} actions remaining</p></article>
            <article className="mini-stat"><div className="mini-stat-head"><span className="stat-icon mint"><WalletCards /></span><span className="neutral-tag">42% used</span></div><strong>€{relocationPlan.budgetSpent.toLocaleString()}<small> / €{relocationPlan.budgetTotal.toLocaleString()}</small></strong><h3>Relocation budget</h3><div className="simple-progress mint"><i style={{ width: `${(relocationPlan.budgetSpent / relocationPlan.budgetTotal) * 100}%` }} /></div><p>€{(relocationPlan.budgetTotal - relocationPlan.budgetSpent).toLocaleString()} available</p></article>
            <article className="mini-stat"><div className="mini-stat-head"><span className="stat-icon peach"><FileCheck2 /></span><span className="warning-tag">3 needed</span></div><strong>{relocationPlan.documentsReady}<small> / {relocationPlan.documentsTotal}</small></strong><h3>Documents ready</h3><div className="simple-progress peach"><i style={{ width: `${(relocationPlan.documentsReady / relocationPlan.documentsTotal) * 100}%` }} /></div><p>1 document in review</p></article>
          </div>

          <div className="dashboard-grid-main">
            <article className="dashboard-card priority-card">
              <div className="dashboard-card-head"><div><span className="card-kicker">TODAY’S FOCUS</span><h2>Your priority actions</h2></div><button className="text-button">View all tasks <ArrowRight size={15} /></button></div>
              <div className="task-list">{tasks.slice(0, 4).map((task) => <div className={task.done ? "dashboard-task done" : "dashboard-task"} key={task.id}><button className="task-toggle" onClick={() => toggleTask(task.id)} aria-label={`Toggle ${task.title}`}>{task.done && <Check size={13} />}</button><div className="task-main"><strong>{task.title}</strong><span><b>{task.category}</b><i /> <Clock3 size={12} /> {task.due}</span></div><span className={`priority-pill ${task.priority.toLowerCase()}`}>{task.priority}</span><button className="task-more"><MoreHorizontal /></button></div>)}</div>
              <div className="task-card-footer"><div className="avatars-mini"><span>AM</span><span>RF</span></div><p>{completed} demo tasks completed</p><button><CheckCircle2 size={15} /> Add task</button></div>
            </article>

            <article className="dashboard-card budget-overview">
              <div className="dashboard-card-head"><div><span className="card-kicker">FINANCIAL PLAN</span><h2>Budget overview</h2></div><button><MoreHorizontal /></button></div>
              <div className="budget-visual"><div className="budget-donut"><div><small>PLANNED</small><strong>€9.8k</strong></div></div><div className="budget-legend">{budget.map((item, index) => <div key={item.label}><span className={`legend-dot dot-${index + 1}`} /><p>{item.label}<strong>€{item.value.toLocaleString()}</strong></p><small>{item.percentage}%</small></div>)}</div></div>
              <div className="budget-insight"><Sparkles /><p><strong>You’re €680 under your target pace.</strong>Your housing estimate is lower than similar Berlin moves.</p></div>
            </article>
          </div>

          <div className="dashboard-grid-secondary">
            <article className="dashboard-card timeline-card"><div className="dashboard-card-head"><div><span className="card-kicker">YOUR ROADMAP</span><h2>Upcoming milestones</h2></div><button className="filter-button">Next 90 days <ChevronDown /></button></div><div className="timeline-list">{timeline.map((item, index) => <div className={item.state === "current" ? "timeline-item current" : "timeline-item"} key={item.month}><div className="timeline-marker">{item.state === "current" ? <Check /> : <span>{index + 1}</span>}</div><div><small>{item.month.toUpperCase()}</small><strong>{item.title}</strong><p>{item.detail}</p></div>{item.state === "current" && <b>IN PROGRESS</b>}</div>)}</div></article>
            <article className="dashboard-card city-card"><div className="dashboard-card-head"><div><span className="card-kicker">CITY MATCH</span><h2>Your top destinations</h2></div><button className="text-button">Compare <ArrowRight size={15} /></button></div><div className="city-list">{cities.map((city, index) => <div className="city-row" key={city.name}><div className="city-rank">0{index + 1}</div><div className="city-name"><strong>{city.name}</strong><span>{city.country}</span></div><div className="city-metrics"><span><small>RENT</small>{city.rent}</span><span><small>SALARY</small>{city.salary}</span></div><div className="match-score"><svg viewBox="0 0 36 36"><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /><path className="score-path" strokeDasharray={`${city.match}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /></svg><strong>{city.match}</strong></div></div>)}</div></article>
          </div>

          <div className="dashboard-grid-secondary lower">
            <article className="dashboard-card documents-card"><div className="dashboard-card-head"><div><span className="card-kicker">DOCUMENT VAULT</span><h2>Important documents</h2></div><button className="upload-button"><Upload size={15} /> Upload</button></div><div className="document-list">{documents.map((document) => <div key={document.name}><span className="document-icon"><FileText /></span><p><strong>{document.name}</strong><small>{document.meta}</small></p><span className={`document-status ${document.status.toLowerCase().replace(" ", "-")}`}>{document.status}</span><button><MoreHorizontal /></button></div>)}</div></article>
            <article className="dashboard-card activity-card"><div className="dashboard-card-head"><div><span className="card-kicker">RECENT ACTIVITY</span><h2>Plan updates</h2></div><button><MoreHorizontal /></button></div><div className="activity-list">{activity.map((item) => <div key={item.title}><span className={`activity-icon ${item.type}`}>{item.type === "done" ? <Check /> : item.type === "alert" ? <AlertCircle /> : <CircleDollarSign />}</span><p><strong>{item.title}</strong><small>{item.time}</small></p></div>)}</div><button className="activity-link">See all activity <ArrowRight size={14} /></button></article>
          </div>
        </div>
      </section>

      <button className="assistant-fab" onClick={() => setAssistantOpen((value) => !value)}>{assistantOpen ? <X /> : <MessageCircleMore />}<span>Ask RelocateFlow</span></button>
      {assistantOpen && <aside className="assistant-panel"><div className="assistant-head"><span><Sparkles /></span><div><strong>RelocateFlow guide</strong><small><i /> Ready to help</small></div><button onClick={() => setAssistantOpen(false)}><X /></button></div><div className="assistant-body"><div className="assistant-message"><p>Hi Alex — your next important step is booking the visa appointment.</p><p>Would you like a checklist of what to bring?</p></div><div className="suggestion-chips"><button>Show my checklist</button><button>Explain the Blue Card</button><button>Review my budget</button></div></div><div className="assistant-input"><input placeholder="Ask about your move..." /><button><ArrowRight /></button></div></aside>}
    </main>
  );
}
