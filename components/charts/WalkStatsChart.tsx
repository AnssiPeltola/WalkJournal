'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import type { WalkTotals } from '@/types/walk'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)

type Props = {
  stats: WalkTotals
}

export default function WalkStatsChart({ stats }: Props) {
  const data = {
    labels: [
      'Sessions',
      'Duration (min)',
      'Distance (km)',
      'Steps',
      'Calories',
    ],
    datasets: [
      {
        label: 'Total',
        data: [
          stats.totalSessions,
          Math.round(stats.totalDurationSec / 60), // seconds → minutes
          stats.totalDistanceKm,
          stats.totalSteps,
          stats.totalCalories,
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.6)', // Tailwind blue-500
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <div className="max-w-3xl rounded-lg bg-white p-4 shadow">
      <Bar data={data} options={options} />
    </div>
  )
}
