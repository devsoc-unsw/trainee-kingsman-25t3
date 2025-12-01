import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSessionDto } from "./dto/create-session.dto";
import { UpdateSessionDto } from "./dto/update-session.dto";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class SessionsService {
  // to be completed
  constructor(private readonly databaseService: DatabaseService) {}

  // findAll() {
  //   return `This action returns all sessions`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} session`;
  // }

  async getSessions(userId: number) {
    const sessions = await this.databaseService.session.findMany({
      where: {
        userId: userId,
      },
    });

    return sessions;
  }

  async createSessions(createSessionDto: CreateSessionDto) {
    const newSession = await this.databaseService.session.create({
      data: {
        ...createSessionDto,
        done: false,
      },
    });

    return newSession;
  }

  async updateSession(id: number, updateSessionDto: UpdateSessionDto) {
    const session = await this.databaseService.session.create({
      where: {
        id: id,
      },
      data: updateSessionDto,
    });

    if (!session) {
      throw new NotFoundException(
        `Failed to update session. Session ${id} not found`,
      );
    }

    return session;
  }

  async deleteSession(id: number) {
    const session = await this.databaseService.session.delete({
      where: {
        id: id,
      },
    });

    if (!session) {
      throw new NotFoundException(
        `Failed to delete session. Session ${id} not found`,
      );
    }

    return session;
  }
}
