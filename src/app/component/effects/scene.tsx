import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMemo, useRef, useState } from 'react';
import { useHelper, Sky, SpotLight, useGLTF, Clone } from '@react-three/drei';
import Bird from './bird';

// sky and sunlight is toggled on/off whenever light/dark mode
// add depth to tree, birds

// raycasts a bird (when clicked)
// wherever theres a cloud/

// can it switch between day and night with no problem?
// vertex shading? fragment shading?

const WindowCanvas = () => {
   const [sun] = useState(() => new THREE.Vector3(10, 10, 10));

   return (
      <Canvas camera={{ position: [0, 0, 5], castShadow: true }} shadows='soft'>
         <fog attach='fog' args={[0x66080d, 100, 1000]} />
         <Bird />
         {/* <SquareMesh /> */}
         {/* <Lights /> */}
         {/* <Sky distance={100} sunPosition={sun} azimuth={Math.PI * 2} /> */}
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

function Box() {
   const ref = useRef<THREE.Mesh>(null!);
   //    useHelper(ref, THREE.BoxHelper, 'green');
   useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));
   return (
      <mesh ref={ref}>
         <boxGeometry attach='geometry' />
         <meshStandardMaterial attach='material' color='orange' />
      </mesh>
   );
}

export default WindowCanvas;
