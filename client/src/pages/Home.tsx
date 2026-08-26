/** DreamDesk home: React’s picture frame around a live Babylon cozy-study productivity room. */
import { useEffect, useState } from "react";
import { toast } from "sonner";
import GameCanvas from "@/components/GameCanvas";
import { DreamDeskHUD } from "@/components/dreamdesk/DreamDeskHUD";
import type { Task } from "@/lib/dashboard-data";
import { dreamTasks, getRoomChapter, type DreamDeskTarget, type DreamMood } from "@/lib/dreamdesk-data";

export default function Home() {
  const searchParams = new URLSearchParams(window.location.search);
  const [active, setActive] = useState<DreamDeskTarget>(() => {
    const demo = searchParams.get("demo");
    const targets: DreamDeskTarget[] = ["computer", "calendar", "pomodoro", "bookshelf", "plant", "coffee", "window", "statistics"];
    return demo && targets.includes(demo as DreamDeskTarget) ? demo as DreamDeskTarget : demo !== null ? "computer" : "room";
  });
  const [hover, setHover] = useState<DreamDeskTarget | null>(null);
  const [mood, setMood] = useState<DreamMood>(() => {
    const requestedMood = searchParams.get("mood") as DreamMood | null;
    return ["morning", "sunset", "night", "rain", "cozy"].includes(requestedMood ?? "") ? requestedMood as DreamMood : "sunset";
  });
  const [tasks, setTasks] = useState<Task[]>(() => {
    const requestedProgress = Number(searchParams.get("progress"));
    if (!Number.isFinite(requestedProgress)) return dreamTasks;
    return dreamTasks.map((task, index): Task => ({ ...task, status: (index < Math.max(0, Math.min(dreamTasks.length, requestedProgress)) ? "Done" : task.status === "Done" ? "Ready" : task.status) as Task["status"] }));
  });
  const [focusSeconds, setFocusSeconds] = useState(25 * 60);
  const [focusRunning, setFocusRunning] = useState(false);

  useEffect(() => {
    if (!focusRunning || focusSeconds <= 0) return;
    const interval = window.setInterval(() => setFocusSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(interval);
  }, [focusRunning, focusSeconds]);

  const handleSelection = (key: DreamDeskTarget) => setActive(key);
  const handleMood = (nextMood: DreamMood) => setMood(nextMood);
  const completedCount = tasks.filter((task) => task.status === "Done").length;
  const toggleTask = (id: number) => setTasks((current) => {
    const before = current.filter((task) => task.status === "Done").length;
    const next: Task[] = current.map((task): Task => task.id === id ? { ...task, status: (task.status === "Done" ? "Ready" : "Done") as Task["status"] } : task);
    const after = next.filter((task) => task.status === "Done").length;
    if (after > before) {
      const chapter = getRoomChapter(after);
      toast.success(`${chapter.title} unlocked`, { description: chapter.reward });
    } else {
      const chapter = getRoomChapter(after);
      toast.message(`Room returned to ${chapter.title}`, { description: "Reopen a task whenever it needs more care." });
    }
    return next;
  });

  return <main className="dreamdesk-app"><GameCanvas focusKey={active} mood={mood} completedCount={completedCount} onSelect={handleSelection} onHover={setHover} /><DreamDeskHUD active={active} hover={hover} mood={mood} tasks={tasks} focusSeconds={focusSeconds} focusRunning={focusRunning} onNavigate={handleSelection} onClose={() => setActive("room")} onMoodChange={handleMood} onToggleTask={toggleTask} onFocusToggle={() => setFocusRunning((value) => !value)} onFocusReset={() => { setFocusSeconds(25 * 60); setFocusRunning(false); }} /></main>;
}
