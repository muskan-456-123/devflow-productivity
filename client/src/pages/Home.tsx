/** DreamDesk home: React’s picture frame around a live Babylon cozy-study productivity room. */
import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import GameCanvas from "@/components/GameCanvas";
import { DreamDeskHUD } from "@/components/dreamdesk/DreamDeskHUD";
import { apiRequest, ApiRequestError, type ApiProject, type ApiState, type ApiTask } from "@/lib/api";
import type { Task } from "@/lib/dashboard-data";
import { dreamTasks, getRoomChapter, type DreamDeskTarget, type DreamMood } from "@/lib/dreamdesk-data";

function mapApiTask(task: ApiTask, index: number): Task {
  const fallback = dreamTasks[index % dreamTasks.length];
  const status: Task["status"] = task.status === "done" ? "Done" : task.status === "in_progress" ? "In progress" : "Ready";
  const priority: Task["priority"] = task.priority === "high" ? "High" : task.priority === "low" ? "Low" : "Medium";
  return {
    ...fallback,
    id: task.id,
    title: task.title,
    status,
    priority,
    due: task.dueAt ? new Date(task.dueAt).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "No due date",
    description: undefined,
  } as Task;
}

export default function Home() {
  const { user: authUser } = useAuth();
  void authUser;

  const searchParams = new URLSearchParams(window.location.search);
  const requestedApiState = searchParams.get("apiState") as ApiState | null;
  const isApiStateDemo = ["loading", "connected", "empty", "fallback", "error"].includes(requestedApiState ?? "");
  const isDeterministicDemo = searchParams.has("demo") || searchParams.has("progress") || isApiStateDemo;
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
  const [apiState, setApiState] = useState<ApiState>(isApiStateDemo ? requestedApiState as ApiState : isDeterministicDemo ? "fallback" : "loading");
  const [apiError, setApiError] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<ApiProject | null>(null);
  const [focusSeconds, setFocusSeconds] = useState(25 * 60);
  const [focusRunning, setFocusRunning] = useState(false);

  useEffect(() => {
    if (isDeterministicDemo) return;
    let cancelled = false;
    const loadWorkspace = async () => {
      try {
        const projects = await apiRequest<ApiProject[]>("/projects");
        if (cancelled) return;
        if (projects.length === 0) {
          setApiState("empty");
          return;
        }
        const project = projects[0];
        const persistedTasks = await apiRequest<ApiTask[]>(`/projects/${project.id}/tasks`);
        if (cancelled) return;
        setActiveProject(project);
        if (persistedTasks.length === 0) {
          setApiState("empty");
          return;
        }
        setTasks(persistedTasks.map(mapApiTask));
        setApiState("connected");
      } catch (error) {
        if (cancelled) return;
        setApiError(error instanceof Error ? error.message : "The API could not be reached");
        setApiState(error instanceof ApiRequestError && error.status === 401 ? "fallback" : "error");
      }
    };
    void loadWorkspace();
    return () => { cancelled = true; };
  }, [isDeterministicDemo]);

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
    const task = current.find((item) => item.id === id);
    const nextStatus = task?.status === "Done" ? "Ready" : "Done";
    const next: Task[] = current.map((item): Task => item.id === id ? { ...item, status: nextStatus } : item);
    const after = next.filter((item) => item.status === "Done").length;
    if (apiState === "connected") {
      const backendStatus = nextStatus === "Done" ? "done" : "todo";
      void apiRequest(`/tasks/${id}/status`, { method: "PATCH", body: JSON.stringify({ status: backendStatus }) }).catch(() => toast.error("Task updated locally", { description: "The API could not save this change." }));
    }
    if (after > before) {
      const chapter = getRoomChapter(after);
      toast.success(`${chapter.title} unlocked`, { description: chapter.reward });
    } else {
      const chapter = getRoomChapter(after);
      toast.message(`Room returned to ${chapter.title}`, { description: "Reopen a task whenever it needs more care." });
    }
    return next;
  });

  return <main className="dreamdesk-app" data-api-state={apiState} data-api-project={activeProject?.id ?? "none"} data-api-error={apiError ?? undefined}>
    <GameCanvas focusKey={active} mood={mood} completedCount={completedCount} onSelect={handleSelection} onHover={setHover} />
    <DreamDeskHUD apiState={apiState} active={active} hover={hover} mood={mood} tasks={tasks} focusSeconds={focusSeconds} focusRunning={focusRunning} onNavigate={handleSelection} onClose={() => setActive("room")} onMoodChange={handleMood} onToggleTask={toggleTask} onFocusToggle={() => setFocusRunning((value) => !value)} onFocusReset={() => { setFocusSeconds(25 * 60); setFocusRunning(false); }} />
  </main>;
}
