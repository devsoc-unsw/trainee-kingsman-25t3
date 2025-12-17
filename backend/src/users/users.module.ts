import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [CacheModule.register()],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
