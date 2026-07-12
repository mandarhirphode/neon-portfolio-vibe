import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Rotating 3D scatter plot with trend line — for use inside cards.
 */
const Scatter = ({ count = 60 }: { count?: number }) => {
  const group = useRef<THREE.Group>(null!);
  const { points, linePts } = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 3;
      const z = (Math.random() - 0.5) * 3;
      const y = 0.4 * x + 0.3 * z + (Math.random() - 0.5) * 0.6;
      pts.push([x, y, z]);
    }
    const lp: [number, number, number][] = [];
    for (let i = -20; i <= 20; i++) {
      const x = (i / 20) * 1.6;
      lp.push([x, 0.4 * x, 0.3 * x]);
    }
    return { points: pts, linePts: lp };
  }, [count]);

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.25;
  });

  return (
    <group ref={group}>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial
            color="#c4a1ff"
            emissive="#8b5cf6"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
      <Line points={linePts} color="#e0aaff" lineWidth={2} transparent opacity={0.85} />
      {/* axes */}
      <Line points={[[-2, 0, 0], [2, 0, 0]]} color="#5b21b6" lineWidth={1} transparent opacity={0.5} />
      <Line points={[[0, -1.2, 0], [0, 1.6, 0]]} color="#5b21b6" lineWidth={1} transparent opacity={0.5} />
      <Line points={[[0, 0, -2], [0, 0, 2]]} color="#5b21b6" lineWidth={1} transparent opacity={0.5} />
    </group>
  );
};

type Props = { className?: string; height?: number };

const DataScatter3D = ({ className = "", height = 220 }: Props) => (
  <div className={className} style={{ height }}>
    <Canvas camera={{ position: [3.6, 2.2, 3.6], fov: 42 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 5, 4]} intensity={1.6} color="#c4a1ff" />
      <Scatter />
    </Canvas>
  </div>
);

export default DataScatter3D;
