import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { UsersModule } from "./users/users.module";
import { DatabaseModule } from "./database/database.module";
import { TasksModule } from "./tasks/tasks.module";
import { SessionsModule } from "./sessions/sessions.module";
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register(),
    UsersModule,
    DatabaseModule,
    TasksModule,
    SessionsModule,
    StatisticsModule,
  ],
})
export class AppModule {}
