"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
  Pencil,
  Plane,
  Plus,
  Search,
  Send,
  Settings,
  Sparkles,
  Trash2,
  TrendingUp,
  Upload,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import {
  baseBudget,
  baseDocuments,
  budgetLimit,
  buildTasks,
  calculateReadiness,
  defaultProfile,
  destinationDetails,
  initials,
  moveDateLabel,
  rankCities,
  type RelocationProfile,
  type WorkspaceBudget,
  type WorkspaceDocument,
  type WorkspaceTask,
} from "@/lib/workspace";
import { Logo } from "./logo";

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "My roadmap", icon: Map },
  { label: "Tasks", icon: CheckCircle2 },
  { label: "Documents", icon: FolderLock },
  { label: "Budget", icon: WalletCards },
  { label: "Cities", icon: MapPin },
];

const storageKeys = {
  profile: "relocateflow-profile",
  tasks: "relocateflow-tasks",
  documents: "relocateflow-documents",
  budget: "relocateflow-budget",
};

type ChatMessage = { role: "assistant" | "user"; text: string };

function readStored<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function SectionHeader({ kicker, title, description, action }: { kicker: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="workspace-section-header">
      <div><span className="dashboard-kicker"><Sparkles size={14} /> {kicker}</span><h1>{title}</h1><p>{description}</p></div>
      {action}
    </div>
  );
}

