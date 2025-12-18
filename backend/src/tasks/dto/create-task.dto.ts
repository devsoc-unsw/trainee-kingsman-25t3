import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  userId?: number;
}
