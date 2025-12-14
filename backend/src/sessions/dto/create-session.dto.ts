import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateSessionDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  completed: Date;
}
