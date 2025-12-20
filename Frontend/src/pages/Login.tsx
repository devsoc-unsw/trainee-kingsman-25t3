import { useEffect, useState } from "react";
import { login } from "../endpoints/auth";
import { useNavigate } from "react-router-dom";

import ForestBackground from "../components/ForestBackground";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.removeItem("userId");
  }, []);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await login(email, password);

      // Store only userId in localStorage (token is now in HTTP-only cookie)
      localStorage.setItem("userId", response.data.userId);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-linear-to-b from-[#005fbf] to-white">
      <ForestBackground />
      <div className="flex flex-col gap-y-4 border-6 border-[#161180] h-[60%] w-[50%] justify-center items-center p-4 z-99">
        <h1 className="text-3xl text-[#161180]">Log-in to Farm 'n Cram</h1>

        {error && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="text-sm">{error}</p>
          </div>
        )}
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="border-2 bg-white w-full p-2"
          />
        </div>

        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="password">Password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border-2 bg-white w-full p-2"
          />
        </div>

        <button
          onClick={() => handleLogin()}
          className="bg-purple-700 text-white rounded cursor-pointer p-4 hover:bg-purple-800"
        >
          {isLoading ? `Logging in...` : `Login`}
        </button>
        <p className="text-[#161180]">
          Don't have an account?
          <span className="m-1">
            <button
              className="bg-purple-700 rounded p-1.5 cursor-pointer hover:bg-purple-800 text-white"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
