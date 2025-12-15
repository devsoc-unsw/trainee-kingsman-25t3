import { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";


type TreeProps = {
  position?: [number, number, number];
};

export default function Tree({ position = [0, 0, 0] }: TreeProps) {
  const group = useRef<Group>(null);

  // Optional sway animation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime) * 1;
    }
  });

  return (
    <group ref={group} position={position}>
      <mesh rotation={[0, 0, 0]} position={[0, -10, 0]}>
        <cylinderGeometry attach="geometry" args={[0.3, 0.3, 20]} />
        <meshLambertMaterial attach="material" color="brown" />
      </mesh>

      <Sphere visible args={[1, 100, 200]} scale={4.25} position={[0, -2, 0]}>
        <MeshDistortMaterial
          color="#00cd71"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.5}
        />
      </Sphere>
    </group>
  );
}
