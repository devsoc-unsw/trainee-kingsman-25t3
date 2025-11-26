import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
