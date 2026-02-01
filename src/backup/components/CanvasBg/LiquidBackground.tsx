import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

type Blob = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  baseR?: number;
};

interface LiquidBackgroundProps {
  centerColor?: [number, number, number];
  edgeColor?: [number, number, number];
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
    isDragging: false,
  });

  const INTERACTION_RADIUS = 60;
  const CONNECTION_BASE_DISTANCE = 150;
  const CONNECTION_SHRINK_FACTOR = 0.6;
  const MOVEMENT_THRESHOLD = 0.5;
  const MOVE_TIMEOUT = 200;
  const lastMovementTime = useRef(Date.now());

  const count =
    window.innerWidth <= 500 ? 3 : window.innerWidth <= 1024 ? 6 : 12;

  const blobsRef = useRef<Blob[]>(
    Array.from({ length: count }, () => {
      const r = 140 + Math.random() * 80;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        baseR: r,
      };
    })
  );

  const blobsTargetRef = useRef<Blob[]>([]);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  useEffect(() => {
    blobsTargetRef.current = blobsRef.current.map((blob) => ({
      ...blob,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: blob.r,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
  }, []);

  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    if (isClustered) {
      blobsTargetRef.current = blobsRef.current.map(() => ({
        x: centerX + window.innerWidth / 5,
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

  const prevCenterColor = useRef(centerColor);
  const prevEdgeColor = useRef(edgeColor);

  const wobbleTime = useRef(0);
  const wobbleBaseAmplitude = 25;
  const wobbleFrequency = 0.15;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const pixelSize = 12;
    const dpr = window.devicePixelRatio || 1;
    let animationFrameId: number;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width / pixelSize) * pixelSize * dpr;
      canvas.height = Math.floor(height / pixelSize) * pixelSize * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);

    let currentCenter = [...prevCenterColor.current];
    let currentEdge = [...prevEdgeColor.current];

    let lastFrameTime = 0;
    const targetFPS = 30;
    const frameDuration = 1000 / targetFPS;

    function draw(timestamp = 0) {
      if (timestamp - lastFrameTime < frameDuration) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = timestamp;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, width, height);

      const threshold = 1.1;

      ctx.globalAlpha = 0.18;
      ctx.strokeStyle = "#77e3bf";

      const blobs = blobsRef.current;
      const len = blobs.length;

      let connectionDistance = CONNECTION_BASE_DISTANCE;
      if (mouse.current.isDragging) {
        connectionDistance *= CONNECTION_SHRINK_FACTOR;
      }

      for (let i = 0; i < len; i++) {
        const a = blobs[i];
        for (let j = i + 1; j < len; j++) {
          const b = blobs[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < connectionDistance) {
            let alpha = 0.18;
            if (
              Math.hypot(mouse.current.x - a.x, mouse.current.y - a.y) <
                INTERACTION_RADIUS ||
              Math.hypot(mouse.current.x - b.x, mouse.current.y - b.y) <
                INTERACTION_RADIUS
            )
              alpha = 0.6;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;

      wobbleTime.current += wobbleFrequency;

      const now = Date.now();
      const hasMovedRecently = now - lastMovementTime.current < MOVE_TIMEOUT;
      const movingEnough =
        Math.abs(mouse.current.speedX) > MOVEMENT_THRESHOLD ||
        Math.abs(mouse.current.speedY) > MOVEMENT_THRESHOLD;

      for (let i = 0; i < len; i++) {
        const dot = blobs[i];
        const target = blobsTargetRef.current[i];

        const dxMouse = dot.x - mouse.current.x;
        const dyMouse = dot.y - mouse.current.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (isClustered) {
          dot.x = lerp(dot.x, target.x, 0.16);
          dot.y = lerp(dot.y, target.y, 0.16);
          dot.r = lerp(dot.r, target.r, 0.1);

          const amplitude = wobbleBaseAmplitude;
          dot.x += amplitude * Math.sin(wobbleTime.current + i);
          dot.y += amplitude * Math.cos(wobbleTime.current + i);
        } else if (
          distMouse < INTERACTION_RADIUS &&
          (hasMovedRecently || mouse.current.isDragging)
        ) {
          dot.x = lerp(dot.x, target.x, 0.05);
          dot.y = lerp(dot.y, target.y, 0.05);
          dot.vx = target.vx ?? dot.vx;
          dot.vy = target.vy ?? dot.vy;

          const amplitude = wobbleBaseAmplitude;
          dot.x += amplitude * Math.sin(wobbleTime.current + i);
          dot.y += amplitude * Math.cos(wobbleTime.current + i);

          if (mouse.current.isDragging) {
            if (distMouse < INTERACTION_RADIUS) {
              dot.x += -dxMouse * 0.09;
              dot.y += -dyMouse * 0.09;
              dot.r = Math.min(dot.r + 12, 220);
            } else {
              dot.r = lerp(dot.r, dot.baseR ?? 140, 0.1);
            }
            for (let j = 0; j < len; j++) {
              if (j === i) continue;
              const other = blobs[j];
              const dx = dot.x - other.x;
              const dy = dot.y - other.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < INTERACTION_RADIUS && dist > 0) {
                const strength =
                  (INTERACTION_RADIUS - dist) / INTERACTION_RADIUS;
                const push = 8 * strength;
                dot.x += (dx / dist) * push;
                dot.y += (dy / dist) * push;
                other.x -= (dx / dist) * push;
                other.y -= (dy / dist) * push;
              }
            }
          } else {
            if (hasMovedRecently && movingEnough) {
              const push =
                45 *
                Math.exp(
                  -(distMouse * distMouse) /
                    ((INTERACTION_RADIUS * INTERACTION_RADIUS) / 2)
                );
              dot.x +=
                (-dxMouse / distMouse) * push + mouse.current.speedX * 0.9;
              dot.y +=
                (-dyMouse / distMouse) * push + mouse.current.speedY * 0.9;
              dot.r = Math.min(dot.r + 13 * push, 220);
            } else {
              dot.r = lerp(dot.r, target.r, 0.08);
            }
          }
        } else {
          dot.x = lerp(dot.x, target.x, 0.02);
          dot.y = lerp(dot.y, target.y, 0.02);
          dot.r = lerp(dot.r, dot.baseR ?? 140, 0.08);
        }

        dot.x = Math.min(Math.max(dot.x, 0), width);
        dot.y = Math.min(Math.max(dot.y, 0), height);
      }

      for (let i = 0; i < 3; i++) {
        currentCenter[i] = lerp(currentCenter[i], centerColor[i], 0.1);
        currentEdge[i] = lerp(currentEdge[i], edgeColor[i], 0.1);
      }
      prevCenterColor.current = currentCenter as [number, number, number];
      prevEdgeColor.current = currentEdge as [number, number, number];

      for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
          let value = 0;
          for (let i = 0; i < len; i++) {
            const blob = blobs[i];
            const dx = x - blob.x;
            const dy = y - blob.y;
            const distSq = dx * dx + dy * dy || 1;
            value += (blob.r * blob.r) / distSq;
          }
          if (value > threshold) {
            const alpha = Math.min((value - threshold) * 0.4, 1);
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

    currentCenter = [...prevCenterColor.current];
    currentEdge = [...prevEdgeColor.current];
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [isClustered, centerColor, edgeColor]);

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX: x, clientY: y } = e;
    mouse.current.speedX = x - (mouse.current.x ?? x);
    mouse.current.speedY = y - (mouse.current.y ?? y);
    mouse.current.x = x;
    mouse.current.y = y;

    if (
      Math.abs(mouse.current.speedX) > MOVEMENT_THRESHOLD ||
      Math.abs(mouse.current.speedY) > MOVEMENT_THRESHOLD
    ) {
      lastMovementTime.current = Date.now();
    }
  }

  function handleMouseDown() {
    mouse.current.isDragging = true;
  }

  function handleMouseUp() {
    mouse.current.isDragging = false;
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="liquid-bg-canvas"
    />
  );
}

export default LiquidBackground;
