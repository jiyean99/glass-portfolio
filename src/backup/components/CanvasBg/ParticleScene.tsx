import React, { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";

// 1px 원형 점 텍스처 생성 함수
function generateCircleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 1, 0, 2 * Math.PI, false);
  ctx.fillStyle = "#fff";
  ctx.globalAlpha = 1;
  ctx.fill();
  return new THREE.CanvasTexture(canvas);
}

function BackgroundParticles() {
  const COUNT = 300;
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);

  for (let i = 0; i < COUNT; i++) {
    positions[3 * i] = (Math.random() - 0.5) * 120;
    positions[3 * i + 1] = (Math.random() - 0.5) * 80;
    positions[3 * i + 2] = (Math.random() - 0.5) * 260;

    const p = Math.random();
    if (p < 0.33) {
      colors.set([1, 0.85, 0.3], i * 3);
    } else if (p < 0.66) {
      colors.set([0.55, 0.7, 0.95], i * 3);
    } else {
      colors.set([1, 1, 1], i * 3);
    }
  }

  const texture = generateCircleTexture();

  return (
    <points renderOrder={-1}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={1.7}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        map={texture}
        alphaTest={0.7}
        depthWrite={false}
      />
    </points>
  );
}

function ObjectParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const obj = useLoader(
    OBJLoader,
    "/glass-portfolio/public/models/flower.obj"
  ) as THREE.Group;

  const [positions, setPositions] = useState<Float32Array>(new Float32Array());
  const [origPositions, setOrigPositions] = useState<Float32Array>(
    new Float32Array()
  );

  const { mouse, camera, raycaster, gl, size } = useThree();
  const touch = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const verts: number[] = [];
    obj.traverse((child: THREE.Object3D) => {
      // 타입가드 적용
      if (child instanceof THREE.Mesh) {
        const mesh = child as THREE.Mesh;
        const geom = mesh.geometry as THREE.BufferGeometry;
        if (geom?.attributes.position) {
          const posAttr = geom.attributes.position;
          for (let i = 0; i < posAttr.count; i++) {
            verts.push(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
          }
        }
      }
    });

    const arr = verts.length
      ? new Float32Array(verts.map((v) => v * 1.2))
      : new Float32Array();
    setPositions(arr);
    setOrigPositions(arr);
  }, [obj]);

  useFrame(() => {
    const ref = pointsRef.current;
    if (!ref || positions.length === 0) return;

    const positionAttr = ref.geometry.attributes
      .position as THREE.BufferAttribute;
    let centerPos: THREE.Vector3 | undefined;

    if (touch.current) {
      raycaster.setFromCamera(
        new THREE.Vector2(
          (touch.current.x / size.width) * 2 - 1,
          -(touch.current.y / size.height) * 2 + 1
        ),
        camera
      );
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      centerPos = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, centerPos);
    } else {
      raycaster.setFromCamera(mouse, camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      centerPos = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, centerPos);
    }

    for (let i = 0; i < positions.length; i += 3) {
      let x = origPositions[i];
      let y = origPositions[i + 1];
      let z = origPositions[i + 2];

      if (centerPos) {
        const p = new THREE.Vector3(x, y, z);
        const dist = p.distanceTo(centerPos);
        if (dist < 6.5) {
          x += (Math.random() - 0.5) * 4.0;
          y += (Math.random() - 0.5) * 2.5;
          z += (Math.random() - 0.5) * 2.5;
        }
      }

      positionAttr.setXYZ(i / 3, x, y, z);
    }
    positionAttr.needsUpdate = true;

    if (ref.material instanceof THREE.PointsMaterial) {
      ref.material.size = 0.67 + 0.18 * Math.sin(performance.now() / 900);
    }
  });

  const texture = generateCircleTexture();

  const baseColors = [
    [0.96, 0.91, 0.85],
    [1.0, 0.97, 0.59],
    [0.76, 0.69, 0.86],
    [0.53, 0.81, 0.98],
    [0.5, 0.55, 0.24],
  ];
  const colorCount = baseColors.length;
  const colors = new Float32Array(positions.length);

  for (let i = 0; i < positions.length; i += 3) {
    const y = positions[i + 1];
    if (y === undefined || y === null) {
      colors.set([1, 1, 1], i);
      continue;
    }
    const t = (y + 23) / 46;
    const idx = Math.min(Math.floor(t * colorCount), colorCount - 1);
    const color = baseColors[idx];
    if (!color) {
      colors.set([1, 1, 1], i);
      continue;
    }
    colors.set(color, i);
  }

  useEffect(() => {
    function onTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }
    function onTouchEnd() {
      touch.current = null;
    }
    gl.domElement.addEventListener("touchmove", onTouchMove);
    gl.domElement.addEventListener("touchend", onTouchEnd);
    return () => {
      gl.domElement.removeEventListener("touchmove", onTouchMove);
      gl.domElement.removeEventListener("touchend", onTouchEnd);
    };
  }, [gl.domElement]);

  return (
    <points
      ref={pointsRef}
      position={new THREE.Vector3(0, 0, 0)}
      rotation={[0, 0, 0]}
    >
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.67}
        vertexColors
        transparent
        opacity={0.92}
        sizeAttenuation
        map={texture}
        alphaTest={0.8}
      />
    </points>
  );
}

export default function ParticleScene() {
  function CameraRig({ children }: { children: React.ReactNode }) {
    const { camera } = useThree();
    const mouse = useRef({ x: 0, y: 0 });
    const onPointerMove = useCallback((e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }, []);
    useEffect(() => {
      window.addEventListener("mousemove", onPointerMove);
      return () => window.removeEventListener("mousemove", onPointerMove);
    }, [onPointerMove]);
    useFrame(() => {
      camera.rotation.y = -mouse.current.x * 0.06;
      camera.rotation.x = -mouse.current.y * 0.04;
    });
    return <>{children}</>;
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#030304",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      <Canvas camera={{ position: [0, 0, 44], fov: 40 }}>
        <ambientLight intensity={0.85} />
        <CameraRig>
          <BackgroundParticles />
          <ObjectParticles />
        </CameraRig>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}
