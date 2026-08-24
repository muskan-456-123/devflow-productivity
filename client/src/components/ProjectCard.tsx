/**
 * Kinetic Workbench project card: uneven, tactile card composition with a segmented progress band.
 */
import { ArrowUpRight, MoreHorizontal } from "lucide-react";
import { projects } from "@/lib/dashboard-data";
import { SegmentedProgress } from "./SegmentedProgress";

type ProjectCardProps = {
  project: (typeof projects)[number];
  active: boolean;
  featured?: boolean;
  onSelect: () => void;
};

export function ProjectCard({ project, active, featured = false, onSelect }: ProjectCardProps) {
  return (
    <article
      className={`workbench-surface group relative min-w-[250px] overflow-hidden rounded-2xl border p-4 transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_24px_rgba(19,32,46,0.08)] ${featured ? "min-w-[322px]" : ""} ${
        active ? "border-[#13202E] bg-[#13202E] text-[#FAF7F1] shadow-[0_12px_24px_rgba(19,32,46,0.13)]" : "border-[#E2DDD4] bg-[#FFFCF7] text-[#13202E]"
      }`}
    >
      {featured && <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 text-[8px] font-bold tracking-[0.13em] text-[#9A9288]"><span className="h-px w-6 bg-[#BEB6AC]" />RUNWAY 01</div>}
      <div className={`mb-7 flex items-center justify-between border-b pb-2.5 ${active ? "border-white/10" : "border-[#E9E4DC]"}`}>
        <button type="button" onClick={onSelect} className="flex items-center gap-2 text-left" aria-label={`Filter tasks by ${project.name}`}>
          <span className="size-2.5 rounded-full" style={{ backgroundColor: project.color }} />
          <span className={`text-[10px] font-bold tracking-[0.16em] ${active ? "text-[#D5D8D5]" : "text-[#7F8789]"}`}>{project.label}</span>
        </button>
        <button type="button" className={`rounded-lg p-1 transition ${active ? "hover:bg-white/10" : "hover:bg-[#F0ECE4]"}`} aria-label={`More options for ${project.name}`}>
          <MoreHorizontal className="size-4" />
        </button>
      </div>
      <button type="button" onClick={onSelect} className="block text-left">
        <h3 className="text-[17px] font-bold tracking-[-0.04em]">{project.name}</h3>
        <p className={`mt-1.5 min-h-10 text-[12px] leading-5 ${active ? "text-[#BCC5C5]" : "text-[#737C7E]"}`}>{project.description}</p>
      </button>
      <div className="mt-5">
        <div className={`mb-2 flex items-center justify-between text-[11px] ${active ? "text-[#D5D8D5]" : "text-[#737C7E]"}`}>
          <span>{project.update}</span>
          <span className="font-bold text-[13px]" style={{ color: active ? "#FF8A5C" : project.color }}>{project.progress}%</span>
        </div>
        <SegmentedProgress value={project.progress} color={project.color} />
      </div>
      <button type="button" onClick={onSelect} className={`mt-4 flex items-center gap-1 text-[11px] font-bold tracking-[0.08em] transition ${active ? "text-[#FF8A5C]" : "text-[#596164] group-hover:text-[#FF6B2C]"}`}>
        VIEW RUNWAY <ArrowUpRight className="size-3" />
      </button>
    </article>
  );
}
