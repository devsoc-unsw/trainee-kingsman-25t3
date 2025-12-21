import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { GuildResponseDto, MemberResponseDto } from "./dto";

@Injectable()
export class GuildsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<GuildResponseDto[]> {
    const guilds = await this.databaseService.guild.findMany({
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return guilds.map((guild) => this.mapToResponseDto(guild));
  }

  async findOne(id: number): Promise<GuildResponseDto> {
    const guild = await this.databaseService.guild.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!guild) {
      throw new NotFoundException(`Guild with id ${id} not found`);
    }

    return this.mapToResponseDto(guild);
  }

  async joinGuild(guildId: number, userId: number): Promise<GuildResponseDto> {
    // Check if guild exists
    const guild = await this.databaseService.guild.findUnique({
      where: { id: guildId },
    });

    if (!guild) {
      throw new NotFoundException(`Guild with id ${guildId} not found`);
    }

    // Check if user is already a member of any guild
    const existingMembership = await this.databaseService.guildMember.findFirst({
      where: { userId },
    });

    if (existingMembership) {
      throw new BadRequestException(
        "User is already a member of a guild. Please leave your current guild before joining another.",
      );
    }

    // Check if user is already a member of this specific guild
    const existingMember = await this.databaseService.guildMember.findUnique({
      where: {
        guildId_userId: {
          guildId,
          userId,
        },
      },
    });

    if (existingMember) {
      throw new ConflictException("User is already a member of this guild");
    }

    // Create guild membership
    await this.databaseService.guildMember.create({
      data: {
        guildId,
        userId,
        tasks_contributed: 0,
      },
    });

    return this.findOne(guildId);
  }

  async leaveGuild(guildId: number, userId: number): Promise<void> {
    const membership = await this.databaseService.guildMember.findUnique({
      where: {
        guildId_userId: {
          guildId,
          userId,
        },
      },
    });

    if (!membership) {
      throw new NotFoundException(
        "User is not a member of this guild",
      );
    }

    await this.databaseService.guildMember.delete({
      where: {
        id: membership.id,
      },
    });
  }

  async incrementGuildProgress(userId: number): Promise<void> {
    // Find the user's guild membership
    const membership = await this.databaseService.guildMember.findFirst({
      where: { userId },
      include: {
        guild: true,
      },
    });

    if (!membership) {
      // User is not in a guild, nothing to do
      return;
    }

    // Increment the member's tasks_contributed
    await this.databaseService.guildMember.update({
      where: { id: membership.id },
      data: {
        tasks_contributed: {
          increment: 1,
        },
      },
    });

    // Increment the guild's current_tasks
    const updatedGuild = await this.databaseService.guild.update({
      where: { id: membership.guildId },
      data: {
        current_tasks: {
          increment: 1,
        },
      },
    });

    // Check if guild should be completed
    await this.checkAndCompleteGuild(membership.guildId);
  }

  async checkAndCompleteGuild(guildId: number): Promise<void> {
    const guild = await this.databaseService.guild.findUnique({
      where: { id: guildId },
    });

    if (!guild) {
      return;
    }

    // Check if goal is reached and guild is not already completed
    if (guild.current_tasks >= guild.goal_tasks && !guild.completed) {
      // Mark guild as completed
      await this.databaseService.guild.update({
        where: { id: guildId },
        data: {
          completed: true,
        },
      });

      // Award rewards to all members
      await this.awardCompletionRewards(guildId);
    }
  }

  async awardCompletionRewards(guildId: number): Promise<void> {
    const members = await this.databaseService.guildMember.findMany({
      where: { guildId },
    });

    // Award 100 bucks to each member
    for (const member of members) {
      await this.databaseService.user.update({
        where: { id: member.userId },
        data: {
          bucksValue: {
            increment: 100,
          },
        },
      });
    }
  }

  private mapToResponseDto(guild: any): GuildResponseDto {
    return {
      id: guild.id,
      name: guild.name,
      description: guild.description,
      goal_tasks: guild.goal_tasks,
      current_tasks: guild.current_tasks,
      completed: guild.completed,
      createdAt: guild.createdAt,
      updatedAt: guild.updatedAt,
      members: guild.members?.map((member: any) => ({
        id: member.id,
        userId: member.userId,
        name: member.user?.name ?? "Unknown",
        tasks_contributed: member.tasks_contributed ?? 0,
        joinedAt: member.joinedAt,
      })) ?? [],
    };
  }
}




