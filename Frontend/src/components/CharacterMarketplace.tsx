import React from "react";
import { CHARACTERS } from "../data/characterData";

interface MarketplaceProps {
  onClose: () => void;
  currentBalance: number;
  unlockedCharacterIds: number[]; 
  currentCharacterId: number;     
  onPurchase: (id: number, cost: number) => void;
  onEquip: (id: number) => void;
}

const CharacterMarketplace: React.FC<MarketplaceProps> = ({
    onClose,
    currentBalance,
    unlockedCharacterIds,
    currentCharacterId,
    onPurchase,
    onEquip

}) => {
    return (
        <div className="fixed inset-0 bg-gray-900 flex justify-center items-center z-[100]">
            <div className="bg-gray-800 text-white p-6 rounded-xl w-full max-w-5xl relative">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                        Avatar Marketplace
                    </h2>

                    <div className="flex items-center gap-4">
                        <div className="bg-gray-900 px-4 py-2 rounded-lg border border-yellow-500/30 text-yellow-400 font-bold">
                            💰 {currentBalance}
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-white font-bold text-xl px-2">
                            ✕
                        </button>
                    </div>
                </div>
                
                {/* Grid of Characters */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-h-[80vh] overflow-y-auto p-2 bg-gray-800">
                    {CHARACTERS.map((char) => {
                        // determine the state of the item
                        const isOwned = unlockedCharacterIds.includes(char.id) || char.price === 0;
                        const isEquipped = currentCharacterId === char.id;
                        const canAfford = currentBalance >= char.price;

                        return (
                            <div 
                                key={char.id} 
                                className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                                    isEquipped 
                                        ? "border-green-500 bg-green-900/20 shadow-[0_0_15px_rgba(34,197,94,0.3)]" 
                                        : "border-gray-700 bg-gray-900/50 hover:border-gray-500"
                                }`}
                            >
                                {/* Image */}
                                <div className="w-24 h-24 rounded-full mb-3 p-1 bg-linear-to-br from-gray-700 to-gray-800 border border-gray-600">
                                    <img 
                                        src={char.image} 
                                        alt={char.name} 
                                        className="w-full h-full object-cover rounded-full" 
                                    />
                                </div>

                                <h3 className="font-bold mb-1 text-gray-100">{char.name}</h3>

                                {/* Price Tag (Hide if owned) */}
                                {!isOwned && (
                                    <span className="text-yellow-400 font-bold text-sm mb-3">
                                        {char.price} Bucks
                                    </span>
                                )}
                                {isOwned && <span className="text-gray-500 text-xs mb-3 h-5">Owned</span>}

                                {/* Action Buttons */}
                                <div className="w-full mt-auto">
                                    {isEquipped ? (
                                        <button disabled className="w-full py-2 bg-green-600/50 text-green-100 rounded cursor-default font-semibold border border-green-500/50">
                                            Equipped
                                        </button>
                                    ) : isOwned ? (
                                        <button 
                                            onClick={() => onEquip(char.id)} 
                                            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-semibold transition-colors shadow-lg shadow-blue-900/20"
                                        >
                                            Equip
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => onPurchase(char.id, char.price)}
                                            disabled={!canAfford}
                                            className={`w-full py-2 rounded font-semibold transition-all ${
                                                canAfford 
                                                    ? "bg-yellow-600 hover:bg-yellow-500 text-white shadow-lg shadow-yellow-900/20" 
                                                    : "bg-gray-700 text-gray-500 cursor-not-allowed"
                                            }`}
                                        >
                                           {canAfford ? "Buy Now" : "Too Expensive"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CharacterMarketplace;