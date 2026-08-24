/**
 * Soft Signal Studio home: an original, calm visual productivity workspace using periwinkle cues, floating studio artifacts, and quiet boards.
 */
import { useEffect, useMemo, useState } from "react";
import { Bell, CalendarDays, Check, ChevronLeft, ChevronRight, CircleAlert, Clock3, Coffee, Command, Ellipsis, Flame, ListFilter, Menu, Pause, Play, Plus, Search, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DevflowMark } from "@/components/DevflowMark";

type TaskKind = "Design" | "Sync" | "Research" | "Review" | "Build";
type PreviewState = "live" | "loading" | "empty" | "error";

type StudioTask = {
  id: number;
  title: string;
  time: string;
  kind: TaskKind;
  complete: boolean;
};

const initialStudioTasks: StudioTask[] = [
  { id: 1, title: "Refine the Atlas onboarding flow", time: "Today, 09:30", kind: "Design", complete: false },
  { id: 2, title: "Product signal stand-up", time: "Today, 11:15", kind: "Sync", complete: false },
  { id: 3, title: "Summarise edge-case research", time: "Today, 14:00", kind: "Research", complete: false },
  { id: 4, title: "Relay release review", time: "Fri, 16:30", kind: "Review", complete: false },
  { id: 5, title: "Capture API response examples", time: "Fri, 17:15", kind: "Build", complete: false },
  { id: 6, title: "Close the project handoff notes", time: "Completed", kind: "Review", complete: true },
];

const kindStyle: Record<TaskKind, string> = {
  Design: "bg-[#F0EAFE] text-[#7359B7]",
  Sync: "bg-[#E7F6EF] text-[#487D68]",
  Research: "bg-[#E8F1FB] text-[#517AA8]",
  Review: "bg-[#FCECF1] text-[#A46276]",
  Build: "bg-[#FFF1E7] text-[#C86B30]",
};

const days = [31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4];

export default function Home() {
  const [activeNav, setActiveNav] = useState("today");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tasks, setTasks] = useState(initialStudioTasks);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Open" | "Done">("All");
  const [previewState, setPreviewState] = useState<PreviewState>("live");
  const [timerSeconds, setTimerSeconds] = useState(28 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (!timerRunning || timerSeconds <= 0) return;
    const interval = window.setInterval(() => setTimerSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.trim().toLowerCase());
    const matchesFilter = filter === "All" || (filter === "Open" ? !task.complete : task.complete);
    return matchesSearch && matchesFilter;
  }), [filter, search, tasks]);

  const elapsed = 1 - timerSeconds / (28 * 60);
  const formattedTime = `${String(Math.floor(timerSeconds / 60)).padStart(2, "0")}:${String(timerSeconds % 60).padStart(2, "0")}`;
  const completeCount = tasks.filter((task) => task.complete).length;

  const toggleTask = (taskId: number) => setTasks((current) => current.map((task) => task.id === taskId ? { ...task, complete: !task.complete } : task));

  return (
    <div className="min-h-screen bg-[#EEF0F6] text-[#353248]">
      <div className="mx-auto flex max-w-[1440px] gap-5 px-4 py-4 sm:px-6 sm:py-6">
        <DashboardSidebar activeNav={activeNav} onNavChange={setActiveNav} />

        <main className="min-w-0 flex-1">
          <MobileHeader open={mobileMenuOpen} onToggle={() => setMobileMenuOpen((state) => !state)} />
          {mobileMenuOpen && <MobileNav activeNav={activeNav} onSelect={(key) => { setActiveNav(key); setMobileMenuOpen(false); }} />}

          <header className="mb-5 flex items-center justify-between px-1 pt-1 sm:px-2">
            <div><p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] text-[#8D8A9C]"><span className="size-1.5 rounded-full bg-[#FF6B2C]" /> WEDNESDAY, 18 SEPTEMBER</p><h1 className="text-[26px] font-bold tracking-[-0.065em] text-[#353248] sm:text-[31px]">One commit window. <span className="text-[#7765C8]">Clear next step.</span></h1></div>
            <div className="flex items-center gap-2"><button type="button" className="relative flex size-10 items-center justify-center rounded-xl bg-white text-[#69657A] shadow-[0_8px_20px_rgba(83,79,108,0.06)] transition hover:-translate-y-0.5 hover:text-[#7765C8]" aria-label="Open notifications"><Bell className="size-[17px]" /><span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-[#FF6B2C] ring-2 ring-white" /></button><button type="button" className="hidden items-center gap-2 rounded-xl bg-white px-2 py-1.5 shadow-[0_8px_20px_rgba(83,79,108,0.06)] sm:flex"><span className="flex size-7 items-center justify-center rounded-lg bg-[#7765C8] text-[9px] font-bold text-white">AC</span><span className="pr-1 text-[11px] font-bold text-[#4A475D]">Ava</span></button></div>
          </header>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_330px]">
            <section className="space-y-5">
              <DailyOverview completeCount={completeCount} />
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(250px,0.85fr)]">
                <FocusTimer time={formattedTime} running={timerRunning} progress={elapsed} onToggle={() => setTimerRunning((state) => !state)} onReset={() => { setTimerSeconds(28 * 60); setTimerRunning(false); }} />
                <MonthCard />
              </div>
            </section>
            <UpcomingTasks
              tasks={visibleTasks}
              activeFilter={filter}
              search={search}
              previewState={previewState}
              onSearch={(value) => { setSearch(value); setPreviewState("live"); }}
              onFilter={(value) => { setFilter(value); setPreviewState("live"); }}
              onPreview={setPreviewState}
              onToggle={toggleTask}
            />
          </div>

          <DailyNote completeCount={completeCount} />
        </main>
      </div>
    </div>
  );
}

