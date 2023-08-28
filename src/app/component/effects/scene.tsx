import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useHelper, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import Seagull from './seagull';
import CustomSky from './emoljiFirework';
import { Monitor } from './monitor';
import Clouds, { Cloud } from './cloud';
import EmoljiFireworks from './emoljiFireworks';

const TOTAL_FIREWORKS = 50;

interface CanvasProps {
   darkMode: boolean;
   isFireworkHovered?: boolean;
}

const WindowCanvas = ({ darkMode, isFireworkHovered }: CanvasProps) => {
   // if using jotai there is no need to pass isFrieworkHovered here
   return (
      <Canvas
         frameloop='always'
         shadows='soft'
         camera={{ position: [-10, 1, 75], fov: 60, near: 1, far: 1000, castShadow: false }}
         resize={{ scroll: false }}
      >
         {/* TEST: ensure that every hovered state it will reset back*/}
         {isFireworkHovered &&
            Array.from({ length: TOTAL_FIREWORKS }).map((_, index) => {
               return <EmoljiFireworks key={index} />;
            })}
         <Seagull />
         <Clouds />
         <OrbitControls enableZoom={false} />
         {/* <Sampler /> */}
         {/* <Monitor /> */}
         <Lights />
      </Canvas>
   );
};

const Lights = () => {
   const ref = useRef<THREE.DirectionalLight>(null!);
   const pointRef = useRef<THREE.PointLightHelper>(null!);

   // useHelper(ref, THREE.DirectionalLightHelper, 10, 'yellow');
   // useHelper(pointRef, THREE.PointLightHelper, 10, 'red');

   return (
      <>
         <directionalLight
            ref={ref}
            intensity={0.8}
            position={[-5, 15, 25]}
            shadow-camera-near={1}
            shadow-camera-far={1000}
            shadow-camera-top={100}
            shadow-camera-bottom={-100}
            shadow-camera-left={-100}
            shadow-camera-right={100}
         />
         <pointLight ref={pointRef} args={[0xfffff, 0.8]} position={[0, 10, 4]} />
      </>
   );
};

export default WindowCanvas;
