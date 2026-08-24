/**
 * Soft Signal Studio navigation: a quiet personal workspace rail with original DevFlow rhythm cues.
 */
import { Bell, CalendarDays, CircleHelp, Command, LayoutPanelTop, ListTodo, Settings, TimerReset } from "lucide-react";
import { DevflowMark } from "./DevflowMark";

const navItems = [
  { label: "Overview", key: "today", icon: LayoutPanelTop },
  { label: "My tasks", key: "tasks", icon: ListTodo, count: "6" },
  { label: "Calendar", key: "projects", icon: CalendarDays },
  { label: "Focus space", key: "activity", icon: TimerReset },
];

type DashboardSidebarProps = {
  activeNav: string;
  onNavChange: (key: string) => void;
};

export function DashboardSidebar({ activeNav, onNavChange }: DashboardSidebarProps) {
  return (
    <aside className="hidden w-[248px] shrink-0 xl:block">
      <div className="sticky top-5 flex min-h-[calc(100vh-40px)] flex-col rounded-[30px] bg-white p-5 shadow-[0_20px_45px_rgba(83,79,108,0.08)]">
        <DevflowMark withWordmark className="mb-9 px-1" />

        <nav className="space-y-1.5" aria-label="Workspace navigation">
          {navItems.map(({ label, key, icon: Icon, count }) => {
            const active = activeNav === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onNavChange(key)}
                className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-[13px] font-semibold transition duration-200 active:scale-[0.98] ${
                  active ? "bg-[#7765C8] text-white shadow-[0_9px_18px_rgba(119,101,200,0.22)]" : "text-[#67647A] hover:bg-[#F5F4FA] hover:text-[#3A3750]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="size-[16px]" strokeWidth={active ? 2.3 : 1.9} />
                <span>{label}</span>
                {count && <span className={`ml-auto rounded-full px-1.5 py-0.5 text-[9px] font-bold ${active ? "bg-white/16 text-white" : "bg-[#F0EEF7] text-[#7765C8]"}`}>{count}</span>}
              </button>
            );
          })}
        </nav>

        <section className="workbench-cue relative mt-7 overflow-hidden rounded-2xl bg-[#302A5B] p-4 text-white" aria-labelledby="pulse-note-title">
          <div className="absolute -right-5 -top-6 size-24 rounded-full bg-[#D9BBFF]/50 blur-xl" />
          <div className="absolute bottom-0 right-0 size-16 rounded-tl-full border-l border-t border-white/15" />
          <div className="relative">
            <div className="mb-3 flex items-center justify-between"><span className="flex size-7 items-center justify-center rounded-lg bg-white/12"><Command className="size-3.5 text-[#D9BBFF]" /></span><span className="text-[9px] font-bold tracking-[0.15em] text-[#CFC8F5]">PULSE CHECK</span></div>
            <h2 id="pulse-note-title" className="text-[15px] font-bold tracking-[-0.04em]">Protect your review window.</h2>
            <p className="mt-1.5 text-[11px] leading-4 text-[#D5D1EC]">Your next clean commit window starts in 24 minutes.</p>
            <button type="button" className="mt-4 rounded-lg bg-[#FF6B2C] px-3 py-2 text-[10px] font-bold tracking-[0.05em] text-white transition hover:bg-[#E75B20]">OPEN FOCUS SPACE</button>
          </div>
        </section>

        <div className="mt-auto border-t border-[#ECEAF2] pt-4">
          <button type="button" className="flex items-center gap-2 px-2 text-[11px] font-semibold text-[#8A8799] transition hover:text-[#433D71]"><CircleHelp className="size-4" /> Help centre</button>
          <button type="button" className="mt-3 flex items-center gap-2 px-2 text-[11px] font-semibold text-[#8A8799] transition hover:text-[#433D71]"><Settings className="size-4" /> Preferences</button>
          <div className="mt-5 flex items-center gap-2.5 rounded-xl bg-[#F8F7FB] p-2.5">
            <span className="flex size-8 items-center justify-center rounded-xl bg-[#302A5B] text-[9px] font-bold text-white">AC</span>
            <span className="min-w-0 flex-1"><span className="block truncate text-[11px] font-bold text-[#403C55]">Ava Chen</span><span className="mt-0.5 block truncate text-[9px] text-[#8A8799]">Personal workspace</span></span>
            <Bell className="size-3.5 text-[#7765C8]" />
          </div>
        </div>
      </div>
    </aside>
  );
}