function MobileHeader({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return <div className="mb-5 flex items-center justify-between xl:hidden"><DevflowMark withWordmark /><button type="button" onClick={onToggle} className="rounded-xl bg-white p-2.5 text-[#625E75] shadow-[0_8px_20px_rgba(83,79,108,0.06)]" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X className="size-5" /> : <Menu className="size-5" />}</button></div>;
}

function MobileNav({ activeNav, onSelect }: { activeNav: string; onSelect: (value: string) => void }) {
  const links = [["today", "Overview"], ["tasks", "My tasks"], ["projects", "Calendar"], ["activity", "Focus space"]];
  return <nav className="mb-5 rounded-2xl bg-white p-2 shadow-[0_16px_28px_rgba(83,79,108,0.08)] xl:hidden" aria-label="Mobile workspace navigation"><div className="grid grid-cols-2 gap-1">{links.map(([value, label]) => <button key={value} type="button" onClick={() => onSelect(value)} className={`rounded-xl px-3 py-2.5 text-[11px] font-bold ${activeNav === value ? "bg-[#7765C8] text-white" : "text-[#716D80] hover:bg-[#F6F5FA]"}`}>{label}</button>)}</div></nav>;
}

function DailyOverview({ completeCount }: { completeCount: number }) {
  const stats = [
    { label: "Focus minutes", value: "112", delta: "+14%", tone: "bg-[#EAE6FC] text-[#6C5AB7]", icon: Clock3 },
    { label: "Open threads", value: "06", delta: "in flow", tone: "bg-[#FCE9EC] text-[#BB6578]", icon: Command },
    { label: "Loops closed", value: `${completeCount}/6`, delta: "today", tone: "bg-[#E4F4EA] text-[#5D9679]", icon: Check },
  ];
  return (
    <section className="workbench-cue relative min-h-[304px] overflow-hidden rounded-[28px] bg-white p-6 shadow-[0_18px_42px_rgba(83,79,108,0.07)] sm:p-7" aria-labelledby="daily-overview-title">
      <img src="/manus-storage/devflow-soft-signal-garden_3da3d7fb.png" alt="Floating paper tabs, pins, and calm studio artifacts" className="absolute bottom-0 right-0 h-full w-[54%] object-cover object-right opacity-95" />
      <div className="absolute inset-y-0 right-[36%] w-32 bg-gradient-to-r from-white via-white/85 to-transparent" />
      <div className="relative z-10 max-w-[53%] min-w-[250px]">
        <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] text-[#7765C8]"><span className="size-1.5 rounded-full bg-[#FF6B2C]" /> BRANCH STATUS · READY</p>
        <h2 id="daily-overview-title" className="font-['DM_Serif_Display'] text-[31px] leading-[0.98] tracking-[-0.065em] text-[#353248] sm:text-[39px]">Good morning, <span className="text-[#7765C8]">Ava.</span></h2>
        <p className="mt-3 max-w-[280px] text-[13px] leading-5 text-[#777386]">One clean focus window, a release review, and three threads ready to move forward.</p>
        <div className="mt-4 flex max-w-[260px] items-center gap-1" aria-label="Daily momentum calibration"><span className="h-1 flex-1 rounded-full bg-[#FF6B2C]" /><span className="h-1 flex-1 rounded-full bg-[#FF6B2C]" /><span className="h-1 flex-1 rounded-full bg-[#FF6B2C]" /><span className="h-1 flex-1 rounded-full bg-[#E7E3EF]" /><span className="h-1 flex-1 rounded-full bg-[#E7E3EF]" /><span className="ml-1 text-[8px] font-bold tracking-[0.11em] text-[#9A93A9]">SYNC 03</span></div>
      </div>
      <div className="absolute bottom-5 left-5 right-5 z-10 grid grid-cols-3 gap-2 sm:bottom-6 sm:left-7 sm:right-auto sm:w-[calc(54%-12px)] sm:gap-3">
        {stats.map(({ label, value, delta, tone, icon: Icon }) => <div key={label} className="min-w-0 rounded-2xl border border-white/80 bg-white/86 p-3 shadow-[0_10px_20px_rgba(91,83,127,0.07)] backdrop-blur"><div className={`mb-2 flex size-6 items-center justify-center rounded-lg ${tone}`}><Icon className="size-3.5" /></div><p className="truncate text-[9px] font-bold tracking-[-0.01em] text-[#7F7B8D]">{label}</p><div className="mt-0.5 flex flex-wrap items-baseline gap-1"><span className="text-[20px] font-bold tracking-[-0.06em] text-[#3C394E]">{value}</span><span className="hidden text-[8px] font-bold text-[#5D9679] sm:inline">{delta}</span></div></div>)}
      </div>
    </section>
  );
}

