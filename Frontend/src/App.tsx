import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";

import Tree from "./components/Tree";
import { Cloud } from "@react-three/drei";

function App() {
  const navigate = useNavigate();
  
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-[#1c96c5] font-semibold text-black p-0">
      <div className="flex flex-col justify-center items-center border-2 gap-y-4 p-4 w-1/2 z-99">
        <h1 className="text-3xl">Farm 'n Cram</h1>
        <p>Insert some animation or icon here...</p>
        <button 
          className="bg-purple-700 rounded cursor-pointer p-4 hover:bg-purple-800 text-white"
          onClick={() => navigate("/dashboard")}
          >
          To Dashboard
        </button>
        <button 
          className="bg-purple-700 rounded cursor-pointer p-4 hover:bg-purple-800 text-white"
          onClick={() => navigate("/login")}
          >
          Log-In and Sign-Up
        </button>
      </div>
      <div className="absolute top-0 left-0 h-full w-full pointer-events-none">

        <Canvas orthographic camera={{ position: [0, 0, 10], zoom: 15 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[-2, 5, 2]} intensity={1} />

          {/* clouds in arch */}
          <Cloud opacity={1} speed={1} segments={30} color="#fff" position={[-40, -5, 0]} scale={1.5} />
          <Cloud opacity={1} speed={1} segments={30} color="#fff" position={[-30, 10, 0]} scale={1.75} />
          <Cloud opacity={1} speed={0.5} segments={20} color="#fff" position={[0, 20, 0]} scale={2} />
          <Cloud opacity={1} speed={1} segments={30} color="#fff" position={[30, 10, 0]} scale={1.75} />
          <Cloud opacity={1} speed={1} segments={30} color="#fff" position={[40, -5, 0]} scale={1.5} />
          
          {/* middle clouds */}
          <Cloud opacity={1} speed={1} segments={15} color="#fff" position={[-10, 0, 0]} scale={1.75} />
          <Cloud opacity={1} speed={1} segments={15} color="#fff" position={[15, -5, 0]} scale={1.75} />
          
          <Cloud opacity={1} speed={1} segments={20} color="#fff" position={[-45, 20, 0]} scale={1.5} />
          
          <group position={[0, -16, -3]}>
            {Array.from({ length: 12 }).map((_, index, arr) => {
              const treeCount = arr.length;
              const canvasWidth = 100; // logical width for spacing in scene units
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
