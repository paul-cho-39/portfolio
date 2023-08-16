import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMemo, useRef, useState } from 'react';
import { useHelper, Sky, SpotLight, useGLTF, Clone, PerspectiveCamera } from '@react-three/drei';
import Seagull from './seagull';
import PalmTrees from './palmTrees';
import Environment from './environment';

// sky and sunlight is toggled on/off whenever light/dark mode
// add depth to tree, birds

// raycasts a bird (when clicked)
// wherever theres a cloud/

// can it switch between day and night with no problem?
// vertex shading? fragment shading?

const WindowCanvas = ({ darkMode }) => {
   return (
      <Canvas
         frameloop='always'
         camera={{ position: [0, 0, -10], castShadow: true }}
         shadows='soft'
         resize={{ scroll: false }}
      >
               <PerspectiveCamera makeDefault position={[0, 0, 5]} near={0.1} far={1000} />

         <Seagull />
         <Environment darkMode={darkMode} />
         {/* <PalmTrees /> */}

         {/* <SquareMesh /> */}
         {/* <Lights /> */}
         {/* <Box /> */}
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
