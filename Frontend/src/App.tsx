import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  
  return (
    <div className="flex h-screen justify-center">
      <div className="flex flex-col justify-center items-center gap-y-4">
        <h1 className="text-3xl">Welcome to Farm N Cram</h1>
        <button 
          className="bg-purple-700 rounded cursor-pointer p-4 hover:bg-purple-800"
          onClick={() => navigate("/dashboard")}
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
