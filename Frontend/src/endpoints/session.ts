import axios from "axios";
import { BASE_API_URL } from "./base_url";
import { getErrorMessage } from "./error";

export const createSession = async (
  userId: number,
  duration: number,
  type: string,
  completedAt: Date
) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/sessions`, {
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
    const response = await axios.get(`${BASE_API_URL}/sessions/${userId}`);
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Session creation failed");
    console.error("Session creation error:", errorMessage, err);
    throw new Error(errorMessage);
  }
}
