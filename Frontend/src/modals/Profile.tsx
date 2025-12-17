import React from 'react';

interface ProfileProps {
  onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-linear-to-br from-[#1a2a3a] to-[#213547] rounded-2xl shadow-2xl border border-gray-700/50 w-full max-w-md p-6 m-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-linear-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
            User Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-400 hover:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Profile Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-linear-to-r from-purple-500 to-blue-400 flex items-center justify-center mb-4 shadow-lg">
            <span className="text-4xl font-semibold">U</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-200">User Account</h3>
          <p className="text-sm text-gray-400">Ready to focus</p>
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
            <p className="text-xs text-gray-400 mb-1">Email</p>
            <p className="text-sm text-gray-200">user@example.com</p>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
            <p className="text-xs text-gray-400 mb-1">Status</p>
            <p className="text-sm text-gray-200">Active</p>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
            <p className="text-xs text-gray-400 mb-1">Member Since</p>
            <p className="text-sm text-gray-200">January 2025</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex space-x-3">
          <button className="flex-1 bg-linear-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-lg px-4 py-2 font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
            Edit Profile
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg px-4 py-2 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;