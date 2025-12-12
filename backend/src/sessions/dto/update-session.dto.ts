import { PartialType } from "@nestjs/mapped-types";
import { CreateSessionDto } from "./create-session.dto";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class UpdateSessionDto extends PartialType(CreateSessionDto) {
  // to be completed
  @IsOptional()
  @IsBoolean()
  done?: boolean;

  @IsOptional()
  @IsNumber()
  duration?: number;

  type?: string;

  @IsOptional()
  completedAt?: Date;
}
