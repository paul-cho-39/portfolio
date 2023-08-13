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
   LineBasicMaterial,
} from 'three';

// have to establish width -- what is the width and if the velocity is going fast
// then
// maximum stack(?) -> how many birds can be alive on the screen at once?
// using userData to update the bird flap and its position of y-axis?

// there should be a limit

const Seagull = ({ position, count = 10 }: { position: Vector3; count?: number }) => {
   const gltf = useGLTF('/glb/bird.glb');
   const birdRef = useRef<Mesh>(null!);

   // the radius should be screen device
   const radius = 10;

   let velocityX = Math.random() * 0.1;
   let velocityY = Math.random() * 0.05;

   const numPoints = 25; // Number of points for the curve. More points = smoother curve
   const frequency = 2; // Determines how many waves are there in the path
   const points: Vector3[] = [];
   const randomY = [2, 4, 6, 8];

   const getPoints = (points: Vector3[], radius: number) => {
      for (let i = 0; i <= numPoints; i++) {
         const ratio = i / numPoints;
         const x = Math.sin(ratio) * radius * 3;
         const y = randomY[Math.floor(Math.random() * randomY.length)] % i;
         const z = Math.cos(ratio) * Math.abs(radius); // only want it to go away from the screen
         points.push(new Vector3(x, y, z));
      }
      const reversedPoints = [...points].reverse();
      points.push(...reversedPoints);
   };

   const curve = useMemo(() => {
      getPoints(points, radius);
      getPoints(points, -radius);

      // const reversedPoints = [...points].reverse();
      // points.push(...reversedPoints);

      return new CatmullRomCurve3(points);
   }, []);

   // const points = [
   //    new Vector3(0, 0, -1),
   //    new Vector3(5, 3, -3),
   //    new Vector3(10, 5, -3),
   //    new Vector3(10, 3, 0),
   //    new Vector3(-4, 3, 3),
   //    new Vector3(-3, 2, 5),
   //    new Vector3(-5, 3, -3),
   //    new Vector3(10, 5, -3),
   //    // new Vector3(10, 0, 30),
   //    // new Vector3(0, 0, 30),
   //    // new Vector3(-10, 10, 30),
   //    // new Vector3(-10, 20, 30),
   //    // new Vector3(0, 30, 30),
   //    // new Vector3(10, 30, 30),
   //    // new Vector3(20, 30, 15),
   //    // new Vector3(10, 30, 10),
   //    // new Vector3(0, 30, 10),
   //    // new Vector3(-10, 20, 10),
   //    // new Vector3(-10, 10, 10),
   //    // new Vector3(0, 0, 10),
   //    // new Vector3(10, -10, 10),
   //    // new Vector3(20, -15, 10),
   //    // new Vector3(30, -15, 10),
   //    // new Vector3(40, -15, 10),
   //    // new Vector3(50, -15, 10),
   // ];

   // const curve = useMemo(() => new CatmullRomCurve3(points), []);

   let targetVelocityX = -velocityX; // The velocity you want to reach
   let velocityChangeSpeed = 0.1; // How fast the velocity changes, tweak this value
   let t = 0; // Parameter for traversing the curve
   const curveSpeed = 0.0005;

   useFrame(() => {
      t += curveSpeed;

      if (t >= 10) {
         t = 0;

         // If at boundary, reverse direction and create a new curve
         targetVelocityX = -velocityX;
         velocityX += (targetVelocityX - velocityX) * velocityChangeSpeed;

         // Generate a new set of points and curve
         points.reverse(); // Reversing so the bird moves back on the opposite direction
      }

      birdRef.current.position.copy(curve.getPoint(t));

      // For rotation, take the tangent to the curve as the direction of movement
      let tangent = curve.getTangent(t).normalize();
      birdRef.current.lookAt(birdRef.current.position.clone().add(tangent));
   });

   // useFrame((state, delta) => {
   //    if (!birdRef.current) return;

   //    theta += delta * Math.random(); // slowing down effect
   //    const rand = MathUtils.randFloatSpread(sigma) * Math.random();

   //    // squares this so that time spent at +z is more;
   //    birdRef.current.position.x += velocityX;
   //    birdRef.current.position.z += velocityX;
   //    const z = radius * Math.pow(Math.cos((theta * rand) / rand), 2);

   //    // NO NEED TO CREATE ANOTHER VECTOR3 EVERY TIME!
   //    let direction = new Vector3(
   //       birdRef.current.position.x - previousPosition.x,
   //       0,
   //       birdRef.current.position.z - previousPosition.z
   //    ).normalize();

   //    if (
   //       birdRef.current.position.x > upperBoundaryX ||
   //       birdRef.current.position.x < lowerBoundaryX
   //    ) {
   //       // FOR THIS PART WHY NOT GO AROUND IN A LOOP(?)
   //       birdRef.current.rotation.y = Math.PI * 1.5;
   //       velocityX += (targetVelocityX - velocityX) * velocityChangeSpeed;
   //    }

   //    if (!direction.equals(new Vector3(0, 0, 0))) {
   //       birdRef.current.lookAt(birdRef.current.position.clone().add(direction));
   //    }

   //    // birdRef.current.position.x += velocityX;
   //    // birdRef.current.position.y += 0.05 * Math.sin(theta * 0.001);

   //    // birdRef.current.position.z = z;

   //    previousZ = z;
   //    previousPosition.set(
   //       birdRef.current.position.x,
   //       birdRef.current.position.y,
   //       birdRef.current.position.z
   //    );

   //    // setInterval and switch every time wrapped around in a function(?)
   //    // setInterval(() => changePosition(), 1500);
   //    // const currentPosition = birdRef.current.position;
   // });

   // have a target. The target is the center
   // when touching the seagull it will increase its velocity and move towards the sea direction

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

// export const Sample = () => {
//    const line = useMemo(() => new LineBasicMaterial, []);
//    const material = useMemo(() => new Geometry, []);
//    return (
//       <mesh>
//       </mesh>
//    )
// }
