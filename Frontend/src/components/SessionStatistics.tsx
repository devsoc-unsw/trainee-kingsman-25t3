import { useQuery } from "@tanstack/react-query";
import { getSession } from "../endpoints/session";
import { getUserStreak } from "../endpoints/auth";

const SessionStatistics = () => {
  const userId = parseInt(localStorage.getItem("userId")!);

  const { data: sessionData, error: sessionError, isLoading: sessionLoading } = useQuery({
    queryKey: ['sessions', userId],
    queryFn: () => getSession(userId),
  });

  const { data: streakData, error: streakError, isLoading: streakLoading } = useQuery({
    queryKey: ['userStreak', userId],
    queryFn: () => getUserStreak(userId),
  });

  const isLoading = sessionLoading || streakLoading;
  const error = sessionError || streakError;
  const sessionCompleted = sessionData?.data.count;
  const totalTime = sessionData?.data.totalTime;
  const streak = streakData?.data.streak ?? 0;

  return (
    <div className="bg-linear-to-br from-[#2a3c58] to-[#1e2c42] rounded-2xl p-6 shadow-2xl border border-gray-700/50">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
        Quick Stats
      </h3>
      {error ? (
        <p className="text-red-500">{error instanceof Error ? error.message : "Failed to load stats"}</p>
      ) : isLoading ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-600/50 rounded w-24 animate-pulse"></div>
            <div className="h-4 bg-gray-600/50 rounded w-16 animate-pulse"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-600/50 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-gray-600/50 rounded w-8 animate-pulse"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-600/50 rounded w-20 animate-pulse"></div>
            <div className="h-4 bg-gray-600/50 rounded w-12 animate-pulse"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-600/50 rounded w-24 animate-pulse"></div>
            <div className="h-4 bg-gray-600/50 rounded w-16 animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/30">
            <span className="text-gray-300 flex items-center">
              <span className="text-2xl mr-2">🔥</span>
              Current Streak
            </span>
            <span className="font-bold text-orange-400 text-lg">{streak} days</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Today's Focus</span>
            <span className="font-medium">{totalTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Completed Sessions</span>
            <span className="font-medium">{sessionCompleted}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Weekly Goal</span>
            <span className="font-medium">75%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionStatistics;
