/**
 * Kinetic Workbench progress: visible task momentum using segmented status bands.
 */
type SegmentedProgressProps = {
  value: number;
  color?: string;
  segments?: number;
  className?: string;
};

export function SegmentedProgress({ value, color = "#FF6B2C", segments = 8, className = "" }: SegmentedProgressProps) {
  const filled = Math.max(1, Math.round((value / 100) * segments));
  return (
    <div className={`flex gap-1 ${className}`} aria-label={`${value}% complete`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      {Array.from({ length: segments }).map((_, index) => (
        <span
          key={index}
          className="h-1.5 flex-1 rounded-full"
          style={{ backgroundColor: index < filled ? color : "#E5E1D9" }}
        />
      ))}
    </div>
  );
}
