import axiosInstance from "../lib/axios";
import { getErrorMessage } from "./error";

export const getTasks = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/tasks/${userId}`);
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Fetch task failed");
    console.error("Fetch task error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};

export const addTasks = async (userId: number, description: string) => {
  try {
    const response = await axiosInstance.post(`/tasks`, {
      description: description,
      userId: userId,
    });

    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Adding task failed");
    console.error("Add task error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};

export const deleteTasks = async (taskId: number) => {
  try {
    const response = await axiosInstance.delete(`/tasks/${taskId}`);

    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Delete task failed");
    console.error("Delete task error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};

export const updateTask = async (taskId: number, completed: boolean) => {
  try {
    const response = await axiosInstance.patch(`/tasks/${taskId}`, {
      done: completed,
    });

    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Update task failed");
    console.error("Update task error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};
