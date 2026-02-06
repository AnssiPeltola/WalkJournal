type ProgressBarProps = {
  value: number
  label?: string
  className?: string
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export default function ProgressBar({ value, label = 'Progress', className = '' }: ProgressBarProps) {
  const clampedValue = clamp(value, 0, 100)

  return (
    <div className={className} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={clampedValue}>
      <div className="h-3 w-full rounded-full bg-slate-200">
        <div
          className="h-3 rounded-full bg-emerald-500 transition-[width] duration-700 ease-out"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      <span className="sr-only">{label}: {clampedValue}%</span>
    </div>
  )
}
