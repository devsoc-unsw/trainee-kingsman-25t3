import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { DatabaseModule } from "./database/database.module";
import { TasksModule } from './tasks/tasks.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    DatabaseModule,
    TasksModule,
    SessionsModule,
  ],
})
export class AppModule {}
