import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { GuildsModule } from "../guilds/guilds.module";

@Module({
  imports: [GuildsModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