function FocusTimer({ time, running, progress, onToggle, onReset }: { time: string; running: boolean; progress: number; onToggle: () => void; onReset: () => void }) {
  const circumference = 2 * Math.PI * 78;
  return (
    <section className="workbench-cue relative min-h-[296px] overflow-hidden rounded-[28px] bg-[#302A5B] p-6 text-white shadow-[0_20px_40px_rgba(48,42,91,0.22)]" aria-labelledby="focus-timer-title">
      <div className="absolute -left-16 bottom-[-72px] size-52 rounded-full bg-[#7765C8]/30 blur-2xl" /><div className="absolute -right-10 top-[-18px] size-44 rounded-full border border-[#D9BBFF]/25" /><div className="absolute right-7 top-6 grid grid-cols-3 gap-2 opacity-50">{Array.from({ length: 9 }).map((_, index) => <span key={index} className="size-1 rounded-full bg-[#D9BBFF]" />)}</div>
      <div className="relative z-10 flex items-center justify-between"><div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.13em] text-[#DED9FF]"><Sparkles className="size-3.5 text-[#D9BBFF]" /> FOCUS SESSION</div><button type="button" onClick={onReset} className="rounded-lg bg-white/10 px-2.5 py-1.5 text-[9px] font-bold tracking-[0.08em] text-[#F1EEFF] transition hover:bg-white/18">RESET</button></div>
      <div className="relative z-10 mx-auto mt-4 flex size-[168px] items-center justify-center rounded-full bg-[#3B346D] shadow-[inset_0_0_0_16px_rgba(255,255,255,0.035)]">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 168 168" aria-hidden="true"><circle cx="84" cy="84" r="78" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" /><circle cx="84" cy="84" r="78" fill="none" stroke="#D9BBFF" strokeWidth="4" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - Math.max(progress, 0.06))} className="transition-all duration-700" /></svg>
        <div className="text-center"><h2 id="focus-timer-title" className="font-['DM_Serif_Display'] text-[42px] leading-none tracking-[-0.075em] text-white">{time}</h2><p className="mt-1 text-[11px] font-medium text-[#D8D3F1]">Commit-current session</p></div>
      </div>
      <div className="relative z-10 -mt-1 flex items-center justify-center gap-3"><button type="button" onClick={onToggle} className="flex size-12 items-center justify-center rounded-full bg-[#FF6B2C] text-white shadow-[0_7px_16px_rgba(255,107,44,0.28)] transition hover:scale-105 active:scale-95" aria-label={running ? "Pause focus timer" : "Start focus timer"}>{running ? <Pause className="ml-0.5 size-5 fill-current" /> : <Play className="ml-0.5 size-5 fill-current" />}</button><span className="rounded-lg bg-white/10 px-3 py-2 text-[10px] font-bold tracking-[0.05em] text-[#E8E4FF]">{running ? "DIFF IN PROGRESS" : "READY TO COMMIT"}</span></div>
      <div className="absolute bottom-4 left-6 right-6 z-10 flex items-center gap-1.5"><span className="text-[8px] font-bold tracking-[0.12em] text-[#CFC8F5]">LIVE</span>{Array.from({ length: 10 }).map((_, index) => <span key={index} className={`h-1 flex-1 rounded-full ${index < Math.max(2, Math.ceil(progress * 10)) ? "bg-[#FF6B2C]" : "bg-white/15"}`} />)}<span className="text-[8px] font-bold tracking-[0.12em] text-[#CFC8F5]">28M</span></div>
    </section>
  );
}

