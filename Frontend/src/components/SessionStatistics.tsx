import { useEffect, useState } from "react";
import { getSession } from "../endpoints/session";

const SessionStatistics = () => {
  const [error, setError] = useState("");
  const [sessionCompleted, setSessionCompleted] = useState();
  const [totalTime, setTotalTime] = useState();

  // Get past sessions statistics
  useEffect(() => {
    const handleGetSession = async () => {
      try {
        const response = await getSession(
          parseInt(localStorage.getItem("userId")!)
        );
        console.log(response);
        setSessionCompleted(response.data.count);
        setTotalTime(response.data.totalTime);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Login failed");
      }
    };

    handleGetSession();
  }, []);

  return (
    <div className="bg-linear-to-br from-[#2a3c58] to-[#1e2c42] rounded-2xl p-6 shadow-2xl border border-gray-700/50">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
        Quick Stats
      </h3>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-4">
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
