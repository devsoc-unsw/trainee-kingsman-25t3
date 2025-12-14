import { Cloud } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Tree from "./Tree";

const ForestBackground = React.memo(function ForestBackground() {
  return (
    <div className="absolute top-0 left-0 h-full w-full pointer-events-none -z-99">
      <Canvas orthographic camera={{ position: [0, 0, 10], zoom: 15 }}>
        <directionalLight position={[2, 5, 2]} intensity={4} />
        <ambientLight intensity={1} />
        {/* clouds in arch */}
        <Cloud
          opacity={1}
          speed={1}
          segments={30}
          color="#fff"
          position={[-40, -5, 0]}
          scale={1.5}
        />
        <Cloud
          opacity={1}
          speed={1}
          segments={30}
          color="#fff"
          position={[-30, 10, 0]}
          scale={1.75}
        />
        <Cloud
          opacity={1}
          speed={0.5}
          segments={20}
          color="#fff"
          position={[0, 20, 0]}
          scale={2}
        />
        <Cloud
          opacity={1}
          speed={1}
          segments={30}
          color="#fff"
          position={[30, 10, 0]}
          scale={1.75}
        />
        <Cloud
          opacity={1}
          speed={1}
          segments={30}
          color="#fff"
          position={[40, -5, 0]}
          scale={1.5}
        />

        {/* middle clouds */}
        <Cloud
          opacity={1}
          speed={1}
          segments={15}
          color="#fff"
          position={[-10, 0, 0]}
          scale={1.75}
        />
        <Cloud
          opacity={1}
          speed={1}
          segments={15}
          color="#fff"
          position={[15, -5, 0]}
          scale={1.75}
        />

        <Cloud
          opacity={1}
          speed={1}
          segments={20}
          color="#fff"
          position={[-45, 20, 0]}
          scale={1.5}
        />

        <group position={[0, -16, -3]}>
          {Array.from({ length: 12 }).map((_, index, arr) => {
            const treeCount = arr.length;
            const canvasWidth = 100; // logical width for spacing in scene units
            const spacing = canvasWidth / (treeCount - 1); // calculate spacing
            const x = -canvasWidth / 2 + index * spacing;

            return <Tree key={index} position={[x, 0, 0]} />;
          })}
        </group>
      </Canvas>
    </div>
  );
});

export default ForestBackground;
