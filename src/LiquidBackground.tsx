import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

type Blob = { x: number; y: number; r: number; vx: number; vy: number };

interface LiquidBackgroundProps {
  centerColor?: [number, number, number]; // RGB 예: [20, 255, 100]
  edgeColor?: [number, number, number]; // RGB 예: [150, 150, 255]
}

function LiquidBackground({
  centerColor = [20, 255, 100],
  edgeColor = [150, 150, 255],
}: LiquidBackgroundProps) {
  const isClustered = useSelector(
    (state: RootState) => state.cluster.isClustered
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    speedX: 0,
    speedY: 0,
  });

  let count = 20;
  if (window.innerWidth <= 1024) {
    count = 8;
  } else if (window.innerWidth <= 500) {
    count = 4;
  }

  // 현재 위치 등 점 상태
  const blobsRef = useRef<Blob[]>(
    Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 140 + Math.random() * 80,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }))
  );

  // 목표 위치 상태 (뭉침 또는 흩어짐 위치)
  const blobsTargetRef = useRef<Blob[]>([]);

  // 보간 함수
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // 초기 목표 위치 설정 (초기 흩어진 위치)
  useEffect(() => {
    blobsTargetRef.current = blobsRef.current.map((blob) => ({
      ...blob,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 140 + Math.random() * 5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
  }, []);

  // isClustered 변할 때 목표 위치 갱신
  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    if (isClustered) {
      blobsTargetRef.current = blobsRef.current.map(() => ({
        x: centerX + window.innerWidth / 5, // 중앙보다 우측으로 약간 치우침
        y: centerY,
        r: 180,
        vx: 0,
        vy: 0,
      }));
    } else {
      blobsTargetRef.current = blobsRef.current.map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: 140 + Math.random() * 80,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    }
  }, [isClustered]);

  // 이전 색상 상태를 ref로 보관
  const prevCenterColor = useRef<[number, number, number]>(centerColor);
  const prevEdgeColor = useRef<[number, number, number]>(edgeColor);

  // 울렁거림을 위한 시간 변수
  const wobbleTime = useRef(0);
  const wobbleAmplitude = 30;
  const wobbleFrequency = 0.2;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const pixelSize = 6;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);

    const currentCenter = [...prevCenterColor.current];
    const currentEdge = [...prevEdgeColor.current];

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, width, height);

      const threshold = 1.1;

      ctx.globalAlpha = 0.18;
      ctx.strokeStyle = "#77e3bf";

      blobsRef.current.forEach((a, i) => {
        for (let j = i + 1; j < blobsRef.current.length; j++) {
          const b = blobsRef.current[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 150) {
            let alpha = 0.18;
            if (
              Math.hypot(mouse.current.x - a.x, mouse.current.y - a.y) < 150 ||
              Math.hypot(mouse.current.x - b.x, mouse.current.y - b.y) < 150
            ) {
              alpha = 0.5;
            }
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      });
      ctx.globalAlpha = 1;

      wobbleTime.current += wobbleFrequency;

      blobsRef.current.forEach((dot, idx) => {
        // 현재 위치를 목표 위치로 부드럽게 이동
        const target = blobsTargetRef.current[idx];
        dot.x = lerp(dot.x, target.x, 0.05);
        dot.y = lerp(dot.y, target.y, 0.05);
        dot.r = lerp(dot.r, target.r, 0.05);
        dot.vx = target.vx;
        dot.vy = target.vy;

        if (isClustered) {
          // 울렁거리는 효과: sine, cosine 함수 활용 미세한 위치 변화 추가
          dot.x += wobbleAmplitude * Math.sin(wobbleTime.current + idx);
          dot.y += wobbleAmplitude * Math.cos(wobbleTime.current + idx);
        } else {
          const dx = dot.x - mouse.current.x;
          const dy = dot.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const speedX = mouse.current.speedX;
          const speedY = mouse.current.speedY;

          if (dist < 150) {
            const push = 25 * Math.exp(-(dist * dist) / 1200);
            dot.x += dx * 0.03 * push + speedX * 0.8;
            dot.y += dy * 0.03 * push + speedY * 0.8;
            dot.r = Math.min(dot.r + 5 * push, 180);
          } else {
            dot.r = Math.max(dot.r - 0.15, 140);
            dot.x += speedX * 0.02;
            dot.y += speedY * 0.02;
          }
        }

        dot.x = Math.min(Math.max(dot.x, 0), width);
        dot.y = Math.min(Math.max(dot.y, 0), height);
      });

      // 색상 보간 - 매 프레임 목표색으로 조금씩 전환
      for (let i = 0; i < 3; i++) {
        currentCenter[i] = lerp(currentCenter[i], centerColor[i], 0.1);
        currentEdge[i] = lerp(currentEdge[i], edgeColor[i], 0.1);
      }

      prevCenterColor.current = currentCenter as [number, number, number];
      prevEdgeColor.current = currentEdge as [number, number, number];

      for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
          let value = 0;
          blobsRef.current.forEach(({ x: bx, y: by, r }) => {
            const dx = x - bx;
            const dy = y - by;
            const distSq = dx * dx + dy * dy || 1;
            value += (r * r) / distSq;
          });

          if (value > threshold) {
            const alpha = Math.min((value - threshold) * 0.3, 1);
            const colorRatio = Math.min((value - threshold) * 0.7, 1);

            const r = Math.round(
              lerp(currentCenter[0], currentEdge[0], colorRatio)
            );
            const g = Math.round(
              lerp(currentCenter[1], currentEdge[1], colorRatio)
            );
            const b = Math.round(
              lerp(currentCenter[2], currentEdge[2], colorRatio)
            );

            ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(2)})`;
            ctx.fillRect(x, y, pixelSize, pixelSize);
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [isClustered, centerColor, edgeColor]);

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX: x, clientY: y } = e;
    mouse.current.speedX = x - (mouse.current.x || x);
    mouse.current.speedY = y - (mouse.current.y || y);
    mouse.current.x = x;
    mouse.current.y = y;
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "auto",
          background: "transparent",
        }}
      />
    </>
  );
}

export default LiquidBackground;
