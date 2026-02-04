import { getAllWalkSessions, getMonthlyDistanceTotals, getWalkDailyTotals, getWalkStats, getWalkStatsCurrentWeek, getLatestWalkSession, getWalkStatsLastWeek, getWeeklyDistanceTotals } from "@/db/queries";
import AddWalkForm from "@/components/walk/AddWalkForm";
// import WalkStatsChart from "@/components/charts/WalkStatsChart";
import WalkHeatmapChart from "@/components/charts/WalkHeatmapChart";
import DistanceTrendChart from "@/components/charts/DistanceTrendChart";
import TotalStatsDashboard from "@/components/stats/TotalStatsDashboard/TotalStatsDashboard";
import LatestWalkDashboard from "@/components/stats/LatestWalkDashboard/LatestWalkDashboard";
import CurrentWeekStatsDashboard from "@/components/stats/CurrentWeekStatsDashboard/CurrentWeekStatsDashboard";

export default async function Home() {
  // const allSessions = await getAllWalkSessions ()
  // console.log('All walk sessions:', allSessions)

  const totalStats = await getWalkStats();
  // console.log('Total sessions: ' + totalStats.totalSessions);
  // console.log('Total durationSec: ' + totalStats.totalDurationSec);
  // console.log('Total distanceKm: ' + totalStats.totalDistanceKm);
  // console.log('Total steps: ' + totalStats.totalSteps);
  // console.log('Total calories: ' + totalStats.totalCalories);

  const lastSessions = await getLatestWalkSession();
  const currentWeekStats = await getWalkStatsCurrentWeek();
  const lastWeekStats = await getWalkStatsLastWeek();
  const weeklyDistanceTotals = await getWeeklyDistanceTotals();
  const monthlyDistanceTotals = await getMonthlyDistanceTotals();

  const now = new Date();
  const year = now.getUTCFullYear();
  const startOfYear = new Date(Date.UTC(year, 0, 1));
  const endOfYear = new Date(Date.UTC(year, 11, 31));
  const startDate = startOfYear.toISOString().slice(0, 10);
  const endDate = endOfYear.toISOString().slice(0, 10);
  const dailyTotals = await getWalkDailyTotals(startDate, endDate);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-8 bg-gray-300">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">All Walk Sessions (Test)</h1>

      <pre className="w-full max-w-4xl p-4 bg-white text-gray-900 rounded-lg shadow overflow-x-auto">
        {JSON.stringify(totalStats, null, 2)}
      </pre>

      <AddWalkForm />
      {/* <WalkStatsChart stats={totalStats} /> */}
      <WalkHeatmapChart
        dailyTotals={dailyTotals}
        startDate={startDate}
        endDate={endDate}
        title={`Walk Distance Heatmap (${year})`}
      />
      <DistanceTrendChart
        weeklyData={weeklyDistanceTotals}
        monthlyData={monthlyDistanceTotals}
      />
      <h2 className="text-2xl font-bold mb-4">All Total Stats</h2>
      <TotalStatsDashboard stats={totalStats} />
      <h2 className="text-2xl font-bold mb-4">Latest Walk Stats</h2>
      <LatestWalkDashboard session={lastSessions} />
      <h2 className="text-2xl font-bold mb-4">Current Week Stats</h2>
      <CurrentWeekStatsDashboard currentWeek={currentWeekStats} lastWeek={lastWeekStats} />
    </main>
  );
}