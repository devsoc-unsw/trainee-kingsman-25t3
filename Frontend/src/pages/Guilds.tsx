import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGuilds } from "../endpoints/guild";

const Guilds = () => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ["guilds"],
    queryFn: getGuilds,
  });

  const leaveMut = useMutation({
    mutationFn: () => leaveGuild(guildId, userId),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["guild", guildId] });
      await qc.invalidateQueries({ queryKey: ["guilds"] });
    },
  });

  // checking current guildId is NaN
  console.log("guildId: " + guildId);

  if (!Number.isFinite(guildId)) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#1a2a3a] to-[#213547] text-white p-8">
        Invalid guild id.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#1a2a3a] to-[#213547] text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl border border-gray-700/50 bg-gray-800/30 px-4 py-2 hover:bg-gray-700/40 transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6">Guilds</h1>

        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error instanceof Error ? error.message : "Failed to load guilds"}
          </div>
        ) : isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-700/50 bg-white/5 p-6 animate-pulse"
              >
                <div className="h-6 w-48 bg-gray-600/50 rounded mb-2" />
                <div className="h-4 w-full max-w-md bg-gray-600/50 rounded" />
              </div>
            ))}
          </div>
        ) : guilds.length === 0 ? (
          <div className="rounded-2xl border border-gray-700/50 bg-white/5 p-8 text-center text-gray-400">
            No guilds found.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guilds.map((guild: any) => (
              <div
                key={guild.id}
                onClick={() => navigate(`/guilds/${guild.id}`)}
                className="group cursor-pointer rounded-2xl border border-gray-700/50 bg-white/5 p-6 hover:border-gray-500 transition-all hover:bg-white/10"
              >
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                  {guild.name}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                  {guild.description || "No description provided."}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{(guild.members?.length ?? 0)} members</span>
                  <span className="text-blue-400 group-hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Guilds;
