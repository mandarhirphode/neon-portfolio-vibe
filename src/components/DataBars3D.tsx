import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * A tiny data-analyst themed 3D widget: a rotating grid of animated bars
 * (like a live 3D bar chart) rendered inside a compact card.
 */
const Bars = ({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) => {
  const group = useRef<THREE.Group>(null!);
  const bars = useMemo(() => {
    const list: { x: number; z: number; phase: number; base: number }[] = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        list.push({
          x: (i - (rows - 1) / 2) * 0.55,
          z: (j - (cols - 1) / 2) * 0.55,
          phase: Math.random() * Math.PI * 2,
          base: 0.4 + Math.random() * 1.2,
        });
      }
    }
    return list;
  }, [rows, cols]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.35;
    }
    group.current?.children.forEach((child, i) => {
      const b = bars[i];
      if (!b) return;
      const h = b.base + Math.sin(t * 1.8 + b.phase) * 0.5 + 0.6;
      child.scale.y = h;
      child.position.y = h / 2;
    });
  });

  return (
    <group ref={group}>
      {bars.map((b, i) => (
        <mesh key={i} position={[b.x, 0, b.z]}>
          <boxGeometry args={[0.32, 1, 0.32]} />
          <meshStandardMaterial
            color="#a78bfa"
            emissive="#7c3aed"
            emissiveIntensity={0.35}
            roughness={0.35}
            metalness={0.6}
          />
        </mesh>
      ))}
      {/* base plate */}
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[rows * 0.6, cols * 0.6]} />
        <meshBasicMaterial color="#1a1030" transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

type Props = { className?: string; height?: number };

const DataBars3D = ({ className = "", height = 220 }: Props) => (
  <div className={className} style={{ height }}>
    <Canvas camera={{ position: [3.2, 2.6, 3.2], fov: 40 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 6, 4]} intensity={2} color="#c4a1ff" />
      <pointLight position={[-4, 2, -3]} intensity={1.2} color="#7c3aed" />
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
        <Bars />
      </Float>
    </Canvas>
  </div>
);

export default DataBars3D;
