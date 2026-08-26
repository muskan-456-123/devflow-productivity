/** DreamDesk glass panels: each panel is the accessible dashboard counterpart of one room object. */
import { useEffect, useMemo, useState } from "react";
import { BarChart3, BookOpenText, CalendarDays, Check, CircleAlert, CloudRain, Coffee, Flame, Leaf, ListTodo, MoonStar, Pause, Play, RotateCcw, Search, Sparkles, Sun, Sunset, X } from "lucide-react";
import type { Task, TaskStatus } from "@/lib/dashboard-data";
import { dreamDeskLabels, moodLabels, type DreamDeskTarget, type DreamMood } from "@/lib/dreamdesk-data";

type PanelProps = {
  active: DreamDeskTarget | null;
  mood: DreamMood;
  tasks: Task[];
  focusSeconds: number;
  focusRunning: boolean;
  onClose: () => void;
  onMoodChange: (mood: DreamMood) => void;
  onToggleTask: (id: number) => void;
  onFocusToggle: () => void;
  onFocusReset: () => void;
};

export function ProductivityPanels(props: PanelProps) {
  const { active } = props;
  if (!active || active === "room") return null;
  const label = dreamDeskLabels[active];
  return (
    <aside className="dream-panel pointer-events-auto" role="dialog" aria-modal="true" aria-label={label.title}>
      <header className="dream-panel-header"><div><p className="dream-panel-kicker">{label.subtitle}</p><h2>{label.title}</h2></div><button type="button" onClick={props.onClose} className="dream-icon-button" aria-label="Close panel"><X className="size-4" /></button></header>
      <div className="dream-panel-content">
        {active === "computer" && <TasksPanel tasks={props.tasks} onToggle={props.onToggleTask} />}
        {active === "calendar" && <CalendarPanel />}
        {active === "pomodoro" && <FocusPanel seconds={props.focusSeconds} running={props.focusRunning} onToggle={props.onFocusToggle} onReset={props.onFocusReset} />}
        {active === "bookshelf" && <NotesPanel />}
        {active === "plant" && <HabitsPanel />}
        {active === "coffee" && <BreakPanel />}
        {active === "window" && <MoodPanel mood={props.mood} onChange={props.onMoodChange} />}
        {active === "statistics" && <StatisticsPanel tasks={props.tasks} />}
      </div>
    </aside>
  );
}

function TasksPanel({ tasks, onToggle }: { tasks: Task[]; onToggle: (id: number) => void }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | TaskStatus>("All");
  const [state, setState] = useState<"live" | "loading" | "empty" | "error">("live");
  const visible = useMemo(() => tasks.filter((task) => {
    const haystack = `${task.title} ${task.project} ${task.tags.join(" ")}`.toLowerCase();
    return (status === "All" || task.status === status) && (!query || haystack.includes(query.toLowerCase()));
  }), [query, status, tasks]);
  const display = state === "live" && visible.length === 0 ? "empty" : state;
  return <div className="space-y-3"><div className="dream-search"><Search className="size-4" /><input value={query} onChange={(event) => { setQuery(event.target.value); setState("live"); }} placeholder="Search a task or tag" aria-label="Search tasks" /></div><div className="dream-filter-row">{(["All", "In progress", "Ready", "Blocked", "Done"] as const).map((option) => <button key={option} type="button" onClick={() => { setStatus(option); setState("live"); }} className={status === option ? "active" : ""}>{option === "In progress" ? "In flow" : option}</button>)}<button type="button" className="state-cycle" onClick={() => setState(state === "live" ? "loading" : state === "loading" ? "empty" : state === "empty" ? "error" : "live")} aria-label="Preview queue state">···</button></div>{display === "loading" && <div className="space-y-2">{[0, 1, 2].map((item) => <div key={item} className="dream-skeleton" />)}</div>}{display === "error" && <EmptyMessage icon={<CircleAlert />} title="The desk lost its signal." description="Your work is safe. Reconnect the room when you are ready." action="Reconnect" onAction={() => setState("live")} />}{display === "empty" && <EmptyMessage icon={<Sparkles />} title="A little clear space." description="No cards match this view. Widen the filter to see your next thread." action="Reset view" onAction={() => { setQuery(""); setStatus("All"); setState("live"); }} />}{display === "live" && <div className="dream-task-list">{visible.map((task) => <article key={task.id} className={`dream-task ${task.status === "Done" ? "is-done" : ""}`}><button type="button" className="task-check" onClick={() => onToggle(task.id)} aria-label={`Toggle ${task.title}`}><Check className="size-3.5" /></button><div className="min-w-0 flex-1"><h3>{task.title}</h3><p><span style={{ backgroundColor: task.color }} />{task.project} · {task.due} · {task.estimate}</p></div><span className="task-status">{task.status}</span></article>)}</div>}<p className="dream-panel-note">The desk computer keeps search, filtering, completion, loading, empty, and error states available for review.</p></div>;
}

