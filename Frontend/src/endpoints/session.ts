import axiosInstance from "../lib/axios";
import { getErrorMessage } from "./error";

export const createSession = async (
  userId: number,
  duration: number,
  type: string,
  completedAt: Date
) => {
  try {
    const response = await axiosInstance.post("/sessions", {
      userId,
      duration,
      type,
      completedAt,
    });
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Session creation failed");
    console.error("Session creation error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};

export const getSession = async (
  userId: number
) => {
  try {
    const response = await axiosInstance.get(`/sessions/${userId}`);
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Session creation failed");
    console.error("Session creation error:", errorMessage, err);
    throw new Error(errorMessage);
  }
}
