import { Stars } from '@react-three/drei';
import { CanvasTexture, PlaneGeometry, ShaderMaterial, Mesh, Vector2, Vector3, Color } from 'three';

import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useShuffleTexture } from '@/app/library/hooks/useFireworks';
import { smoothstep } from './fireworks';

// size should be capped
// only play once when hovered and after playing come to a stop (setTimeOut? and turn it false?)

const Sampler = () => {
   const ref = useRef<Mesh>(null!);

   const baseColor = useMemo(() => new Color(), []);
   baseColor.r += 0.99 * Math.random();
   baseColor.g += 0.99 * Math.random();
   baseColor.b += 0.99 * Math.random();

   const [color] = useState(() => new Vector3(baseColor.r, baseColor.g, baseColor.b));

   const gradientTexture = useMemo(() => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 512; // change this value
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;

      const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.15, '#4b4b4b');
      gradient.addColorStop(0.25, '#3c3c3c');
      gradient.addColorStop(1, '#522d30');

      //   context.fillRect(0, 0, 512, 512);
      context.fillStyle = gradient;
      context.globalCompositeOperation = 'lighter';
      context.beginPath();

      for (let i = 0; i < 16; i++) {
         let radius = (i % 2) * (128 + Math.random() * 64) + 64;
         let theta = (i / 8) * 2 * Math.PI;
         context.lineTo(256 + radius * Math.sin(theta), 256 + radius * Math.cos(theta));
      }

      context.fill();
      const texture = new CanvasTexture(canvas);
      return texture;
   }, []);

   const newTexture = useShuffleTexture();

   const geometry = useMemo(() => new PlaneGeometry(2, 2), []);

   // determine the pivot point. Where is the pivot point?
   const material = useMemo(
      () =>
         new ShaderMaterial({
            transparent: true,
            depthWrite: false,
            vertexShader: `
                uniform float uTime; 
                uniform float uRotation;
                
                varying vec2 vUV;
                void main() 
                {
                    vUV = uv;

                    vec2 center = vUV * 0.5;
                    vec2 centeredPosition = position.xy - center;

                    float cosRot = cos(uRotation);
                    float sinRot = sin(uRotation);
                    vec2 rotatedPosition;
                    rotatedPosition.x = centeredPosition.x * cosRot - centeredPosition.y * sinRot;
                    rotatedPosition.y = centeredPosition.x * sinRot + centeredPosition.y * cosRot;
                
                    // Move back by the pivot offset
                    rotatedPosition += center;
                
                    // Set the final position
                    vec4 finalPosition = vec4(position, 1.0);
                    // finalPosition.z += ;                
                    
                    // gl_Position = projectionMatrix * modelViewMatrix * finalPosition;

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
                }
            `,
            fragmentShader: `
                varying vec2 vUV;
                
                uniform vec2 velocity;
                uniform vec2 resolution;
                uniform float uRotation;
                uniform vec3 color;

                uniform sampler2D map;
                uniform sampler2D pattern;
                
                void main() 
                {
                    gl_FragColor = texture2D(map, vUV);

                    gl_FragColor.rgb *= color;
                    // gl_FragColor.rgb*=texture2D(pattern, velocity).rgb - 0.5;
                    float overage = max(0., length( color ) - 1.) / 4.;
                    gl_FragColor.rgb += overage * texture2D( map, vUV ).rgb;
                } 
            `,
            uniforms: {
               resolution: {
                  value: new Vector2(
                     innerWidth * devicePixelRatio, // would have to set it here?
                     innerHeight * devicePixelRatio
                  ),
               },
               color: { value: color },
               uTime: { value: 0.0 },
               map: { value: gradientTexture },
               pattern: { value: null },
               velocity: { value: new Vector2(0, 0) },
               uRotation: { value: 0.0 },
            },
         }),
      []
   );

   useFrame((_, delta) => {
      let ttl = 200;

      //   if (ttl < 0) return;

      material.uniforms.uRotation.value += 0.05;
      if (material.uniforms.uRotation.value > 2.0 * Math.PI) {
         material.uniforms.uRotation.value = 0.0;
      }
      material.uniforms.uTime.value += delta;

      const scalar = Math.pow(Math.random(), 4) * 2 * smoothstep(-20, 50, ttl);
      material.uniforms.color.value.set(
         scalar * baseColor.r,
         scalar * baseColor.g,
         scalar * baseColor.b
      );
      ref.current.scale.setScalar(1 + 10 * smoothstep(30, 90, ttl));

      ttl--;

      //   material.uniforms.pattern.value = newTexture;
   });

   return <mesh ref={ref} position={[0, 3, -5]} material={material} geometry={geometry}></mesh>;
};

export default Sampler;
