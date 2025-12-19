import axios from "axios";
import { BASE_API_URL } from "../endpoints/base_url";

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

// Response interceptor for handling 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear any userId stored in localStorage
      localStorage.removeItem("userId");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
