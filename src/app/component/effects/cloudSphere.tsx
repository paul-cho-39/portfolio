import { useMemo } from 'react';
import { MeshLambertMaterial, SphereGeometry, Vector3 } from 'three';

const CloudSphere = ({ position }: { position: Vector3 }) => {
   const geometry = useMemo(() => new SphereGeometry(0.05, 20, 20), []);
   const material = useMemo(
      () =>
         new MeshLambertMaterial({
            color: 0xfcba03,
         }),
      []
   );

   return <mesh position={position} geometry={geometry} material={material}></mesh>;
};

const Sphere = () => {
   // change the position of cloud accordingly
   const positions = useMemo(() => {
      const positions = [
         new Vector3(1, 0, 0),
         new Vector3(-1, 0, 0),
         new Vector3(0, 1, 0),
         new Vector3(0, -1, 0),
         new Vector3(0, 0, 1),
         new Vector3(0, 0, -1),
      ];
      return positions;
   }, []);

   return (
      <>
         {positions.map((pos, i) => (
            <CloudSphere position={pos} key={i} />
         ))}
      </>
   );
};

export default Sphere;
