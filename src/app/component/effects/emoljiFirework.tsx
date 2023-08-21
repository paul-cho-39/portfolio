import { Sky } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CanvasTexture, PlaneGeometry, ShaderMaterial, Vector2, Vector3 } from 'three';

interface EnvironmentProps {
   darkMode: boolean;
}

function CustomSky({ darkMode }: EnvironmentProps) {
   const skyRef = useRef<typeof Sky>(null!);
   const invisibleSun = useMemo(() => new Vector3(-10, 1000, 500), []);
   const visibleSun = useMemo(() => new Vector3(0, -2, 10), []);

   return (
      // here add stars
      <Sky
         ref={skyRef}
         distance={15000}
         mieCoefficient={0.015}
         sunPosition={darkMode ? visibleSun : invisibleSun}
         turbidity={darkMode ? 8 : 2.75}
         rayleigh={darkMode ? 0 : 0.05}
         azimuth={darkMode ? 0 : Math.PI}
         inclination={10}
      />
   );
}

export default CustomSky;