function CalendarPanel() {
  const dates = [26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6];
  return <div><div className="calendar-title"><CalendarDays className="size-4" /><span>September 2026</span></div><div className="dream-calendar"><div className="calendar-days">{["M", "T", "W", "T", "F", "S", "S"].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}</div><div className="calendar-grid">{dates.map((day, index) => <button key={`${day}-${index}`} type="button" className={day === 18 ? "selected" : index < 5 || index > 34 ? "faded" : ""}>{day}</button>)}</div></div><div className="schedule-card"><span className="schedule-dot" /><div><strong>Atlas release review</strong><p>Today · 16:30 · 45 min</p></div></div><div className="schedule-card"><span className="schedule-dot mint" /><div><strong>Relay handoff</strong><p>Tomorrow · 10:00 · 25 min</p></div></div></div>;
}

function FocusPanel({ seconds, running, onToggle, onReset }: { seconds: number; running: boolean; onToggle: () => void; onReset: () => void }) {
  const minutes = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const progress = 1 - seconds / 1500;
  return <div className="focus-panel"><div className="focus-orbit" style={{ "--focus-progress": `${Math.max(progress, 0.02) * 360}deg` } as React.CSSProperties}><span>{minutes}</span><small>deep work</small></div><p>Put one meaningful thing in motion. The room will hold the rest.</p><div className="focus-actions"><button type="button" className="focus-start" onClick={onToggle}>{running ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current" />}{running ? "Pause" : "Start focus"}</button><button type="button" onClick={onReset} className="focus-reset"><RotateCcw className="size-4" /> Reset</button></div><div className="focus-dots">{Array.from({ length: 10 }).map((_, index) => <span key={index} className={index < Math.ceil(Math.max(progress, 0.1) * 10) ? "lit" : ""} />)}</div></div>;
}

function NotesPanel() { const notes = ["Make keyboard focus visible in the command palette.", "Ask Milo about timeout state copy.", "Keep the handoff checklist to one mobile screen."]; return <div className="note-stack"><p className="dream-panel-copy">A shelf for fragments worth returning to.</p>{notes.map((note, index) => <article key={note} className="note-card"><BookOpenText className="size-4" /><div><span>NOTE 0{index + 1}</span><p>{note}</p></div></article>)}<button type="button" className="dream-text-action">+ Capture a new note</button></div>; }

function HabitsPanel() { const [watered, setWatered] = useState(false); return <div className="habit-panel"><div className="habit-plant"><Leaf className="size-10" /><span>7-day root system</span></div><p className="dream-panel-copy">A few small practices keep the room bright. Mark one below and your plant will keep growing.</p><button type="button" onClick={() => setWatered((value) => !value)} className={`habit-check ${watered ? "done" : ""}`}><Check className="size-4" />{watered ? "Desk reset logged" : "Log a five-minute desk reset"}</button><div className="habit-week">{["M", "T", "W", "T", "F", "S", "S"].map((day, index) => <span key={`${day}-${index}`} className={index < 5 ? "complete" : ""}>{day}</span>)}</div></div>; }

function BreakPanel() { const [started, setStarted] = useState(false); return <div className="break-panel"><div className="coffee-steam"><Coffee className="size-9" /></div><h3>{started ? "Your seven-minute reset is on." : "A deliberate pause counts."}</h3><p>{started ? "Look at the sky, stretch your shoulders, and let the next decision arrive slowly." : "Stepping away protects the part of your focus that matters."}</p><button type="button" onClick={() => setStarted((value) => !value)}>{started ? "End break" : "Start 7-minute break"}</button></div>; }

function MoodPanel({ mood, onChange }: { mood: DreamMood; onChange: (mood: DreamMood) => void }) { const Icons = { morning: Sun, sunset: Sunset, night: MoonStar, rain: CloudRain, cozy: Flame }; return <div><p className="dream-panel-copy">The window controls the light your work is held in. Select a mood to change the room.</p><div className="mood-grid">{moodLabels.map(({ key, label, short }) => { const Icon = Icons[key]; return <button key={key} type="button" onClick={() => onChange(key)} className={mood === key ? "selected" : ""}><Icon className="size-4" /><span>{label}</span><em>{short}</em></button>; })}</div></div>; }

function StatisticsPanel({ tasks }: { tasks: Task[] }) { const completed = tasks.filter((task) => task.status === "Done").length; return <div className="stats-panel"><div className="stat-big"><span>FOCUS TIME</span><strong>48m</strong><small>+12m from yesterday</small></div><div className="stat-grid"><div><ListTodo /><span>Open threads</span><strong>{tasks.filter((task) => task.status !== "Done").length}</strong></div><div><Flame /><span>Current streak</span><strong>7d</strong></div><div><Check /><span>Loops closed</span><strong>{completed}/5</strong></div><div><BarChart3 /><span>Weekly rhythm</span><strong>82%</strong></div></div></div>; }

function EmptyMessage({ icon, title, description, action, onAction }: { icon: React.ReactNode; title: string; description: string; action: string; onAction: () => void }) { return <div className="dream-empty"><span>{icon}</span><h3>{title}</h3><p>{description}</p><button type="button" onClick={onAction}>{action}</button></div>; }
