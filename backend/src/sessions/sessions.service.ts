import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateSessionDto } from "./dto/create-session.dto";
import { UpdateSessionDto } from "./dto/update-session.dto";
import { DatabaseService } from "src/database/database.service";
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

    // Update streak with proper date checking
    await this.updateUserStreak(createSessionDto.userId);

    // Invalidate all user-related caches
    await this.invalidateUserCaches(createSessionDto.userId);

    return newSession;
  }

  async updateSession(id: number, updateSessionDto: UpdateSessionDto) {
    try {
      const session = await this.databaseService.session.update({
        where: { id: id },
        data: updateSessionDto,
      });

      // Invalidate ALL related caches for this user
      await this.invalidateUserCaches(session.userId);

      return session;
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new NotFoundException(
          `Failed to update session. Session ${id} not found`,
        );
      }
    }
  }

  private async invalidateUserCaches(userId: number) {
    const cacheKeys = [
      `user_sessions_stats_${userId}`,
      `user_statistics_${userId}`,
      `/users/streak/${userId}`,
    ];

    await Promise.all(cacheKeys.map((key) => this.cacheManager.del(key)));
  }

  private async updateUserStreak(userId: number) {
    const user = await this.databaseService.user.findUnique({
      where: { id: userId },
      select: { lastActivityDate: true, streak: true },
    });

    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastActivity = user.lastActivityDate
      ? new Date(user.lastActivityDate as Date)
      : null;

    if (lastActivity) {
      lastActivity.setHours(0, 0, 0, 0);
    }

    let newStreak = user.streak;

    if (!lastActivity) {
      // First time activity
      newStreak = 1;
    } else {
      const daysDifference = Math.floor(
        (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (daysDifference === 0) {
        // Same day - no streak change
        return;
      } else if (daysDifference === 1) {
        // Consecutive day - increment streak
        newStreak = user.streak + 1;
      } else {
        // Missed days - reset streak
        newStreak = 1;
      }
    }

    // Update user with new streak and last activity date
    await this.databaseService.user.update({
      where: { id: userId },
      data: {
        streak: newStreak,
        lastActivityDate: new Date(),
      },
    });
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

    // Invalidate all user-related caches
    await this.invalidateUserCaches(session.userId);

    return session;
  }

  async getStatistics(
    userId: number,
    take: number = 20,
    cursor?: number,
    direction: "prev" | "next" = "next",
  ) {
    const cacheKey = `user_statistics_${userId}`;
    const sessions = await this.databaseService.session.findMany({
      take: direction === "prev" ? -take : take,
      ...(cursor && { skip: 1, cursor: { id: cursor } }),
      where: { userId: userId },
      orderBy: { duration: "desc" },
    });

    await this.cacheManager.set(cacheKey, sessions, 300000);
    const results = direction === "prev" ? sessions.reverse() : sessions;

    return {
      data: results,
      nextCursor: results.length > 0 ? results[results.length - 1].id : null,
      prevCursor: results.length > 0 ? results[0].id : null,
      hasMore: Math.abs(sessions.length) === Math.abs(take),
    };
  }

  async getBestDuration(userId: number) {
    return await this.databaseService.session.findFirst({
      where: {
        userId: userId,
      },
      orderBy: {
        duration: "desc",
      },
    });
  }
}
