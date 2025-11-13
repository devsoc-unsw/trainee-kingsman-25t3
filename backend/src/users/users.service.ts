import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateUserDto, UpdateUserDto } from "./dto";

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return this.databaseService.user.findMany();
  }

  async findOne(id: number) {
    const foundUser = await this.databaseService.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!foundUser) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return foundUser;
  }

  async create(createUserDto: CreateUserDto) {
    return this.databaseService.user.create({
      data: createUserDto,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.databaseService.user.update({
        where: {
          id: id,
        },
        data: updateUserDto,
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`User with id: ${id} not found`);
      }
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await this.databaseService.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`User with id: ${id} not found`);
      }
      throw error;
    }
  }
}
