import {
   PlaneGeometry,
   ShaderMaterial,
   Mesh,
   Vector2,
   Vector3,
   Color,
   Group,
   AdditiveBlending,
   SrcAlphaFactor,
} from 'three';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useShuffleTexture } from '@/app/library/hooks/useFireworks';

import { smoothstep, drag } from '@/app/library/utils/three';
import { vertextShader } from '@/app/library/shaders/firework.vert';
import { fragmentShader } from '@/app/library/shaders/firework.frag';

type UserData = {
   velocity: Vector3;
   ttl: number;
   hasPopped: boolean;
   update: () => void;
   pop: () => void;
   reset: () => void;
};

interface FireworkProps {
   userData: UserData;
}

interface FireworksProps {
   isActive: boolean;
}

const EmoljiFireworks = () => {
   const { camera } = useThree();
   const groupRef = useRef<Group>(null!);

   const userData: UserData = {
      velocity: new Vector3(Math.random() - 0.5, Math.random() - 0.1, Math.random() - 0.5),
      ttl: 200,
      hasPopped: false,
      update: () => {
         groupRef.current.lookAt(camera.position);
         groupRef.current.position.add(groupRef.current.userData.velocity);
         groupRef.current.userData.velocity.multiplyScalar(drag());
         groupRef.current.userData.velocity.y -= 0.005;
         groupRef.current.userData.velocity.x += (Math.random() - 0.5) * 0.075;
         groupRef.current.userData.velocity.z += (Math.random() - 0.5) * 0.05;
         groupRef.current.userData.ttl--;

         if (!groupRef.current.userData.hasPopped && groupRef.current.userData.ttl <= 10) {
            groupRef.current.userData.pop();
         }
      },
      pop: () => {
         groupRef.current.userData.hasPopped = true;

         // Randomize the velocity for explosion effect
         groupRef.current.userData.velocity.set(
            (Math.random() - 0.5) * 0.2,
            Math.random() * 0.2,
            (Math.random() - 0.5) * 0.2
         );
      },
      reset: () => {
         groupRef.current.userData.ttl = 120 + Math.random() * 80;
         groupRef.current.position.multiplyScalar(0);
         groupRef.current.userData.velocity.set(
            Math.random() - 0.5,
            Math.random() - 0.5,
            (Math.random() - 0.5) * 0.2
         );
         groupRef.current.userData.velocity
            .normalize()
            .multiplyScalar(Math.pow(Math.random(), 0.5));
      },
   };

   useEffect(() => {
      groupRef.current.userData.velocity
         .normalize()
         .multiplyScalar(0.3 + Math.pow(Math.random(), 2));
   }, [userData.ttl]);

   return (
      <group position={[-2, 0, -50]} ref={groupRef} userData={userData}>
         <EmoljiFirework userData={userData} />;
      </group>
   );
};

export const EmoljiFirework = ({ userData }: FireworkProps) => {
   const ref = useRef<Mesh>(null!);
   const ttl = useRef<number>(200);
   const initialScale = useMemo(() => new Vector3(0, 0, 0), []);

   const baseColor = useMemo(() => {
      const color = new Color();
      color.r += 0.05 * Math.random();
      color.g += 0.05 * Math.random();
      //   color.b += 0.05 * Math.random();
      return color;
   }, []);

   const color = useMemo(() => new Vector3(baseColor.r, baseColor.g, baseColor.b), [baseColor]);
   const velocity = useMemo(
      () => new Vector2(userData.velocity.x / 2 + 0.5, userData.velocity.y / 2 + 0.5),
      [userData.velocity.x, userData.velocity.y]
   );

   const newTexture = useShuffleTexture(baseColor);
   const geometry = useMemo(() => new PlaneGeometry(2, 2), []);

   const material = useMemo(
      () =>
         new ShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: AdditiveBlending,
            blendDst: SrcAlphaFactor,
            blendSrc: SrcAlphaFactor,
            vertexShader: vertextShader,
            fragmentShader: fragmentShader,
            uniforms: {
               color: { value: color },
               uTime: { value: 0.0 },
               pattern: { value: newTexture },
               velocity: { value: velocity },
               uRotation: { value: 0.0 },
            },
         }),
      [baseColor, newTexture]
   );

   useEffect(() => {
      if (ttl.current <= 0) {
         console.log('should be resetted');

         ref.current.scale.copy(initialScale);
         // ref.current.position.set(initialScale);

         ttl.current = 200;
         userData?.reset();
         const tempVel = userData?.velocity;

         material.uniforms.velocity.value.set(tempVel.x / 2 + 0.5, tempVel.y / 2 + 0.5);
      }
   }, [ttl.current]);

   useFrame((_, delta) => {
      material.uniforms.uRotation.value += Math.random() * 0.01;
      if (material.uniforms.uRotation.value > 2.0 * Math.PI) {
         material.uniforms.uRotation.value = 0.0;
      }

      material.uniforms.uTime.value += delta;

      if (userData.ttl < 0) {
         // ref.current.scale.copy(initialScale);

         // ttl.current = 250;
         // userData?.reset();
         const tempVel = userData?.velocity;

         material.uniforms.velocity.value.set(tempVel.x / 2 + 0.5, tempVel.y / 2 + 0.5);

         return false;
      }

      if (ttl.current > 10) {
         userData.update();

         const scalar = Math.pow(Math.random(), 4) * 2 * smoothstep(-20, 50, ttl.current);
         material.uniforms.color.value.set(
            scalar * baseColor.r,
            scalar * baseColor.g,
            scalar * baseColor.b
         );

         ref.current.scale.setScalar(1 + 10 * smoothstep(120, 190, ttl.current));
      }

      ttl.current--;
   });

   return <mesh ref={ref} material={material} geometry={geometry}></mesh>;
};

export default EmoljiFireworks;
