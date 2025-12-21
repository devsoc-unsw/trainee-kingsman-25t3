import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Profile from "../modals/Profile";
import { getUserBucks } from "../endpoints/plant";
import { CHARACTERS } from "../data/characterData";

const UserInfo = () => {
  const [showProfile, setShowProfile] = useState(false);
  const userId = parseInt(localStorage.getItem("userId") || "0");

  const [equippedId, setEquippedId] = useState<number>(1);

  // Dynamically updates avatar automatically when equippedId changes
  const userImage = CHARACTERS.find(c => c.id === equippedId)?.image || CHARACTERS[0].image;

  // Fetch user's bucks balance
  const { data: bucksData } = useQuery({
    queryKey: ["userBucks", userId],
    queryFn: async () => {
      const response = await getUserBucks(userId);
      return response.data;
    },
    enabled: !!userId,
    refetchInterval: 5000,
  });

  const currentBucks = bucksData?.bucksValue ?? 0;

  return (
    <>
      {showProfile && (
        <Profile 
            onClose={() => setShowProfile(false)} 
            currentBucks={currentBucks}
            equippedId={equippedId}       
            setEquippedId={setEquippedId} 
        />
      )}
      <div className="hidden md:flex items-center gap-3">
        {/* Bucks Display */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-yellow-500/20 border border-yellow-500/50">
          <span className="text-xl">💰</span>
          <span className="font-bold text-yellow-400">{currentBucks}</span>
        </div>

        {/* User Profile Button */}
        <div className="flex items-center px-4 py-2 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:bg-gray-700/40 transition-colors cursor-pointer">
          <button className="flex space-x-3 cursor-pointer" onClick={() => setShowProfile(true)}>
            <div className="w-8 h-8 rounded-full bg-linear-to-r from-purple-500 to-blue-400 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-500">
             <img 
               src={userImage} 
               alt="User Avatar" 
               className="w-full h-full object-cover" 
             />
          </div>

            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-200">User Account</p>
              <p className="text-xs text-gray-400">Ready to focus</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
