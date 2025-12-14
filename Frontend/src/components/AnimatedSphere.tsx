import { MeshDistortMaterial, Sphere } from "@react-three/drei";

function AnimatedSphere() {
  return (
    <Sphere visible args={[1, 100, 100]} scale={2}>
      <MeshDistortMaterial
        color="#00cd71"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.5}
      />
    </Sphere>
  );
}

export default AnimatedSphere;
