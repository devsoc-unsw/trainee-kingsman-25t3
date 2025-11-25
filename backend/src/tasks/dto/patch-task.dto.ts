import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PatchTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
