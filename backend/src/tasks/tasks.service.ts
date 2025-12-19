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
    if (!createTaskDto.userId) {
      throw new Error("User ID is required");
    }

    const newTask = await this.databaseService.individualTask.create({
      data: {
        description: createTaskDto.description,
        userId: createTaskDto.userId,
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
    const existingTask = await this.databaseService.individualTask.findUnique({
      where: { id },
    });

    if (!existingTask) {
      throw new NotFoundException(
        `Failed to update task. Task id: ${id} not found`,
      );
    }

    const task = await this.databaseService.individualTask.update({
      where: {
        id: id,
      },
      data: patchTaskDto,
    });

    // If task is being marked as done (and wasn't done before), award 10 bucks
    if (patchTaskDto.done === true && !existingTask.done) {
      await this.databaseService.user.update({
        where: { id: existingTask.userId },
        data: {
          bucksValue: {
            increment: 10,
          },
        },
      });
    }

    return {
      id: task.id,
      title: task.description,
      completed: task.done,
    };
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
