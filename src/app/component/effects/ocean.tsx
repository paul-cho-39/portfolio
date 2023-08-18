import React, { useRef, useMemo } from 'react';
import { extend, useThree, useLoader, useFrame, ReactThreeFiber } from '@react-three/fiber';

// import { Water } from 'three/examples/jsm/objects/Water.js';
import { Water } from 'three-stdlib';

import { useTexture } from '@react-three/drei';
import {
   MeshBasicMaterial,
   PlaneGeometry,
   RepeatWrapping,
   ShaderMaterial,
   TextureLoader,
   Vector3,
} from 'three';

extend({ Water });

// using standard ocean
const Ocean = () => {
   const ref = useRef<Water>();
   const gl = useThree((state) => state.gl);

   const waterNormals = useTexture('/images/waternormals.jpg');
   waterNormals.wrapS = waterNormals.wrapT = RepeatWrapping;

   const geometry = useMemo(() => new PlaneGeometry(120, 120), []);
   const mat = useMemo(() => new MeshBasicMaterial({ color: 'blue' }), []);
   // DARK MODE
   // const config = useMemo(
   //    () => ({
   //       textureWidth: 512,
   //       textureHeight: 512,
   //       alpha: 0.8,
   //       waterNormals,
   //       sunDirection: new Vector3(),
   //       sunColor: 0xffffff,
   //       waterColor: 0x001e0f,
   //       distortionScale: 100,
   //       fog: false,
   //       // format: gl.toneMappingExposure,
   //    }),
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   //    [waterNormals]
   // );

   const config = useMemo(
      () => ({
         textureWidth: 32,
         textureHeight: 32,
         alpha: 1,
         waterNormals,
         sunDirection: new Vector3(),
         sunColor: 0x0099cc,
         waterColor: 0x0099cc,
         distortionScale: 100,
         fog: false,
         // format: gl.toneMappingExposure,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [waterNormals]
   );

   useFrame((_, delta) => {
      const material = ref?.current?.material as ShaderMaterial;
      material.uniforms.time.value += delta;
   });

   return (
      <water
         ref={ref}
         args={[geometry, config]}
         position={[-100, -5, 100]}
         // rotation-y={Math.PI * 2}
         rotation-x={-Math.PI / 2}
      />
   );
   // <mesh geometry={geometry} material={mat}></mesh>;
};

export default Ocean;