function MonthCard() {
  return (
    <section className="workbench-cue rounded-[28px] bg-white p-5 shadow-[0_18px_42px_rgba(83,79,108,0.07)]" aria-labelledby="calendar-title">
      <div className="mb-4 flex items-center justify-between"><button type="button" className="flex size-8 items-center justify-center rounded-lg bg-[#F6F5FA] text-[#787487] hover:text-[#7765C8]" aria-label="Previous month"><ChevronLeft className="size-4" /></button><div className="text-center"><p className="text-[10px] font-bold tracking-[0.13em] text-[#918D9F]">SEPTEMBER</p><h2 id="calendar-title" className="mt-0.5 text-[17px] font-bold tracking-[-0.05em] text-[#3E3A50]">2026</h2></div><button type="button" className="flex size-8 items-center justify-center rounded-lg bg-[#F6F5FA] text-[#787487] hover:text-[#7765C8]" aria-label="Next month"><ChevronRight className="size-4" /></button></div>
      <div className="grid grid-cols-7 gap-y-1 text-center text-[9px] font-bold text-[#A09CAC]">{["M", "T", "W", "T", "F", "S", "S"].map((day, index) => <span key={`${day}-${index}`} className="pb-2">{day}</span>)}{days.map((day, index) => { const muted = index === 0 || index > 30; const selected = day === 18 && !muted; return <button key={`${day}-${index}`} type="button" className={`mx-auto flex size-7 items-center justify-center rounded-lg transition ${selected ? "bg-[#7765C8] text-white shadow-[0_6px_12px_rgba(119,101,200,0.25)]" : muted ? "text-[#D1CED8]" : "text-[#605C70] hover:bg-[#F2F0F8]"}`}>{day}</button>; })}</div>
      <div className="mt-5 rounded-xl bg-[#F6F4FB] px-3 py-2.5"><p className="text-[9px] font-bold tracking-[0.1em] text-[#8A849A]">MARKER</p><p className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold text-[#655E77]"><span className="size-1.5 rounded-full bg-[#FF6B2C]" /> Atlas review at 16:30</p></div>
    </section>
  );
}

function UpcomingTasks({ tasks, activeFilter, search, previewState, onSearch, onFilter, onPreview, onToggle }: { tasks: StudioTask[]; activeFilter: "All" | "Open" | "Done"; search: string; previewState: PreviewState; onSearch: (value: string) => void; onFilter: (value: "All" | "Open" | "Done") => void; onPreview: (value: PreviewState) => void; onToggle: (id: number) => void }) {
  const isEmpty = previewState === "empty" || (previewState === "live" && tasks.length === 0);
  return (
    <section className="workbench-cue min-h-[604px] overflow-hidden rounded-[28px] bg-white shadow-[0_18px_42px_rgba(83,79,108,0.07)]" aria-labelledby="upcoming-title">
      <div className="flex items-center justify-between p-5 pb-3"><div><p className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] text-[#8C889A]"><span className="size-1.5 rounded-full bg-[#FF6B2C]" /> CURRENT QUEUE</p><h2 id="upcoming-title" className="mt-1 text-[20px] font-bold tracking-[-0.06em] text-[#3C394E]">Upcoming signals</h2></div><div className="relative"><button type="button" className="rounded-lg bg-[#F6F5FA] p-2 text-[#756F83] hover:text-[#7765C8]" aria-label="Preview list state" onClick={() => onPreview(previewState === "live" ? "loading" : previewState === "loading" ? "empty" : previewState === "empty" ? "error" : "live")}><Ellipsis className="size-4" /></button></div></div>
      <div className="px-5 pb-3"><label className="flex h-10 items-center gap-2 rounded-xl bg-[#F6F5FA] px-3 focus-within:ring-2 focus-within:ring-[#7765C8]/20"><Search className="size-4 text-[#9691A2]" /><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Find a task" className="min-w-0 flex-1 bg-transparent text-[12px] text-[#4A465C] outline-none placeholder:text-[#AAA6B4]" /><ListFilter className="size-3.5 text-[#7765C8]" /></label><div className="mt-2.5 flex gap-1">{(["All", "Open", "Done"] as const).map((item) => <button key={item} type="button" onClick={() => onFilter(item)} className={`rounded-lg px-2.5 py-1.5 text-[10px] font-bold transition ${activeFilter === item ? "bg-[#ECE8FC] text-[#6E5ABD]" : "text-[#928D9F] hover:bg-[#F6F5FA]"}`}>{item}</button>)}</div></div>
      <div className="border-t border-[#F0EEF4] px-3 py-2">
        {previewState === "loading" && <LoadingRows />}
        {previewState === "error" && <ErrorPane onRetry={() => onPreview("live")} />}
        {isEmpty && <EmptyPane onReset={() => { onFilter("All"); onSearch(""); onPreview("live"); }} />}
        {previewState === "live" && tasks.map((task) => <TaskLine key={task.id} task={task} onToggle={() => onToggle(task.id)} />)}
      </div>
      <div className="border-t border-[#F0EEF4] px-5 py-3.5"><Button variant="ghost" className="h-8 w-full rounded-lg text-[10px] font-bold tracking-[0.07em] text-[#FF6B2C] hover:bg-[#FFF2EC] hover:text-[#DE581F]"><Plus className="size-3.5" /> CAPTURE A NEW SIGNAL</Button></div>
    </section>
  );
}

function TaskLine({ task, onToggle }: { task: StudioTask; onToggle: () => void }) {
  return <article className={`group relative flex items-start gap-3 rounded-2xl px-2 py-3 transition hover:bg-[#FAF9FC] ${task.complete ? "opacity-55" : ""}`}>{!task.complete && <span className="absolute bottom-3 left-0 top-3 w-0.5 rounded-full bg-[#FF6B2C] opacity-0 transition group-hover:opacity-100" />}<button type="button" onClick={onToggle} className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition ${task.complete ? "border-[#7765C8] bg-[#7765C8] text-white" : "border-[#D5D1DF] text-transparent hover:border-[#FF6B2C] hover:bg-[#FFF2EC] hover:text-[#FF6B2C]"}`} aria-label={task.complete ? `Reopen ${task.title}` : `Complete ${task.title}`}><Check className="size-3" strokeWidth={2.8} /></button><div className="min-w-0 flex-1"><h3 className={`text-[12px] font-bold leading-4 tracking-[-0.025em] text-[#494559] ${task.complete ? "line-through" : ""}`}>{task.title}</h3><div className="mt-1.5 flex items-center gap-2"><p className="text-[10px] text-[#9994A3]">{task.time}</p><span className={`rounded-full px-2 py-0.5 text-[8px] font-bold ${kindStyle[task.kind]}`}>{task.kind}</span></div></div></article>;
}

function LoadingRows() { return <div className="space-y-2 p-2" aria-label="Loading upcoming tasks">{Array.from({ length: 5 }).map((_, index) => <div key={index} className="h-[56px] animate-pulse rounded-xl bg-[#F4F2F8]" />)}</div>; }
function EmptyPane({ onReset }: { onReset: () => void }) { return <div className="flex min-h-[310px] flex-col items-center justify-center px-7 text-center"><span className="mb-3 flex size-10 items-center justify-center rounded-2xl bg-[#EEEAFB] text-[#7765C8]"><Coffee className="size-4" /></span><h3 className="text-[15px] font-bold tracking-[-0.04em] text-[#454154]">A little breathing room.</h3><p className="mt-1 text-[11px] leading-4 text-[#928D9E]">Nothing matches this view. Widen the filter when you’re ready.</p><button type="button" onClick={onReset} className="mt-4 text-[10px] font-bold tracking-[0.08em] text-[#7765C8]">RESET VIEW</button></div>; }
function ErrorPane({ onRetry }: { onRetry: () => void }) { return <div className="flex min-h-[310px] flex-col items-center justify-center px-7 text-center"><span className="mb-3 flex size-10 items-center justify-center rounded-2xl bg-[#FCEAED] text-[#B55F75]"><CircleAlert className="size-4" /></span><h3 className="text-[15px] font-bold tracking-[-0.04em] text-[#454154]">The signal went quiet.</h3><p className="mt-1 text-[11px] leading-4 text-[#928D9E]">Your task data is safe. Reconnect to bring the list back.</p><button type="button" onClick={onRetry} className="mt-4 text-[10px] font-bold tracking-[0.08em] text-[#7765C8]">RETRY CONNECTION</button></div>; }

function DailyNote({ completeCount }: { completeCount: number }) {
  return <section className="workbench-cue mt-5 overflow-hidden rounded-[24px] border border-white bg-gradient-to-r from-[#F8F5FF] via-[#F1EEFF] to-[#FFEDEA] px-5 py-4 shadow-[0_14px_28px_rgba(83,79,108,0.05)]"><div className="flex items-center gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/80 text-[#FF6B2C]"><Flame className="size-4" /></span><div><p className="text-[9px] font-bold tracking-[0.14em] text-[#847E9D]">COMMIT NOTE</p><p className="mt-0.5 text-[13px] font-semibold tracking-[-0.02em] text-[#514B65]">“A clear next commit beats a crowded backlog.” <span className="ml-1 text-[10px] font-medium text-[#8D879C]">{completeCount} review loops closed so far.</span></p></div></div></section>;
}
