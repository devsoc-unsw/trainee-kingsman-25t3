import axios from "axios";
import { BASE_API_URL } from "./base_url";

export const login = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/users`, {
      name,
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
    const response = await axios.post(`${BASE_API_URL}/users`, {
      email,
      password,
    });
    return response;
  } catch (err: unknown) {
    console.error(err);
    throw new Error("Register failed");
  }
};
