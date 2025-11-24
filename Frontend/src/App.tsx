import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";

import Tree from "./components/Tree";

function App() {
  const navigate = useNavigate();
  
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-[#213547] text-white">
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
      <div className="absolute bottom-0 left-0 h-1/3 w-full pointer-events-none px-10">

        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          {/* <OrbitControls enableZoom={false} /> */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[-2, 5, 2]} intensity={1} />
          <group position={[0, 0, 0]}>
            {Array.from({ length: 5 }).map((_, index, arr) => {
              const treeCount = arr.length;
        const canvasWidth = 40; // logical width for spacing in scene units
        const spacing = canvasWidth / (treeCount - 1); // calculate spacing dynamically
        const x = -canvasWidth / 2 + index * spacing; 
        return <Tree key={index} position={[x, 0, 0]} />;
              
              })}
          </group>
        </Canvas>
       
        
        {/* <Canvas className=" h-full mt-7">
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[-2, 5, 2]} intensity={1} />
          <AnimatedSphere />
        </Canvas> */}
      </div>
    </div>

  )
}

export default App;
