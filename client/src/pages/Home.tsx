/** DreamDesk home: React’s picture frame around a live Babylon cozy-study productivity room. */
import { useEffect, useState } from "react";
import GameCanvas from "@/components/GameCanvas";
import { DreamDeskHUD } from "@/components/dreamdesk/DreamDeskHUD";
import type { Task } from "@/lib/dashboard-data";
import { dreamTasks, type DreamDeskTarget, type DreamMood } from "@/lib/dreamdesk-data";

export default function Home() {
  const [active, setActive] = useState<DreamDeskTarget>(() => {
    const demo = new URLSearchParams(window.location.search).get("demo");
    const targets: DreamDeskTarget[] = ["computer", "calendar", "pomodoro", "bookshelf", "plant", "coffee", "window", "statistics"];
    return demo && targets.includes(demo as DreamDeskTarget) ? demo as DreamDeskTarget : demo !== null ? "computer" : "room";
  });
  const [hover, setHover] = useState<DreamDeskTarget | null>(null);
  const [mood, setMood] = useState<DreamMood>("sunset");
  const [tasks, setTasks] = useState<Task[]>(dreamTasks);
  const [focusSeconds, setFocusSeconds] = useState(25 * 60);
  const [focusRunning, setFocusRunning] = useState(false);

  useEffect(() => {
    if (!focusRunning || focusSeconds <= 0) return;
    const interval = window.setInterval(() => setFocusSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(interval);
  }, [focusRunning, focusSeconds]);

  const handleSelection = (key: DreamDeskTarget) => setActive(key);
  const handleMood = (nextMood: DreamMood) => setMood(nextMood);
  const toggleTask = (id: number) => setTasks((current) => current.map((task) => task.id === id ? { ...task, status: task.status === "Done" ? "Ready" : "Done" } : task));

  return <main className="dreamdesk-app"><GameCanvas focusKey={active} mood={mood} onSelect={handleSelection} onHover={setHover} /><DreamDeskHUD active={active} hover={hover} mood={mood} tasks={tasks} focusSeconds={focusSeconds} focusRunning={focusRunning} onNavigate={handleSelection} onClose={() => setActive("room")} onMoodChange={handleMood} onToggleTask={toggleTask} onFocusToggle={() => setFocusRunning((value) => !value)} onFocusReset={() => { setFocusSeconds(25 * 60); setFocusRunning(false); }} /></main>;
}