export function RelocationDashboard() {
  const [profile, setProfile] = useState<RelocationProfile>(defaultProfile);
  const [tasks, setTasks] = useState<WorkspaceTask[]>(buildTasks(defaultProfile));
  const [documents, setDocuments] = useState<WorkspaceDocument[]>(baseDocuments);
  const [budgetItems, setBudgetItems] = useState<WorkspaceBudget[]>(baseBudget);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Overview");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [taskFilter, setTaskFilter] = useState("All");
  const [newTask, setNewTask] = useState("");
  const [newExpense, setNewExpense] = useState({ label: "", value: "" });
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [assistantInput, setAssistantInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: "I have reviewed your plan. Ask me about visas, documents, budget, cities, or your next action." },
  ]);
  const [assistantTyping, setAssistantTyping] = useState(false);
  const [toast, setToast] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedProfile = readStored(storageKeys.profile, defaultProfile);
    setProfile({ ...defaultProfile, ...storedProfile });
    setTasks(readStored(storageKeys.tasks, buildTasks(storedProfile)));
    setDocuments(readStored(storageKeys.documents, baseDocuments));
    setBudgetItems(readStored(storageKeys.budget, baseBudget));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKeys.tasks, JSON.stringify(tasks));
  }, [hydrated, tasks]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKeys.documents, JSON.stringify(documents));
  }, [documents, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKeys.budget, JSON.stringify(budgetItems));
  }, [budgetItems, hydrated]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
        setAssistantOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const destination = destinationDetails[profile.destination] ?? { city: profile.destination, flag: "🌍", currency: "EUR" };
  const cities = useMemo(() => rankCities(profile), [profile]);
  const readiness = useMemo(() => calculateReadiness(profile, tasks, documents), [documents, profile, tasks]);
  const completedTasks = tasks.filter((task) => task.done).length;
  const verifiedDocuments = documents.filter((document) => document.status === "Verified").length;
  const totalBudget = budgetItems.reduce((sum, item) => sum + item.value, 0);
  const planLimit = budgetLimit(profile);
  const budgetPercentage = Math.min(100, Math.round((totalBudget / planLimit) * 100));

  const notify = (message: string) => setToast(message);

  const switchSection = (section: string) => {
    setActiveNav(section);
    setSidebarOpen(false);
    setCommandOpen(false);
    setSearchTerm("");
  };

  const toggleTask = (id: number) => {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task));
    notify("Task updated and saved locally");
  };

  const addTask = () => {
    const title = newTask.trim();
    if (!title) return;
    setTasks((current) => [...current, { id: Date.now(), title, category: "Personal", due: "No date", priority: "Medium", done: false }]);
    setNewTask("");
    notify("New task added");
  };

  const deleteTask = (id: number) => {
    setTasks((current) => current.filter((task) => task.id !== id));
    notify("Task removed");
  };

  const addExpense = () => {
    const value = Number(newExpense.value);
    if (!newExpense.label.trim() || !Number.isFinite(value) || value <= 0) return;
    setBudgetItems((current) => [...current, { id: Date.now(), label: newExpense.label.trim(), value, category: "Custom" }]);
    setNewExpense({ label: "", value: "" });
    notify("Expense added to your plan");
  };

  const simulateUpload = () => {
    setDocuments((current) => [...current, { id: Date.now(), name: "New supporting document", status: "In review", meta: "Uploaded just now" }]);
    notify("Mock upload completed");
  };

  const toggleCity = (name: string) => {
    setSelectedCities((current) => current.includes(name) ? current.filter((city) => city !== name) : current.length < 3 ? [...current, name] : current);
  };

  const assistantReply = (question: string) => {
    const normalized = question.toLowerCase();
    if (normalized.includes("visa") || normalized.includes("blue card")) {
      return `For ${profile.destination}, your next visa actions are to confirm the skilled-worker route, prepare your degree evidence, and book the appointment. Your role as ${profile.profession} is a strong starting signal.`;
    }
    if (normalized.includes("budget") || normalized.includes("cost")) {
      return `Your current plan totals €${totalBudget.toLocaleString()} against an estimated €${planLimit.toLocaleString()} limit. Housing is the largest item, so compare temporary accommodation before committing.`;
    }
    if (normalized.includes("document") || normalized.includes("checklist")) {
      const missing = documents.filter((document) => document.status === "Missing").map((document) => document.name).join(" and ");
      return missing ? `You still need ${missing}. I would prepare those before the visa appointment.` : "Your required document set is complete. Review expiry dates before submission.";
    }
    if (normalized.includes("city") || normalized.includes("where")) {
      return `${cities[0].name} is currently your strongest match at ${cities[0].match}%, based on ${profile.priorities.slice(0, 3).join(", ").toLowerCase()}.`;
    }
    return `Your best next action is “${tasks.find((task) => !task.done)?.title ?? "review your completed roadmap"}”. Completing it will improve your readiness score from ${readiness}/100.`;
  };

  const sendAssistantMessage = (preset?: string) => {
    const question = (preset ?? assistantInput).trim();
    if (!question || assistantTyping) return;
    setMessages((current) => [...current, { role: "user", text: question }]);
    setAssistantInput("");
    setAssistantTyping(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { role: "assistant", text: assistantReply(question) }]);
      setAssistantTyping(false);
    }, 650);
  };

  const filteredTasks = tasks.filter((task) => (taskFilter === "All" || task.category === taskFilter) && task.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredDocuments = documents.filter((document) => document.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const comparedCities = selectedCities.length ? cities.filter((city) => selectedCities.includes(city.name)) : cities.slice(0, 3);

  const renderOverview = () => (
    <>
      <div className="dashboard-welcome">
        <div><span className="dashboard-kicker"><Sparkles size={14} /> PERSONALIZED WORKSPACE</span><h1>Good afternoon, {profile.name.split(" ")[0]}.</h1><p>Your {destination.city} move is shaped around {profile.priorities.slice(0, 2).join(" and ").toLowerCase()}.</p></div>
        <div className="move-countdown"><span><Plane /></span><div><small>TARGET MOVE</small><strong>{moveDateLabel(profile)}</strong><p>{profile.currentCity} → {destination.city}</p></div><ChevronRight /></div>
      </div>

      <div className="dashboard-stats">
        <article className="readiness-stat featured"><div className="stat-head"><span>Relocation readiness</span><button aria-label="More readiness options"><MoreHorizontal /></button></div><div className="stat-content"><div className="dashboard-ring" style={{ background: `conic-gradient(var(--violet) ${readiness * 3.6}deg, #eceaf7 0deg)` }}><div><strong>{readiness}</strong><span>/100</span></div></div><div><span className="trend-positive"><TrendingUp size={13} /> Personalized live</span><h3>{readiness >= 75 ? "You’re on track" : "Strong foundation"}</h3><p>Complete priority actions and missing documents to increase your score.</p></div></div><div className="readiness-milestones"><span className="complete"><i /><b>Profile</b></span><span className={verifiedDocuments >= 3 ? "complete" : "current"}><i /><b>Documents</b></span><span className={readiness >= 72 ? "current" : ""}><i /><b>Visa ready</b></span><span><i /><b>Move ready</b></span></div></article>
        <article className="mini-stat"><div className="mini-stat-head"><span className="stat-icon lavender"><CheckCircle2 /></span><span className="trend-positive">Saved locally</span></div><strong>{completedTasks}<small> / {tasks.length}</small></strong><h3>Tasks completed</h3><div className="simple-progress"><i style={{ width: `${(completedTasks / Math.max(tasks.length, 1)) * 100}%` }} /></div><button className="card-inline-action" onClick={() => switchSection("Tasks")}>Manage tasks <ArrowRight size={14} /></button></article>
        <article className="mini-stat"><div className="mini-stat-head"><span className="stat-icon mint"><WalletCards /></span><span className="neutral-tag">{budgetPercentage}% planned</span></div><strong>€{totalBudget.toLocaleString()}<small> / €{planLimit.toLocaleString()}</small></strong><h3>Relocation budget</h3><div className="simple-progress mint"><i style={{ width: `${budgetPercentage}%` }} /></div><button className="card-inline-action" onClick={() => switchSection("Budget")}>Edit budget <ArrowRight size={14} /></button></article>
        <article className="mini-stat"><div className="mini-stat-head"><span className="stat-icon peach"><FileCheck2 /></span><span className="warning-tag">{documents.length - verifiedDocuments} pending</span></div><strong>{verifiedDocuments}<small> / {documents.length}</small></strong><h3>Documents verified</h3><div className="simple-progress peach"><i style={{ width: `${(verifiedDocuments / documents.length) * 100}%` }} /></div><button className="card-inline-action" onClick={() => switchSection("Documents")}>Open vault <ArrowRight size={14} /></button></article>
      </div>

      <div className="dashboard-grid-main">
        <article className="dashboard-card priority-card"><div className="dashboard-card-head"><div><span className="card-kicker">TODAY’S FOCUS</span><h2>Your priority actions</h2></div><button className="text-button" onClick={() => switchSection("Tasks")}>View all tasks <ArrowRight size={15} /></button></div><div className="task-list">{tasks.slice(0, 4).map((task) => <div className={task.done ? "dashboard-task done" : "dashboard-task"} key={task.id}><button className="task-toggle" onClick={() => toggleTask(task.id)} aria-label={`Toggle ${task.title}`}>{task.done && <Check size={13} />}</button><div className="task-main"><strong>{task.title}</strong><span><b>{task.category}</b><i /> <Clock3 size={12} /> {task.due}</span></div><span className={`priority-pill ${task.priority.toLowerCase()}`}>{task.priority}</span></div>)}</div></article>
        <article className="dashboard-card budget-overview"><div className="dashboard-card-head"><div><span className="card-kicker">BEST MATCH</span><h2>{cities[0].name}, {cities[0].country}</h2></div><span className="city-flag-large">{cities[0].flag}</span></div><div className="match-hero"><strong>{cities[0].match}%</strong><span>match score</span></div><div className="metric-bars"><label>Career market <i><b style={{ width: `${cities[0].jobs}%` }} /></i><span>{cities[0].jobs}</span></label><label>Safety <i><b style={{ width: `${cities[0].safety}%` }} /></i><span>{cities[0].safety}</span></label><label>English-friendly <i><b style={{ width: `${cities[0].english}%` }} /></i><span>{cities[0].english}</span></label></div><button className="button button-primary workspace-card-button" onClick={() => switchSection("Cities")}>Compare destinations <ArrowRight size={16} /></button></article>
      </div>
    </>
  );

  const renderTasks = () => {
    const categories = ["All", ...Array.from(new Set(tasks.map((task) => task.category)))];
    return <><SectionHeader kicker="ACTION CENTER" title="Tasks that move you forward" description="Create, complete, filter, and remove actions. Every change is saved in this browser." action={<div className="workspace-search"><Search size={17} /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search tasks" /></div>} /><div className="workspace-toolbar"><div className="filter-chips">{categories.map((category) => <button className={taskFilter === category ? "active" : ""} key={category} onClick={() => setTaskFilter(category)}>{category}</button>)}</div><span>{filteredTasks.length} actions</span></div><div className="task-composer"><input value={newTask} onChange={(event) => setNewTask(event.target.value)} onKeyDown={(event) => event.key === "Enter" && addTask()} placeholder="Add a custom relocation task..." /><button className="button button-primary" onClick={addTask}><Plus size={17} /> Add task</button></div><div className="workspace-list-card">{filteredTasks.map((task) => <div className={task.done ? "workspace-task-row done" : "workspace-task-row"} key={task.id}><button className="task-toggle" onClick={() => toggleTask(task.id)}>{task.done && <Check size={13} />}</button><div><strong>{task.title}</strong><span>{task.category} · {task.due}</span></div><span className={`priority-pill ${task.priority.toLowerCase()}`}>{task.priority}</span><button className="icon-ghost danger" onClick={() => deleteTask(task.id)} aria-label={`Delete ${task.title}`}><Trash2 size={17} /></button></div>)}{filteredTasks.length === 0 && <div className="empty-state"><Search /><h3>No tasks found</h3><p>Try another filter or create a new action.</p></div>}</div></>;
  };

  const renderDocuments = () => <><SectionHeader kicker="DOCUMENT VAULT" title="Your relocation evidence" description="Track readiness, simulate uploads, and move documents through review states." action={<button className="button button-primary" onClick={simulateUpload}><Upload size={17} /> Upload document</button>} /><div className="workspace-search wide"><Search size={17} /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search documents" /></div><div className="document-grid">{filteredDocuments.map((document) => <article className="document-tile" key={document.id}><div className="document-preview"><FileText /></div><div><strong>{document.name}</strong><p>{document.meta}</p></div><span className={`document-status ${document.status.toLowerCase().replace(" ", "-")}`}>{document.status}</span><div className="document-actions"><button onClick={() => setDocuments((current) => current.map((item) => item.id === document.id ? { ...item, status: "Verified", meta: "Verified just now" } : item))}><Check size={15} /> Verify</button><button onClick={() => setDocuments((current) => current.filter((item) => item.id !== document.id))}><Trash2 size={15} /></button></div></article>)}</div></>;

  const renderBudget = () => <><SectionHeader kicker="FINANCIAL PLAN" title="Relocation budget planner" description={`Your selected range is ${profile.budget}. Adjust the plan and watch the totals update instantly.`} /><div className="budget-summary-panel"><div><small>PLANNED TOTAL</small><strong>€{totalBudget.toLocaleString()}</strong><span>of €{planLimit.toLocaleString()} target</span></div><div className="budget-gauge"><i style={{ width: `${budgetPercentage}%` }} /></div><b className={totalBudget > planLimit ? "over" : "under"}>{totalBudget > planLimit ? `€${(totalBudget - planLimit).toLocaleString()} over target` : `€${(planLimit - totalBudget).toLocaleString()} remaining`}</b></div><div className="budget-layout"><div className="workspace-list-card">{budgetItems.map((item) => <div className="budget-row" key={item.id}><span className="budget-category-icon"><CircleDollarSign /></span><div><strong>{item.label}</strong><span>{item.category}</span></div><b>€{item.value.toLocaleString()}</b><button className="icon-ghost danger" onClick={() => setBudgetItems((current) => current.filter((expense) => expense.id !== item.id))}><Trash2 size={17} /></button></div>)}</div><aside className="add-expense-card"><span className="question-icon"><Plus /></span><h3>Add an expense</h3><p>Model flights, deposits, legal fees, or any custom cost.</p><label>Expense name<input value={newExpense.label} onChange={(event) => setNewExpense((current) => ({ ...current, label: event.target.value }))} placeholder="Example: Flight tickets" /></label><label>Estimated amount (€)<input type="number" min="0" value={newExpense.value} onChange={(event) => setNewExpense((current) => ({ ...current, value: event.target.value }))} placeholder="1200" /></label><button className="button button-primary" onClick={addExpense}>Add to budget</button></aside></div></>;

  const renderCities = () => <><SectionHeader kicker="DESTINATION LAB" title="Compare your strongest city matches" description={`Scores are recalculated from your priorities: ${profile.priorities.join(", ").toLowerCase()}.`} /><div className="city-selection-grid">{cities.map((city) => <button className={selectedCities.includes(city.name) ? "city-select-card selected" : "city-select-card"} key={city.name} onClick={() => toggleCity(city.name)}><span>{city.flag}</span><div><strong>{city.name}</strong><small>{city.country}</small></div><b>{city.match}%</b><i>{selectedCities.includes(city.name) && <Check size={14} />}</i></button>)}</div><p className="selection-helper">Select up to three cities. Showing {comparedCities.length} comparison columns.</p><div className="comparison-table"><div className="comparison-labels"><strong>City</strong><span>Match</span><span>Annual salary</span><span>Monthly rent</span><span>Career market</span><span>Safety</span><span>Lifestyle</span><span>English</span></div>{comparedCities.map((city) => <div className="comparison-column" key={city.name}><strong><span>{city.flag}</span>{city.name}</strong><span><b>{city.match}%</b></span><span>€{city.salary.toLocaleString()}</span><span>€{city.rent.toLocaleString()}</span><span>{city.jobs}/100</span><span>{city.safety}/100</span><span>{city.lifestyle}/100</span><span>{city.english}/100</span></div>)}</div></>;

  const renderRoadmap = () => {
    const groups = Array.from(new Set(tasks.map((task) => task.category)));
    return <><SectionHeader kicker="YOUR ROADMAP" title={`${profile.currentCity} to ${destination.city}`} description={`A visual path for your ${profile.timeline.toLowerCase()} relocation timeline.`} action={<Link className="button button-primary" href="/plan"><Pencil size={16} /> Edit profile</Link>} /><div className="roadmap-hero"><div className="route-node"><span>PK</span><small>ORIGIN</small><strong>{profile.currentCity}</strong></div><div className="roadmap-flight"><i /><Plane /></div><div className="route-node destination"><span>{destination.flag}</span><small>DESTINATION</small><strong>{destination.city}</strong></div></div><div className="roadmap-columns">{groups.map((group, index) => { const groupTasks = tasks.filter((task) => task.category === group); const done = groupTasks.filter((task) => task.done).length; return <article key={group}><header><span>0{index + 1}</span><div><small>PHASE</small><h3>{group}</h3></div><b>{done}/{groupTasks.length}</b></header><div className="roadmap-progress"><i style={{ width: `${(done / groupTasks.length) * 100}%` }} /></div>{groupTasks.map((task) => <button key={task.id} onClick={() => toggleTask(task.id)} className={task.done ? "complete" : ""}><span>{task.done ? <Check size={13} /> : <Clock3 size={13} />}</span>{task.title}</button>)}</article>})}</div></>;
  };

  const renderActiveSection = () => {
    if (activeNav === "Tasks") return renderTasks();
    if (activeNav === "Documents") return renderDocuments();
    if (activeNav === "Budget") return renderBudget();
    if (activeNav === "Cities") return renderCities();
    if (activeNav === "My roadmap") return renderRoadmap();
    return renderOverview();
  };

  const commandItems = navItems.filter((item) => item.label.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <main className="dashboard-shell">
      <aside className={sidebarOpen ? "dashboard-sidebar open" : "dashboard-sidebar"}>
        <div className="sidebar-head"><Logo /><button onClick={() => setSidebarOpen(false)}><X /></button></div>
        <nav className="dashboard-nav"><span className="nav-section-label">WORKSPACE</span>{navItems.map(({ label, icon: Icon }) => <button key={label} className={activeNav === label ? "active" : ""} onClick={() => switchSection(label)}><Icon size={19} /><span>{label}</span>{label === "Tasks" && <b>{tasks.filter((task) => !task.done).length}</b>}{label === "Documents" && <b>{documents.filter((document) => document.status !== "Verified").length}</b>}</button>)}<span className="nav-section-label second">ACCOUNT</span><Link href="/plan"><UserRound size={19} /><span>Edit relocation profile</span></Link><button onClick={() => notify("Settings are ready for a future account backend")}><Settings size={19} /><span>Settings</span></button></nav>
        <div className="sidebar-upgrade"><span><Sparkles /></span><strong>Frontend demo mode</strong><p>All interactions persist in localStorage. No account or database is required.</p><button onClick={() => switchSection("Overview")}>View workspace <ArrowRight size={14} /></button></div>
        <div className="sidebar-user"><div className="user-avatar">{initials(profile.name)}</div><div><strong>{profile.name}</strong><span>{profile.profession}</span></div><MoreHorizontal size={18} /></div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-topbar"><button className="dashboard-menu" onClick={() => setSidebarOpen(true)}><Menu /></button><div className="topbar-route"><span>MY MOVE</span><strong><span>🇵🇰</span> {profile.currentCity} <ArrowRight size={14} /> <span>{destination.flag}</span> {destination.city}</strong></div><div className="topbar-actions"><button className="command-trigger" onClick={() => setCommandOpen(true)}><Search size={17} /><span>Search workspace...</span><kbd>⌘ K</kbd></button><button className="icon-button" onClick={() => notify("You have no new notifications")}><Bell size={19} /><i /></button><button className="topbar-avatar">{initials(profile.name)}</button></div></header>
        <div className="dashboard-content">{renderActiveSection()}</div>
      </section>

      <button className="assistant-fab" onClick={() => setAssistantOpen((value) => !value)}>{assistantOpen ? <X /> : <MessageCircleMore />}<span>Ask RelocateFlow</span></button>
      {assistantOpen && <aside className="assistant-panel enhanced"><div className="assistant-head"><span><Sparkles /></span><div><strong>RelocateFlow guide</strong><small><i /> Using your saved plan</small></div><button onClick={() => setAssistantOpen(false)}><X /></button></div><div className="assistant-body chat-scroll">{messages.map((message, index) => <div className={`assistant-message ${message.role}`} key={`${message.role}-${index}`}>{message.text}</div>)}{assistantTyping && <div className="assistant-message assistant typing"><i /><i /><i /></div>}<div className="suggestion-chips"><button onClick={() => sendAssistantMessage("Show my document checklist")}>Document checklist</button><button onClick={() => sendAssistantMessage("Explain my visa next steps")}>Visa next steps</button><button onClick={() => sendAssistantMessage("Review my budget")}>Review budget</button></div></div><div className="assistant-input"><input value={assistantInput} onChange={(event) => setAssistantInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && sendAssistantMessage()} placeholder="Ask about your move..." /><button onClick={() => sendAssistantMessage()}><Send /></button></div></aside>}

      {commandOpen && <div className="command-backdrop" onMouseDown={() => setCommandOpen(false)}><div className="command-palette" onMouseDown={(event) => event.stopPropagation()}><header><Search /><input autoFocus value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Jump to a workspace section..." /><kbd>ESC</kbd></header><div>{commandItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => switchSection(label)}><Icon size={18} /><span>{label}</span><kbd>↵</kbd></button>)}{commandItems.length === 0 && <p>No workspace sections found.</p>}</div></div></div>}
      {toast && <div className="workspace-toast"><CheckCircle2 /> {toast}</div>}
    </main>
  );
}
