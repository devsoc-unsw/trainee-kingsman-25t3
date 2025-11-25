import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "./dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  async register(createUserDto: CreateUserDto) {
    const checkEmail = await this.databaseService.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (checkEmail) {
      throw new ConflictException(
        `Email: ${createUserDto.email} already registered`,
      );
    }

    const hashedCreateUserDto = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const newUser = await this.databaseService.user.create({
      data: hashedCreateUserDto,
    });

    const newUserId = newUser.id;

    const token = jwt.sign(newUser, process.env.JWT_SECRET!);

    return { newUserId, token };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.databaseService.user.findFirst({
      where: {
        email: loginUserDto.email,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `Email: ${loginUserDto.email} not registered`,
      );
    }

    bcrypt.compare(
      loginUserDto.password,
      user.password,
      function (err, result) {
        if (result) {
          const token = jwt.sign(user, process.env.JWT_SECRET!);
          const userId = user.id;
          return { userId, token };
        } else {
          throw new BadRequestException("Incorrect password");
        }
      },
    );
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
