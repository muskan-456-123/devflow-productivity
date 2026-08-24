/**
 * Kinetic Workbench logo: an offset orbital bracket with Flow Orange motion cues.
 */
type DevflowMarkProps = {
  className?: string;
  withWordmark?: boolean;
};

export function DevflowMark({ className = "", withWordmark = false }: DevflowMarkProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/manus-storage/devflow-mark_60c6b783.png"
        alt="DevFlow"
        className="size-9 rounded-[11px] object-cover shadow-[0_7px_16px_rgba(255,107,44,0.18)]"
      />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-['Space_Grotesk'] text-[18px] font-bold tracking-[-0.075em] text-[#13202E]">
            dev<span className="text-[#FF6B2C]">flow</span>
          </span>
          <span className="mt-1 text-[7px] font-bold tracking-[0.18em] text-[#7F8789]">MOMENTUM SYSTEM</span>
        </span>
      )}
    </div>
  );
}
