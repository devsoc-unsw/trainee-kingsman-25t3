import { useState } from "react";
import PlantShop from "../components/PlantShop";
import FarmGrid from "../components/FarmGrid";

const Farm = () => {
  const userId = parseInt(localStorage.getItem("userId") || "0");
  const [showShop, setShowShop] = useState(true);

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a2332] via-[#2a3c58] to-[#1e2c42] flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl mb-4">Please log in to access your farm</p>
          <a href="/login" className="text-purple-400 hover:text-purple-300">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2332] via-[#2a3c58] to-[#1e2c42] p-8">
      <div className="max-w-7xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Farm</h1>
          <p className="text-gray-400">
            Complete tasks to earn bucks, buy plants, and grow your farm!
          </p>
        </div>

        {/* TOGGLE BUTTONS */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setShowShop(false)}
            className={`
              px-6 py-3 rounded-xl font-semibold transition-all duration-200
              ${
                !showShop
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
              }
            `}
          >
            🌾 My Farm
          </button>
          <button
            onClick={() => setShowShop(true)}
            className={`
              px-6 py-3 rounded-xl font-semibold transition-all duration-200
              ${
                showShop
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
              }
            `}
          >
            🏪 Plant Shop
          </button>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 gap-6">
          {showShop ? (
            <PlantShop
              userId={userId}
              onPurchaseSuccess={() => setShowShop(false)}
            />
          ) : (
            <FarmGrid userId={userId} gridSize={{ rows: 4, cols: 4 }} />
          )}
        </div>

        {/* INFO CARDS */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-[#2a3c58] to-[#1e2c42] rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-3">
              <span className="text-3xl">✅</span>
              <div>
                <p className="text-gray-400 text-sm">Complete Tasks</p>
                <p className="text-white font-semibold">Earn 10 bucks per task</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#2a3c58] to-[#1e2c42] rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⏰</span>
              <div>
                <p className="text-gray-400 text-sm">Focus Sessions</p>
                <p className="text-white font-semibold">Earn 1 buck per minute</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#2a3c58] to-[#1e2c42] rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔥</span>
              <div>
                <p className="text-gray-400 text-sm">Streak Bonus</p>
                <p className="text-white font-semibold">Multiplier coming soon!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farm;
