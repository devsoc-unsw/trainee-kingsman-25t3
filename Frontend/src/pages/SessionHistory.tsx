import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

interface Session {
  id: number;
  userId: number;
  duration: number;
  type: string;
  done: boolean;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface GroupedSessions {
  [date: string]: Session[];
}

interface PaginationData {
  data: Session[];
  nextCursor: number | null;
  prevCursor: number | null;
  hasMore: boolean;
}

const SessionHistory = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [groupedSessions, setGroupedSessions] = useState<GroupedSessions>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [prevCursor, setPrevCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Get userId from localStorage (you may need to adjust this based on your auth implementation)
  const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.userId || payload.sub || payload.id;
    } catch (e) {
      console.error("Failed to parse token:", e);
      return null;
    }
  };

  const fetchSessions = async (cursor?: number, direction: "prev" | "next" = "next") => {
    setLoading(true);
    setError(null);

    const userId = getUserId();
    if (!userId) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      const url = cursor
        ? `http://localhost:3000/sessions/statistics/${userId}?cursor=${cursor}&direction=${direction}&take=10`
        : `http://localhost:3000/sessions/statistics/${userId}?take=10`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sessions");
      }

      const data: PaginationData = await response.json();

      setSessions(data.data);
      setNextCursor(data.nextCursor);
      setPrevCursor(data.prevCursor);
      setHasMore(data.hasMore);

      // Group sessions by date
      const grouped = groupSessionsByDate(data.data);
      setGroupedSessions(grouped);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const groupSessionsByDate = (sessions: Session[]): GroupedSessions => {
    const grouped: GroupedSessions = {};

    sessions.forEach((session) => {
      const date = new Date(session.completedAt || session.createdAt);
      const dateKey = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(session);
    });

    return grouped;
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleNextPage = () => {
    if (nextCursor && hasMore) {
      fetchSessions(nextCursor, "next");
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (prevCursor && currentPage > 1) {
      fetchSessions(prevCursor, "prev");
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  if (loading && sessions.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#1a2a3a] to-[#213547] text-white">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-gray-400">Loading session history...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#1a2a3a] to-[#213547] text-white">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => fetchSessions()}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#1a2a3a] to-[#213547] text-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center text-gray-400 hover:text-gray-200 mb-4 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>

            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-linear-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Session History
            </h1>
            <p className="text-gray-400">View your past focus and break sessions</p>
          </div>

          {/* Sessions List */}
          {Object.keys(groupedSessions).length === 0 ? (
            <div className="bg-linear-to-br from-[#2a3c58] to-[#1e2c42] rounded-2xl p-12 shadow-2xl border border-gray-700/50 text-center">
              <div className="text-gray-500 mb-4">
                <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No Sessions Yet</h3>
              <p className="text-gray-400 mb-6">Start your first focus session to see your history here!</p>
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-linear-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
              >
                Start a Session
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedSessions).map(([date, sessionList]) => (
                <div key={date} className="bg-linear-to-br from-[#2a3c58] to-[#1e2c42] rounded-2xl p-6 shadow-2xl border border-gray-700/50">
                  {/* Date Header */}
                  <div className="flex items-center mb-4 pb-3 border-b border-gray-700/50">
                    <div className="w-3 h-8 rounded-full bg-linear-to-b from-purple-500 to-blue-500 mr-3"></div>
                    <h2 className="text-xl font-semibold text-gray-200">{date}</h2>
                    <span className="ml-auto text-sm text-gray-400">
                      {sessionList.length} session{sessionList.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Sessions for this date */}
                  <div className="space-y-3">
                    {sessionList.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between bg-gray-800/30 rounded-lg p-4 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-200 hover:bg-gray-800/50"
                      >
                        <div className="flex items-center space-x-4">
                          {/* Session Type Icon */}
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              session.type === "focus"
                                ? "bg-linear-to-r from-purple-500 to-blue-400"
                                : "bg-linear-to-r from-green-500 to-emerald-400"
                            }`}
                          >
                            {session.type === "focus" ? (
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            ) : (
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                          </div>

                          {/* Session Details */}
                          <div>
                            <p className="font-medium text-gray-200 capitalize">{session.type} Session</p>
                            <p className="text-sm text-gray-400">
                              {formatTime(session.completedAt || session.createdAt)}
                            </p>
                          </div>
                        </div>

                        {/* Duration Badge */}
                        <div className="flex items-center space-x-2">
                          <div className="bg-gray-700/50 rounded-lg px-4 py-2 border border-gray-600/30">
                            <p className="text-sm font-semibold text-gray-200">
                              {formatDuration(session.duration)}
                            </p>
                          </div>
                          {session.done && (
                            <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {Object.keys(groupedSessions).length > 0 && (
            <div className="mt-8 flex items-center justify-between bg-linear-to-br from-[#2a3c58] to-[#1e2c42] rounded-2xl p-6 shadow-2xl border border-gray-700/50">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === 1
                    ? "bg-gray-700/30 text-gray-500 cursor-not-allowed"
                    : "bg-linear-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 shadow-lg hover:shadow-xl"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Previous</span>
              </button>

              <div className="text-gray-400">
                Page <span className="text-gray-200 font-semibold">{currentPage}</span>
              </div>

              <button
                onClick={handleNextPage}
                disabled={!hasMore}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  !hasMore
                    ? "bg-gray-700/30 text-gray-500 cursor-not-allowed"
                    : "bg-linear-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 shadow-lg hover:shadow-xl"
                }`}
              >
                <span>Next</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionHistory;
