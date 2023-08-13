import { useGLTF, Clone } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import {
   MeshBasicMaterial,
   Vector3,
   Mesh,
   Group,
   MathUtils,
   Quaternion,
   Matrix4,
   CatmullRomCurve3,
} from 'three';

// have to establish width -- what is the width and if the velocity is going fast
// then
// maximum stack(?) -> how many birds can be alive on the screen at once?
// using userData to update the bird flap and its position of y-axis?

// there should be a limit

const Seagull = ({ position, count = 10 }: { position: Vector3; count?: number }) => {
   const gltf = useGLTF('/glb/bird.glb');
   const birdRef = useRef<Mesh>(null!);

   const sigma = 0.1; // Standard deviation for the Gaussian random walk
   let theta = 0;
   const radius = 6;
   const radiusX = radius * 2;

   const previousPosition = useMemo(() => new Vector3(), []);

   let velocityX = Math.random() * 0.1;
   let velocityY = Math.random() * 0.05;
   const currentQuaternion = useMemo(() => new Quaternion(), []);
   const targetQuaternion = useMemo(() => new Quaternion(), []);

   const slerpFactor = 0.9;

   // the boundaries should be set as ratios NOT numbers
   const upperBoundaryX = 10;
   const upperBoundaryY = 5;
   const lowerBoundaryX = -upperBoundaryX;
   const lowerBoundaryY = -upperBoundaryY;

   let previousZ: number = 0;
   if (birdRef.current) {
      birdRef.current.rotation.y = Math.PI * 0.5;
   }

   const r = () => Math.max(0.2, Math.random());

   const lines = useMemo(
      () =>
         new Array(count).fill().map((_, index) => {
            const pos = new Vector3(Math.sin(0) * radius * r(), Math.cos(0) * radius * r(), 0);
            const points = new Array(30).fill().map((_, index) => {
               const angle = (index / 20) * Math.PI * 2;
               return pos
                  .add(
                     new Vector3(Math.sin(angle) * radius * r(), Math.cos(angle) * radius * r(), 0)
                  )
                  .clone();
            });
            const curve = new CatmullRomCurve3(points).getPoints(100);
            return {
               curve,
            };
         }),
      [count, radius]
   );

   useFrame((state, delta) => {
      if (!birdRef.current) return;

      theta += delta * Math.random(); // slowing down effect
      const rand = MathUtils.randFloatSpread(sigma) * Math.random();

      // squares this so that time spent at +z is more;
      birdRef.current.position.x += velocityX;
      birdRef.current.position.z += velocityX;
      const z = radius * Math.pow(Math.cos((theta * rand) / rand), 2);

      // NO NEED TO CREATE ANOTHER VECTOR3 EVERY TIME!
      let direction = new Vector3(
         birdRef.current.position.x - previousPosition.x,
         0,
         birdRef.current.position.z - previousPosition.z
      ).normalize();

      if (
         birdRef.current.position.x > upperBoundaryX ||
         birdRef.current.position.x < lowerBoundaryX
      ) {
         // FOR THIS PART WHY NOT GO AROUND IN A LOOP(?)
         birdRef.current.rotation.y = Math.PI * 1.5;
         velocityX = -velocityX; // Reverse the x velocity
      }

      if (!direction.equals(new Vector3(0, 0, 0))) {
         // if (z < previousZ) {
         //    // The bird is moving backward, rotate it to face away from the screen
         //    birdRef.current.rotation.y = Math.PI; // 180 degrees in radians
         // } else if (z > previousZ) {
         //    // The bird is moving forward, rotate it to face the screen
         //    birdRef.current.rotation.y = 0;
         // }

         birdRef.current.lookAt(birdRef.current.position.clone().add(direction));
      }

      // birdRef.current.position.x += velocityX;
      // birdRef.current.position.y += 0.05 * Math.sin(theta * 0.001);

      // birdRef.current.position.z = z;

      previousZ = z;
      previousPosition.set(
         birdRef.current.position.x,
         birdRef.current.position.y,
         birdRef.current.position.z
      );

      // setInterval and switch every time wrapped around in a function(?)
      // setInterval(() => changePosition(), 1500);
      // const currentPosition = birdRef.current.position;
   });

   // have a target. The target is the center
   // when touching the seagull it will increase its velocity and move towards the sea direction

   return (
      <group position={[-radius * 2, radius * 2, 0]}>
         <primitive
            points={lines}
            ref={birdRef}
            position={[0, 0, 0]}
            object={gltf.scene}
            rotation={[0, 0, 0]}
         />
         {/* <mesh ref={birdRef} position={position} rotation={}>
            <meshBasicMaterial color={'red'} />
            <boxGeometry args={[2, 3]} />
         </mesh> */}
      </group>
   );
};

export default Seagull;

// 1) download the .png file
// 2) then
