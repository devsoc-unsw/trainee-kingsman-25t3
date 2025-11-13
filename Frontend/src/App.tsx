import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col border gap-y-4 p-4">
      <h1 >This will be our landing page</h1>
      <button 
        className="bg-purple-700 rounded cursor-pointer p-4 hover:bg-purple-800"
        onClick={() => navigate("/dashboard")}
      >
        Click here to navigate to Dashboard
      </button>
    </div>
  )
}

export default App;
