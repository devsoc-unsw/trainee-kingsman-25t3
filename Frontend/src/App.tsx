import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#213547] text-white">
      <div className="flex flex-col justify-center items-center border-2 gap-y-4 p-4 w-1/2">
        <h1 className="text-3xl">[Project Name]</h1>
        <p>Insert some animation or icon here...</p>
        <button 
          className="bg-purple-700 rounded cursor-pointer p-4 hover:bg-purple-800"
          onClick={() => navigate("/dashboard")}
          >
          To Dashboard
        </button>
        <button 
          className="bg-purple-700 rounded cursor-pointer p-4 hover:bg-purple-800"
          onClick={() => navigate("/login")}
          >
          Log-In and Sign-Up
        </button>
      </div>
    </div>
  )
}

export default App;
