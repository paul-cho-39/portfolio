import THREE, {
   Mesh,
   MathUtils,
   BufferGeometry,
   BoxHelper,
   CameraHelper,
   DirectionalLight,
   DirectionalLightHelper,
   BufferAttribute,
} from 'three';
import { createRoot } from 'react-dom/client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, ThreeElements, extend, useThree } from '@react-three/fiber';
import { Box, useHelper, Plane, Shadow, OrbitControls } from '@react-three/drei';
import Fireworks, { Background, Monitor } from '../effects/fireworks';

function CustomBox(props: ThreeElements['mesh']) {
   const ref = useRef<Mesh>(null);
   const [hovered, hover] = useState(false);
   const [clicked, click] = useState(false);

   useFrame((state, delta) => {
      ref.current.rotation.x += 0.025;
   });

   // GREAT WAY FOR VISUALIZING ESP FOR LIGHTS, PLANES, AND SPOTLIGHTS
   useHelper(ref, BoxHelper, 'green');

   return (
      <mesh
         {...props}
         ref={ref}
         castShadow
         receiveShadow
         scale={clicked ? 1.5 : 1}
         onClick={(event) => click(!clicked)}
         // rotation={[0, 0, 0]}
         // rotation={[Math.PI / 2, 0, 0]}
         // rotation={[0, Math.PI / 2, 0]}
         rotation={[0, 0, Math.PI / 2]}

         // onPointerOver={(event) => hover(true)}
         // onPointerOut={(event) => hover(false)}
      >
         {/* <sphereGeometry attach='geometry' args={[1, 20, 15]} /> */}
         {/* <boxGeometry args={[2, 2, -3]} /> */}
         <boxGeometry attach='geometry' args={[1, 1, 1]} />
         <meshToonMaterial wireframe color={hovered ? 'hotpink' : 'dodgerblue'} />
      </mesh>
   );
}

const DreiBox = () => {
   const mesh = useRef(null);

   useFrame(() => {
      if (mesh.current) {
         mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
      }
   });

   return (
      <Box args={[1, 1, 1]} castShadow receiveShadow ref={mesh} position={[0, 1, -1]}>
         <meshStandardMaterial color='lightblue' />
      </Box>
   );
};

function CirclePathAnimation({ z = 5 }: { z: number }) {
   const { camera, viewport } = useThree();

   const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 0]);
   console.log('WIDTH OF THE VIEWPORT IS:', viewport.width);
   console.log('HEIGHT OF THE VIEWPORT IS:', viewport.distance);

   const meshRef = useRef<Mesh>();
   // Clamping values
   const value = 10;
   const minValue = 5;
   const maxValue = 15;
   const clampedValue = MathUtils.clamp(value, minValue, maxValue);
   console.log(`Clamped value of ${value} between ${minValue} and ${maxValue} is ${clampedValue}`);

   // Linear Interpolation (lerp) - Interpolate between two numbers
   const start = 1;
   const end = 100;
   const alpha = 0.75; // 0.5 will give the midpoint
   const interpolatedValue = MathUtils.lerp(start, end, alpha);
   console.log(
      `Interpolated value between ${start} and ${end} at alpha=${alpha} is ${interpolatedValue}`
   );

   console.log('the current width is: ', width);
   console.log('the current height is: ', height);

   const [data] = useState({
      y: MathUtils.randFloatSpread(height * 2),
      x: MathUtils.randFloatSpread(2),
   });

   useFrame(({ clock }) => {
      if (meshRef.current) {
         const time = clock.getElapsedTime();
         const radius = 5;
         // // Make the object complete a circle every 5 seconds
         const angle = ((time % 2) / 2) * Math.PI * 2; // in radians
         const x = radius * Math.cos(angle);
         const y = 1;
         const z = radius * Math.sin(angle);

         // const x = Math.sin(time * 0.6) * 0.9;
         // const y = Math.sin(time * 0.7) * 0.9 + 6;
         // const z = Math.sin(time * 0.8) * 0.9;
         meshRef.current.position.set(x, y, z);
      }
   });

   return (
      <mesh ref={meshRef}>
         <boxGeometry args={[1, 1, 1]} />
         <meshStandardMaterial color='orange' />
      </mesh>
   );
}

const DirectionLight = () => {
   const lightRef = useRef();

   useHelper(lightRef, DirectionalLightHelper, 'red');
   return (
      <directionalLight
         ref={lightRef}
         color='red'
         position={[0, 10, 5]}
         intensity={1}
         shadow-mapSize-width={1024}
         shadow-mapSize-height={1024}
         shadow-camera-near={0.5}
         shadow-camera-far={500}
         shadow-camera-left={-10}
         shadow-camera-right={10}
         shadow-camera-top={10}
         shadow-camera-bottom={-10}
         castShadow
      />
   );
};

type Cannon = {
   maxHeight: number;
   color: string;
   position: [number, number, number];
};

const randomColor = () => {
   const colors = ['red', 'green', 'blue', 'yellow', 'pink', 'purple'];
   return colors[Math.floor(Math.random() * colors.length)];
};

const Boxes = ({}) => {
   extend({ DirectionalLightHelper, useHelper, THREE });

   const [cannons, setCannons] = useState<Cannon[]>([]);

   const handleLaunch = () => {
      const newCannons: Cannon[] = Array.from({ length: 5 }, (_, i) => ({
         maxHeight: 100 + Math.random() * 20,
         color: randomColor(),
         position: [Math.random() * 300 - 150, 0, Math.random() * 300 - 150],
      }));
      setCannons((cannons) => [...cannons, ...newCannons]);
   };

   return (
      <Canvas frameloop='always' onClick={handleLaunch} camera={{ position: [200, 200, 200] }}>
         {/* <ambientLight intensity={0.3} castShadow /> */}
         <DirectionLight />
         <Monitor />
         {/* <Control /> */}
         <Background />
         {/* {cannons.map((props, i) => (
            <Fireworks key={i} {...props} />
         ))} */}
         {/* <group position={[0, -2, -1]}>
            <CustomBox position={[3, 3, -2]} />
            <CustomBox position={[0, 3, 1]} />
            <Plane
               args={[4, 4, 10, 10]}
               rotation={[-Math.PI / 2, 0, 0]}
               position={[0, 0, 0]}
               receiveShadow
            >
               <Shadow castShadow color='#fffff' opacity={0.5} />
            </Plane>
         </group> */}
      </Canvas>
   );
};

export default Boxes;

// reduce the quality if the object is far away(?) --- this can be used with Drei library component <Detailed />
// wrap it around it and set the geometry here

// Movement regression: whenever the movement should be regreessed
// useing useThree((state) => state.performance.regress)
// controls.current?.addEventListener('change', regress);

// function BoxInstances({ count = 1000, temp = new THREE.Object3D() }) {
//    extend({ THREE });
//    const instanceRef = useRef<InstancedMesh>();

//    useEffect(() => {
//       if (instanceRef.current) {
//          for (let i = 0; i < count; i++) {
//             temp.position.set(Math.random(), Math.random(), Math.random());
//             temp.updateMatrix();
//             instanceRef.current.setMatrixAt(i, temp.matrix);
//          }
//          instanceRef.current.instanceMatrix.needsUpdate = true;
//       }
//    }, []);

//    return (
//       <instancedMesh ref={instanceRef} args={[null, null, count]}>
//          <boxGeometry />
//          <meshPhongMaterial />
//       </instancedMesh>
//    );
// }
