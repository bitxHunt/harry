import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const LANTERN_COUNT = 16;
const BOTTOM = -10;
const TOP = 9;
const RANGE = TOP - BOTTOM;

// --- Flame component with per-lantern flicker phase ---
function Flame({ phase }: { phase: number }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + phase;
    // Multi-frequency flicker for organic feel
    const flicker =
      0.88 +
      Math.sin(t * 14.3) * 0.07 +
      Math.sin(t * 8.7) * 0.05 +
      Math.sin(t * 3.2) * 0.03;
    const xSway = Math.sin(t * 6.1) * 0.012;

    if (outerRef.current) {
      outerRef.current.scale.setScalar(flicker);
      outerRef.current.position.x = xSway;
    }
    if (coreRef.current) {
      coreRef.current.scale.setScalar(flicker * 0.95);
      coreRef.current.position.x = xSway;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 2.2 * flicker;
    }
  });

  return (
    <group position={[0, -0.38, 0]}>
      {/* Wick */}
      <mesh>
        <cylinderGeometry args={[0.005, 0.005, 0.035, 5]} />
        <meshStandardMaterial color="#2a2010" />
      </mesh>

      {/* Outer flame — teardrop shape via scaled cone */}
      <mesh ref={outerRef} position={[0, 0.06, 0]} scale={[1, 1.2, 1]}>
        <coneGeometry args={[0.03, 0.1, 8]} />
        <meshStandardMaterial
          color="#ffaa22"
          emissive="#ff7700"
          emissiveIntensity={5}
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </mesh>

      {/* Inner bright core */}
      <mesh ref={coreRef} position={[0, 0.05, 0]} scale={[1, 1.2, 1]}>
        <coneGeometry args={[0.013, 0.06, 8]} />
        <meshStandardMaterial
          color="#fffae0"
          emissive="#fff5cc"
          emissiveIntensity={10}
          transparent
          opacity={0.98}
          depthWrite={false}
        />
      </mesh>

      {/* Flame light */}
      <pointLight
        ref={lightRef}
        color="#ff8800"
        intensity={2.2}
        distance={5}
        decay={2}
      />
    </group>
  );
}

// --- Wire frame at bottom of lantern ---
function WireFrame() {
  const mat = (
    <meshStandardMaterial color="#5a4a30" emissive="#221a08" emissiveIntensity={0.4} />
  );
  const half = 0.13;
  const y = -0.37;

  return (
    <group>
      {/* 4 sides of square frame */}
      <mesh position={[0, y, half]}>
        <boxGeometry args={[half * 2, 0.007, 0.007]} />
        {mat}
      </mesh>
      <mesh position={[0, y, -half]}>
        <boxGeometry args={[half * 2, 0.007, 0.007]} />
        {mat}
      </mesh>
      <mesh position={[half, y, 0]}>
        <boxGeometry args={[0.007, 0.007, half * 2]} />
        {mat}
      </mesh>
      <mesh position={[-half, y, 0]}>
        <boxGeometry args={[0.007, 0.007, half * 2]} />
        {mat}
      </mesh>

      {/* Corner joints */}
      {[
        [half, y, half],
        [-half, y, half],
        [half, y, -half],
        [-half, y, -half],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <sphereGeometry args={[0.01, 5, 5]} />
          <meshStandardMaterial color="#5a4a30" />
        </mesh>
      ))}

      {/* Fuel cell (small wax cylinder in center) */}
      <mesh position={[0, y + 0.01, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.02, 8]} />
        <meshStandardMaterial color="#ddd8b0" emissive="#eecc66" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

// --- Single lantern ---
type LanternProps = {
  initialX: number;
  initialY: number;
  initialZ: number;
  speed: number;
  swayAmount: number;
  swaySpeed: number;
  phase: number;
  scale: number;
};

function Lantern({
  initialX,
  initialY,
  initialZ,
  speed,
  swayAmount,
  swaySpeed,
  phase,
  scale,
}: LanternProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const rawY = initialY + t * speed;
    const y = BOTTOM + ((rawY - BOTTOM) % RANGE);

    groupRef.current.position.set(
      initialX + Math.sin(t * swaySpeed + phase) * swayAmount,
      y,
      initialZ
    );
    // Gentle body sway
    groupRef.current.rotation.z = Math.sin(t * swaySpeed * 0.6 + phase) * 0.05;
    groupRef.current.rotation.y = Math.sin(t * 0.3 + phase) * 0.1;
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* === Paper body — oval via scaled sphere === */}
      <mesh scale={[1, 1.6, 1]}>
        <sphereGeometry args={[0.18, 14, 10]} />
        <meshStandardMaterial
          color="#ff8833"
          emissive="#ff5500"
          emissiveIntensity={3}
          roughness={0.85}
          transparent
          opacity={0.87}
        />
      </mesh>

      {/* Inner additive glow — fakes paper translucency */}
      <mesh scale={[0.82, 0.82 * 1.6, 0.82]}>
        <sphereGeometry args={[0.18, 10, 8]} />
        <meshBasicMaterial
          color="#ff9944"
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* === Horizontal bamboo bands === */}
      {[0.16, -0.0, -0.16].map((yPos, i) => (
        <mesh key={i} position={[0, yPos, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.176, 0.007, 6, 28]} />
          <meshStandardMaterial
            color="#7a4a1a"
            emissive="#331100"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* === Top knot === */}
      <mesh position={[0, 0.31, 0]}>
        <sphereGeometry args={[0.038, 8, 8]} />
        <meshStandardMaterial color="#7a4a1a" emissive="#331100" emissiveIntensity={0.6} />
      </mesh>
      {/* Small string loop at top */}
      <mesh position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.018, 0.004, 5, 12]} />
        <meshStandardMaterial color="#aaa080" />
      </mesh>

      {/* === Wire frame + flame === */}
      <WireFrame />
      <Flame phase={phase} />
    </group>
  );
}

// Generated once at module load — never during render
const LANTERN_DATA: (LanternProps & { id: number })[] = Array.from(
  { length: LANTERN_COUNT },
  (_, i) => ({
    id: i,
    initialX: (Math.random() - 0.5) * 14,
    initialY: BOTTOM + Math.random() * RANGE,
    initialZ: (Math.random() - 0.5) * 5,
    speed: 0.2 + Math.random() * 0.4,
    swayAmount: 0.12 + Math.random() * 0.3,
    swaySpeed: 0.25 + Math.random() * 0.45,
    phase: Math.random() * Math.PI * 2,
    scale: 0.55 + Math.random() * 0.85,
  })
);

// --- Scene with all lanterns ---
function Scene() {

  return (
    <>
      {/* Dark warm background fills entire hero area */}
      <color attach="background" args={["#080401"]} />
      <ambientLight intensity={0.04} />
      {LANTERN_DATA.map(({ id, ...props }) => (
        <Lantern key={id} {...props} />
      ))}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.12}
          luminanceSmoothing={0.92}
          intensity={2.5}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export function LanternCanvas() {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 9], fov: 58 }}
      gl={{ alpha: false, antialias: false }}
      dpr={[1, 1.5]}
    >
      <Scene />
    </Canvas>
  );
}
