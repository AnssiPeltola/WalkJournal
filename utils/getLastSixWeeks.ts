import type { WeekRange } from '@/types/time'

// Build YYYY-MM-DD using local time to avoid UTC date shifts.
function formatLocalDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatWeekLabel(start: Date, end: Date): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  })
  return `${formatter.format(start)}–${formatter.format(end)}`
}

export function getLastSixWeeks(): WeekRange[] {
  const today = new Date()
  const day = today.getDay() // Sunday = 0, Monday = 1
  const diffToMonday = day === 0 ? 6 : day - 1

  const startOfCurrentWeek = new Date(today)
  startOfCurrentWeek.setDate(today.getDate() - diffToMonday)
  startOfCurrentWeek.setHours(0, 0, 0, 0)

  const weeks: WeekRange[] = []

  for (let i = 5; i >= 0; i -= 1) {
    const startDate = new Date(startOfCurrentWeek)
    startDate.setDate(startOfCurrentWeek.getDate() - i * 7)

    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + 6)

    weeks.push({
      startDate: formatLocalDate(startDate),
      endDate: formatLocalDate(endDate),
      label: formatWeekLabel(startDate, endDate),
    })
  }

  return weeks
}
