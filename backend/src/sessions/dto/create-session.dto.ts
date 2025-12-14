import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateSessionDto {
  @Type(() => Number)
  @IsInt()
  userId: number;

  @Type(() => Number)
  @IsInt()
  duration: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  completedAt: Date;
}
