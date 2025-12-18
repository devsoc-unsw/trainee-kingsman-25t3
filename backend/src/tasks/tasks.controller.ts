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
  Request,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto, PatchTaskDto } from "./dto";
import { JwtAuthGuard } from "../auth/auth.guard";

@Controller("tasks")
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  getTasks(@Request() req) {
    return this.tasksService.getTasks(req.user.sub);
  }

  @Post()
  create(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask({
      ...createTaskDto,
      userId: req.user.sub,
    });
  }

  @Patch(":taskId")
  patch(
    @Param("taskId", ParseIntPipe) id: number,
    @Body() patchTaskDto: PatchTaskDto,
  ) {
    return this.tasksService.patchTask(id, patchTaskDto);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
