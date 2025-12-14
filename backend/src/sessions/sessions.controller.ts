import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { SessionsService } from "./sessions.service";
import { CreateSessionDto } from "./dto/create-session.dto";
import { UpdateSessionDto } from "./dto/update-session.dto";

@Controller("sessions")
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  // POST /sessions
  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.createSessions(createSessionDto);
  }

  // @Get()
  // findAll() {
  //   return this.sessionsService.findAll();
  // }

  @Get(":userId")
  getSessions(@Param("userId", ParseIntPipe) userId: number) {
    return this.sessionsService.getSessions(userId);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    return this.sessionsService.updateSession(id, updateSessionDto);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.sessionsService.deleteSession(id);
  }
}
