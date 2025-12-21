import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from "@nestjs/common";
import { GuildsService } from "./guilds.service";
import { JwtAuthGuard } from "../auth/auth.guard";

@Controller("guilds")
@UseGuards(JwtAuthGuard)
export class GuildsController {
  constructor(private readonly guildsService: GuildsService) {}

  @Get()
  async findAll() {
    return this.guildsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.guildsService.findOne(id);
  }

  @Post(":id/join")
  async joinGuild(@Param("id", ParseIntPipe) id: number, @Request() req) {
    const userId = req.user.sub;
    return this.guildsService.joinGuild(id, userId);
  }

  @Delete(":id/leave")
  async leaveGuild(@Param("id", ParseIntPipe) id: number, @Request() req) {
    const userId = req.user.sub;
    await this.guildsService.leaveGuild(id, userId);
    return { message: "Successfully left the guild" };
  }
}




