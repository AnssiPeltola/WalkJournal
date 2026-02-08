'use client'

import { useEffect, useMemo, useState } from 'react'
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
  const baseWindowSize = 5

  const initialWindow = useMemo(() => {
    if (!legs.length) return { start: 0, end: 0 }

    const currentIndex = legs.findIndex((leg) => leg.status === 'current')
    const upcomingIndex = legs.findIndex((leg) => leg.status === 'upcoming')
    const anchorIndex = currentIndex >= 0 ? currentIndex : (upcomingIndex >= 0 ? upcomingIndex : legs.length - 1)

    let start = Math.max(0, anchorIndex - 2)
    let end = start + baseWindowSize
    if (end > legs.length) {
      end = legs.length
      start = Math.max(0, end - baseWindowSize)
    }

    return { start, end }
  }, [legs])

  const [visibleStart, setVisibleStart] = useState(initialWindow.start)

  useEffect(() => {
    setVisibleStart(initialWindow.start)
  }, [initialWindow])

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

  const visibleEnd = Math.min(legs.length, visibleStart + baseWindowSize)
  const visibleLegs = legs.slice(visibleStart, visibleEnd)
  const canShowEarlier = visibleStart > 0
  const canShowLater = visibleEnd < legs.length

  return (
    <section className="w-full rounded-2xl bg-white p-5 shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900">Route Timeline</h3>
      <ol className="mt-4 space-y-3">
        {visibleLegs.map((leg) => {
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
      {(canShowEarlier || canShowLater) && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setVisibleStart((start) => Math.max(0, start - baseWindowSize))}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!canShowEarlier}
          >
            Show earlier
          </button>
          <button
            type="button"
            onClick={() => setVisibleStart((start) => Math.min(Math.max(0, legs.length - baseWindowSize), start + baseWindowSize))}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!canShowLater}
          >
            Show later
          </button>
        </div>
      )}
    </section>
  )
}
