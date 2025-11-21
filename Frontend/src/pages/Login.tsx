import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#213547] text-white">

      <div className="flex flex-col justify-center items-center border-2 p-4 gap-y-4 w-1/2">
        <h1 className="text-3xl">Login to ...</h1>

        <div className="flex flex-col gap-y-4 w-1/2">
          <input placeholder="Email" className="border-2 text-black p-2 bg-white"></input>
          <input placeholder="Username" className="border-2 text-black p-2 bg-white"></input>
          <input placeholder="Password" className="border-2 text-black p-2 bg-white"></input>

        </div>
        <button 
          className="bg-purple-700 rounded p-4 cursor-pointer hover:bg-purple-800"
          onClick={() => navigate("/")}>
          Click here to navigate back to landing page
        </button>
        <button 
          className="bg-purple-700 rounded p-4 cursor-pointer hover:bg-purple-800"
          onClick={() => navigate("/")}>
          Login
        </button>
        <button 
          className="bg-purple-700 rounded p-4 cursor-pointer hover:bg-purple-800"
          onClick={() => navigate("/")}>
          Signup
        </button>
      </div>
    </div>
  )
}

export default Login