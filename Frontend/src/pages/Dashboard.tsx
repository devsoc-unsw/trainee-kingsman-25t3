import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#213547] text-white">

      <div className="flex flex-col justify-center items-center border-2 p-4 gap-y-4 w-1/2">
        <h1>This is the dashboard page</h1>

        <button 
          className="bg-purple-700 rounded p-4 cursor-pointer hover:bg-purple-800"
          onClick={() => navigate("/")}>
          Click here to navigate back to landing page
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
