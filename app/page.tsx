import { getMonthlyDistanceTotals, getWalkDailyTotals, getWalkStats, getWalkStatsCurrentWeek, getLatestWalkSession, getWalkStatsLastWeek, getWeeklyDistanceTotals } from "@/db/queries";
import { getJourneyProgressAction } from "@/app/actions";
import AddWalkForm from "@/components/walk/AddWalkForm";
import WalkHeatmapChart from "@/components/charts/WalkHeatmapChart";
import DistanceTrendChart from "@/components/charts/DistanceTrendChart";
import TotalStatsDashboard from "@/components/stats/TotalStatsDashboard/TotalStatsDashboard";
import LatestWalkDashboard from "@/components/stats/LatestWalkDashboard/LatestWalkDashboard";
import CurrentWeekStatsDashboard from "@/components/stats/CurrentWeekStatsDashboard/CurrentWeekStatsDashboard";
import { JourneySection } from "@/components/journey";

export default async function Home() {
  const totalStats = await getWalkStats();
  const lastSessions = await getLatestWalkSession();
  const currentWeekStats = await getWalkStatsCurrentWeek();
  const lastWeekStats = await getWalkStatsLastWeek();
  const weeklyDistanceTotals = await getWeeklyDistanceTotals();
  const monthlyDistanceTotals = await getMonthlyDistanceTotals();
  const journeyProgress = await getJourneyProgressAction();

  const now = new Date();
  const year = now.getUTCFullYear();
  const startOfYear = new Date(Date.UTC(year, 0, 1));
  const endOfYear = new Date(Date.UTC(year, 11, 31));
  const startDate = startOfYear.toISOString().slice(0, 10);
  const endDate = endOfYear.toISOString().slice(0, 10);
  const dailyTotals = await getWalkDailyTotals(startDate, endDate);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-8 bg-gray-300">
      <h2 className="text-2xl font-bold mb-4">All Total Stats</h2>
      <TotalStatsDashboard stats={totalStats} />
      <h2 className="text-2xl font-bold mb-4">Current Week Stats</h2>
      <CurrentWeekStatsDashboard currentWeek={currentWeekStats} lastWeek={lastWeekStats} />
      <section className="w-full max-w-6xl">
        <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-start mb-5">
          <AddWalkForm />
          <div className="w-full max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Latest Walk Stats</h2>
            <LatestWalkDashboard session={lastSessions} />
          </div>
        </div>
      </section>
      <section className="w-full max-w-6xl mb-5">
        <h2 className="text-2xl font-bold mb-4">Journey Progress</h2>
        <JourneySection progress={journeyProgress} />
      </section>
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
    </main>
  );
}