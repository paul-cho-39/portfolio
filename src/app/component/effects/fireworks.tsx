import React, { useMemo, useEffect, useRef, useState } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { useMakeFirework, useShuffleTexture } from '@/library/hooks/useFireworks';

extend({ OrbitControls });

export const smoothstep = (low: number, high: number, f: number) => {
   f = (f - low) / (high - low);
   f = Math.max(0, Math.min(1, f));
   return f * f * (3 - 2 * f);
};

type UserData = {
   velocity: THREE.Vector3;
   ttl: number;
   update: () => void;
   reset: () => void;
};

interface FireworkProps {
   userData: UserData;
   baseColor: THREE.Color;
}

const Firework = ({ userData, baseColor }: FireworkProps) => {
   const ref = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>>(null!);
   const { fireworkGeom, fireworkMaterial } = useMakeFirework(baseColor);
   const emoljiTexture = useShuffleTexture();

   useFrame(() => {
      userData.update();
      const scalar = Math.pow(Math.random(), 4) * 2 * smoothstep(-20, 50, userData.ttl);
      ref.current.material.uniforms.color.value.set(
         scalar * baseColor.r,
         scalar * baseColor.g,
         scalar * baseColor.b
      );
      ref.current.scale.setScalar(1 + 10 * smoothstep(120, 190, userData.ttl)); // clamps b/w 120-190
      ref.current.rotation.z = Math.random() * 6; // rotating the material that creates some firework effect

      ref.current.material.uniforms.pattern.value = emoljiTexture;

      // TODO: when it reach ttl of 0 then a callback function
      // the animation loop is called only at a specific time
   });

   const reset = () => {
      userData.reset();
      var velocity = userData.velocity;
      ref.current.material.uniforms.velocity.value.set(velocity.x / 2 + 0.5, velocity.y / 2 + 0.5);
   };

   useEffect(() => {
      // set texture and reset here
      // ref.current.material.uniforms.pattern.value = emoljiTexture;
      reset();

      // resets only when certain dependencies are called
   }, []);

   return <mesh ref={ref} material={fireworkMaterial} geometry={fireworkGeom}></mesh>;
};

const Fireworks = () => {
   const { size, set, gl, camera } = useThree();
   const controlsRef = useRef<any>();
   const fireworkPivot = useRef<THREE.Group>(null!);
   const baseColor = useMemo(() => new THREE.Color(), []);

   baseColor.r += 0.05 * Math.random();
   baseColor.b += 0.05 * Math.random();

   const drag = 0.84 + 0.02 * Math.random(); // 0.96

   const userData = {
      velocity: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.1, Math.random() - 0.5),
      ttl: 200,
      update: () => {
         fireworkPivot.current.lookAt(camera.position);
         fireworkPivot.current.position.add(fireworkPivot.current.userData.velocity);
         fireworkPivot.current.userData.velocity.multiplyScalar(drag);
         fireworkPivot.current.userData.velocity.y -= 0.003;
         fireworkPivot.current.userData.velocity.x += (Math.random() - 0.5) * 0.01;
         fireworkPivot.current.userData.velocity.z += (Math.random() - 0.5) * 0.01;
         fireworkPivot.current.userData.ttl--;
      },
      reset: () => {
         fireworkPivot.current.userData.ttl = 120 + Math.random() * 80;
         fireworkPivot.current.position.multiplyScalar(0);
         fireworkPivot.current.userData.velocity.set(
            Math.random() - 0.5,
            Math.random() - 0.5,
            (Math.random() - 0.5) * 0.2
         );
         fireworkPivot.current.userData.velocity
            .normalize()
            .multiplyScalar(Math.pow(Math.random(), 0.5));
      },
   };

   // not sure bout this code here
   useEffect(() => {
      fireworkPivot.current.userData.velocity
         .normalize()
         .multiplyScalar(0.3 + Math.pow(Math.random(), 2));
   }, []);

   // useEffect(() => {
   //    const controls = controlsRef.current;
   //    controls.autoRotate = true;
   //    set({ camera });
   // }, [camera, set]);

   return (
      <>
         {/* <perspectiveCamera
            args={[25, size.width / size.height, 1, 1000.0]}
            position={[10, -35, 20]}
         /> */}
         {/* <OrbitControls
            enableDamping={false}
            enableZoom={false}
            ref={controlsRef}
            args={[camera, gl.domElement]}
         /> */}
         <group position={[0, -5, -20]} ref={fireworkPivot} userData={userData}>
            <Firework userData={userData} baseColor={baseColor} />
         </group>
      </>
   );
};

export default Fireworks;
