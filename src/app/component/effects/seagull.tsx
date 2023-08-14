import { useGLTF, Clone } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
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
   const groupRef = useRef<Group>(null!);

   let velocityY = Math.random() * 0.05;

   const points: Vector3[] = [];

   const generateRandomPoints = (numPoints: number) => {
      const points: Vector3[] = [];
      let x = 20,
         y = 0,
         z = 10; // Starting point

      // Define maximum variation for each coordinate
      const maxXVariation = 12;
      const maxYVariation = 1;
      const maxZVariation = 5;

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

   return (
      <primitive ref={birdRef} position={[15, 0, 5]} object={gltf.scene} rotation={[0, 0, 0]} />
   );
};

export default Seagull;
