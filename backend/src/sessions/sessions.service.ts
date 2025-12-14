import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateSessionDto } from "./dto/create-session.dto";
import { UpdateSessionDto } from "./dto/update-session.dto";
import { DatabaseService } from "src/database/database.service";
import { Prisma } from "@prisma/client";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import type { Cache } from "cache-manager";

@Injectable()
export class SessionsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly databaseService: DatabaseService,
  ) {}

  async getSessions(userId: number) {
    const cacheKey = `user_sessions_stats_${userId}`;

    const cachedStats = await this.cacheManager.get(cacheKey);
    if (cachedStats) {
      console.log("Cache hit for user:", userId);
      return cachedStats;
    }

    console.log("Cache miss for user:", userId);

    const sessions = await this.databaseService.session.findMany({
      where: {
        userId: userId,
      },
    });

    const totalMinutes = sessions.reduce(
      (accumulator, currValue) => accumulator + currValue.duration,
      0,
    );

    let hour: number = 0;
    let minute: number = 0;

    if (totalMinutes >= 60) {
      hour = Math.floor(totalMinutes / 60);
      minute = totalMinutes % 60;
    } else {
      minute = totalMinutes;
    }

    const ret = {
      count: sessions.length,
      totalTime: `${hour}h ${minute}m`,
    };

    await this.cacheManager.set(cacheKey, ret, 300000);

    return ret;
  }

  async createSessions(createSessionDto: CreateSessionDto) {
    if (createSessionDto.duration < 1) {
      throw new BadRequestException("Invalid session time");
    }

    if (!["focus", "break"].includes(createSessionDto.type)) {
      console.log("here");
      throw new BadRequestException("Valid type sessions break and focus");
    }

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

    const cacheKey = `user_sessions_stats_${createSessionDto.userId}`;
    await this.cacheManager.del(cacheKey);

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

      const cacheKey = `user_sessions_stats_${session.userId}`;
      await this.cacheManager.del(cacheKey);

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

    const cacheKey = `user_sessions_stats_${session.userId}`;
    await this.cacheManager.del(cacheKey);

    return session;
  }
}
