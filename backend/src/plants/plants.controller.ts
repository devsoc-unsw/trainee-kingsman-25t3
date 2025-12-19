import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common";
import { PlantsService } from "./plants.service";
import { CreatePlantDto } from "./dto/create-plant.dto";
import { UpdatePlantDto } from "./dto/update-plant.dto";

@Controller("plants")
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  // POST /plants
  @Post()
  create(@Body() createPlantDto: CreatePlantDto) {
    return this.plantsService.rewardHandler(createPlantDto);
  }

  // GET /plants
  @Get()
  findAll() {
    return this.plantsService.findAll();
  }

  // or GET /plants/:userId
  @Get(":userId")
  findOne(@Param("userId", ParseIntPipe) userId: number) {
    return this.plantsService.getPlants(+userId);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePlantDto: UpdatePlantDto) {
    return this.plantsService.update(+id, updatePlantDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.plantsService.remove(+id);
  }
}
