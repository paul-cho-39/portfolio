// import { OrbitControlsProps, OrbitControls } from '@react-three/drei';
// import { extend, useFrame, useThree } from '@react-three/fiber';
// import { Ref, useRef } from 'react';
// import * as THREE from 'three';

// // extend({ OrbitControlsProps });
// const Controls = () => {
//    const { camera, gl } = useThree();
//    const controlsRef = useRef<OrbitControlsProps>(null!);

//    // can pass a prop and only if that is true
//    // then the autoRotateSpeed
//    useFrame((state, dt) => {
//       controlsRef.current.autoRotateSpeed = Math.sin(dt / 1000) * 2;
//    });
//    return (
//       <OrbitControls
//          ref={controlsRef as Ref<typeof OrbitControls>}
//          args={[camera, gl.domElement]}
//          enableZoom={false}
//          enableDamping={false}
//          enablePan={false}
//          autoRotate
//          autoRotateSpeed={Math.sin(Date.now() / 1000) * 2}
//          target={new THREE.Vector3(0, 0, 0)}
//       />
//    );
// };

export {};
