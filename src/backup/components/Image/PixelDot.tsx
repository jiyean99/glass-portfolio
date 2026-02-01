import React, { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

type Particle = {
  x: number;
  y: number;
  color: string;
  baseX: number;
  baseY: number;
  size: number;
};

const PARTICLE_BASE_SIZE = 3;
const PIXEL_STEP = 10;

interface PixelDotProps {
  src: string;
  pixelSize?: number;
  className?: string;
  style?: CSSProperties;
}

const PixelDot: React.FC<PixelDotProps> = ({
  src,
  pixelSize = PIXEL_STEP,
  className,
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = src;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);

      const imgData = ctx.getImageData(0, 0, image.width, image.height);
      const { data, width, height } = imgData;

      const particles: Particle[] = [];

      for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
          const idx = (y * width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          if (a > 128) {
            const color = `rgba(${r},${g},${b},${a / 255})`;
            particles.push({
              x,
              y,
              baseX: x,
              baseY: y,
              color,
              size: PARTICLE_BASE_SIZE,
            });
          }
        }
      }

      particlesRef.current = particles;

      const animate = () => {
        ctx.clearRect(0, 0, width, height);

        particlesRef.current.forEach((p) => {
          // 마우스 인터랙션 없이 입자 원위치 그리고 고정 크기 유지
          p.x = p.baseX;
          p.y = p.baseY;
          p.size = PARTICLE_BASE_SIZE;

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, 2 * Math.PI);
          ctx.fill();
        });

        requestAnimationFrame(animate);
      };

      animate();
    };

    // 의존성 배열에 src, pixelSize 포함
  }, [src, pixelSize]);

  return <canvas ref={canvasRef} className={className} style={style} />;
};

export default PixelDot;
