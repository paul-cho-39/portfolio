import { Suspense, forwardRef, lazy, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useHelper, PerspectiveCamera, OrbitControls } from '@react-three/drei';

import Seagull from './seagull';
// import Clouds from './cloud';

const Clouds = lazy(() => import('./cloud'));

const WindowCanvas = forwardRef<
   React.ElementRef<'canvas'>,
   React.ComponentPropsWithoutRef<'canvas'>
>(function WindowCanvas({ ...props }, ref) {
   return (
      <Canvas
         ref={ref}
         frameloop='always'
         shadows='soft'
         camera={{ position: [-10, 1, 75], fov: 60, near: 1, far: 1000, castShadow: false }}
         resize={{ scroll: false }}
      >
         {/* <Suspense fallback={null}> */}
         <Clouds />
         {/* </Suspense> */}
         <Seagull />
         <OrbitControls autoRotateSpeed={100} enableZoom={false} />
         {/* <Monitor /> */}
         <Lights />
      </Canvas>
   );
});

const Lights = () => {
   const ref = useRef<THREE.DirectionalLight>(null!);
   const pointRef = useRef<THREE.PointLightHelper>(null!);

   // debugging
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
         <pointLight args={[0xfffff, 0.5]} position={[0, 10, 4]} />
      </>
   );
};

export default WindowCanvas;
