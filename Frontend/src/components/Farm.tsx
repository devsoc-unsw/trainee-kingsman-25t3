import { useState, useEffect } from "react";

// Types
interface Plant {
    id: number;
    type: "CORN" | "TOMATO" | "CARROT";
    stage: 1 | 2 | 3;
    plantedAt: Date;
}

interface Plot {
    id: number;
    plant: Plant | null;
    isLocked: boolean;
}

const Farm = () => {
    const [plots, setPlots] = useState<Plot[]>([]);
    const [selectedSeed, setSelectedSeed] = useState<"CORN" | "TOMATO" | "CARROT" | null>(null);

    // Initialize generic 3x3 grid
    useEffect(() => {
        const initialPlots: Plot[] = Array.from({ length: 9 }, (_, i) => ({
            id: i,
            plant: null,
            isLocked: false,
        }));
        // Add some dummy plants for visualization
        initialPlots[4].plant = { id: 1, type: "TOMATO", stage: 3, plantedAt: new Date() };
        initialPlots[0].plant = { id: 2, type: "CORN", stage: 1, plantedAt: new Date() }; // Seedling
        setPlots(initialPlots);
    }, []);

    const handlePlotClick = (plotId: number) => {
        if (selectedSeed) {
            plantSeed(plotId, selectedSeed);
        }
    };

    const plantSeed = (plotId: number, type: "CORN" | "TOMATO" | "CARROT") => {
        setPlots((prev) =>
            prev.map((plot) => {
                if (plot.id === plotId && !plot.plant) {
                    return {
                        ...plot,
                        plant: {
                            id: Date.now(),
                            type,
                            stage: 1,
                            plantedAt: new Date(),
                        },
                    };
                }
                return plot;
            })
        );
        // Add animation logic here
    };

    // Helper to get plant emoji/graphic based on type and stage
    const getPlantGraphic = (plant: Plant) => {
        // Placeholder using emojis until sprite sheet is integrated
        if (plant.stage === 1) return "🌱";

        switch (plant.type) {
            case "CORN":
                return plant.stage === 2 ? "🌽" : "🌽"; // Distinguish stages with size/opacity later
            case "TOMATO":
                return plant.stage === 2 ? "🪴" : "🍅";
            case "CARROT":
                return plant.stage === 2 ? "🌿" : "🥕";
            default:
                return "🌱";
        }
    };

    return (
        <div className="bg-[#2a3c58]/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                    <span className="text-2xl mr-2">🚜</span> My Farm
                </h2>
                <div className="bg-[#1a2a3a] px-3 py-1 rounded-full text-amber-400 font-mono text-sm border border-amber-500/30">
                    50 🪙
                </div>
            </div>

            {/* Farm Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6 perspective-1000">
                {plots.map((plot) => (
                    <div
                        key={plot.id}
                        onClick={() => handlePlotClick(plot.id)}
                        className={`
              aspect-square rounded-xl relative cursor-pointer transition-all duration-300
              ${plot.plant ? "bg-[#3e2723]" : "bg-[#5d4037] hover:bg-[#6d4c41]"}
              border-b-4 border-r-4 border-[#3e2723]/50 shadow-inner
              group
            `}
                    >
                        {/* Soil Texture Overlay */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>

                        {/* Plant Content */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {plot.plant && (
                                <div
                                    className={`
                    text-4xl filter drop-shadow-lg transform transition-all duration-500
                    ${plot.plant.stage === 1 ? "scale-50 translate-y-2 opacity-80" : "scale-100 animate-bounce-slight"}
                  `}
                                >
                                    {getPlantGraphic(plot.plant)}
                                </div>
                            )}
                        </div>

                        {/* Tooltip */}
                        {plot.plant && (
                            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-gray-700">
                                <div className="font-bold text-green-400">{plot.plant.type}</div>
                                <div>Stage: {plot.plant.stage}/3</div>
                                <div className="text-[10px] text-gray-400">Ready in 10m</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Seed Selection (Debug/Test) */}
            <div className="flex justify-center gap-2 mt-4 p-2 bg-[#1a2a3a] rounded-lg border border-gray-700/30">
                {(["CORN", "TOMATO", "CARROT"] as const).map((seed) => (
                    <button
                        key={seed}
                        onClick={() => setSelectedSeed(seed)}
                        className={`
              p-2 rounded-lg text-sm font-medium transition-colors
              ${selectedSeed === seed ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}
            `}
                    >
                        {seed}
                    </button>
                ))}
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">
                Complete tasks to water plants and unlock growth!
            </p>
        </div>
    );
};

export default Farm;
