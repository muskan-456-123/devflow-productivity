/**
 * Kinetic Workbench task panel: a focused queue with instant search, filters, and explicit dynamic states.
 */
import { useMemo, useState } from "react";
import { Check, ChevronDown, CircleAlert, CircleDashed, ListFilter, MoreHorizontal, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Task, TaskStatus } from "@/lib/dashboard-data";

type DisplayState = "live" | "loading" | "empty" | "error";

type TaskPanelProps = {
  tasks: Task[];
  activeProject: string;
  onToggleTask: (id: number) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
};

const statusOptions: Array<"All" | TaskStatus> = ["All", "In progress", "Ready", "Blocked"];

const statusStyles: Record<TaskStatus, string> = {
  "In progress": "bg-[#FFF0E8] text-[#C64D18] ring-[#FFD6C1]",
  Ready: "bg-[#EAF1F4] text-[#56798C] ring-[#D3E0E7]",
  Blocked: "bg-[#FAE9E8] text-[#AB4B4A] ring-[#F1CBC9]",
  Done: "bg-[#E9F0E8] text-[#507051] ring-[#D4E0D2]",
};

export function TaskPanel({ tasks, activeProject, onToggleTask, onRefresh, isRefreshing }: TaskPanelProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | TaskStatus>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [statePreview, setStatePreview] = useState<DisplayState>("live");

  const filteredTasks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesProject = activeProject === "All" || task.project === activeProject;
      const matchesStatus = status === "All" || task.status === status;
      const searchable = `${task.title} ${task.project} ${task.tags.join(" ")} ${task.assignee}`.toLowerCase();
      return matchesProject && matchesStatus && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeProject, query, status, tasks]);

  const clearFilters = () => {
    setQuery("");
    setStatus("All");
  };

  const displayState: DisplayState = isRefreshing ? "loading" : statePreview === "live" && filteredTasks.length === 0 ? "empty" : statePreview;

  return (
    <section className="workbench-surface rounded-[22px] border border-[#E2DDD4] bg-[#FFFCF7] shadow-[0_10px_24px_rgba(38,41,42,0.035)]" aria-labelledby="task-queue-title">
      <div className="border-b border-[#EAE5DC] px-4 pb-3 pt-4 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#FF6B2C]" />
              <span className="text-[10px] font-bold tracking-[0.17em] text-[#7F8789]">WORK QUEUE</span>
              <span className="h-px w-7 bg-[#CFC8BE]" />
              <span className="text-[9px] font-bold tracking-[0.11em] text-[#AA9F92]">LIVE</span>
            </div>
            <h2 id="task-queue-title" className="text-[21px] font-bold tracking-[-0.055em] text-[#13202E]">Shape the next commit.</h2>
          </div>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-lg text-[#7F8789] hover:bg-[#F0ECE4] hover:text-[#13202E]"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Preview task panel states"
              aria-expanded={menuOpen}
            >
              <MoreHorizontal className="size-4" />
            </Button>
            {menuOpen && (
              <div className="absolute right-0 z-20 mt-2 w-44 origin-top-right rounded-xl border border-[#E2DDD4] bg-[#FFFCF7] p-1.5 shadow-[0_14px_28px_rgba(19,32,46,0.14)]">
                <p className="px-2 py-1 text-[9px] font-bold tracking-[0.13em] text-[#7F8789]">PREVIEW STATE</p>
                {(["live", "loading", "empty", "error"] as DisplayState[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs font-medium capitalize transition hover:bg-[#F0ECE4] ${statePreview === option ? "text-[#FF6B2C]" : "text-[#596164]"}`}
                    onClick={() => {
                      setStatePreview(option);
                      setMenuOpen(false);
                    }}
                  >
                    {option}
                    {statePreview === option && <Check className="size-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 lg:flex-row">
          <label className="group flex h-10 flex-1 items-center gap-2 rounded-xl border border-[#DFD9D0] bg-[#F8F5EF] px-3 transition focus-within:border-[#FF6B2C] focus-within:ring-2 focus-within:ring-[#FF6B2C]/15">
            <Search className="size-4 text-[#7F8789] transition group-focus-within:text-[#FF6B2C]" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setStatePreview("live");
              }}
              placeholder="Search tasks, tags, or people"
              className="min-w-0 flex-1 bg-transparent text-[13px] text-[#13202E] outline-none placeholder:text-[#9BA2A0]"
              aria-label="Search tasks"
            />
            {query && <button type="button" onClick={() => setQuery("")} className="rounded p-0.5 text-[#7F8789] hover:text-[#13202E]" aria-label="Clear task search"><X className="size-3.5" /></button>}
          </label>
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0" aria-label="Filter tasks by status">
            <span className="hidden shrink-0 items-center gap-1 px-1 text-[10px] font-bold tracking-[0.11em] text-[#7F8789] sm:flex"><ListFilter className="size-3.5" /> FILTER</span>
            {statusOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setStatus(option);
                  setStatePreview("live");
                }}
                aria-pressed={status === option}
                className={`shrink-0 rounded-lg px-2.5 py-2 text-[11px] font-bold transition duration-150 active:scale-[0.97] ${
                  status === option ? "bg-[#13202E] text-[#FCF9F2]" : "text-[#657072] hover:bg-[#EDE9E1] hover:text-[#13202E]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-2.5 sm:p-3">
        {displayState === "loading" && <LoadingState />}
        {displayState === "error" && <ErrorState onRetry={() => { setStatePreview("live"); onRefresh(); }} />}
        {displayState === "empty" && <EmptyState onClear={clearFilters} />}
        {displayState === "live" && (
          <>
            <div className="mb-2 flex items-center justify-between px-2 py-1">
              <span className="text-[10px] font-bold tracking-[0.14em] text-[#8A9291]">{activeProject === "All" ? "ALL PROJECTS" : activeProject.toUpperCase()}</span>
              <span className="text-[11px] font-medium text-[#7F8789]">{filteredTasks.length} visible</span>
            </div>
            <div className="space-y-1.5">
              {filteredTasks.map((task) => (
                <TaskRow key={task.id} task={task} onToggle={() => onToggleTask(task.id)} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-[#DCD5CB] px-5 py-3">
        <span className="hidden text-[11px] text-[#7F8789] sm:inline">A deliberate queue beats a crowded one.</span>
        <button type="button" onClick={onRefresh} className="ml-auto flex items-center gap-1.5 text-[11px] font-bold tracking-[0.08em] text-[#FF6B2C] transition hover:text-[#C94F1B]">
          <CircleDashed className={`size-3.5 ${isRefreshing ? "animate-spin" : ""}`} /> REFRESH SIGNAL
        </button>
      </div>
    </section>
  );
}

function TaskRow({ task, onToggle }: { task: Task; onToggle: () => void }) {
  const done = task.status === "Done";
  return (
    <article className={`group flex items-start gap-3 rounded-xl border p-3 transition duration-200 hover:-translate-y-px hover:shadow-[0_8px_18px_rgba(19,32,46,0.06)] sm:items-center ${done ? "border-transparent bg-[#F7F5F0] opacity-65" : "border-[#E8E3DB] bg-[#FFFEFB]"}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-label={done ? `Mark ${task.title} as ready` : `Mark ${task.title} as complete`}
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition sm:mt-0 ${done ? "border-[#6F9580] bg-[#6F9580] text-white" : "border-[#C7C9C5] bg-white text-transparent hover:border-[#FF6B2C] hover:bg-[#FFF1EB] hover:text-[#FF6B2C]"}`}
      >
        <Check className="size-3.5" strokeWidth={2.6} />
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className={`text-[13px] font-bold tracking-[-0.02em] text-[#263235] ${done ? "line-through" : ""}`}>{task.title}</h3>
          <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ring-1 ring-inset ${statusStyles[task.status]}`}>{task.status}</span>
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] font-medium text-[#7F8789]">
          <span className="flex items-center gap-1"><span className="size-1.5 rounded-full" style={{ backgroundColor: task.color }} />{task.project}</span>
          <span>{task.due}</span>
          <span>{task.estimate}</span>
          {task.tags.map((tag) => <span key={tag} className="hidden rounded bg-[#F2EFE9] px-1.5 py-0.5 text-[#747D7C] sm:inline">{tag}</span>)}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <div className="hidden text-right sm:block">
          <p className="text-[10px] font-medium text-[#5E686A]">{task.assignee}</p>
          <p className={`mt-0.5 text-[9px] font-bold ${task.priority === "High" ? "text-[#D65B28]" : "text-[#8B9594]"}`}>{task.priority.toUpperCase()}</p>
        </div>
        <span className="flex size-7 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ backgroundColor: task.color }}>{task.initials}</span>
        <button type="button" className="rounded-md p-1 text-[#9BA2A0] opacity-0 transition hover:bg-[#F0ECE4] hover:text-[#13202E] group-hover:opacity-100 focus:opacity-100" aria-label={`Open ${task.title} menu`}><ChevronDown className="size-3.5" /></button>
      </div>
    </article>
  );
}

function LoadingState() {
  return <div className="space-y-2 p-1" aria-label="Loading task queue">{[0, 1, 2, 3].map((item) => <div key={item} className="h-[74px] animate-pulse rounded-xl bg-[#F1EEE8]" />)}</div>;
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex min-h-[302px] flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-[#FFF0E8] text-[#FF6B2C]"><SlidersHorizontal className="size-5" /></div>
      <h3 className="text-base font-bold tracking-[-0.04em] text-[#13202E]">Nothing is hiding here.</h3>
      <p className="mt-1 max-w-xs text-[12px] leading-5 text-[#7F8789]">Try widening the filter. Your most useful next task may be one setting away.</p>
      <Button variant="outline" size="sm" onClick={onClear} className="mt-4 border-[#D9D3C9] bg-white text-[11px] text-[#13202E] hover:bg-[#F5F1EA]">Clear filters</Button>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-[302px] flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-[#FAE9E8] text-[#A94A48]"><CircleAlert className="size-5" /></div>
      <h3 className="text-base font-bold tracking-[-0.04em] text-[#13202E]">The queue lost its signal.</h3>
      <p className="mt-1 max-w-xs text-[12px] leading-5 text-[#7F8789]">No task data was changed. Reconnect when you are ready to continue your work.</p>
      <Button size="sm" onClick={onRetry} className="mt-4 bg-[#13202E] text-[11px] text-white hover:bg-[#263847]">Reconnect queue</Button>
    </div>
  );
}
