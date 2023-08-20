import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMemo, useRef, useState } from 'react';
import { useHelper, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import Seagull from './seagull';
import PalmTrees from './palmTrees';
import CustomSky from './sky';
import { Monitor } from './monitor';
import Sampler from './stars';
import Clouds from './cloud';
import Fireworks from './fireworks';

const WindowCanvas = ({ darkMode }) => {
   return (
      <Canvas
         className=''
         frameloop='always'
         shadows='soft'
         camera={{ position: [0, 1, 15], fov: 40, near: 1, far: 1000, castShadow: false }}
         resize={{ scroll: false }}
      >
         <Sampler />
         {/* <Fireworks /> */}
         {/* <Monitor /> */}
         {/* <Clouds /> */}
         {/* <OrbitControls enableZoom={false} /> */}
         {/* <Seagull /> */}
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
