import { useGLTF, Clone } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import { MeshBasicMaterial, Vector3, Mesh, Group, MathUtils } from 'three';

function smoothstep(a, b, x) {
   if (x < a) return 0;
   if (x > b) return 1;
   const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
   return t * t * (3 - 2 * t);
}

// maximum stack(?) -> how many birds can be alive on the screen at once?
// using userData to update the bird flap and its position of y-axis?
const Seagull = ({ position, count = 10 }: { position: Vector3; count?: number }) => {
   const gltf = useGLTF('/glb/bird.glb');
   const birdRef = useRef<Group>(null!);

   //    const [data] = useState({
   //     velocity: new Vector3(0, 0, 0),
   //     upperBound: new Vector3(10, 10, 10),
   //     lowerBound: new Vector3(-10, -10, -10),
   //     sigma: 0.1, // Standard deviation for the Gaussian random walk
   //     mu: 0 // Mean for the Gaussian random walk
   //    })

   // maybe set this somewhere else?
   const randomWalk = (s: number) => MathUtils.randFloatSpread(sigma) + mu;
   const upperBound = new Vector3(10, 10, 10);
   const lowerBound = new Vector3(-10, -10, -10);
   const sigma = 0.1; // Standard deviation for the Gaussian random walk
   const mu = 0; // Mean for the Gaussian random walk
   let velocity = useMemo(
      () =>
         new Vector3(
            randomWalk(sigma * MathUtils.clamp(Math.random(), 0.1, 0.8)),
            randomWalk(sigma),
            randomWalk(sigma)
         ),
      []
   );

   // use shader material for wings and see if body can be set?
   const material = useMemo(
      () =>
         new MeshBasicMaterial({
            color: 'white',
            transparent: true,
         }),
      []
   );

   useFrame((state, delta) => {
      if (!birdRef.current) return;

      //   const randomX = MathUtils.randFloatSpread(sigma) + mu;
      //   const randomY = MathUtils.randFloatSpread(sigma) + mu;
      //   const randomZ = MathUtils.randFloatSpread(sigma) + mu;

      //   velocity.add(new Vector3(randomX, randomY, randomZ));

      // Slow down the velocity using smoothstep's result
      velocity.normalize().multiplyScalar(Math.pow(Math.random(), 10));

      birdRef.current.position.x += velocity.x;
      birdRef.current.rotation.y = Math.PI * 0.5;
      birdRef.current.rotation.z = Math.PI * 0.3;

      //   console.log('INSIDE THE FRAME: ', birdRef.current.position);
      //   console.log('INSIDE THE FRAME: ', birdRef.current.rotation);
      //   birdRef.current.position.y += velocity.y;
      //   birdRef.current.position.z += velocity.z;

      // still have to consider the rotation of the bird as well
      // this may be a function where if the bird is travelling
      // have to come up with a function
   });

   return (
      <group>
         <Clone
            ref={birdRef}
            receiveShadow
            castShadow
            scale={[0.5, 1, 1]}
            position={position}
            object={gltf.scene}
            // inject={<meshBasicMaterial color={'grey'} />}
         />
         {/* <Clone
            receiveShadow
            castShadow
            position={[0, 0, -5]}
            object={gltf.scene}
            inject={<meshBasicMaterial color={'grey'} />}
         /> */}
      </group>
   );
};

export default Seagull;

// 1) download the .png file
// 2) then
