import { OrbitControlsProps, OrbitControls } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { Ref, useRef } from 'react';
import * as THREE from 'three';

// extend({ OrbitControlsProps });
const Controls = () => {
   const { camera, gl } = useThree();
   const controlsRef = useRef<OrbitControlsProps>(null!);

   // can pass a prop and only if that is true
   // then the autoRotateSpeed
   useFrame((state, dt) => {
      controlsRef.current.autoRotateSpeed = Math.sin(dt / 1000) * 2;
   });
   return (
      <OrbitControls
         ref={controlsRef as Ref<typeof OrbitControls>}
         args={[camera, gl.domElement]}
         enableZoom={false}
         enableDamping={false}
         enablePan={false}
         autoRotate
         autoRotateSpeed={Math.sin(Date.now() / 1000) * 2}
         target={new THREE.Vector3(0, 0, 0)}
      />
   );
};

// const useGeometry = () => {
//     const circleGeometry = useMemo(() => new THREE.CircleGeometry(2, 32), []);
//     const icosahedronGeometry = useMemo(() => new THREE.IcosahedronGeometry(1, 2), []);
//     //    const ball = useMemo(() => new THREE.IcosahedronGeometry(1, 10), []);
//     const ball = useMemo(() => new THREE.IcosahedronGeometry(1, 10), []);

//     const circlePoints = circleGeometry.getAttribute('position').array;
//     const icosahedronPoints = icosahedronGeometry.getAttribute('position').array;

//     const combinedPoints = new Float32Array(circlePoints.length + icosahedronPoints.length);

//     combinedPoints.set(circlePoints);
//     combinedPoints.set(icosahedronPoints, circlePoints.length);

//     const saturn = new THREE.BufferGeometry().setAttribute(
//        'position',
//        new THREE.BufferAttribute(combinedPoints, 3)
//     );

//     return { ball, saturn } as const;
//  };

//  type Props = {
//     maxHeight: number;
//     color: string;
//     position: [number, number, number];
//  };

//  const Fireworks: React.FC<Props> = ({ maxHeight, color, position }) => {
//     const random = Math.random() * 10;

//     const pointsRef = useRef<THREE.Points>(null!);

//     const material = useMemo(
//        () =>
//           new THREE.PointsMaterial({
//              size: 1,
//              color: color,
//              blending: THREE.AdditiveBlending,
//              depthTest: false,
//           }),
//        [color]
//     );

//     const { ball, saturn } = useGeometry();

//     useFrame((state, delta) => {
//        const speed = 50 - pointsRef.current.position.y ** 1.1 / 40;

//        pointsRef.current.position.x +=
//           (Math.cos(random + state.clock.getElapsedTime() * 10) * speed) / 20;
//        pointsRef.current.position.z +=
//           (Math.cos(random + state.clock.getElapsedTime() * 10) * speed) / 20;
//        pointsRef.current.position.y += speed / 2;

//        pointsRef.current.scale.setScalar(speed > 0.1 ? 1 : pointsRef.current.scale.x + delta * 25);

//        material.opacity = speed > 0.1 ? 1 : material.opacity - delta / 2;
//     });

//     return <points ref={pointsRef} position={position} material={material} geometry={ball}></points>;
//  };

//  export const Background: React.FC = () => {
//     return (
//        <group position={[0, 100, 0]}>
//           <Stars radius={100} depth={250} speed={8} />
//           <mesh position={[0, -100, -5]} rotation={[-Math.PI / 2, 0, 0]}>
//              <planeGeometry args={[400, 400, 25, 25]} />
//              <meshBasicMaterial wireframe wireframeLinecap='' color='gray' />
//           </mesh>
//        </group>
//     );
//  };
