import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class CreatePlantDto {
  @Type(() => Number)
  @IsInt()
  userId: number;

  @Type(() => Number)
  @IsInt()
  plantId: number;
}
