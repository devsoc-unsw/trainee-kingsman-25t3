import axios, { AxiosError } from "axios";
import { BASE_API_URL } from "./base_url";

interface ErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

const getErrorMessage = (err: unknown, defaultMessage: string): string => {
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<ErrorResponse>;

    if (axiosError.response) {
      const { status, data } = axiosError.response;

      if (data?.message) {
        return data.message;
      }

      if (data?.error) {
        return data.error;
      }

      switch (status) {
        case 400:
          return "Invalid credentials provided";
        case 401:
          return "Incorrect email or password";
        case 403:
          return "Access forbidden";
        case 404:
          return "Account not found";
        case 409:
          return "Account already exists";
        case 500:
          return "Server error. Please try again later";
        default:
          return `${defaultMessage} (Error ${status})`;
      }
    }

    if (axiosError.request) {
      return "Unable to connect to server. Please check your internet connection";
    }
  }

  return defaultMessage;
};

export const createSession = async (duration: number, type: string, completed: Date) => {
  try {
    const response = axios.post(`${BASE_API_URL}/sessions`, {
      duration,
      type,
      completed
    });
    console.log("response:" + response)
    return response;
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err, "Registration failed");
    console.error("Registration error:", errorMessage, err);
    throw new Error(errorMessage);
  }
}
