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
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto, LoginUserDto } from "./dto";
import { JwtAuthGuard } from "../auth/auth.guard";
import { CacheInterceptor } from "@nestjs/cache-manager";

@Controller("users")
@UseInterceptors(CacheInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

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
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  // POST /users/login
  @Post("login")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  // POST /users/guest-login
  @Post("guest-login")
  guestLogin() {
    return this.usersService.guestLogin();
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
