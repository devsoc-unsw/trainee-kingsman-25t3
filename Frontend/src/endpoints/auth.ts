import axios from "axios";
import { BASE_API_URL } from "./base_url";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/users/login`, {
      email,
      password,
    });
    return response;
  } catch (err: unknown) {
    console.error(err);
    throw new Error("Login failed");
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/users/register`, {
      email,
      password,
    });
    return response;
  } catch (err: unknown) {
    console.error(err);
    throw new Error("Register failed");
  }
};
