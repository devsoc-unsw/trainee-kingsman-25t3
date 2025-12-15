import { useState } from "react";
import { login, guestLogin } from "../endpoints/auth";
import { useNavigate } from "react-router-dom";

import ForestBackground from "../components/ForestBackground";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await login(email, password);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    try {
      setIsLoading(true);
      setError("");

      try {
        const response = await guestLogin();
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.newUserId);
      } catch (backendError) {
        console.warn("Backend unavailable, using offline mock mode", backendError);
        localStorage.setItem("token", "mock-token-123");
        localStorage.setItem("userId", "1");
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Guest login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-linear-to-b from-[#005fbf] to-white">
      <ForestBackground />
      <div className="flex flex-col gap-y-4 border h-[60%] w-[50%] justify-center items-center p-4">
        {error && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="text-sm">{error}</p>
          </div>
        )}
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="email">email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="border w-full p-2"
          />
        </div>

        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="password">password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border w-full p-2"
          />
        </div>

        <button
          onClick={() => handleLogin()}
          className="bg-purple-700 rounded cursor-pointer p-4 hover:bg-purple-800 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? `Logging in...` : `Login`}
        </button>

        <button
          onClick={() => handleGuestLogin()}
          className="bg-green-600 rounded cursor-pointer p-3 mt-2 hover:bg-green-700 disabled:opacity-50 w-full"
          disabled={isLoading}
        >
          Trial (Quick Login)
        </button>
      </div>
    </div>
  );
};

export default Login;
