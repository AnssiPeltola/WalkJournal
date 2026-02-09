type StatCardWithDiffProps = {
  label: string;
  value: string | number;
  diffLabel?: string;
  diffDescriptor?: string;
  diffDirection?: 'up' | 'down' | 'same';
};

export default function StatCardWithDiff({
  label,
  value,
  diffLabel,
  diffDescriptor,
  diffDirection,
}: StatCardWithDiffProps) {
  const diffColorClass =
    diffDirection === 'up'
      ? 'text-green-600'
      : diffDirection === 'down'
        ? 'text-red-600'
        : 'text-gray-500';

  return (
    <div className="w-46 p-4 m-1 bg-white rounded-2xl shadow-md border border-slate-200 text-center">
      <p className="text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      {diffLabel && (
        <p className={`text-sm font-semibold ${diffColorClass}`}>{diffLabel}</p>
      )}
      {diffDescriptor && (
        <p className="text-xs text-gray-500">{diffDescriptor}</p>
      )}
    </div>
  );
}
