import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPlants, purchasePlant, getUserBucks } from "../endpoints/plant";
import type { Plant } from "../types/plant";
import { useState } from "react";

type PlantShopProps = {
  userId: number;
  onPurchaseSuccess?: () => void;
};

const PlantShop = ({ userId, onPurchaseSuccess }: PlantShopProps) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const { data: plantsData, isLoading: plantsLoading } = useQuery({
    queryKey: ["plants"],
    queryFn: async () => {
      const response = await getPlants();
      return response.data;
    },
  });

  const { data: bucksData, isLoading: bucksLoading } = useQuery({
    queryKey: ["userBucks", userId],
    queryFn: async () => {
      const response = await getUserBucks(userId);
      return response.data;
    },
  });

  const purchaseMutation = useMutation({
    mutationFn: async (plantId: number) => {
      const response = await purchasePlant(userId, { plantId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBucks", userId] });
      queryClient.invalidateQueries({ queryKey: ["userPlants", userId] });
      setError("");
      setSelectedPlant(null);
      onPurchaseSuccess?.();
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const handlePurchase = (plant: Plant) => {
    setSelectedPlant(plant);
    purchaseMutation.mutate(plant.id);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "common":
        return "text-gray-400 border-gray-500";
      case "uncommon":
        return "text-green-400 border-green-500";
      case "rare":
        return "text-blue-400 border-blue-500";
      case "epic":
        return "text-purple-400 border-purple-500";
      case "legendary":
        return "text-yellow-400 border-yellow-500";
      default:
        return "text-gray-400 border-gray-500";
    }
  };

  const currentBucks = bucksData?.bucksValue ?? 0;

  if (plantsLoading || bucksLoading) {
    return (
      <div className="bg-linear-to-br from-[#2a3c58] to-[#1e2c42] rounded-2xl p-6 shadow-2xl border border-gray-700/50">
        <p className="text-gray-400 text-center">Loading shop...</p>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-[#2a3c58] to-[#1e2c42] rounded-2xl p-6 shadow-2xl border border-gray-700/50">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-3 h-8 rounded-full bg-green-500 mr-3"></div>
          <h2 className="text-xl font-semibold text-white">Plant Shop</h2>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-xl">
          <span className="text-2xl">💰</span>
          <span className="font-bold text-yellow-400">{currentBucks}</span>
          <span className="text-gray-400 text-sm">Bucks</span>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* SUCCESS MESSAGE */}
      {purchaseMutation.isSuccess && !error && (
        <div className="mb-4 p-3 bg-green-900/30 border border-green-500/50 rounded-xl text-green-400 text-sm">
          Plant purchased successfully!
        </div>
      )}

      {/* PLANTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
        {plantsData?.map((plant: Plant) => {
          const canAfford = currentBucks >= plant.bucksValue;
          const isPurchasing =
            purchaseMutation.isPending && selectedPlant?.id === plant.id;

          return (
            <div
              key={plant.id}
              className={`
                group relative p-4 rounded-xl border-2 transition-all duration-200
                bg-[#1e2c42]/80 ${getRarityColor(plant.rarity)}
                ${canAfford ? "hover:scale-105 hover:shadow-lg" : "opacity-60"}
              `}
            >
              {/* PLANT IMAGE */}
              <div className="flex items-center justify-center h-24 mb-3 bg-[#2a3c58] rounded-lg">
                {plant.imageUrl ? (
                  <img
                    src={plant.imageUrl}
                    alt={plant.name}
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <span className="text-5xl">🌱</span>
                )}
              </div>

              {/* PLANT INFO */}
              <div className="text-center mb-3">
                <h3 className="font-semibold text-white mb-1">{plant.name}</h3>
                <span
                  className={`text-xs uppercase tracking-wide ${
                    getRarityColor(plant.rarity).split(" ")[0]
                  }`}
                >
                  {plant.rarity}
                </span>
              </div>

              {/* PRICE & BUY BUTTON */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">💰</span>
                  <span className="font-bold text-white">
                    {plant.bucksValue}
                  </span>
                </div>
                <button
                  onClick={() => handlePurchase(plant)}
                  disabled={!canAfford || isPurchasing}
                  className={`
                    px-4 py-2 rounded-lg font-semibold transition-all duration-200
                    ${
                      canAfford && !isPurchasing
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }
                  `}
                >
                  {isPurchasing ? "..." : canAfford ? "Buy" : "Locked"}
                </button>
              </div>

              {/* INSUFFICIENT FUNDS TOOLTIP */}
              {!canAfford && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm font-medium">
                    Need {plant.bucksValue - currentBucks} more bucks
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {plantsData?.length === 0 && (
        <div className="text-center p-8 bg-[#1e2c42]/50 rounded-xl border border-gray-700/50">
          <p className="text-gray-400 italic">No plants available yet</p>
        </div>
      )}
    </div>
  );
};

export default PlantShop;
