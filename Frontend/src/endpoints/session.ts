import axios from "axios";
import { BASE_API_URL } from "./base_url";
import { getErrorMessage } from "./error";

export const createSession = async (userId: number, duration: number, type: string, completedAt: Date) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/sessions`, {
      userId,
      duration,
      type,
      completedAt
    });
    console.log("response:" + response)
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Session creation failed");
    console.error("Session creation error:", errorMessage, err);
    throw new Error(errorMessage);
  }
}
