import { OrbitControls, shaderMaterial, Stars, Stats } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

extend({ OrbitControls });

const Controls = () => {
   const { camera, gl } = useThree();
   const controlsRef = useRef();
   useFrame(() => controlsRef.current.update());
   return (
      <OrbitControls
         ref={controlsRef}
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

// const Fireworks = () => {
//    const ref = useRef<THREE.Mesh>(null);
//    const fireworks = [];
//    const { size, camera, viewport } = useThree();
//    const dpr = useMemo(() => window.devicePixelRatio, []);

//    // vertexShader: `...`,
//    // fragmentShader: `...`,

//    //    const fireworkMaterial = shaderMaterial({
//    //     transparent,
//    //     depthWrite: false,
//    //     blendEquation: THREE.AddEquation,
//    //     vertexShader: {
//    //         isVector2: true,
//    //      },
//    //     uniforms: {
//    //       resolution: { value: new THREE.Vector2(innerWidth * devicePixelRatio, innerHeight * devicePixelRatio) },
//    //       color: { value: new THREE.Vector3(baseColor.r, baseColor.g, baseColor.b) },
//    //       velocity: { value: new THREE.Vector2(0, 0) },
//    //       map: { value: gradient },
//    //       pattern: { value: null },
//    //     },
//    //   });

//    //    const emojiTexture = useMemo(() => {
//    //       const emojiCanvas = document.createElement('canvas');
//    //       emojiCanvas.width = emojiCanvas.height = 256;
//    //       const g: CanvasRenderingContext2D = emojiCanvas.getContext('2d');
//    //       g.font = '200px Arial';
//    //       var emojis = '😎 💀 🌸 💩 🤣 😍 🎉 🍑 🍆'.split(' ');
//    //       g.fillText(emojis[Math.floor(Math.random() * emojis.length)], 30, 200);
//    //       var emojiTex = new THREE.CanvasTexture(emojiCanvas);
//    //       return emojiTex;
//    //    }, []);

//    const gradientTexture = useMemo(() => {
//       const canvas = document.createElement('canvas');
//       canvas.width = canvas.height = 250;
//       const context = canvas.getContext('2d') as CanvasRenderingContext2D;

//       const gradient = context?.createRadialGradient(
//          canvas.width / 2,
//          canvas.height / 2,
//          0,
//          canvas.width / 2,
//          canvas.height / 2,
//          canvas.width / 2
//       );
//       gradient?.addColorStop(0.1, 'red');
//       gradient?.addColorStop(1, 'blue');

//       context.fillStyle = gradient as CanvasGradient;
//       context.fillRect(0, 0, canvas.width, canvas.height);

//       const shadowTexture = new THREE.CanvasTexture(canvas);
//       return shadowTexture;
//    }, []);

//    return (
//       <mesh ref={ref} position={[0, 0, -3]}>
//          {/* <shaderMaterial
//             transparent

//             uniforms={{
//                resolution: { value: [size.width * dpr, size.height * dpr] },
//                color: { value: new THREE.Color(1, 1, 1) },
//                velocity: { value: [0, 0] },
//                pattern: { value: emojiTexture },
//             }}
//          /> */}
//          {/* <icosahedronGeometry args={[20, 1]} /> */}
//          <boxGeometry args={[1, 2, -1]}  />
//          <meshPhongMaterial color={'#0xffffff'} flatShading vertexColors shininess={0} />
//       </mesh>
//    );
// };

const useGeometry = () => {
   const circleGeometry = useMemo(() => new THREE.CircleGeometry(2, 32), []);
   const icosahedronGeometry = useMemo(() => new THREE.IcosahedronGeometry(1, 2), []);
   //    const ball = useMemo(() => new THREE.IcosahedronGeometry(1, 10), []);
   const ball = useMemo(() => new THREE.IcosahedronGeometry(1, 10), []);

   const circlePoints = circleGeometry.getAttribute('position').array;
   const icosahedronPoints = icosahedronGeometry.getAttribute('position').array;

   const combinedPoints = new Float32Array(circlePoints.length + icosahedronPoints.length);

   combinedPoints.set(circlePoints);
   combinedPoints.set(icosahedronPoints, circlePoints.length);

   const saturn = new THREE.BufferGeometry().setAttribute(
      'position',
      new THREE.BufferAttribute(combinedPoints, 3)
   );

   return { ball, saturn } as const;
};

type Props = {
   maxHeight: number;
   color: string;
   position: [number, number, number];
};

const Fireworks: React.FC<Props> = ({ maxHeight, color, position }) => {
   const random = Math.random() * 10;

   const pointsRef = useRef<THREE.Points>(null!);

   const material = useMemo(
      () =>
         new THREE.PointsMaterial({
            size: 1,
            color: color,
            blending: THREE.AdditiveBlending,
            depthTest: false,
         }),
      [color]
   );

   const { ball, saturn } = useGeometry();

   useFrame((state, delta) => {
      const speed = 50 - pointsRef.current.position.y ** 1.1 / 40;

      pointsRef.current.position.x +=
         (Math.cos(random + state.clock.getElapsedTime() * 10) * speed) / 20;
      pointsRef.current.position.z +=
         (Math.cos(random + state.clock.getElapsedTime() * 10) * speed) / 20;
      pointsRef.current.position.y += speed / 2;

      pointsRef.current.scale.setScalar(speed > 0.1 ? 1 : pointsRef.current.scale.x + delta * 25);

      material.opacity = speed > 0.1 ? 1 : material.opacity - delta / 2;
   });

   return <points ref={pointsRef} position={position} material={material} geometry={ball}></points>;
};

export const Monitor: React.FC<{}> = () => {
   return (
      <>
         <Stats showPanel={0} className='FPS'></Stats>
         <Stats showPanel={1} className='MS'></Stats>
         <Stats showPanel={2} className='MB'></Stats>
      </>
   );
};

export const Background: React.FC = () => {
   return (
      <group position={[0, 100, 0]}>
         <Stars radius={100} depth={250} speed={8} />
         <mesh position={[0, -100, -5]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[400, 400, 25, 25]} />
            <meshBasicMaterial wireframe wireframeLinecap='' color='gray' />
         </mesh>
      </group>
   );
};

export default Fireworks;
