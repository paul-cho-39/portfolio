import { Point, useTexture } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Mesh, PlaneGeometry, ShaderLib, ShaderMaterial, UniformsUtils, Vector3 } from 'three';
import { generateEvenPosition, generateScale, randomizeVelocity } from '@/library/utils/three';
import { vertextShader } from '@/library/shaders/cloud.vert';
import { fragmentShader } from '@/library/shaders/cloud.frag';

const TOTAL_CLOUDS = 8;
// derived from xRange inside generateEvenPosition function
const BOUNDARY_RIGHT = 9; // x is positive
const BOUNDARY_LEFT = -15; // x is negative

const Clouds = () => {
   const [pos] = useState(() => new Vector3(0, 3, -5));
   const dimension = [4, 2, 1];

   const cloudPos = useMemo(() => generateEvenPosition(TOTAL_CLOUDS), []);
   // const cloudData = useMemo(() => {
   //    return Array.from({ length: TOTAL_CLOUDS }).map((_, index) => {
   //       return {
   //          scale: generateScale(dimension),
   //          position: generateRandomPosition(TOTAL_CLOUDS),
   //       };
   //    });
   // }, []);

   const clouds = useMemo(() => {
      return cloudPos.map((pos, index) => {
         return {
            scale: generateScale(dimension),
            position: pos,
         };
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [cloudPos]);

   return (
      <group>
         {clouds.map((data, index) => (
            <Cloud key={index} scale={data.scale} position={data.position} />
         ))}
      </group>
   );
};

export const Cloud = ({ scale, position }: { scale: Vector3; position: Vector3 }) => {
   const ref = useRef<Mesh>(null!);

   const t1 = useTexture('/images/cloud1.png');
   const t2 = useTexture('/images/cloud3.jpg');

   const uniforms = {
      uTime: { value: 0 },
      uTxtShape: { value: t1 },
      uTxtCloudNoise: { value: t2 },
      uFac1: { value: 24.6 }, // 17.8
      uFac2: { value: 1.4 }, //2.7
      uTimeFactor1: { value: 0.001 },
      uTimeFactor2: { value: 0.0015 }, // 0015
      uDisplStrenght1: { value: 0.1 },
      uDisplStrenght2: { value: 0.05 },
   };

   const material = useMemo(
      () =>
         new ShaderMaterial({
            transparent: true,
            depthWrite: false,
            depthTest: true,
            clipShadows: true,
            uniforms: { ...UniformsUtils.clone(ShaderLib.sprite.uniforms), ...uniforms },
            vertexShader: vertextShader,
            fragmentShader: fragmentShader,
         }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
   );

   const velocity = useRef(randomizeVelocity(0.005));

   useFrame(() => {
      if (material) {
         material.uniforms.uTime.value += 1;
      }
      ref.current.position.x += velocity.current;

      if (ref.current.position.x < BOUNDARY_LEFT || ref.current.position.x > BOUNDARY_RIGHT) {
         velocity.current = -velocity.current;
      }
   });

   return (
      <mesh ref={ref} scale={scale} position={position} rotation={[0, -Math.PI * 2, 0]}>
         {/* <Sphere /> */}
         <planeGeometry attach='geometry' args={[1, 1, 1, 5]} />
         <primitive object={material} attach='material' />
      </mesh>
   );
};

export default Clouds;
