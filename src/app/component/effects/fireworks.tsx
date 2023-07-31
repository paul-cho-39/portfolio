import { OrbitControls, shaderMaterial, Stars, Stats } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

type FireworkProps = {
   gradient: THREE.CanvasTexture;
   reset: boolean; // default is false
   texture: THREE.CanvasTexture;
   //    baseColor: THREE.Color;
};

const smoothstep = (low: number, high: number, f: number) => {
   f = (f - low) / (high - low);
   f = Math.max(0, Math.min(1, f));
   return f * f * (3 - 2 * f);
};

const Firework = ({ gradient, reset, texture }: FireworkProps) => {
   const ref = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>>(null!);
   const { camera } = useThree();

   const baseColor = useMemo(() => new THREE.Color(0xffffff), []); // should have the basic color to its background
   baseColor.r += 0.05 * Math.random();
   baseColor.b += 0.05 * Math.random();

   const restart = () => {
      ttl = 120 + Math.random() * 80;
      ref.current.position.multiplyScalar(0);
      velocity.set(Math.random() - 0.5, Math.random() - 0.5, (Math.random() - 0.5) * 0.2);
      velocity.normalize().multiplyScalar(Math.pow(Math.random(), 0.5));

      let tempVel = velocity;
      ref.current.material.uniforms.velocity.value.set(tempVel.x / 2 + 0.5, tempVel.y / 2 + 0.5);
   };

   const shuffleTexture = () => (ref.current.material.uniforms.pattern.value = texture);

   // geometry and material of the mesh
   const fireworkGeom = useMemo(() => new THREE.PlaneGeometry(0.6, 0.6), []);
   const velocity = useMemo(
      () => new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.1, Math.random() - 0.5),
      []
   );
   const drag = 0.96 + 0.02 * Math.random();
   let ttl = 200;
   //    const ttl = useRef<number>(200);

   useFrame(() => {
      const cameraPos = camera.position;
      ref.current.lookAt(cameraPos); // the group camera is being looked at
      ref.current.position.add(velocity); // the group is being added

      velocity.multiplyScalar(drag);
      velocity.y -= 0.003;
      velocity.x += (Math.random() - 0.5) * 0.01;
      velocity.z += (Math.random() - 0.5) * 0.01;
      ttl--;

      const scalar = Math.pow(Math.random(), 4) * 14 * smoothstep(-20, 50, ttl);
      ref.current.material.uniforms.color.value.set(
         scalar * baseColor.r,
         scalar * baseColor.g,
         scalar * baseColor.b
      );

      ref.current.scale.setScalar(1 + 10 * smoothstep(120, 190, ttl));
      ref.current.rotation.z = Math.random() * 6;

      console.log('finished!');
   });

   useEffect(() => {
      shuffleTexture();
   }, [shuffleTexture]);

   const fireworkMaterial = useMemo(
      () =>
         new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            vertexShader: `
            varying vec2 vUV;
            void main(){
                vUV = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
            }
            `,
            fragmentShader: `
            varying vec2 vUV;
            uniform vec3 color;
            uniform vec2 resolution;
            uniform vec2 velocity;
            uniform sampler2D map;
            uniform sampler2D pattern;
            void main(){
                gl_FragColor = texture2D(map, vUV);
                vec2 screenSpace = gl_FragCoord.xy/resolution.xy;
                gl_FragColor.rgb *= color;
                gl_FragColor.rgb*=texture2D(pattern, velocity).rgb-0.5;
                float overage = max(0., length(color)-1.)/4.;
                gl_FragColor.rgb+=overage*texture2D(map, vUV).rgb;
            }
            `,

            uniforms: {
               resolution: {
                  value: new THREE.Vector2(
                     innerWidth * devicePixelRatio,
                     innerHeight * devicePixelRatio
                  ),
               },
               color: { value: new THREE.Vector3(baseColor.r, baseColor.g, baseColor.b) },
               velocity: { value: new THREE.Vector2(0, 0) },
               map: { value: gradient },
               pattern: { value: null },
            },
            blending: THREE.AdditiveBlending,
         }),
      []
   );

   return <mesh ref={ref} material={fireworkMaterial} geometry={fireworkGeom}></mesh>;
};

// updating the fireworks --

const Fireworks = () => {
   const gradientTexture = useMemo(() => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 512; // change this value
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;

      const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);
      gradient.addColorStop(0, 'white');
      gradient.addColorStop(0.1, 'gray');
      gradient.addColorStop(0.2, '#303030');
      gradient.addColorStop(1, 'black');

      context.fillStyle = gradient;
      context.fillRect(0, 0, 512, 512);
      context.globalCompositeOperation = 'lighter';
      context.beginPath();

      // reset function here (what would be a safe approach?);
      // have no idea what the reset does here -- TEST THIS OUT

      for (let i = 0; i < 8; i++) {
         let radius = (i % 2) * (128 + Math.random() * 64) + 64;
         let theta = (i / 8) * 2 * Math.PI;
         context.lineTo(256 + radius * Math.sin(theta), 256 + radius * Math.cos(theta));
      }
      context.fill();
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
   }, []);

   const emojiTexture = useMemo(() => {
      const emojiCanvas = document.createElement('canvas');
      emojiCanvas.width = emojiCanvas.height = 256;
      const context = emojiCanvas.getContext('2d') as CanvasRenderingContext2D;
      context.font = '200px Arial';
      var emojis = '😎 💀 🌸 💩 🤣 😍 🎉 🍑 🍆'.split(' ');
      context.fillText(emojis[Math.floor(Math.random() * emojis.length)], 30, 200);
      var emojiTexture = new THREE.CanvasTexture(emojiCanvas);
      return emojiTexture;
   }, []);

   const [reset, setReset] = useState(false); // is this a global value?
   const [runAnimation, setRunAnimation] = useState(true);

   //    useEffect(() => {
   //       setTimeout(() => {
   //          if (runAnimation) {
   //             setRunAnimation(false);
   //          }
   //       }, 10000);
   //    }, [runAnimation]);

   //    it does seem like

   return (
      <group>
         {/* the group */}
         {runAnimation &&
            Array.from({ length: 2000 }, (_, i) => (
               // let's try setting firework in a different place
               <Firework
                  key={i}
                  texture={emojiTexture}
                  reset={reset}
                  gradient={gradientTexture}
                  //   material={material}
                  // geom={geom}
                  //   baseColor={baseColor}
               />
            ))}
      </group>
   );
};

export default Fireworks;
