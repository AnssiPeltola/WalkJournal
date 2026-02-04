export type MonthRange = {
  startDate: string
  endDate: string
  label: string
}

function formatMonthLabel(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function getLastSixMonths(): MonthRange[] {
  const today = new Date()
  const startOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  startOfCurrentMonth.setHours(0, 0, 0, 0)

  const months: MonthRange[] = []

  for (let i = 5; i >= 0; i -= 1) {
    const monthStart = new Date(
      startOfCurrentMonth.getFullYear(),
      startOfCurrentMonth.getMonth() - i,
      1
    )

    const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0)

    months.push({
      startDate: monthStart.toISOString().split('T')[0],
      endDate: monthEnd.toISOString().split('T')[0],
      label: formatMonthLabel(monthStart),
    })
  }

  return months
}
