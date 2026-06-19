import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ParticleField } from "./ParticleField";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function HeroCanvas() {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div
        className="absolute inset-0 bg-gradient-to-b from-base-900 to-base-950"
        aria-hidden
      />
    );
  }
  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}
