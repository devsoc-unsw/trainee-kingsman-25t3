import axiosInstance from "../lib/axios";
import { getErrorMessage } from "./error";
import type { Plant, UserPlant, PurchasePlantRequest, UpdatePlantPositionRequest } from "../types/plant";

// 🎭 MOCK MODE - Set to false when backend is ready
const USE_MOCK_DATA = true;

// Mock data storage (simulates database)
const mockUserPlants: UserPlant[] = [
  {
    id: 1,
    userId: 1,
    plantId: 1,
    position: JSON.stringify({ row: 0, col: 0 }),
    plantedAt: new Date("2025-01-10"),
    plant: {
      id: 1,
      name: "Seedling",
      imageUrl: null,
      rarity: "common",
      bucksValue: 50,
    },
  },
  {
    id: 2,
    userId: 1,
    plantId: 2,
    position: JSON.stringify({ row: 0, col: 2 }),
    plantedAt: new Date("2025-01-11"),
    plant: {
      id: 2,
      name: "Sunflower",
      imageUrl: null,
      rarity: "uncommon",
      bucksValue: 150,
    },
  },
  {
    id: 3,
    userId: 1,
    plantId: 3,
    position: JSON.stringify({ row: 1, col: 1 }),
    plantedAt: new Date("2025-01-12"),
    plant: {
      id: 3,
      name: "Rose Bush",
      imageUrl: null,
      rarity: "rare",
      bucksValue: 300,
    },
  },
  {
    id: 4,
    userId: 1,
    plantId: 4,
    position: JSON.stringify({ row: 2, col: 3 }),
    plantedAt: new Date("2025-01-13"),
    plant: {
      id: 4,
      name: "Oak Tree",
      imageUrl: null,
      rarity: "epic",
      bucksValue: 500,
    },
  },
  {
    id: 5,
    userId: 1,
    plantId: 5,
    position: JSON.stringify({ row: 3, col: 2 }),
    plantedAt: new Date("2025-01-14"),
    plant: {
      id: 5,
      name: "Bonsai",
      imageUrl: null,
      rarity: "legendary",
      bucksValue: 1000,
    },
  },
];

const mockPlants: Plant[] = [
  { id: 1, name: "Seedling", imageUrl: null, rarity: "common", bucksValue: 50 },
  { id: 2, name: "Sunflower", imageUrl: null, rarity: "uncommon", bucksValue: 150 },
  { id: 3, name: "Rose Bush", imageUrl: null, rarity: "rare", bucksValue: 300 },
  { id: 4, name: "Oak Tree", imageUrl: null, rarity: "epic", bucksValue: 500 },
  { id: 5, name: "Bonsai", imageUrl: null, rarity: "legendary", bucksValue: 1000 },
  { id: 6, name: "Cactus", imageUrl: null, rarity: "uncommon", bucksValue: 120 },
  { id: 7, name: "Tulip", imageUrl: null, rarity: "common", bucksValue: 80 },
  { id: 8, name: "Palm Tree", imageUrl: null, rarity: "rare", bucksValue: 400 },
];

let mockBucks = 550; // Mock user bucks

// Get all available plants (shop catalog)
export const getPlants = async () => {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: mockPlants } as { data: Plant[] };
  }

  try {
    const response = await axiosInstance.get<Plant[]>("/plants");
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Failed to fetch plants");
    console.error("Get plants error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};

// Get user's owned plants
export const getUserPlants = async (userId: number) => {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log("Mock: Getting user plants for userId:", userId);
    return { data: mockUserPlants } as { data: UserPlant[] };
  }

  try {
    const response = await axiosInstance.get<UserPlant[]>(`/users/${userId}/plants`);
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Failed to fetch user plants");
    console.error("Get user plants error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};

// Purchase/plant a new plant
export const purchasePlant = async (userId: number, data: PurchasePlantRequest) => {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const plant = mockPlants.find((p) => p.id === data.plantId);
    if (!plant) {
      throw new Error("Plant not found");
    }

    if (mockBucks < plant.bucksValue) {
      throw new Error("Insufficient bucks");
    }

    // Deduct bucks
    mockBucks -= plant.bucksValue;

    // Create new user plant
    const newUserPlant: UserPlant = {
      id: mockUserPlants.length + 1,
      userId,
      plantId: data.plantId,
      position: data.position || null,
      plantedAt: new Date(),
      plant,
    };

    mockUserPlants.push(newUserPlant);
    console.log("Mock: Purchased plant", newUserPlant);

    return { data: newUserPlant } as { data: UserPlant };
  }

  try {
    const response = await axiosInstance.post<UserPlant>(`/users/${userId}/plants`, data);
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Failed to purchase plant");
    console.error("Purchase plant error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};

// Update plant position on farm
export const updatePlantPosition = async (
  userId: number,
  userPlantId: number,
  data: UpdatePlantPositionRequest
) => {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const plantIndex = mockUserPlants.findIndex((p) => p.id === userPlantId);
    if (plantIndex === -1) {
      throw new Error("Plant not found");
    }

    mockUserPlants[plantIndex].position = data.position;
    console.log("Mock: Updated plant position", mockUserPlants[plantIndex]);

    return { data: mockUserPlants[plantIndex] } as { data: UserPlant };
  }

  try {
    const response = await axiosInstance.patch<UserPlant>(
      `/users/${userId}/plants/${userPlantId}`,
      data
    );
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Failed to update plant position");
    console.error("Update plant position error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};

// Remove/sell a plant
export const removePlant = async (userId: number, userPlantId: number) => {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const plantIndex = mockUserPlants.findIndex((p) => p.id === userPlantId);
    if (plantIndex === -1) {
      throw new Error("Plant not found");
    }

    // Optional: refund half the value
    const plant = mockUserPlants[plantIndex].plant;
    if (plant) {
      mockBucks += Math.floor(plant.bucksValue / 2);
    }

    mockUserPlants.splice(plantIndex, 1);
    console.log("Mock: Removed plant", userPlantId);

    return { data: { success: true } } as { data: { success: boolean } };
  }

  try {
    const response = await axiosInstance.delete(`/users/${userId}/plants/${userPlantId}`);
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Failed to remove plant");
    console.error("Remove plant error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};

// Get user's bucks balance (assuming this will be added to user endpoints)
export const getUserBucks = async (userId: number) => {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    console.log("Mock: Getting bucks for userId:", userId, "Balance:", mockBucks);
    return { data: { bucksValue: mockBucks } } as { data: { bucksValue: number } };
  }

  try {
    const response = await axiosInstance.get<{ bucksValue: number }>(`/users/${userId}/bucks`);
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Failed to fetch user bucks");
    console.error("Get user bucks error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};
