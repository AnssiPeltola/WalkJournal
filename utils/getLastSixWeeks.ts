export type WeekRange = {
  startDate: string
  endDate: string
  label: string
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
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      label: formatWeekLabel(startDate, endDate),
    })
  }

  return weeks
}
