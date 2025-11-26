import { useState } from "react";
// import { useNavigate } from "react-router-dom"

import ForestBackground from "../components/ForestBackground";

// const Login = () => {
//   const navigate = useNavigate();
//   const [passwordVisible, setPasswordVisible] = useState(false)
//   const [password, setPassword] = useState("")

//   const passwordToggle = () => {
//     setPasswordVisible(!passwordVisible)
//   }

//   const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value)
//   }

//   return (
//     <div className="relative flex justify-center items-center min-h-screen bg-[#213547] text-white">
//       <ForestBackground />
//       <div className="flex flex-col justify-center items-center border-2 p-4 gap-y-4 w-1/2 z-99">
//         <h1 className="text-3xl">Login to Farm 'n Cram</h1>

//         <div className="flex flex-col gap-y-4 w-1/2">
//           <h2>Email</h2>
//           <input placeholder="Email" className="border-2 text-black p-2 bg-white"></input>
//           <h2>Username</h2>
//           <input placeholder="Username" className="border-2 text-black p-2 bg-white"></input>
//           <h2>Password</h2>
//           <div className="relative w-full">
//             <input 
//               placeholder="Password" 
//               className="border-2 text-black p-2 bg-white w-3/4" 
//               onChange={passwordChange}
//               type={passwordVisible ? "text" : "password"}
//               value={password}
//               />
//               <span onClick={passwordToggle} className="absolute bg-white w-fit p-1 rounded-2xl right-0 top-1/2 -translate-y-1/2 cursor-pointer text-black select-none">
//                 {passwordVisible ? 
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
//                 </svg>
//                 :
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
//                 </svg>
                
//               }
//             </span>
//           </div>
//         </div>
//         <button 
//           className="bg-purple-700 rounded p-4 cursor-pointer hover:bg-purple-800"
//           onClick={() => navigate("/")}>
//           Click here to navigate back to landing page
//         </button>
//         <button 
//           className="bg-purple-700 rounded py-3 px-4 cursor-pointer hover:bg-purple-800"
//           onClick={() => navigate("/")}>
//           Login
//         </button>
//         <p>Don't have an account? 
//           <span className="m-1">
//             <button 
//               className="bg-purple-700 rounded p-1.5 cursor-pointer hover:bg-purple-800"
//               onClick={() => navigate("/register")}>
//               Sign up and Register
//             </button>
//           </span>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Login
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
