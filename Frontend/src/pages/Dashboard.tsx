import PomodoroTimer from "../components/PomodoroTimer";
import Header from "../components/Header";
import SessionStatistics from "../components/SessionStatistics";
import Tasks from "../components/Tasks";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#1a2a3a] to-[#213547] text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Focus Dashboard
            </h1>
            <p className="text-gray-300">Track your productivity and manage your time efficiently</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="space-y-6">
              <div className="bg-linear-to-br from-[#2a3c58] to-[#1e2c42] rounded-2xl p-6 shadow-2xl border border-gray-700/50">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-8 rounded-full bg-purple-500 mr-3"></div>
                  <h2 className="text-xl font-semibold">Pomodoro Timer</h2>
                </div>

                <div className="flex justify-center py-4">
                  <PomodoroTimer />
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700/50">
                  <p className="text-gray-300 text-sm">Stay focused for 25-minute intervals with short breaks to maximize productivity.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Tasks />
              <SessionStatistics />
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center text-gray-400 text-sm">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              Productivity increases with consistent focus sessions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;