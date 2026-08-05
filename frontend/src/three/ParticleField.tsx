import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 2500;

// Posiciones aleatorias fijas: se generan una sola vez al cargar el módulo
// (mantiene puro el render).
const POSITIONS = (() => {
  const arr = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 12;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }
  return arr;
})();

export function ParticleField() {
  const points = useRef<THREE.Points>(null);

  // La textura se carga una sola vez (no en cada render).
  const particleTexture = useMemo(
    () => new THREE.TextureLoader().load("/images/star.png"),
    []
  );

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.05;
    points.current.rotation.x += delta * 0.02;
    const { x, y } = state.pointer;
    points.current.rotation.y += x * delta * 0.3;
    points.current.rotation.x += y * delta * 0.3;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#22d3ee"
        transparent
        opacity={0.8}
        sizeAttenuation
        map={particleTexture}
      />
    </points>
  );
}
