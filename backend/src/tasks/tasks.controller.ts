import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  UseGuards,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto, PatchTaskDto } from "./dto";
import { JwtAuthGuard } from "../auth/auth.guard";

@Controller("tasks")
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get(":userId")
  getTasks(@Param("userId", ParseIntPipe) userId: number) {
    return this.tasksService.getTasks(userId);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch(":taskId")
  patch(
    @Param("taskId", ParseIntPipe) id: number,
    @Body() patchTaskDto: PatchTaskDto,
  ) {
    console.log("BRUH")
    return this.tasksService.patchTask(id, patchTaskDto);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
