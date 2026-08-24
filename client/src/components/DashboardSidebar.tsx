/**
 * Kinetic Workbench navigation: a practical work rail with an orange tempo marker.
 */
import { Bell, CircleHelp, Gauge, LayoutPanelTop, ListTodo, Settings, Sparkles } from "lucide-react";
import { navigation } from "@/lib/dashboard-data";
import { DevflowMark } from "./DevflowMark";

const navIcons = {
  today: LayoutPanelTop,
  projects: Gauge,
  tasks: ListTodo,
  activity: Bell,
};

type DashboardSidebarProps = {
  activeNav: string;
  onNavChange: (key: string) => void;
};

export function DashboardSidebar({ activeNav, onNavChange }: DashboardSidebarProps) {
  return (
    <aside className="hidden h-screen w-[244px] shrink-0 flex-col border-r border-[#D8D3CA] bg-[#F7F4EE] px-4 py-5 lg:flex">
      <DevflowMark withWordmark className="mb-10 px-2" />

      <div className="mb-3 px-2 text-[10px] font-bold tracking-[0.17em] text-[#7F8789]">WORKSPACE</div>
      <nav className="space-y-1" aria-label="Main navigation">
        {navigation.map((item) => {
          const Icon = navIcons[item.key];
          const isActive = activeNav === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavChange(item.key)}
              className={`group relative flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-[14px] font-medium transition duration-200 ease-out active:scale-[0.98] ${
                isActive ? "bg-[#13202E] text-[#F7F4EE] shadow-[0_8px_20px_rgba(19,32,46,0.12)]" : "text-[#596164] hover:bg-[#EDE9E1] hover:text-[#13202E]"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && <span className="absolute -left-4 h-5 w-1 rounded-r-full bg-[#FF6B2C]" />}
              <Icon className="size-[17px]" strokeWidth={isActive ? 2.2 : 1.8} />
              <span>{item.label}</span>
              {item.key === "tasks" && <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] ${isActive ? "bg-white/10 text-white" : "bg-[#E3DED5] text-[#596164]"}`}>4</span>}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-[#E2DDD4] bg-[#FFFCF7] p-3.5 shadow-[0_8px_20px_rgba(37,41,42,0.04)]">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-[0.16em] text-[#7F8789]">WEEKLY TEMPO</span>
          <Sparkles className="size-3.5 text-[#FF6B2C]" />
        </div>
        <div className="flex items-end gap-1.5" aria-label="Weekly productivity, 84 percent">
          {[42, 57, 45, 72, 82, 68, 92].map((height, index) => (
            <span key={index} className="flex h-10 flex-1 items-end rounded-sm bg-[#F0ECE4] px-[2px]">
              <span className={`w-full rounded-sm ${index === 6 ? "bg-[#FF6B2C]" : "bg-[#AEB9BA]"}`} style={{ height: `${height}%` }} />
            </span>
          ))}
        </div>
        <p className="mt-3 text-[13px] font-medium text-[#13202E]">84% in a steady rhythm</p>
        <p className="mt-0.5 text-[11px] leading-4 text-[#7F8789]">+12% over last week</p>
      </div>

      <div className="mt-4 flex items-center justify-between px-2">
        <button type="button" className="flex items-center gap-2 text-xs font-medium text-[#7F8789] transition hover:text-[#13202E]" aria-label="Open help">
          <CircleHelp className="size-4" /> Help
        </button>
        <button type="button" className="rounded-lg p-1.5 text-[#7F8789] transition hover:bg-[#EDE9E1] hover:text-[#13202E]" aria-label="Open settings">
          <Settings className="size-4" />
        </button>
      </div>
    </aside>
  );
}
