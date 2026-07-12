import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Points, PointMaterial, Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const ParticleField = () => {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const n = 1500;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      // sphere shell
      const r = 6 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.04;
    ref.current.rotation.x += dt * 0.015;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#b57bff"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
};

const Blob = () => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    ref.current.rotation.x = state.clock.elapsedTime * 0.08;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} scale={2.4}>
        <icosahedronGeometry args={[1, 32]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          emissive="#5b21b6"
          emissiveIntensity={0.4}
          roughness={0.25}
          metalness={0.6}
          distort={0.45}
          speed={1.6}
        />
      </mesh>
    </Float>
  );
};

const TorusRing = () => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.25;
    ref.current.rotation.z += dt * 0.1;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]} scale={3.4}>
      <torusGeometry args={[1, 0.02, 16, 200]} />
      <meshBasicMaterial color="#c4a1ff" transparent opacity={0.35} />
    </mesh>
  );
};

const Scene3D = () => (
  <div className="fixed inset-0 -z-10 pointer-events-none bg-black">
    <Canvas camera={{ position: [0, 0, 8], fov: 55 }} dpr={[1, 1.6]}>
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 6]} intensity={2.4} color="#c4a1ff" />
      <pointLight position={[-6, -4, -4]} intensity={1.6} color="#7c3aed" />
      <Blob />
      <TorusRing />
      <ParticleField />
    </Canvas>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,black_95%)]" />
  </div>
);

export default Scene3D;
