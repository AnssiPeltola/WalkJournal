import { WalkTotalsCurrentWeek } from '@/types/walk';
import { formatDuration } from '@/utils/formatDuration';
import StatCardWithDiff from '../StatCardWithDiff';

type Props = {
  currentWeek: WalkTotalsCurrentWeek | null;
  lastWeek: WalkTotalsCurrentWeek | null;
};

export default function CurrentWeekStatsDashboard({ currentWeek, lastWeek }: Props) {
  type DiffDirection = 'up' | 'down' | 'same';
  type DiffResult = {
    label: string;
    descriptor: string;
    direction: DiffDirection;
  };

  const emptyTotals: WalkTotalsCurrentWeek = {
    totalSessions: 0,
    totalDurationSec: 0,
    totalDistanceKm: 0,
    totalSteps: 0,
    totalCalories: 0,
  };

  const current = currentWeek ?? emptyTotals;

  const buildDiff = (
    value: number,
    last?: number,
    options?: {
      decimals?: number;
      percentDecimals?: number;
      unit?: string;
      format?: (value: number) => string;
    }
  ): DiffResult | undefined => {
    if (last === undefined || last === null) return undefined;

    const decimals = options?.decimals ?? 0;
    const percentDecimals = options?.percentDecimals ?? 0;
    const difference = Number((value - last).toFixed(decimals));
    const direction: DiffDirection =
      difference > 0 ? 'up' : difference < 0 ? 'down' : 'same';
    const arrow = direction === 'up' ? '↑' : direction === 'down' ? '↓' : '→';
    const sign = difference >= 0 ? '+' : '-';
    const absDiff = Math.abs(difference);
    const absText = options?.format
      ? options.format(absDiff)
      : `${absDiff.toFixed(decimals)}${options?.unit ? ` ${options.unit}` : ''}`;

    const percent = last === 0 ? undefined : Math.abs((difference / last) * 100);
    const percentText =
      percent !== undefined
        ? ` (${sign}${percent.toFixed(percentDecimals)}%)`
        : '';

    const label = `${arrow} ${absText}${percentText}`;
    const descriptor =
      direction === 'up'
        ? 'More than last week'
        : direction === 'down'
          ? 'Less than last week'
          : 'Same as last week';

    return { label, descriptor, direction };
  };

  const sessionsDiff = buildDiff(current.totalSessions, lastWeek?.totalSessions, {
    unit: 'sessions',
  });
  const distanceDiff = buildDiff(current.totalDistanceKm, lastWeek?.totalDistanceKm, {
    unit: 'km',
    decimals: 2,
    percentDecimals: 1,
  });
  const stepsDiff = buildDiff(current.totalSteps, lastWeek?.totalSteps, {
    unit: '',
  });
  const timeDiff = buildDiff(current.totalDurationSec, lastWeek?.totalDurationSec, {
    format: (value) => formatDuration(value),
  });
  const caloriesDiff = buildDiff(current.totalCalories, lastWeek?.totalCalories, {
    unit: 'cal',
  });

  return (
    <section className="flex flex-wrap gap-2 mb-5">
      <StatCardWithDiff
        label="Total Sessions"
        value={current.totalSessions}
        diffLabel={sessionsDiff?.label}
        diffDescriptor={sessionsDiff?.descriptor}
        diffDirection={sessionsDiff?.direction}
      />
      <StatCardWithDiff
        label="Total Distance"
        value={`${current.totalDistanceKm} km`}
        diffLabel={distanceDiff?.label}
        diffDescriptor={distanceDiff?.descriptor}
        diffDirection={distanceDiff?.direction}
      />
      <StatCardWithDiff
        label="Total Steps"
        value={current.totalSteps}
        diffLabel={stepsDiff?.label}
        diffDescriptor={stepsDiff?.descriptor}
        diffDirection={stepsDiff?.direction}
      />
      <StatCardWithDiff
        label="Total Time"
        value={formatDuration(current.totalDurationSec)}
        diffLabel={timeDiff?.label}
        diffDescriptor={timeDiff?.descriptor}
        diffDirection={timeDiff?.direction}
      />
      <StatCardWithDiff
        label="Total Calories"
        value={current.totalCalories}
        diffLabel={caloriesDiff?.label}
        diffDescriptor={caloriesDiff?.descriptor}
        diffDirection={caloriesDiff?.direction}
      />
    </section>
  );
}
