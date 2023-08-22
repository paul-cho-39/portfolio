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
   const [scale] = useState(() => new THREE.Vector3(8, 3, 1));
   const [scale2] = useState(() => new THREE.Vector3(10, 10, 10));
   const [scale3] = useState(() => new THREE.Vector3(12, 3, 2));
   const [scale4] = useState(() => new THREE.Vector3(18, 6, 2));

   const [pos] = useState(() => new THREE.Vector3(-5, 3, 10));
   const [pos2] = useState(() => new THREE.Vector3(0, 5, 50));
   const [pos3] = useState(() => new THREE.Vector3(5, 2, 60));
   const [pos4] = useState(() => new THREE.Vector3(10, -5, 40));

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
         <Cloud scale={scale} position={pos} />
         <Cloud scale={scale2} position={pos2} />
         <Cloud scale={scale3} position={pos3} />
         <Cloud scale={scale4} position={pos4} />

         <OrbitControls enableZoom={false} />
         {/* <Clouds /> */}
         {/* <Sampler /> */}
         {/* <Monitor /> */}
         <Lights />
      </Canvas>
   );
};

const Lights = () => {
   const ref = useRef<THREE.DirectionalLight>(null!);
   const pointRef = useRef<THREE.PointLightHelper>(null!);

   useHelper(ref, THREE.DirectionalLightHelper, 10, 'yellow');
   useHelper(pointRef, THREE.PointLightHelper, 10, 'red');

   return (
      <>
         <directionalLight
            castShadow
            ref={ref}
            intensity={0.8}
            position={[5, 10, 10]}
            shadow-camera-near={1}
            shadow-camera-far={1000}
            shadow-camera-top={100}
            shadow-camera-bottom={-100}
            shadow-camera-left={-100}
            shadow-camera-right={100}
         />
         <pointLight castShadow args={[0xfffff, 0.8]} position={[0, 10, 4]} />
      </>
   );
};

export default WindowCanvas;
