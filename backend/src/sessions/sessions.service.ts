import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateSessionDto } from "./dto/create-session.dto";
import { UpdateSessionDto } from "./dto/update-session.dto";
import { DatabaseService } from "src/database/database.service";
import { Prisma } from "@prisma/client";

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
    if (createSessionDto.duration < 1) {
      throw new BadRequestException("Invalid session time");
    }

    if (!["focus", "break"].includes(createSessionDto.type)) {
      console.log("here");
      throw new BadRequestException("Valid type sessions break and focus");
    }

    // question about the prisma generate and its version?
    const newSession = await this.databaseService.session.create({
      data: {
        userId: createSessionDto.userId,
        duration: createSessionDto.duration,
        type: createSessionDto.type,
        done: true,
        completedAt: createSessionDto.completedAt,
      },
    });

    console.log("New Session:" + newSession);

    return newSession;
  }

  async updateSession(id: number, updateSessionDto: UpdateSessionDto) {
    try {
      const data: Prisma.SessionUpdateInput = {};
      if (updateSessionDto.duration !== undefined) {
        data.duration = updateSessionDto.duration;
      }

      if (updateSessionDto.type !== undefined) {
        data.type = updateSessionDto.type;
      }

      if (updateSessionDto.done !== undefined) {
        data.done = updateSessionDto.done;
      }

      const session = await this.databaseService.session.update({
        where: {
          id: id,
        },
        data: updateSessionDto,
      });

      return session;
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new NotFoundException(
          `Failed to update session. Session ${id} not found`,
        );
      }
    }
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
