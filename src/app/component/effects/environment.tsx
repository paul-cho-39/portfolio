import { Sky } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Vector3 } from 'three';

interface EnvironmentProps {
   darkMode: boolean;
}

function Environment({ darkMode }: EnvironmentProps) {
   const skyRef = useRef<THREE.Mesh>(null!);
   const invisibleSun = useMemo(() => new Vector3(-10, 40, 40), []);
   const visibleSun = useMemo(() => new Vector3(0, -2, 40), []);

   return (
      // here add stars
      <Sky
         ref={skyRef}
         mieCoefficient={0.015}
         distance={1000}
         sunPosition={darkMode ? visibleSun : invisibleSun}
         turbidity={darkMode ? 8 : 2.75}
         rayleigh={darkMode ? 0 : 0.05}
         azimuth={darkMode ? 0 : Math.PI}
         inclination={10}
      />
   );
}

export default Environment;
