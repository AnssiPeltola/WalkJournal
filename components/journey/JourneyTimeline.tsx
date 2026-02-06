import { JourneyLegProgress } from '@/types/goals'

type JourneyTimelineProps = {
  legs: JourneyLegProgress[]
  isLoading?: boolean
}

function formatKm(value: number, fractionDigits = 0): string {
  const safeValue = Number.isFinite(value) ? value : 0
  return safeValue.toFixed(fractionDigits)
}

export default function JourneyTimeline({ legs, isLoading = false }: JourneyTimelineProps) {
  if (isLoading) {
    return (
      <section className="w-full rounded-2xl bg-white p-5 shadow-md border border-slate-200 animate-pulse">
        <div className="h-5 w-1/3 rounded bg-slate-200" />
        <div className="mt-4 space-y-3">
          <div className="h-10 rounded bg-slate-200" />
          <div className="h-10 rounded bg-slate-200" />
          <div className="h-10 rounded bg-slate-200" />
        </div>
      </section>
    )
  }

  if (!legs.length) {
    return (
      <section className="w-full rounded-2xl bg-white p-5 shadow-md border border-slate-200">
        <p className="text-sm text-slate-600">No route segments available.</p>
      </section>
    )
  }

  return (
    <section className="w-full rounded-2xl bg-white p-5 shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900">Route Timeline</h3>
      <ol className="mt-4 space-y-3">
        {legs.map((leg) => {
          const isCompleted = leg.status === 'completed'
          const isCurrent = leg.status === 'current'
          const dotClass = isCompleted
            ? 'bg-emerald-500'
            : isCurrent
              ? 'bg-blue-500'
              : 'bg-slate-300'
          const textClass = isCompleted
            ? 'text-slate-700'
            : isCurrent
              ? 'text-slate-900 font-medium'
              : 'text-slate-500'

          return (
            <li key={leg.goal.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`} aria-hidden="true" />
                <div>
                  <p className={`text-sm ${textClass}`}>
                    {leg.goal.startCity} to {leg.goal.endCity}
                  </p>
                  <p className="text-xs text-slate-500">{leg.goal.name}</p>
                </div>
              </div>
              <span className="text-xs text-slate-500">{formatKm(leg.goal.segmentKm)} km</span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
