import axiosInstance from "../lib/axios";
import { getErrorMessage } from "./error";

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/users/login", {
      email,
      password,
    });
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Login failed");
    console.error("Login error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};

export const register = async (
  email: string,
  name: string,
  password: string
) => {
  try {
    const response = await axiosInstance.post("/users/register", {
      email,
      name,
      password,
    });
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Registration failed");
    console.error("Registration error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};

export const getUserStreak = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/users/streak/${userId}`);
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Failed to fetch user streak");
    console.error("Get streak error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/users/logout");
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Logout failed");
    console.error("Logout error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/users/me");
    console.log("response", response)
    return response;
  } catch (err: unknown) {
    console.log(err)
    const errorMessage = getErrorMessage(err, "Failed to get current user");
    console.error("Get current user error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};
