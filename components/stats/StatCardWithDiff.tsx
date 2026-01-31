type StatCardWithDiffProps = {
  label: string;
  value: string | number;
  diff?: number | string;
};

export default function StatCardWithDiff({ label, value, diff }: StatCardWithDiffProps) {
  let isPositive = true;

  if (typeof diff === 'number') {
    isPositive = diff >= 0;
  } else if (typeof diff === 'string') {
    // Optional: parse number from string if it starts with + or - or contains numbers
    const numericPart = parseFloat(diff.replace(/[^\d.-]/g, ''));
    if (!isNaN(numericPart)) {
      isPositive = numericPart >= 0;
    }
  }

  return (
    <div className="p-4 bg-white rounded shadow text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      {diff !== undefined && (
        <p className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {diff}
        </p>
      )}
    </div>
  );
}
