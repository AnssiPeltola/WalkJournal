import ProgressBar from './ProgressBar'
import { JourneyProgress } from '@/types/goals'

type ProgressCardProps = {
  progress: JourneyProgress | null
  isLoading?: boolean
}

function formatKm(value: number, fractionDigits = 1): string {
  const safeValue = Number.isFinite(value) ? value : 0
  return safeValue.toFixed(fractionDigits)
}

export default function ProgressCard({ progress, isLoading = false }: ProgressCardProps) {
  if (isLoading) {
    return (
      <section className="w-full rounded-2xl bg-white p-5 shadow-md border border-slate-200 animate-pulse">
        <div className="h-5 w-2/3 rounded bg-slate-200" />
        <div className="mt-4 h-3 w-full rounded bg-slate-200" />
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="h-14 rounded bg-slate-200" />
          <div className="h-14 rounded bg-slate-200" />
        </div>
      </section>
    )
  }

  if (!progress || progress.legs.length === 0) {
    return (
      <section className="w-full rounded-2xl bg-white p-5 shadow-md border border-slate-200">
        <p className="text-sm text-slate-600">No journey data yet. Add walks or goals to begin.</p>
      </section>
    )
  }

  const currentLeg = progress.currentLeg
  const legLabel = currentLeg
    ? `${currentLeg.goal.startCity} to ${currentLeg.goal.endCity}`
    : 'Journey complete'

  return (
    <section className="w-full rounded-2xl bg-white p-5 shadow-md border border-slate-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Current Leg</h3>
        <span className="text-sm text-emerald-600 font-medium">{Math.round(progress.progressPercent)}%</span>
      </div>
      <p className="mt-1 text-sm text-slate-600">{legLabel}</p>

      <ProgressBar value={progress.progressPercent} label="Journey progress" className="mt-4" />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Remaining</p>
          <p className="text-lg font-semibold text-slate-900">
            {formatKm(progress.remainingKm)} km
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Total walked</p>
          <p className="text-lg font-semibold text-slate-900">
            {formatKm(progress.totalKm)} km
          </p>
        </div>
      </div>
    </section>
  )
}
