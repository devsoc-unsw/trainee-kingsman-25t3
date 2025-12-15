import axios from "axios";
import { BASE_API_URL } from "./base_url";
import { getErrorMessage } from "./error";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/users/login`, {
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
    const response = await axios.post(`${BASE_API_URL}/users/register`, {
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
    const response = await axios.get(`${BASE_API_URL}/users/streak/${userId}`);
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Failed to fetch user streak");
    console.error("Get streak error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};

export const guestLogin = async () => {
  try {
    const response = await axios.post(`${BASE_API_URL}/users/guest-login`);
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Guest login failed");
    console.error("Guest login error:", errorMessage, err);
    throw new Error(errorMessage);
  }
};
