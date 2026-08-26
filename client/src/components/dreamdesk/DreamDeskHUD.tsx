/** DreamDesk HUD: glass navigation and accessible productivity panels frame the 3D room without covering it. */
import { BarChart3, CalendarDays, CheckCircle2, Cloud, House, Leaf, ListTodo, MoonStar, Sparkles, StickyNote, TimerReset } from "lucide-react";
import type { Task } from "@/lib/dashboard-data";
import { getRoomChapter, dreamDeskLabels, dreamNavigation, type DreamDeskTarget, type DreamMood } from "@/lib/dreamdesk-data";
import { ProductivityPanels } from "./ProductivityPanels";

type HUDProps = {
  active: DreamDeskTarget;
  hover: DreamDeskTarget | null;
  mood: DreamMood;
  tasks: Task[];
  focusSeconds: number;
  focusRunning: boolean;
  onNavigate: (key: DreamDeskTarget) => void;
  onClose: () => void;
  onMoodChange: (mood: DreamMood) => void;
  onToggleTask: (id: number) => void;
  onFocusToggle: () => void;
  onFocusReset: () => void;
};

const icons: Record<DreamDeskTarget, typeof House> = { room: House, computer: ListTodo, calendar: CalendarDays, pomodoro: TimerReset, bookshelf: StickyNote, plant: Leaf, coffee: Cloud, window: MoonStar, statistics: BarChart3 };

export function DreamDeskHUD(props: HUDProps) {
  const completed = props.tasks.filter((task) => task.status === "Done").length;
  const chapter = getRoomChapter(completed);
  const hoverLabel = props.hover ? dreamDeskLabels[props.hover] : null;
  return <div className="dreamdesk-hud">
    <header className="dream-topbar pointer-events-auto"><div className="dream-brand"><img src="/manus-storage/dreamdesk-mark_be24247f.png" alt="DreamDesk" /><div><strong>DreamDesk</strong><span>PRODUCTIVE ABOVE THE CLOUDS</span></div></div><div className="dream-profile"><span className="profile-orb">AC</span><div><strong>Ava Chen</strong><small>in a good rhythm</small></div></div></header>
    <section className="dream-greeting"><p><Sparkles className="size-3" /> GOOD EVENING</p><h1>What will you <em>accomplish</em> today?</h1><span>Tap an object in the room, or use the dock to begin.</span></section>
    <div className="dream-stat-stack"><button type="button" onClick={() => props.onNavigate("computer")}><ListTodo /><span><small>Today’s progress</small><strong>{completed}/5 loops closed</strong></span></button><button type="button" onClick={() => props.onNavigate("pomodoro")}><TimerReset /><span><small>Focus time</small><strong>48 gentle minutes</strong></span></button><button type="button" onClick={() => props.onNavigate("statistics")}><CheckCircle2 /><span><small>Current streak</small><strong>7 sunrises</strong></span></button></div>
    <button type="button" className="dream-upgrade-chip pointer-events-auto" onClick={() => props.onNavigate("computer")}><Sparkles className="size-4" /><span><small>ROOM CHAPTER · {completed}/5</small><strong>{chapter.title}</strong><em>{chapter.nextTitle ? `Next: ${chapter.nextTitle}` : "Fully cared for"}</em></span></button>
    {hoverLabel && <div className="dream-tooltip"><span className="tooltip-dot" /><div><strong>{hoverLabel.title}</strong><small>{hoverLabel.subtitle}</small></div></div>}
    <nav className="dream-dock pointer-events-auto" aria-label="DreamDesk navigation">{dreamNavigation.map(({ key, label }) => { const Icon = icons[key]; const active = props.active === key; return <button key={key} type="button" onClick={() => props.onNavigate(key)} aria-label={label} aria-current={active ? "page" : undefined} className={active ? "active" : ""}><Icon className="size-[17px]" /><span>{label}</span></button>; })}</nav>
    <ProductivityPanels active={props.active} mood={props.mood} tasks={props.tasks} focusSeconds={props.focusSeconds} focusRunning={props.focusRunning} onClose={props.onClose} onMoodChange={props.onMoodChange} onToggleTask={props.onToggleTask} onFocusToggle={props.onFocusToggle} onFocusReset={props.onFocusReset} />
  </div>;
}
