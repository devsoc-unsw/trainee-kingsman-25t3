import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  Res,
} from "@nestjs/common";
import type { Response } from "express";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto, LoginUserDto } from "./dto";
import { JwtAuthGuard } from "../auth/auth.guard";
import { CacheInterceptor } from "@nestjs/cache-manager";

@Controller("users")
@UseInterceptors(CacheInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  // GET /users/:id
  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // POST /users/register
  @Post("register")
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { newUserId, token } = await this.usersService.register(createUserDto);

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { newUserId };
  }

  // POST /users/login
  @Post("login")
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { userId, token } = await this.usersService.login(loginUserDto);

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { userId };
  }

  // POST /users/logout
  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("token");
    return { message: "Logged out successfully" };
  }

  // PATCH /users/:id
  @Patch()
  @UseGuards(JwtAuthGuard)
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  // DELETE /users/:id
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  // GET /users/streak/:id
  @Get("/streak/:id")
  getStreak(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.getStreak(id);
  }
}
