import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";

export class CreatePlantDto {
  @Type(() => Number)
  @IsInt()
  userId: number;

  @Type(() => Number)
  @IsInt()
  plantId: number;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  plantedAt: Date;
}
