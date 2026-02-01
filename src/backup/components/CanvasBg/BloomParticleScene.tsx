import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Effects } from "@react-three/drei";
import * as THREE from "three";
import { UnrealBloomPass } from "three-stdlib";

extend({ UnrealBloomPass });

interface LayerProps {
  count: number;
  color: string;
  size: number;
  noise: number;
  spin: number;
  radius: number;
  alpha: number;
  initialY: number;
  initialZ: number;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const PETAL_COUNT = 6;

function ParticleLayer({
  count,
  color,
  size,
  noise,
  spin,
  radius,
  alpha,
  initialY,
  initialZ,
}: LayerProps) {
  const ref = useRef<THREE.Points>(null!);

  // 각 꽃잎에 대한 기본 scale과 폭 초기값 배열
  const basePetalScales = useMemo(
    () => Array.from({ length: PETAL_COUNT }, () => rand(0.45, 2.7)),
    []
  );
  const basePetalWidths = useMemo(
    () => Array.from({ length: PETAL_COUNT }, () => rand(0.5, 1.4)),
    []
  );

  // 변동 scale 값을 저장할 상태 변수(useRef로)
  const dynamicScales = useRef(Array(PETAL_COUNT).fill(1));

  // 매 프레임마다 동적으로 scale 애니메이션 적용
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    for (let i = 0; i < PETAL_COUNT; i++) {
      // 시간의 sinusoidal 피드백으로 들쭉날쭉 변동
      dynamicScales.current[i] =
        basePetalScales[i] * (1 + 0.3 * Math.sin(t * 2 + i * 1.1));
    }

    if (ref.current) {
      ref.current.rotation.y =
        initialY + Math.sin(t * 0.19 + spin) * 0.35 * spin + t * 0.05 * spin;
      ref.current.rotation.z =
        initialZ + Math.cos(t * 0.23 + spin) * 0.24 * spin;
      ref.current.rotation.x = Math.sin(t * 0.33 + spin) * 0.08 * spin;
    }
  });

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.random() * 2 * Math.PI;
      const theta = Math.random() * Math.PI;
      const petalIndex = Math.floor(
        ((theta % Math.PI) / Math.PI) * PETAL_COUNT
      );

      // animation으로 변화하는 petalScale과 폭 적용 (이 부분을 useMemo에서 직접 처리하는 건 불가능해서 frame마다 재생성하려면 다른 구조가 필요)
      // 여기서는 base scale로 계산하고, dynamicScale은 회전 애니메이션 외 다른 구현 필요

      const scale = basePetalScales[petalIndex];
      const width = basePetalWidths[petalIndex];

      const petalMain = Math.sin(PETAL_COUNT * theta) * scale;
      const petalSide = Math.cos(PETAL_COUNT * theta) * width;
      const tipNoise = Math.pow(Math.random(), 2) * 1.7 * scale;
      const centerNoise = Math.pow(Math.random(), 3) * 0.7;

      const r =
        radius +
        petalMain * rand(0.3, 0.67) +
        petalSide * rand(0.1, 0.23) +
        tipNoise * rand(0.09, 0.16) +
        Math.sin(phi * rand(2, 5)) * noise * rand(0.15, 0.55) +
        centerNoise;

      arr[i * 3] = Math.sin(theta) * Math.cos(phi) * r;
      arr[i * 3 + 1] = Math.cos(theta) * r + Math.sin(phi * 2.5) * noise * 0.6;
      arr[i * 3 + 2] = Math.sin(theta) * Math.sin(phi) * r;
    }
    return arr;
  }, [count, radius, noise, spin, basePetalScales, basePetalWidths]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={new THREE.Color(color)}
        size={size}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        transparent
        opacity={alpha}
        depthWrite={false}
      />
    </points>
  );
}
function BloomEffect() {
  return (
    // @ts-ignore
    <unrealBloomPass
      attachArray="passes"
      args={[[1280, 720], 3.2, 0.95, 0.83]}
    />
  );
}

const LAYERS: Omit<LayerProps, "initialY" | "initialZ">[] = [
  {
    count: 120000,
    color: "#abc2ff",
    size: 0.0005,
    noise: 0.26,
    spin: 1.02,
    radius: 2.5,
    alpha: 0.12,
  },
  {
    count: 90000,
    color: "#fc97ee",
    size: 0.006,
    noise: 0.31,
    spin: 1.42,
    radius: 1.5,
    alpha: 0.1,
  },
  {
    count: 700000,
    color: "#6ec1f7",
    size: 0.007,
    noise: 0.42,
    spin: 1.78,
    radius: 1.1,
    alpha: 0.14,
  },
  {
    count: 40000,
    color: "#e0e5ff",
    size: 0.009,
    noise: 0.62,
    spin: 2.45,
    radius: 0.8,
    alpha: 0.18,
  },
  {
    count: 12000,
    color: "#ffffff",
    size: 0.01,
    noise: 0.72,
    spin: 3.1,
    radius: 0.55,
    alpha: 0.25,
  },
];

export default function BloomParticleScene() {
  const layersWithAngles = useMemo(
    () =>
      LAYERS.map((props) => ({
        ...props,
        initialY: rand(0, Math.PI * 2),
        initialZ: rand(0, Math.PI * 2),
      })),
    []
  );
  return (
    <Canvas camera={{ position: [0, 0, 7.5], fov: 55 }}>
      <color attach="background" args={["#0a1332"]} />
      {layersWithAngles.map((props, idx) => (
        <ParticleLayer key={idx} {...props} />
      ))}
      <Effects>
        <BloomEffect />
      </Effects>
    </Canvas>
  );
}
