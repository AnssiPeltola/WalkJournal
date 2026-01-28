import { getAllWalkSessions, getWalkStats } from "@/db/queries";
import AddWalkForm from "@/components/walk/AddWalkForm";

export default async function Home() {
  const allSessions = await getAllWalkSessions ()
  console.log('All walk sessions:', allSessions)

  const totalStats = await getWalkStats();
  console.log('Total sessions: ' + totalStats.totalSessions);
  console.log('Total durationSec: ' + totalStats.totalDurationSec);
  console.log('Total distanceKm: ' + totalStats.totalDistanceKm);
  console.log('Total steps: ' + totalStats.totalSteps);
  console.log('Total calories: ' + totalStats.totalCalories);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">All Walk Sessions (Test)</h1>

      <pre className="w-full max-w-4xl p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow overflow-x-auto">
        {JSON.stringify(totalStats, null, 2)}
      </pre>

      <AddWalkForm />
    </main>
  );
}