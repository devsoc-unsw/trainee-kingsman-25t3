import axiosInstance from "../lib/axios";
import { getErrorMessage } from "./error";

export const getGuilds = async () => {
  try {
    const response = await axiosInstance.get(`/guilds`);
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Fetch guilds failed");
    console.error("Fetch guilds error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};

export const getGuild = async (guildId: number) => {
  try {
    const response = await axiosInstance.get(`/guilds/${guildId}`);
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Fetch guild failed");
    console.error("Fetch guild error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};

export const joinGuild = async (guildId: number, userId: number) => {
  try {
    const response = await axiosInstance.post(`/guilds/${guildId}/join`, {
      userId,
    });
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Join guild failed");
    console.error("Join guild error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};

export const leaveGuild = async (guildId: number, userId: number) => {
  try {
    const response = await axiosInstance.delete(`/guilds/${guildId}/leave`, {
      data: { userId },
    });
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Leave guild failed");
    console.error("Leave guild error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};
