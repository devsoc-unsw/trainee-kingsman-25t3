import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateSessionDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
