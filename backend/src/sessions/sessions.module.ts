import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { SessionsService } from "./sessions.service";
import { SessionsController } from "./sessions.controller";

@Module({
  imports: [CacheModule.register()],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
