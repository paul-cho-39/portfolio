import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

// TODO: check whether this has to be useCallback not useMemo
// is function being passed or value?
export const useMakeFirework = (baseColor: THREE.Color) => {
   //    const baseColor = useMemo(() => new THREE.Color(), []);
   baseColor.r += 0.05 * Math.random();
   baseColor.b += 0.05 * Math.random();
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
      // context.fillRect(0, 0, 512, 512);
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

   const fireworkGeom = useMemo(() => new THREE.PlaneGeometry(2, 2), []);

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
               map: { value: gradientTexture },
               pattern: { value: null },
            },
            blending: THREE.AdditiveBlending,
         }),
      [baseColor, gradientTexture]
   );

   return { fireworkGeom, fireworkMaterial, baseColor };
};

export const useShuffleTexture = (dep?: unknown) => {
   return useMemo(() => {
      const emojiCanvas = document.createElement('canvas');
      emojiCanvas.width = emojiCanvas.height = 512;
      const context = emojiCanvas.getContext('2d') as CanvasRenderingContext2D;
      context.font = '200px Arial';
      var emojis = '😎 💀 💩 🤣 😍 🎉 🍑 🍆'.split(' ');
      context.fillText(emojis[Math.floor(Math.random() * emojis.length)], 50, 180);
      var emojiTexture = new THREE.CanvasTexture(emojiCanvas);
      return emojiTexture;

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dep]);
};
