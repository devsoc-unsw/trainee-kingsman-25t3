import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuild, joinGuild, leaveGuild } from "../endpoints/guild";

const GuildDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const guildId = useMemo(
    () => (id ? parseInt(id, 10) : NaN),
    [id]
  );

  const userId = useMemo(
    () => parseInt(localStorage.getItem("userId") ?? "0", 10),
    []
  );

  const queryClient = useQueryClient();

  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["guild", guildId],
    queryFn: () => getGuild(guildId),
    enabled: Number.isFinite(guildId),
  });

  const guild = data?.data;

  const joinMutation = useMutation({
    mutationFn: () => joinGuild(guildId, userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["guild", guildId] });
      await queryClient.invalidateQueries({ queryKey: ["guilds"] });
    },
  });

  const leaveMutation = useMutation({
    mutationFn: () => leaveGuild(guildId, userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["guild", guildId] });
      await queryClient.invalidateQueries({ queryKey: ["guilds"] });
    },
  });

  if (!Number.isFinite(guildId)) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#1a2a3a] to-[#213547] text-white p-8">
        Invalid guild ID.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#1a2a3a] to-[#213547] text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Top navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/guilds")}
            className="rounded-xl border border-gray-700/50 bg-gray-800/30 px-4 py-2 hover:bg-gray-700/40 transition-colors"
          >
            ← Back to guilds
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl border border-gray-700/50 bg-gray-800/30 px-4 py-2 hover:bg-gray-700/40 transition-colors"
          >
            Dashboard
          </button>
        </div>

        {/* Content */}
        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error instanceof Error ? error.message : "Failed to load guild"}
          </div>
        ) : isLoading ? (
          <div className="rounded-2xl border border-gray-700/50 bg-white/5 p-6">
            <div className="h-6 w-56 bg-gray-600/50 rounded animate-pulse" />
            <div className="mt-3 h-4 w-96 bg-gray-600/50 rounded animate-pulse" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Guild header */}
            <div className="rounded-2xl border border-gray-700/50 bg-white/5 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{guild?.name}</h1>
                  <p className="text-gray-300 mt-2">
                    {guild?.description ?? "No description"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => joinMutation.mutate()}
                    disabled={joinMutation.isPending}
                    className="rounded-xl bg-linear-to-r from-green-500 to-emerald-500 px-4 py-2 font-medium text-white hover:opacity-90 disabled:opacity-50"
                  >
                    {joinMutation.isPending ? "Joining…" : "Join"}
                  </button>

                  <button
                    onClick={() => leaveMutation.mutate()}
                    disabled={leaveMutation.isPending}
                    className="rounded-xl bg-linear-to-r from-red-500 to-red-600 px-4 py-2 font-medium text-white hover:opacity-90 disabled:opacity-50"
                  >
                    {leaveMutation.isPending ? "Leaving…" : "Leave"}
                  </button>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <span>Progress</span>
                  <span>
                    {(guild?.current_tasks ?? guild?.currentTasks ?? 0)}/
                    {(guild?.goal_tasks ?? guild?.goalTasks ?? 100)}
                  </span>
                </div>

                <ProgressBar
                  value={guild?.current_tasks ?? guild?.currentTasks ?? 0}
                  max={guild?.goal_tasks ?? guild?.goalTasks ?? 100}
                />
              </div>
            </div>

            {/* Members */}
            <div className="rounded-2xl border border-gray-700/50 bg-white/5 p-6">
              <h2 className="text-xl font-semibold mb-4">Members</h2>

              <div className="space-y-3">
                {(guild?.members ?? []).length === 0 ? (
                  <p className="text-gray-300">No members data available.</p>
                ) : (
                  (guild.members as any[]).map((m) => (
                    <div
                      key={m.id ?? m.userId}
                      className="flex items-center justify-between rounded-xl border border-gray-700/50 bg-gray-800/20 px-4 py-3"
                    >
                      <span className="text-gray-200">
                        {m.name ?? m.username ?? m.user?.name ?? "Member"}
                      </span>
                      <span className="text-gray-300 text-sm">
                        {m.tasks_contributed ?? m.tasksContributed ?? 0} tasks
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <div className="h-3 rounded-full bg-gray-700/50 overflow-hidden">
      <div
        className="h-full bg-linear-to-r from-green-400 to-blue-400 transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default GuildDetail;
