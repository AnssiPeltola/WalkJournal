type StatCardProps = {
  label: string
  value: string | number
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="w-44 p-4 m-1 bg-white rounded-2xl shadow-md border border-slate-200 text-center">
      <p className="text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}