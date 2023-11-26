import { useGLTF, Clone, useAnimations } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
   Vector3,
   Group,
   Quaternion,
   CatmullRomCurve3,
} from 'three';

const NUMBER_OF_BIDS = 3;

const Seagull = ({ count = 10 }: { count?: number }) => {
   const gltf = useGLTF('/glb/bird.glb');
   const birdRef = useRef<Group>(null!);

   const points = useMemo(() => [new Vector3()], []);

   const generateRandomPoints = (numPoints: number) => {
      const points: Vector3[] = [];
      let x = 20,
         y = 0,
         z = 10; // Starting point

      // Define maximum variation for each coordinate
      const maxXVariation = 8;
      const maxYVariation = 1;
      const maxZVariation = 4;

      for (let i = 0; i < numPoints; i++) {
         // x += Math.sin(maxXVariation) * radius * 3;
         x -= Math.sin(i * 0.5) * maxXVariation;
         y += Math.random() * maxYVariation * 2 - maxYVariation;
         // z += Math.random() * maxZVariation * 2 - maxZVariation;
         z += Math.sin(i * 0.2) * maxZVariation;

         points.push(new Vector3(x, y, Math.abs(z)));
      }

      const reversed = [...points].reverse();
      points.push(...reversed);

      return points;
   };

   const curve = useMemo(() => {
      const secondPoints = generateRandomPoints(50);
      points.push(...secondPoints);

      return new CatmullRomCurve3(points);
   }, [points]);

   // LETS STORE THIS IN STATE
   let velocityX = Math.random() * 0.1;
   let targetVelocityX = -velocityX; // The velocity you want to reach
   let velocityChangeSpeed = 0.1; // How fast the velocity changes, tweak this value
   let t = 0; // Parameter for traversing the curve
   const curveSpeed = 0.00025;

   const { actions } = useAnimations(gltf.animations, birdRef);

   useEffect(() => {
      if (actions.flying) {
         actions?.flying.play();
         actions?.flying.setDuration(5);
      }
   });

   // unnecessary? delete this part?
   const quaternions = useMemo(() => {
      const quaternions = []; // Array to store desired orientations
      for (let i = 0; i < points.length - 1; i++) {
         let direction = new Vector3().subVectors(points[i + 1], points[i]).normalize();
         let quaternion = new Quaternion().setFromUnitVectors(new Vector3(15, 0, 5), direction);
         quaternions.push(quaternion);
      }
      return quaternions;
   }, [points]);

   let changeDirectionPointsX = [];
   for (let i = 0; i < points.length; i++) {
      let xValue = 20 - Math.sin(i * 0.5) * 5;
      if (
         i == 0 ||
         Math.abs(xValue - changeDirectionPointsX[changeDirectionPointsX.length - 1]) > 5 * 0.9
      ) {
         changeDirectionPointsX.push(xValue);
      }
   }

   useFrame(() => {
      t += curveSpeed;

      if (t >= 1) {
         t = 0;

         targetVelocityX = -velocityX;
         velocityX += (targetVelocityX - velocityX) * velocityChangeSpeed;

         points.reverse(); // Reversing so the bird moves back on the opposite direction
      }

      birdRef.current.position.copy(curve.getPoint(t));

      // For rotation, take the tangent to the curve as the direction of movement
      let tangent = curve.getTangent(t + curveSpeed).normalize();

      birdRef.current.lookAt(birdRef.current.position.clone().add(tangent));
   });

   // set different position.
   // pass on the prop so that it can be identified with a key? or even pass as a prop?
   return (
      <primitive
         ref={birdRef}
         // position={[-50, 30, 0]}
         object={gltf.scene}
         rotation={[0, 0, 0]}
      />
   );
};

// const Seagulls = () => {
//    const seagull = useGLTF('/glb/bird.glb');

//    return (
//       <group>
//          {Array.from({ length: NUMBER_OF_BIDS }).map((_, index) => {
//             const cloneSeagull = seagull.scene.clone();

//             // line up the seaguls?

//             return <Seagull key={index} glsl={cloneSeagull} position={}  />
//          })}
//       </group>
//    )
// }

useGLTF.preload('/glb/bird.glb');

export default Seagull;
