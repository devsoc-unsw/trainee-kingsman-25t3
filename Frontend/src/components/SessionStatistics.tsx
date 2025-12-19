import { useEffect, useState } from "react";
import { getSession } from "../endpoints/session";
import { getUserStreak } from "../endpoints/auth";

const SessionStatistics = () => {
  const [error, setError] = useState("");
  const [sessionCompleted, setSessionCompleted] = useState();
  const [totalTime, setTotalTime] = useState();
  const [streak, setStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Get past sessions statistics and user streak
  useEffect(() => {
    const handleGetData = async () => {
      try {
        setIsLoading(true);
        const userId = parseInt(localStorage.getItem("userId")!);

        const [sessionResponse, streakResponse] = await Promise.all([
          getSession(userId),
          getUserStreak(userId)
        ]);

        console.log(sessionResponse, streakResponse);
        setSessionCompleted(sessionResponse.data.count);
        setTotalTime(sessionResponse.data.totalTime);
        setStreak(streakResponse.data.streak);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load stats");
      } finally {
        setIsLoading(false);
      }
    };

    handleGetData();
  }, []);

  return (
    <div className="bg-linear-to-br from-[#2a3c58] to-[#1e2c42] rounded-2xl p-6 shadow-2xl border border-gray-700/50">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
        Quick Stats
      </h3>
      {error ? (
        <p className="text-red-500">{error}</p>
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
