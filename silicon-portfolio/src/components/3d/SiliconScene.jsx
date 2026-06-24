/**
 * SiliconScene.jsx
 * Re-created production bundle wrapper.
 * Houses the canvas engine context and starry backdrop for your custom asset.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Sparkles, Stars } from "@react-three/drei";
import { Suspense, useRef } from "react";
import ChipModel from "./ChipModel";

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 8, 0]}   color="#00f5ff" intensity={5}  distance={22} />
      <pointLight position={[-7, 4, -5]} color="#7c3aed" intensity={3}  distance={18} />
      <pointLight position={[7, 2, -5]}  color="#f59e0b" intensity={3}  distance={18} />
      <spotLight position={[0, 12, 2]}   angle={0.3} penumbra={0.9} intensity={4} color="#00f5ff" />
    </>
  );
}

// Handles smooth subtle mouse tracking across the entire screen backdrop layout
function CameraController() {
  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * 0.025;
    camera.position.y += (pointer.y * 0.6 + 2.0 - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function SiliconScene() {
  return (
    <Canvas
      camera={{ position: [0, 3.5, 9], fov: 42 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <SceneLights />
        <Environment preset="night" />

        {/* Ambient background spatial design elements */}
        <Stars radius={90} depth={45} count={2000} factor={3.5} saturation={0} fade />
        <Sparkles count={50} scale={12} size={1.2} speed={0.2} color="#00f5ff" opacity={0.3} />

        {/* Your custom auto-reset GLB model component */}
        <ChipModel />

        {/* System perspective view tracking parameters */}
        <CameraController />

        <OrbitControls
          enableZoom={false} // Restored so users can scroll-zoom it
          enablePan={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3.5}
          enableDamping
          dampingFactor={0.05}
        />
      </Suspense>
    </Canvas>
  );
}