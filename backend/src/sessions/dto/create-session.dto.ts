import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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
}
