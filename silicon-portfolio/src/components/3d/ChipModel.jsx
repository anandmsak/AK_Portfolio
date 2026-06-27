import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function MyCustomGlbChip() {
  const glbRef = useRef();
  const { gl, camera, controls } = useThree(); // ◄─── Accessing camera and orbit controls directly
  const [isInteracting, setIsInteracting] = useState(false);
  const lastInteractionTime = useRef(0);

  // Load your custom portfolio asset file
  const { scene } = useGLTF("/models/chip.glb");

  // Capturing your precise first-load screenshot values as the forced defaults
  const defaultCameraPos = useMemo(() => new THREE.Vector3(0, 3.5, 9), []);
  const defaultControlsTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  
  const defaultPosition = useMemo(() => new THREE.Vector3(2.8, -0.2, -0.8), []);
  const defaultRotation = useMemo(() => new THREE.Euler(0, 0, 0), []);
  const defaultScale = useMemo(() => new THREE.Vector3(1.3, 1.3, 1.3), []);

  // Track pointer interaction across the window canvas
  useEffect(() => {
    const handleStart = () => {
      setIsInteracting(true);
      lastInteractionTime.current = performance.now();
    };
    const handleEnd = () => {
      setIsInteracting(false);
      lastInteractionTime.current = performance.now();
    };

    const dom = gl.domElement;
    dom.addEventListener("pointerdown", handleStart);
    window.addEventListener("pointerup", handleEnd);

    return () => {
      dom.removeEventListener("pointerdown", handleStart);
      window.removeEventListener("pointerup", handleEnd);
    };
  }, [gl]);

  useFrame(({ clock }, delta) => {
    if (!glbRef.current) return;

    const currentTime = performance.now();
    const timeSinceLastInteraction = (currentTime - lastInteractionTime.current) / 1000;

    // IF USER IS ZOOMING/ROTATING: Pause our system resetting loops
    if (isInteracting) {
      return;
    }

    // IF 3 SECONDS OF IDLE TIME PASS: Smoothly animate everything back to home defaults
    if (timeSinceLastInteraction >= 3) {
      const t = delta * 1.5; // Deliberate smooth 3-second easing rate

      // 1. Zoom back to default: Force Camera position and target to reset smoothly
      camera.position.lerp(defaultCameraPos, t);
      if (controls) {
        controls.target.lerp(defaultControlsTarget, t);
      }

      // 2. Mesh scale and position recovery matching initial defaults
      glbRef.current.position.lerp(defaultPosition, t);
      glbRef.current.scale.lerp(defaultScale, t);

      // 3. Rotational recovery slerp
      const currentQuaternion = glbRef.current.quaternion;
      const targetQuaternion = new THREE.Quaternion().setFromEuler(defaultRotation);
      currentQuaternion.slerp(targetQuaternion, t);
      
    } else {
      // STANDARD IDLE ROTATION
      glbRef.current.rotation.y += delta * 0.15;
      glbRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.03;
    }
  });

  // Optimize material parameters
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) {
        if (child.material.name.toLowerCase().includes("gold") || child.material.name.toLowerCase().includes("pin")) {
          child.material.metalness = 1.0;
          child.material.roughness = 0.08;
        }
        if (child.material.name.toLowerCase().includes("neon") || child.material.name.toLowerCase().includes("emit")) {
          child.material.emissiveIntensity = 4.0;
        }
      }
    }
  });

  return <primitive ref={glbRef} object={scene} />;
}

useGLTF.preload("/models/chip.glb");

export default function ChipModel() {
  return <MyCustomGlbChip />;
}