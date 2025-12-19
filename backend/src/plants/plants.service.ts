import { Injectable } from "@nestjs/common";
import { CreatePlantDto } from "./dto/create-plant.dto";
import { UpdatePlantDto } from "./dto/update-plant.dto";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class PlantsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getPlants(userId: number) {
    if (!userId) {
      console.log("Invalid userId and session");
    }

    // to be fixed (awaiting any further checks and task completion feature maybe)
    const plants = await this.databaseService.userPlant.findMany({
      where: {
        userId: userId,
      },
      include: {
        Plant: true,
      },
    });

    return plants;
  }

  // async createPlant(createPlantDto: CreatePlantDto) {
  //   return "This action adds a new plant";
  // }

  // simultaneously creates plants (unless better to do seperate logic handlers?)
  async rewardHandler(createPlantDto: CreatePlantDto) {
    // const plants = await this.databaseService.plant.findMany();
    // const newPlant = plants[Math.floor(Math.random() * plants.length)];

    // transaction used to simulate money transfer
    await this.databaseService.$transaction([
      this.databaseService.user.update({
        where: {
          id: createPlantDto.userId,
        },
        data: {
          bucksValue: { increment: 5 },
        },
      }),
      this.databaseService.userPlant.create({
        data: {
          userId: createPlantDto.userId,
          plantId: createPlantDto.plantId,
          plantedAt: createPlantDto.plantedAt,
        },
      }),
    ]);
  }

  // get userPlants (or updating)
  // async getUserPlants(userId: number) {

  // }

  // currently runs
  findAll() {
    return `This action returns all plants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plant`;
  }

  update(id: number, updatePlantDto: UpdatePlantDto) {
    return `This action updates a #${id} plant`;
  }

  remove(id: number) {
    return `This action removes a #${id} plant`;
  }
}
