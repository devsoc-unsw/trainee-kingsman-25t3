import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserPlants, updatePlantPosition, removePlant } from "../endpoints/plant";
import type { UserPlant, PlantPosition } from "../types/plant";
import { useState } from "react";

type FarmGridProps = {
  userId: number;
  gridSize?: { rows: number; cols: number };
  userPlants?: UserPlant[];
};

const FarmGrid = ({ userId, gridSize = { rows: 4, cols: 4 }, userPlants }: FarmGridProps) => {
  const queryClient = useQueryClient();
  const [selectedPlant, setSelectedPlant] = useState<UserPlant | null>(null);
  const [error, setError] = useState("");

  const { data: userPlantsData, isLoading } = useQuery({
    queryKey: ["userPlants", userId],
    queryFn: async () => {
      if (userPlants) {
        return userPlants;
      }

      const response = await getUserPlants(userId);

      return response.data.map((e: UserPlant) => ({
        ...e,
        plantedAt: new Date(e.plantedAt),
      }));
    },
  });

  const updatePositionMutation = useMutation({
    mutationFn: async ({ plantId, position }: { plantId: number; position: string }) => {
      const response = await updatePlantPosition(userId, plantId, { position });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPlants", userId] });
      setError("");
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });
  
  const removePlantMutation = useMutation({
    mutationFn: async (plantId: number) => {
      const response = await removePlant(userId, plantId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPlants", userId] });
      queryClient.invalidateQueries({ queryKey: ["userBucks", userId] });
      setError("");
      setSelectedPlant(null);
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  // Parse position string to PlantPosition object
  const parsePosition = (positionStr: string | null): PlantPosition | null => {
    if (!positionStr) return null;
    try {
      return JSON.parse(positionStr) as PlantPosition;
    } catch {
      return null;
    }
  };

  // Find plant at specific grid position
  const getPlantAtPosition = (row: number, col: number): UserPlant | undefined => {
    return userPlantsData?.find((userPlant) => {
      const pos = parsePosition(userPlant.position);
      return pos?.row === row && pos?.col === col;
    });
  };

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    const plantAtPosition = getPlantAtPosition(row, col);

    if (plantAtPosition) {
      // Select the plant to show details
      setSelectedPlant(plantAtPosition);
    } else if (selectedPlant) {
      // Move selected plant to this empty position
      const newPosition = JSON.stringify({ row, col });
      updatePositionMutation.mutate({
        plantId: selectedPlant.id,
        position: newPosition,
      });
      setSelectedPlant(null);
    }
  };

  const handleRemovePlant = () => {
    if (selectedPlant) {
      removePlantMutation.mutate(selectedPlant.id);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-linear-to-br from-[#2a3c58] to-[#1e2c42] rounded-2xl p-6 shadow-2xl border border-gray-700/50">
        <p className="text-gray-400 text-center">Loading farm...</p>
      </div>
    );
  }

  const totalPlants = userPlantsData?.length ?? 0;
  const maxPlants = gridSize.rows * gridSize.cols;

  return (
    <div className="bg-linear-to-br from-[#2a3c58] to-[#1e2c42] rounded-2xl p-6 shadow-2xl border border-gray-700/50">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-3 h-8 rounded-full bg-blue-500 mr-3"></div>
          <h2 className="text-xl font-semibold text-white">My Farm</h2>
        </div>
        <div className="text-sm text-gray-400">
          {totalPlants} / {maxPlants} plots used
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* INSTRUCTIONS */}
      {selectedPlant && (
        <div className="mb-4 p-3 bg-purple-900/30 border border-purple-500/50 rounded-xl text-purple-300 text-sm">
          Click an empty spot to move "{selectedPlant.plant?.name || "plant"}" or click it again to deselect
        </div>
      )}

      {/* FARM GRID */}
      <div
        className="grid gap-3 mb-4"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: gridSize.rows }).map((_, rowIndex) =>
          Array.from({ length: gridSize.cols }).map((_, colIndex) => {
            const plant = getPlantAtPosition(rowIndex, colIndex);
            const isSelected = selectedPlant?.id === plant?.id;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={`
                  relative aspect-square rounded-xl border-2 transition-all duration-200
                  cursor-pointer flex items-center justify-center
                  ${
                    plant
                      ? isSelected
                        ? "bg-purple-900/40 border-purple-500 scale-105"
                        : "bg-green-900/20 border-green-700/50 hover:border-green-500"
                      : "bg-[#1e2c42]/40 border-gray-700/50 hover:border-blue-500 hover:bg-blue-900/20"
                  }
                `}
              >
                {plant ? (
                  <div className="text-center">
                    {plant.plant?.imageUrl ? (
                      <img
                        src={plant.plant.imageUrl}
                        alt={plant.plant.name}
                        className="w-12 h-12 object-contain mx-auto"
                      />
                    ) : (
                      <span className="text-4xl">🌱</span>
                    )}
                    <p className="text-xs text-gray-300 mt-1 truncate px-1">
                      {plant.plant?.name}
                    </p>
                  </div>
                ) : (
                  <span className="text-3xl opacity-30">+</span>
                )}

                {/* POSITION LABEL (for debugging) */}
                <div className="absolute top-1 left-1 text-xs text-gray-600">
                  {rowIndex},{colIndex}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* PLANT DETAILS PANEL */}
      {selectedPlant && (
        <div className="p-4 bg-[#1e2c42] rounded-xl border border-purple-500/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center bg-[#2a3c58] rounded-lg">
                {selectedPlant.plant?.imageUrl ? (
                  <img
                    src={selectedPlant.plant.imageUrl}
                    alt={selectedPlant.plant.name}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <span className="text-3xl">🌱</span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  {selectedPlant.plant?.name || "Unknown Plant"}
                </h3>
                <p className="text-xs text-gray-400">
                  Planted {new Date(selectedPlant.plantedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedPlant(null)}
                className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleRemovePlant}
                disabled={removePlantMutation.isPending}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {removePlantMutation.isPending ? "..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {totalPlants === 0 && (
        <div className="text-center p-8 bg-[#1e2c42]/50 rounded-xl border border-gray-700/50">
          <span className="text-6xl mb-4 block">🌾</span>
          <p className="text-gray-400 mb-2">Your farm is empty!</p>
          <p className="text-gray-500 text-sm">Purchase plants from the shop to get started</p>
        </div>
      )}
    </div>
  );
};

export default FarmGrid;
