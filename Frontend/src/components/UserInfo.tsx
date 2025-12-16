import { useState } from "react";
import Profile from "../modals/Profile";

const UserInfo = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
      <div className="hidden md:flex items-center px-4 py-2 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:bg-gray-700/40 transition-colors cursor-pointer">
        <button className="flex space-x-3" onClick={() => setShowProfile(true)}>
          <div className="w-8 h-8 rounded-full bg-linear-to-r from-purple-500 to-blue-400 flex items-center justify-center">
            <span className="text-sm font-semibold">U</span>
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-200">User Account</p>
            <p className="text-xs text-gray-400">Ready to focus</p>
          </div>
        </button>
      </div>
    </>
  );
};

export default UserInfo;
