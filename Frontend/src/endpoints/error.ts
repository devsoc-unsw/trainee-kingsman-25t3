import axios, { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

export const getErrorMessage = (
  err: unknown,
  defaultMessage: string
): string => {
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
