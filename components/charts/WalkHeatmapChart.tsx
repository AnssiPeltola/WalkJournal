'use client'

import { useMemo } from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  Legend,
  ScriptableContext,
  ChartData,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix'
import type { WalkDailyTotal } from '@/types/walk'

ChartJS.register(MatrixController, MatrixElement, LinearScale, Tooltip, Legend)

type Props = {
  dailyTotals: WalkDailyTotal[]
  startDate: string
  endDate: string
  title?: string
}

type HeatmapPoint = {
  x: number
  y: number
  v: number
  date: string
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const toUtcDate = (date: string) => new Date(`${date}T00:00:00Z`)
// Format dates for tooltip display in Finnish locale.
const formatDateLabel = (isoDate: string) =>
  new Intl.DateTimeFormat('fi-FI', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(`${isoDate}T00:00:00Z`))

const getWeekIndex = (start: Date, startDayOfWeek: number, date: Date) => {
  const dayMs = 24 * 60 * 60 * 1000
  const daysFromStart = Math.floor((date.getTime() - start.getTime()) / dayMs)
  return Math.floor((daysFromStart + startDayOfWeek) / 7)
}

export default function WalkHeatmapChart({
  dailyTotals,
  startDate,
  endDate,
  title = 'Walk Distance Heatmap',
}: Props) {
  const { points, weeks, maxValue, monthLabels } = useMemo(() => {
    // Aggregate totals by date for quick lookups when building the heatmap grid.
    const totalsByDate = new Map(
      dailyTotals.map((item) => [item.date, item.totalDistanceKm])
    )

    const start = toUtcDate(startDate)
    const end = toUtcDate(endDate)

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return {
        points: [] as HeatmapPoint[],
        weeks: 0,
        maxValue: 0,
        monthLabels: new Map<number, string>(),
      }
    }

    const dayMs = 24 * 60 * 60 * 1000
    // Shift to Monday-first week indexing (Mon = 0 ... Sun = 6).
    const startDayOfWeek = (start.getUTCDay() + 6) % 7
    const points: HeatmapPoint[] = []
    let maxValue = 0
    let maxWeekIndex = 0

    for (let time = start.getTime(); time <= end.getTime(); time += dayMs) {
      const dateObj = new Date(time)
      const isoDate = dateObj.toISOString().slice(0, 10)
      const dayOfWeek = (dateObj.getUTCDay() + 6) % 7
      const weekIndex = getWeekIndex(start, startDayOfWeek, dateObj)
      const value = totalsByDate.get(isoDate) ?? 0

      maxValue = Math.max(maxValue, value)
      maxWeekIndex = Math.max(maxWeekIndex, weekIndex)

      points.push({ x: weekIndex, y: dayOfWeek, v: value, date: isoDate })
    }

    // Build month label positions aligned to the first day of each month.
    const monthLabels = new Map<number, string>()
    const monthCursor = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1))
    if (monthCursor < start) {
      monthCursor.setUTCMonth(monthCursor.getUTCMonth() + 1)
    }

    while (monthCursor <= end) {
      const weekIndex = getWeekIndex(start, startDayOfWeek, monthCursor)
      monthLabels.set(weekIndex, monthNames[monthCursor.getUTCMonth()])
      monthCursor.setUTCMonth(monthCursor.getUTCMonth() + 1)
    }

    return { points, weeks: maxWeekIndex + 1, maxValue, monthLabels }
  }, [dailyTotals, startDate, endDate])

  const data: ChartData<'matrix', HeatmapPoint[]> = {
    datasets: [
      {
        label: 'Distance (km)',
        data: points,
        borderRadius: 2,
        borderWidth: 0,
        backgroundColor: (ctx: ScriptableContext<'matrix'>) => {
          const point = ctx.raw as HeatmapPoint | undefined
          const value = point?.v ?? 0
          // Convert distance to color intensity (higher distance = darker cell).
          if (maxValue === 0) return 'rgba(37, 99, 235, 0.08)'
          const intensity = Math.min(value / maxValue, 1)
          const alpha = 0.15 + intensity * 0.85
          return `rgba(37, 99, 235, ${alpha})`
        },
        width: (ctx: ScriptableContext<'matrix'>) => {
          const area = ctx.chart.chartArea
          if (!area) return 0
          const gap = 1.5
          const maxSize = 14
          const minSize = 4
          const cellW = (area.right - area.left) / Math.max(weeks, 1) - gap
          const cellH = (area.bottom - area.top) / 6.5 - gap
          const size = Math.min(cellW, cellH)
          return Math.max(Math.min(size, maxSize), minSize)
        },
        height: (ctx: ScriptableContext<'matrix'>) => {
          const area = ctx.chart.chartArea
          if (!area) return 0
          const gap = 1.5
          const maxSize = 14
          const minSize = 4
          const cellW = (area.right - area.left) / Math.max(weeks, 1) - gap
          const cellH = (area.bottom - area.top) / 6.5 - gap
          const size = Math.min(cellW, cellH)
          return Math.max(Math.min(size, maxSize), minSize)
        },
      },
    ],
  }

  const monthLabelLookup = monthLabels

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        left: 4,
        top: 6,
      },
    },
    scales: {
      x: {
        type: 'linear' as const,
        position: 'top' as const,
        offset: true,
        min: 0,
        max: Math.max(weeks - 1, 0),
        ticks: {
          autoSkip: false,
          stepSize: 1,
          maxRotation: 0,
          minRotation: 0,
          padding: 6,
          callback: (value: string | number) => {
            const numericValue = typeof value === 'string' ? Number(value) : value
            const label = monthLabelLookup.get(numericValue)
            return label ?? ''
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        type: 'linear' as const,
        offset: true,
        reverse: true,
        min: 0,
        max: 6,
        ticks: {
          autoSkip: false,
          stepSize: 1,
          padding: 6,
          callback: (value: string | number) => {
            const numericValue = typeof value === 'string' ? Number(value) : value
            if (numericValue === 0) return 'Mon'
            if (numericValue === 1) return 'Tue'
            if (numericValue === 2) return 'Wed'
            if (numericValue === 3) return 'Thu'
            if (numericValue === 4) return 'Fri'
            if (numericValue === 5) return 'Sat'
            if (numericValue === 6) return 'Sun'
            return ''
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        // Show tooltip only on days that actually have a recorded distance.
        enabled: true,
        filter: (ctx: { raw?: unknown }) => {
          const point = ctx.raw as HeatmapPoint | undefined
          return (point?.v ?? 0) > 0
        },
        callbacks: {
          title: (items: Array<{ raw?: unknown }>) => {
            const point = items[0]?.raw as HeatmapPoint | undefined
            return point ? formatDateLabel(point.date) : ''
          },
          label: (ctx: { raw?: unknown }) => {
            const point = ctx.raw as HeatmapPoint | undefined
            if (!point) return ''
            return `${point.v.toFixed(2)} km`
          },
        },
      },
    },
  }

  return (
    <section className="w-full max-w-5xl rounded-lg bg-white p-4 shadow">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">{title}</h2>
      <div className="relative h-40 w-full">
        <Chart type="matrix" data={data} options={options} />
      </div>
    </section>
  )
}
