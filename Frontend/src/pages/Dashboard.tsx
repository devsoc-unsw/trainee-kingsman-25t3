import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col border p-4 gap-y-4">
      <h1>This is the dashboard page</h1>

      <button 
        className="bg-purple-700 rounded p-4 cursor-pointer hover:bg-purple-800"
        onClick={() => navigate("/")}>
        Click here to navigate back to landing page
      </button>
    </div>
  );
};

export default Dashboard;
