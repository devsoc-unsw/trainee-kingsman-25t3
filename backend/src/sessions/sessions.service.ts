import { Injectable } from "@nestjs/common";
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
    const sessions = await this.databaseService.Session.findMany({
      where: {
        userId: userId,
      },
    });

    return sessions;
  }

  async createSessions(createSessionDto: CreateSessionDto) {
    return "This action adds a new session";
  }

  async updateSession(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  async deleteSession(id: number) {
    return `This action removes a #${id} session`;
  }
}
