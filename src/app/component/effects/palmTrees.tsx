import { useGLTF, Clone, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Group } from 'three';

// palmtrees
const PalmTrees = () => {
   const group = useRef<Group>(null!);
   const bird = useGLTF('/glb/bird.glb');

   const { actions, mixer } = useAnimations(bird.animations, group);

   const timerId = useRef<NodeJS.Timeout>();

   // useEffect(() => {
   //    const runAnimation = () => {
   //       if (actions.flying) {
   //          actions?.flying.play();
   //          actions?.flying.setDuration(5);
   //       }

   //       timerId.current = setTimeout(runAnimation, 1500);
   //    };

   //    runAnimation();

   //    return () => {
   //       if (timerId.current) {
   //          if (actions.flying) {
   //             actions.flying.stop();
   //          }
   //          clearTimeout(timerId.current);
   //          timerId.current = undefined;
   //       }
   //    };
   // }, [actions.flying]);

   useEffect(() => {
      if (actions.flying) {
         actions?.flying.play();
         actions?.flying.setDuration(5);
      }
   });

   return <primitive ref={group} object={bird.scene} />;
};

useGLTF.preload('/glb/bird.glb');

export default PalmTrees;
