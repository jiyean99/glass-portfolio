import React, { useRef, useEffect } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

const RippleWaveScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripples = useRef<Ripple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function addRipple(x: number, y: number) {
      // 항상 null 체크, though here canvas/ctx not needed
      ripples.current.push({
        x,
        y,
        radius: 0,
        maxRadius: 200 + Math.random() * 70,
        alpha: 0.5 + Math.random() * 0.3,
      });
    }

    function draw() {
      // 매 프레임마다 null 체크
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ripple 배열도 항상 존재 체크
      if (ripples.current && ripples.current.length) {
        ripples.current = ripples.current.filter(
          (r) => r.alpha > 0 && r.radius < r.maxRadius
        );
        for (const r of ripples.current) {
          // 그릴 때도 ctx null 체크
          if (!ctx) continue;
          const gradient = ctx.createRadialGradient(
            r.x,
            r.y,
            r.radius * 0.4,
            r.x,
            r.y,
            r.radius
          );
          gradient.addColorStop(0, `rgba(200,220,255,${r.alpha})`);
          gradient.addColorStop(1, "rgba(200,220,255,0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.fill();

          r.radius += 2 + Math.random() * 1.2;
          r.alpha -= 0.006 + Math.random() * 0.002;
        }
      }

      window.requestAnimationFrame(draw);
    }

    function handleMove(e: MouseEvent) {
      addRipple(e.clientX, e.clientY);
    }

    window.addEventListener("mousemove", handleMove);
    draw();

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100vh",
        display: "block",
        position: "absolute",
        left: 0,
        top: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export default RippleWaveScene;
