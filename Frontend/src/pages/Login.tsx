import { useState } from "react";
import { login } from "../endpoints/auth";
import { useNavigate } from "react-router-dom";

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

      console.log("Login successful:", response.data);
      // localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-y-4 border h-[60%] w-[50%] justify-center items-center p-4">
        <div className="flex flex-col w-full gap-y-2">
          {error && <p className="text-red-500">Incorrect email or password</p>}
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
          className="bg-purple-700 rounded cursor-pointer p-4 hover:bg-purple-800"
        >
          {isLoading ? `Logging in...` : `Login`}
        </button>
      </div>
    </div>
  );
};

export default Login;
