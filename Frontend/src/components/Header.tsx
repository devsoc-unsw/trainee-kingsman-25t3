import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <header className="w-full px-6 py-4 bg-linear-to-r from-[#1a2a3a] to-[#213547] border-b border-gray-700/50 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold">🌱</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a2a3a]"></div>
          </div>

          <div>
            <h1 className="text-2xl font-bold bg-linear-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Farm N' Cram
            </h1>
            <p className="text-xs text-gray-400 font-medium">
              Grow Your Knowledge, Harvest Success
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <UserInfo />
          
          <div className="hidden md:block w-px h-8 bg-linear-to-b from-transparent via-gray-600 to-transparent"></div>

          <button
            onClick={handleLogout}
            className="group relative flex items-center space-x-2 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl px-5 py-3 font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-900/20 active:scale-95"
          >
            <div className="absolute inset-0 rounded-xl bg-linear-to-r from-red-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <svg
              className="w-5 h-5 transition-transform group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>

            <span className="relative">Logout</span>

            <div className="absolute -top-10 right-0 bg-gray-800 text-xs text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
              Return to login screen
              <div className="absolute -bottom-1 right-4 w-2 h-2 bg-gray-800 rotate-45"></div>
            </div>
          </button>

          <button className="md:hidden p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-green-500 via-blue-500 to-purple-500 opacity-20"></div>
    </header>
  );
};

export default Header;
