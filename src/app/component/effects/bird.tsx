import { useMemo } from 'react';
import { Vector3, BufferGeometry, BufferAttribute, MeshBasicMaterial } from 'three';

interface BirdProps {
   count: number;
}

// the bird is from what (?);

const Bird = ({ count = 10 }) => {
   // const lines = useMemo(
   //     () =>
   //         new Array(count).fill().map((_, index) => {
   //             const v = new THREE.Vector3(5, 0, 0);
   //         }),
   //     []
   // )
   // the bird is the geometry

   // const vertices = useMemo(
   //     () =>
   //     [
   //         new Vector3(5, 0, 0),
   //         new Vector3(-5, -2, 1),
   //         new Vector3(-5, 0, 0),
   //         new Vector3(-5, -2, -1),

   //         new Vector3(0, -2, -6),
   //         new Vector3(0, 2, -6),
   //         new Vector3(2, 0, 0),
   //         new Vector3(-3, 0, 0),
   //     ],
   //     []
   // );

   const vertics = new Float32Array([-5, -2, -1, 0, -2, -6, 0, 2, -6, 2, 0, 0, -3, 0, 0]);

   const faces = new Uint32Array([0, 2, 1, 4, 7, 6, 5, 6, 7]);

   const geometry = useMemo(() => new BufferGeometry(), []);
   geometry.setAttribute('position', new BufferAttribute(vertics, 3));
   geometry.setIndex(new BufferAttribute(faces, 1));

   const material = useMemo(() => new MeshBasicMaterial({ color: 0x000000 }), []);

   return (
      <>
         <mesh geometry={geometry} material={material}></mesh>
      </>
   );
};

export default Bird;

// game plan is to create a bird
// for the number of birds it will need to
// 1) FIRST THING IS FIRST: create material with:
// set of props (curve, width, color)
// set its position in random
// random number of birds

// inside the Bird component:
// 2) set velocity and update position
// a) this means setting smooth function for animation
// b) velocity, maxSpeed, acceleration [normalize the velocity]
// c) collapsing - if the bird colllapses(?)
// d) depth -> if the bird flies further away from the screen how should the camera be positioned(?)

// 3) Would the shape be distorted because of it?
// a) test this
// b) have a set target to where it will be flocked
// c) have to use fragemeentSharderPosition && fragmentShaderVelocity
// d) directionlight -- how much light is it taking?
