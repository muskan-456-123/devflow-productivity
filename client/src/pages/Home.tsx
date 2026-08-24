/**
 * Kinetic Workbench home: contemporary editorial systems design with a warm work canvas and Flow Orange momentum signals.
 */
import { useState } from "react";
import { ArrowRight, Bell, CalendarDays, ChevronDown, CircleCheckBig, Clock3, Flame, Menu, Plus, Sparkles, Target, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DevflowMark } from "@/components/DevflowMark";
import { ProjectCard } from "@/components/ProjectCard";
import { SegmentedProgress } from "@/components/SegmentedProgress";
import { TaskPanel } from "@/components/TaskPanel";
import { focusHours, initialTasks, projects, type Task } from "@/lib/dashboard-data";

export default function Home() {
  const [activeNav, setActiveNav] = useState("today");
  const [activeProject, setActiveProject] = useState("All");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const completedCount = tasks.filter((task) => task.status === "Done").length;

  const toggleTask = (id: number) => {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, status: task.status === "Done" ? "Ready" : "Done" } : task));
  };

  const refreshTasks = () => {
    setIsRefreshing(true);
    window.setTimeout(() => setIsRefreshing(false), 680);
  };

  return (
    <div className="min-h-screen bg-[#F2EFE8] text-[#13202E]">
      <div className="flex min-h-screen">
        <DashboardSidebar activeNav={activeNav} onNavChange={setActiveNav} />

        <main className="min-w-0 flex-1 pb-8">
          <MobileHeader open={mobileMenuOpen} onToggle={() => setMobileMenuOpen((open) => !open)} />
          {mobileMenuOpen && <MobileNavigation activeNav={activeNav} onNavChange={(key) => { setActiveNav(key); setMobileMenuOpen(false); }} />}

          <header className="mx-auto flex max-w-[1570px] items-center justify-between px-5 pb-5 pt-5 sm:px-7 lg:px-8 lg:pb-7 lg:pt-7">
            <div>
              <div className="mb-1.5 flex items-center gap-2 text-[10px] font-bold tracking-[0.17em] text-[#7F8789]"><span className="size-1.5 rounded-full bg-[#FF6B2C]" /> TUESDAY, 17 SEPTEMBER</div>
              <h1 className="font-['DM_Serif_Display'] text-[30px] leading-none tracking-[-0.05em] text-[#13202E] sm:text-[37px]">Good morning, Ava.</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button type="button" className="relative flex size-9 items-center justify-center rounded-xl border border-[#DED9D0] bg-[#FBF9F4] text-[#596164] transition hover:-translate-y-0.5 hover:border-[#C6C0B6] hover:text-[#13202E] active:scale-[0.97]" aria-label="Open notifications">
                <Bell className="size-[17px]" />
                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#FF6B2C] ring-2 ring-[#FBF9F4]" />
              </button>
              <button type="button" className="flex items-center gap-2 rounded-xl border border-[#DED9D0] bg-[#FBF9F4] p-1.5 pr-2.5 text-left transition hover:-translate-y-0.5 hover:border-[#C6C0B6] active:scale-[0.98]" aria-label="Open Ava Chen profile">
                <span className="flex size-7 items-center justify-center rounded-lg bg-[#13202E] text-[9px] font-bold text-[#F7F4EE]">AC</span>
                <span className="hidden text-xs font-bold sm:block">Ava Chen</span>
                <ChevronDown className="hidden size-3.5 text-[#7F8789] sm:block" />
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-[1570px] px-5 sm:px-7 lg:px-8">
            <section className="workbench-surface relative overflow-hidden rounded-[25px] bg-[#F7D9C7] px-5 py-5 shadow-[0_14px_32px_rgba(161,95,55,0.11)] sm:px-7 sm:py-6" aria-labelledby="daily-focus-title">
              <div className="absolute bottom-0 right-5 top-0 z-10 hidden w-7 border-x border-[#C98365]/35 sm:block"><span className="absolute left-1/2 top-5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#FF6B2C]" /><span className="absolute left-1/2 top-[42%] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#D59B81]" /><span className="absolute bottom-5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#D59B81]" /></div>
              <div className="absolute inset-y-0 right-0 w-[47%] overflow-hidden">
                <img src="/manus-storage/devflow-focus-orbit_a7be1b53.png" alt="Abstract orange orbital track around a navy focus core" className="h-full w-full object-cover object-right opacity-80 mix-blend-multiply" />
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#F7D9C7] via-[#F7D9C7]/75 to-transparent" />
              </div>
              <div className="relative z-10 max-w-[580px]">
                <div className="mb-3 flex items-center gap-2"><span className="rounded-full bg-[#13202E] px-2.5 py-1 text-[9px] font-bold tracking-[0.13em] text-[#FAF7F1]">DAILY FOCUS</span><span className="flex items-center gap-1 text-[10px] font-bold tracking-[0.1em] text-[#834A33]"><Flame className="size-3.5 fill-[#FF6B2C] text-[#FF6B2C]" /> 12 DAY STREAK</span></div>
                <h2 id="daily-focus-title" className="max-w-[480px] text-[25px] font-bold leading-[1.05] tracking-[-0.06em] text-[#13202E] sm:text-[32px]">Your most valuable hour is still open.</h2>
                <p className="mt-2 max-w-[420px] text-[13px] leading-5 text-[#654738]">Unblock the Atlas shortcut flow before the team sync. The rest of today can follow from that signal.</p>
                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  <Button className="h-9 rounded-xl bg-[#13202E] px-3.5 text-[11px] font-bold tracking-[0.06em] text-white hover:bg-[#263847] active:scale-[0.97]"><Target className="size-3.5" /> START FOCUS BLOCK</Button>
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#654738]"><Clock3 className="size-3.5" /> 45 MINUTES</span>
                </div>
                <div className="mt-4 flex max-w-[390px] items-center gap-1.5" aria-label="Focus block calibration">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => <span key={step} className={`h-1 flex-1 rounded-full ${step < 7 ? "bg-[#FF6B2C]" : "bg-[#EABFA8]"}`} />)}
                  <span className="ml-1 text-[9px] font-bold tracking-[0.11em] text-[#83513E]">CALIBRATED</span>
                </div>
              </div>
            </section>

            <section className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.72fr)_minmax(320px,0.78fr)]">
              <div className="min-w-0">
                <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <p className="mb-1 text-[10px] font-bold tracking-[0.17em] text-[#7F8789]">RUNNING PROJECTS</p>
                    <h2 className="text-[23px] font-bold tracking-[-0.055em]">Keep the runway visible.</h2>
                  </div>
                  <button type="button" onClick={() => setActiveProject("All")} className="flex items-center gap-1 text-[11px] font-bold tracking-[0.08em] text-[#596164] transition hover:text-[#FF6B2C]">VIEW ALL <ArrowRight className="size-3.5" /></button>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-3 [scrollbar-width:thin]">
                  {projects.map((project, index) => <ProjectCard key={project.id} project={project} featured={index === 0} active={activeProject === project.id} onSelect={() => setActiveProject(activeProject === project.id ? "All" : project.id)} />)}
                </div>
              </div>

              <FocusLaboratory completedCount={completedCount} />
            </section>

            <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.72fr)_minmax(320px,0.78fr)]">
              <TaskPanel tasks={tasks} activeProject={activeProject} onToggleTask={toggleTask} onRefresh={refreshTasks} isRefreshing={isRefreshing} />
              <RightRail tasks={tasks} activeProject={activeProject} onProjectChange={setActiveProject} />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function MobileHeader({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div className="sticky top-0 z-30 flex h-[62px] items-center justify-between border-b border-[#DED9D0] bg-[#F7F4EE]/95 px-5 backdrop-blur lg:hidden">
      <DevflowMark withWordmark />
      <button type="button" onClick={onToggle} className="rounded-lg p-2 text-[#596164] transition hover:bg-[#EDE9E1]" aria-label={open ? "Close navigation menu" : "Open navigation menu"}>{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
    </div>
  );
}

function MobileNavigation({ activeNav, onNavChange }: { activeNav: string; onNavChange: (key: string) => void }) {
  const mobileItems = ["today", "projects", "tasks", "activity"];
  return (
    <nav className="fixed inset-x-0 top-[62px] z-20 border-b border-[#DED9D0] bg-[#F7F4EE] p-3 shadow-[0_16px_24px_rgba(19,32,46,0.08)] lg:hidden" aria-label="Mobile navigation">
      <div className="grid grid-cols-4 gap-1">
        {mobileItems.map((item) => <button key={item} type="button" onClick={() => onNavChange(item)} className={`rounded-lg px-2 py-2 text-[10px] font-bold tracking-[0.06em] capitalize ${activeNav === item ? "bg-[#13202E] text-white" : "text-[#657072] hover:bg-[#EDE9E1]"}`}>{item === "today" ? "Today" : item === "tasks" ? "My tasks" : item}</button>)}
      </div>
    </nav>
  );
}

function FocusLaboratory({ completedCount }: { completedCount: number }) {
  return (
    <section className="workbench-surface relative min-h-[253px] overflow-hidden rounded-[22px] border border-[#D6DDD6] bg-[#E8EFE7] p-5 shadow-[0_10px_24px_rgba(38,41,42,0.035)]" aria-labelledby="focus-lab-title">
      <img src="/manus-storage/devflow-deep-work_75cd605d.png" alt="Pencil, planning card, and orange timing bars" className="absolute bottom-0 right-0 h-[80%] w-[47%] object-cover object-bottom opacity-90 mix-blend-multiply" />
      <div className="relative z-10 max-w-[56%]">
        <div className="mb-2 flex items-center gap-2"><span className="flex size-5 items-center justify-center rounded-md bg-[#6F9580] text-white"><Sparkles className="size-3" /></span><span className="text-[10px] font-bold tracking-[0.16em] text-[#557257]">FOCUS LAB</span></div>
        <h2 id="focus-lab-title" className="text-[22px] font-bold leading-[1.05] tracking-[-0.055em] text-[#203126]">42 minutes of clean time.</h2>
        <p className="mt-2 text-[12px] leading-5 text-[#59705C]">Your best window starts at 10:30. Protect it before it gets booked for you.</p>
        <div className="mt-5 flex items-center gap-2">
          <span className="rounded-lg bg-white/70 px-2 py-1 text-[10px] font-bold text-[#49644C]">{completedCount} CLOSED</span>
          <span className="text-[10px] font-medium text-[#59705C]">Today’s small wins</span>
        </div>
      </div>
    </section>
  );
}

function RightRail({ tasks, activeProject, onProjectChange }: { tasks: Task[]; activeProject: string; onProjectChange: (project: string) => void }) {
  const openTasks = tasks.filter((task) => task.status !== "Done").length;
  return (
    <aside className="space-y-4">
      <section className="workbench-surface overflow-hidden rounded-[22px] border border-[#E2DDD4] bg-[#FFFCF7] shadow-[0_10px_24px_rgba(38,41,42,0.035)]" aria-labelledby="week-title">
        <div className="flex items-start justify-between p-5 pb-3">
          <div><p className="mb-1 text-[10px] font-bold tracking-[0.16em] text-[#7F8789]">WEEKLY TRACE</p><h2 id="week-title" className="text-[20px] font-bold tracking-[-0.055em]">Momentum, not busyness.</h2></div>
          <span className="flex size-8 items-center justify-center rounded-xl bg-[#FFF0E8] text-[#FF6B2C]"><CalendarDays className="size-4" /></span>
        </div>
        <div className="flex h-[97px] items-end gap-2 px-5 pt-3">
          {focusHours.map((point, index) => <div key={`${point.day}-${index}`} className="flex h-full flex-1 flex-col justify-end gap-1.5"><span className={`block w-full rounded-t-sm ${index === 3 ? "bg-[#FF6B2C]" : "bg-[#B6C4C3]"}`} style={{ height: `${point.value}%` }} /><span className={`text-center text-[9px] font-bold ${index === 3 ? "text-[#FF6B2C]" : "text-[#8A9291]"}`}>{point.day}</span></div>)}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-[#EAE5DC] px-5 py-3"><span className="text-[11px] text-[#7F8789]">Deep work average</span><span className="text-[14px] font-bold text-[#13202E]">3h 18m <span className="text-[10px] text-[#6F9580]">↑ 24m</span></span></div>
      </section>

      <section className="workbench-surface relative overflow-hidden rounded-[22px] border border-[#D8E0E5] bg-[#EAF0F3] p-5 shadow-[0_10px_24px_rgba(38,41,42,0.035)]" aria-labelledby="dispatch-title">
        <img src="/manus-storage/devflow-ship-shape_af7e03a0.png" alt="Abstract blue, green, and orange release pipeline sculpture" className="absolute bottom-0 right-0 h-[85%] w-[54%] object-cover object-right-bottom mix-blend-multiply opacity-90" />
        <div className="relative z-10 max-w-[58%]"><p className="mb-1 text-[10px] font-bold tracking-[0.16em] text-[#5C7888]">NEXT DISPATCH</p><h2 id="dispatch-title" className="text-[19px] font-bold leading-[1.08] tracking-[-0.055em] text-[#183443]">Atlas has a clear path to review.</h2><p className="mt-2 text-[11px] leading-4 text-[#607C8B]">Two focused tasks separate you from a useful handoff.</p><button type="button" onClick={() => onProjectChange(activeProject === "Atlas" ? "All" : "Atlas")} className="mt-4 flex items-center gap-1 text-[10px] font-bold tracking-[0.08em] text-[#345E73] transition hover:text-[#FF6B2C]">OPEN ATLAS <ArrowRight className="size-3" /></button></div>
      </section>

      <section className="workbench-surface rounded-[22px] border border-[#E2DDD4] bg-[#FFFCF7] p-5 shadow-[0_10px_24px_rgba(38,41,42,0.035)]" aria-labelledby="today-title">
        <div className="mb-3 flex items-center justify-between"><div><p className="mb-1 text-[10px] font-bold tracking-[0.16em] text-[#7F8789]">TODAY’S SIGNAL</p><h2 id="today-title" className="text-[18px] font-bold tracking-[-0.05em]">{openTasks} tasks deserve a decision.</h2></div><CircleCheckBig className="size-5 text-[#6F9580]" /></div>
        <SegmentedProgress value={Math.round(((tasks.length - openTasks) / tasks.length) * 100)} color="#6F9580" />
        <div className="mt-3 flex items-center justify-between text-[11px] text-[#7F8789]"><span>Close loops with intent</span><span className="font-bold text-[#506C52]">{tasks.length - openTasks}/{tasks.length} done</span></div>
        <Button variant="outline" size="sm" className="mt-4 w-full rounded-xl border-[#DAD5CC] bg-[#FFFEFB] text-[10px] font-bold tracking-[0.07em] text-[#596164] hover:bg-[#F4F0E9] hover:text-[#13202E]"><Plus className="size-3.5" /> CAPTURE TASK</Button>
      </section>
    </aside>
  );
}
