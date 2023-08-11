import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { Mesh, Color, BufferAttribute, BufferGeometry, DoubleSide } from 'three';
import useBirdShader from './birdUniforms';
import { useGLTF } from '@react-three/drei';

interface BirdProps {
   count: number;
}

// the bird is from what (?);
// const WIDTH = 32;
// const BIRDS = WIDTH * WIDTH;

const Bird = ({ count = 10 }) => {
   const ref = useRef<Mesh>(null!);

   const trianglesPerBird = 3;
   const triangles = trianglesPerBird; // 3;
   const points = triangles * 3;

   const geometry = useMemo(() => new BufferGeometry(), []);

   const [vertices, birdColors, references, birdVertex] = useMemo(() => {
      // this is the attribute that should be passed to the geometry
      // this is initializing step where the array is equal to 0 for now
      const vertices = new BufferAttribute(new Float32Array(points * 3), 3); // 27 vertices -- 3 triangles with 3 vertices each
      const birdColors = new BufferAttribute(new Float32Array(points * 3), 3); // 9216 / 3 rgb so that each color is represented
      const references = new BufferAttribute(new Float32Array(points * 3), 2); // 9216 / 2 vec2 - what is this?
      const birdVertex = new BufferAttribute(new Float32Array(points * 3), 1); // 9216

      let vert = 0; // encapsulate this object?
      function pushVertices(...args: number[]) {
         for (let i = 0; i < args.length; i++) {
            vertices.array[vert++] = args[i];
         }
      }

      const wingspan = 20;
      // 1, -1, -20 - face
      // 0, 3, -20
      //
      pushVertices(0, 1, -20, 0, -1, -20, 0, 2, 20);

      // WINGS
      pushVertices(0, 2, -10, -wingspan, 2, 0, 0, 2, 10);
      pushVertices(0, 2, 10, wingspan, 2, 0, 0, 2, -10);

      // 3072
      for (let v = 0; v < triangles * 3; v++) {
         const color = new Color(0xff0000);
         birdColors.array[v * 3 + 0] = color.r;
         birdColors.array[v * 3 + 1] = color.g;
         birdColors.array[v * 3 + 2] = color.b;

         // For a single bird, references might not be needed. If they are still needed for some reason, adjust as necessary.
         references.array[v * 2] = 0;
         references.array[v * 2 + 1] = 0;

         birdVertex.array[v] = v % 9;
      }

      return [vertices, birdColors, references, birdVertex];
   }, []);

   console.log('bird vertex: ', birdVertex);

   geometry.setAttribute('position', vertices);
   geometry.setAttribute('birdColor', birdColors);
   geometry.setAttribute('references', references);
   geometry.setAttribute('birdVertex', birdVertex);

   const shaderMaterial = useBirdShader();

   console.log('geometry shape is: ', geometry.getAttribute('position'));
   console.log('Shader has this attribute', shaderMaterial);

   // test this out****
   useFrame((state, delta) => {
      // console.log('the delta is: ', delta);
      // useFrame here to influence the motion of the bird

      shaderMaterial.uniforms.time.value = state.clock.elapsedTime;
   });

   return (
      <group>
         <mesh
            ref={ref}
            castShadow
            receiveShadow
            position={[0, -2, -1]}
            scale={[0.3, 0.3, 0.3]}
            geometry={geometry}
            material={shaderMaterial}
         >
            {/* <meshBasicMaterial attach='material' color={0x00ff00} side={DoubleSide} /> */}
         </mesh>
      </group>
   );
};

export default Bird;
