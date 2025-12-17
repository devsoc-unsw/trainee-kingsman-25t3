import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateTaskDto, PatchTaskDto } from "./dto";

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getTasks(userId: number) {
    const tasks = await this.databaseService.individualTask.findMany({
      where: {
        userId: userId,
      },
    });

    const ret = tasks.map(({ id, description, done }) => ({
      id,
      title: description,
      completed: done,
    }));

    return ret;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const newTask = await this.databaseService.individualTask.create({
      data: {
        ...createTaskDto,
        done: false,
      },
    });

    const ret = {
      id: newTask.id,
      title: newTask.description,
      completed: newTask.done,
    };

    return ret;
  }

  async patchTask(id: number, patchTaskDto: PatchTaskDto) {
    console.log("HAHAHAHHA")
    const task = await this.databaseService.individualTask.update({
      where: {
        id: id,
      },
      data: patchTaskDto,
    });

    if (!task) {
      console.log("NOT FOUND")
      throw new NotFoundException(
        `Failed to update task. Task id: ${id} not found`,
      );
    }

    return task;
  }

  async deleteTask(id: number) {
    const task = await this.databaseService.individualTask.delete({
      where: {
        id: id,
      },
    });

    if (!task) {
      throw new NotFoundException(
        `Failed to delete task. Task id: ${id} not found`,
      );
    }

    return task;
  }
}
