import { useGLTF, Clone } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import { MeshBasicMaterial, Vector3, Mesh, Group, MathUtils, Quaternion, Matrix4 } from 'three';

function smoothstep(a, b, x) {
   if (x < a) return 0;
   if (x > b) return 1;
   const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
   return t * t * (3 - 2 * t);
}

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

   const previousPosition = useMemo(() => new Vector3(), []);
   const target = useMemo(() => new Vector3(0, 0, 5), []);
   const rotationMatrix = useMemo(() => new Matrix4(), []);

   let velocityX = Math.random() * 0.05;
   let velocityY = Math.random() * 0.05;
   const currentQuaternion = useMemo(() => new Quaternion(), []);
   const targetQuaternion = useMemo(() => new Quaternion(), []);

   const slerpFactor = 0.9;

   // the boundaries should be set as ratios NOT numbers
   const upperBoundaryX = 10;
   const upperBoundaryY = 5;
   const lowerBoundaryX = -upperBoundaryX;
   const lowerBoundaryY = -upperBoundaryY;

   let pastZ: number = 0;

   useFrame((state, delta) => {
      if (!birdRef.current) return;

      theta += delta * Math.random(); // slowing down effect
      const rand = MathUtils.randFloatSpread(sigma) * Math.random();

      // squares this so that time spent at +z is more;
      const z = radius * Math.pow(Math.cos((theta * rand) / rand), 2);
      birdRef.current.position.x += velocityX;

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
         velocityX = -velocityX; // Reverse the x velocity
      }

      if (!direction.equals(new Vector3(0, 0, 0))) {
         birdRef.current.lookAt(birdRef.current.position.clone().add(direction));
      }

      // birdRef.current.position.x += velocityX;
      // birdRef.current.position.y += 0.05 * Math.sin(theta * 0.001);

      birdRef.current.position.z = z;
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

   return (
      <group position={[0, 0, 5]}>
         <primitive ref={birdRef} position={[0, 0, 0]} object={gltf.scene} rotation={[0, 0, 0]} />
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
