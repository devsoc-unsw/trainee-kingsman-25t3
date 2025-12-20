import { useNavigate } from "react-router-dom";

import ForestBackground from "./components/ForestBackground";

function App() {
  const navigate = useNavigate();
  
  return (
    <div className="flex bg-linear-to-b from-[#005fbf] to-white h-screen justify-center">
      <ForestBackground />
      <div className="flex flex-col justify-center items-center gap-y-4 z-99">
        <h1 className="text-3xl">Welcome to Farm N Cram</h1>
        <button 
          className="bg-purple-700 text-white rounded cursor-pointer p-4 hover:bg-purple-800"
          onClick={() => navigate("/register")}
        >
          Create account
        </button>
        <button 
          onClick={() => navigate("/auth/login")}
          className="cursor-pointer underline hover:text-gray-400"
        >
          Already have an account? Sign in here
        </button>
      </div>
    </div>

  )
}

export default App;
