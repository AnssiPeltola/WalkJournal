'use client'

import { useMemo, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import type { DistanceTrendPoint } from '@/types/walk'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

type Props = {
  weeklyData: DistanceTrendPoint[]
  monthlyData: DistanceTrendPoint[]
}

type ViewMode = 'weekly' | 'monthly'

export default function DistanceTrendChart({ weeklyData, monthlyData }: Props) {
  const [view, setView] = useState<ViewMode>('weekly')

  const activeData = view === 'weekly' ? weeklyData : monthlyData

  const chartData = useMemo(() => {
    return {
      labels: activeData.map((item) => item.label),
      datasets: [
        {
          label: view === 'weekly' ? 'Weekly Distance' : 'Monthly Distance',
          data: activeData.map((item) => item.totalKm),
          backgroundColor: 'rgba(59, 130, 246, 0.6)',
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    }
  }, [activeData, view])

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label ?? ''
            const value = context.parsed.y ?? 0
            return `${label}: ${value} km`
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          autoSkip: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Distance (km)',
        },
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-md border border-slate-200">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Distance Trend</h3>
        <div className="flex overflow-hidden rounded-md border border-gray-200">
          <button
            type="button"
            onClick={() => setView('weekly')}
            className={`px-3 py-1 text-sm font-medium transition ${
              view === 'weekly'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Weekly
          </button>
          <button
            type="button"
            onClick={() => setView('monthly')}
            className={`px-3 py-1 text-sm font-medium transition ${
              view === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>
      <div className="h-96 w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}
