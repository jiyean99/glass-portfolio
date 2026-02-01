// import React, { useRef, useEffect } from "react";

// type FluidSceneProps = {
//   renderMode?: "Fluid" | "Pressure" | "Velocity";
//   trailLength?: number;
//   style?: React.CSSProperties;
// };

// export const FluidScene: React.FC<FluidSceneProps> = ({
//   renderMode = "Fluid",
//   trailLength = 15,
//   style,
// }) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const gpuRef = useRef<any>(null);

//   // Main initialization and render loop
//   useEffect(() => {
//     let composer: any = null;
//     let animationId: number;

//     const createGPULayer = (args: any) => new window?.GPUIO?.GPULayer(composer, args);
//     const createGPUProgram = (args: any) => new window?.GPUIO?.GPUProgram(composer, args);
//     const createRenderer = () => composer = new window?.GPUIO?.GPUComposer({
//       canvas: canvasRef.current,
//       contextID: undefined,
//       glslVersion: undefined
//     });

//     function main() {
//       createRenderer();
//       const width = canvasRef.current!.width;
//       const height = canvasRef.current!.height;
//       // Parameters (adapted from original code)
//       const VELOCITY_SCALE_FACTOR = 8;
//       const NUM_JACOBI_STEPS = 3;
//       const PRESSURE_CALC_ALPHA = -1;
//       const PRESSURE_CALC_BETA = 0.25;
//       const MAX_NUM_PARTICLES = 100000;
//       const PARTICLE_DENSITY = 0.1;
//       let NUM_PARTICLES = Math.min(Math.ceil(width * height * PARTICLE_DENSITY), MAX_NUM_PARTICLES);

//       // Create states/layers...
//       const velocityState = createGPULayer({
//         name: 'velocity',
//         dimensions: [Math.ceil(width / VELOCITY_SCALE_FACTOR), Math.ceil(height / VELOCITY_SCALE_FACTOR)],
//         type: window.GPUIO.FLOAT,
//         numComponents: 2,
//         filter: window.GPUIO.LINEAR,
//         numBuffers: 2,
//         wrapX: window.GPUIO.REPEAT,
//         wrapY: window.GPUIO.REPEAT
//       });
//       const divergenceState = createGPULayer({
//         name: 'divergence',
//         dimensions: velocityState.dimensions,
//         type: window.GPUIO.FLOAT,
//         numComponents: 1,
//         filter: window.GPUIO.NEAREST,
//         wrapX: window.GPUIO.REPEAT,
//         wrapY: window.GPUIO.REPEAT
//       });
//       const pressureState = createGPULayer({
//         name: 'pressure',
//         dimensions: velocityState.dimensions,
//         type: window.GPUIO.FLOAT,
//         numComponents: 1,
//         filter: window.GPUIO.NEAREST,
//         wrapX: window.GPUIO.REPEAT,
//         wrapY: window.GPUIO.REPEAT,
//         numBuffers: 2
//       });
//       // ... particle states, trailState 등 추가 작업 생략

//       // shader programs...
//       const advection = createGPUProgram({ /* ... adapted ... */ });
//       const divergence2D = createGPUProgram({ /* ... adapted ... */ });
//       const jacobi = createGPUProgram({ /* ... adapted ... */ });
//       const gradientSubtraction = createGPUProgram({ /* ... adapted ... */ });
//       const renderPressure = window.GPUIO.renderSignedAmplitudeProgram(composer, {
//         name: "renderPressure",
//         type: pressureState.type,
//         scale: 0.5,
//         component: "x",
//       });
//       // 기타 programs...

//       // Render loop
//       function loop() {
//         composer.step({ program: advection, input: [velocityState, velocityState], output: velocityState });
//         composer.step({ program: divergence2D, input: velocityState, output: divergenceState });
//         for (let i = 0; i < NUM_JACOBI_STEPS; i++)
//           composer.step({ program: jacobi, input: [pressureState, divergenceState], output: pressureState });
//         composer.step({ program: gradientSubtraction, input: [pressureState, velocityState], output: velocityState });

//         if (renderMode === "Pressure") {
//           composer.step({ program: renderPressure, input: pressureState });
//         } else if (renderMode === "Velocity") {
//           composer.drawLayerAsVectorField({
//             layer: velocityState,
//             vectorSpacing: 10,
//             vectorScale: 2.5,
//             color: [0, 0, 0],
//           });
//         } else {
//           // Implement Fluid simulation-trails logic here
//         }
//         animationId = requestAnimationFrame(loop);
//       }

//       loop();
//       gpuRef.current = { composer };
//     }

//     main();

//     return () => {
//       if (animationId) cancelAnimationFrame(animationId);
//       try {
//         gpuRef.current?.composer?.dispose();
//       } catch {}
//     };
//   }, [renderMode, trailLength]);

//   // Basic style
//   return (
//     <canvas
//       ref={canvasRef}
//       width={window.innerWidth}
//       height={window.innerHeight}
//       style={{
//         display: "block",
//         width: "100vw",
//         height: "100vh",
//         outline: "none",
//         ...style
//       }}
//     />
//   );
// };
