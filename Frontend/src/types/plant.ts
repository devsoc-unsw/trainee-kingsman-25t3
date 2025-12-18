export type Plant = {
  id: number;
  name: string;
  imageUrl: string | null;
  rarity: string;
  bucksValue: number;
};

export type UserPlant = {
  id: number;
  userId: number;
  plantId: number;
  position: string | null;
  plantedAt: Date;
  plant?: Plant;
};

export type PlantPosition = {
  row: number;
  col: number;
};

export type PurchasePlantRequest = {
  plantId: number;
  position?: string;
};

export type UpdatePlantPositionRequest = {
  position: string;
};
