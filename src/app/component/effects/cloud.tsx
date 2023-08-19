import { Point, useTexture } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Mesh, PlaneGeometry, ShaderLib, ShaderMaterial, UniformsUtils, Vector3 } from 'three';
import Sphere from './cloudSphere';
import { generateRandomPosition, generateScale } from '@/app/library/utils/three';

// the source code is from:
// https://tympanus.net/codrops/2020/01/28/how-to-create-procedural-clouds-using-three-js-sprites/

const Cloud = ({ scale, position }: { scale: Vector3; position: Vector3 }) => {
   const meshRef = useRef<Mesh>(null!);

   const t1 = useTexture('/images/cloud1.png');
   const t2 = useTexture('/images/cloud2.jpg');

   const uniforms = useMemo(
      () => ({
         uTime: { value: 0 },
         uTxtShape: { value: t1 },
         uTxtCloudNoise: { value: t2 },
         uFac1: { value: 52 }, // 17.8
         uFac2: { value: 2.4 }, //2.7
         uTimeFactor1: { value: 0.01 },
         uTimeFactor2: { value: 0.0025 }, // 0015
         uDisplStrenght1: { value: 0.05 },
         uDisplStrenght2: { value: 0.05 },
      }),
      [t1, t2]
   );

   const material = useMemo(
      () =>
         new ShaderMaterial({
            transparent: true,
            depthWrite: false,
            depthTest: true,
            uniforms: { ...UniformsUtils.clone(ShaderLib.sprite.uniforms), ...uniforms },
            vertexShader: `
            uniform float rotation;
            uniform vec2 center;
            #include <common>
            #include <uv_pars_vertex>
            #include <fog_pars_vertex>
            #include <logdepthbuf_pars_vertex>
            #include <clipping_planes_pars_vertex>
            
            varying vec2 vUv;
            
            void main() {
            #include <uv_vertex>
              vUv = uv;
            
                vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
                vec2 scale;
                scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
                scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
            
                vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
                vec2 rotatedPosition;
                rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
                rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
                mvPosition.xy += rotatedPosition;
                gl_Position = projectionMatrix * mvPosition;

                #include <logdepthbuf_vertex>
                #include <clipping_planes_vertex>
                #include <fog_vertex>
            }
            `,
            fragmentShader: `
            // #pragma glslify: fbm3d = require('glsl-fractal-brownian-noise/3d')
            vec3 mod289(vec3 x) {
                return x - floor(x * (1.0 / 289.0)) * 289.0;
              }
              
              vec4 mod289(vec4 x) {
                return x - floor(x * (1.0 / 289.0)) * 289.0;
              }
              
              vec4 permute(vec4 x) {
                   return mod289(((x*34.0)+10.0)*x);
              }
              
              vec4 taylorInvSqrt(vec4 r)
              {
                return 1.79284291400159 - 0.85373472095314 * r;
              }
            float snoise(vec3 v)
                { 
                const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

                // First corner
                vec3 i  = floor(v + dot(v, C.yyy) );
                vec3 x0 =   v - i + dot(i, C.xxx) ;

                // Other corners
                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min( g.xyz, l.zxy );
                vec3 i2 = max( g.xyz, l.zxy );

                //   x0 = x0 - 0.0 + 0.0 * C.xxx;
                //   x1 = x0 - i1  + 1.0 * C.xxx;
                //   x2 = x0 - i2  + 2.0 * C.xxx;
                //   x3 = x0 - 1.0 + 3.0 * C.xxx;
                vec3 x1 = x0 - i1 + C.xxx;
                vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
                vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

                // Permutations
                i = mod289(i); 
                vec4 p = permute( permute( permute( 
                            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                        + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                        + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

                // Gradients: 7x7 points over a square, mapped onto an octahedron.
                // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
                float n_ = 0.142857142857; // 1.0/7.0
                vec3  ns = n_ * D.wyz - D.xzx;

                vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

                vec4 x_ = floor(j * ns.z);
                vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

                vec4 x = x_ *ns.x + ns.yyyy;
                vec4 y = y_ *ns.x + ns.yyyy;
                vec4 h = 1.0 - abs(x) - abs(y);

                vec4 b0 = vec4( x.xy, y.xy );
                vec4 b1 = vec4( x.zw, y.zw );

                //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
                //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
                vec4 s0 = floor(b0)*2.0 + 1.0;
                vec4 s1 = floor(b1)*2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));

                vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

                vec3 p0 = vec3(a0.xy,h.x);
                vec3 p1 = vec3(a0.zw,h.y);
                vec3 p2 = vec3(a1.xy,h.z);
                vec3 p3 = vec3(a1.zw,h.w);

                //Normalise gradients
                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                p0 *= norm.x;
                p1 *= norm.y;
                p2 *= norm.z;
                p3 *= norm.w;

                // Mix final noise value
                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                                dot(p2,x2), dot(p3,x3) ) );
                }    
               
            
                float fbm3d(vec3 x, const in int it) {
                    float v = 0.0;
                    float a = 0.5;
                    vec3 shift = vec3(100);
                
                    
                    for (int i = 0; i < 32; ++i) {
                        if(i<it) {
                            v += a * snoise(x);
                            x = x * 2.0 + shift;
                            a *= 0.5;
                        }
                    }
                    return v;
                }     
            
            uniform sampler2D uTxtShape;
            uniform sampler2D uTxtCloudNoise;
            uniform float uTime;
            
            uniform float uFac1;
            uniform float uFac2;
            uniform float uTimeFactor1;
            uniform float uTimeFactor2;
            uniform float uDisplStrenght1;
            uniform float uDisplStrenght2;
            
            varying vec2 vUv;

            vec4 gammaCorrect(vec4 color, float gamma){
                return pow(color, vec4(1.0 / gamma));
              }
              
              vec4 levelRange(vec4 color, float minInput, float maxInput){
                return min(max(color - vec4(minInput), vec4(0.0)) / (vec4(maxInput) - vec4(minInput)), vec4(1.0));
              }
              
              vec4 levels(vec4 color, float minInput, float gamma, float maxInput){
                return gammaCorrect(levelRange(color, minInput, maxInput), gamma);
              }
            
            void main() {
                vec2 newUv = vUv;
            
                vec4 txtNoise1 = texture2D(uTxtCloudNoise, vec2(vUv.x + uTime * 0.0001, vUv.y - uTime * 0.00014)); // noise txt
                vec4 txtNoise2 = texture2D(uTxtCloudNoise, vec2(vUv.x - uTime * 0.00002, vUv.y + uTime * 0.000017 + 0.2)); // noise txt
            
                // float noiseBig = fbm3d(vec3(vUv * uFac1, uTime * uTimeFactor1), 4)+ 1.0 * 0.5;
                // newUv += noiseBig * uDisplStrenght1;
            
                float noiseSmall = snoise(vec3(newUv * uFac2, uTime * uTimeFactor2)) + 1.0 * 0.5;
            
                newUv += noiseSmall * uDisplStrenght2;
            
                vec4 txtShape = texture2D(uTxtShape, newUv);
            
                float alpha = levels((txtNoise1 + txtNoise2) * 0.6, 0.25, 0.5, 0.7).r;
                alpha *= txtShape.r;
            
                gl_FragColor = vec4(vec3(0.95,0.95,0.95), alpha);
            }
            `,
         }),
      []
   );

   useFrame(() => {
      //   meshRef.current.position.x -= 0.00075;
      if (material) {
         material.uniforms.uTime.value += 1;
      }
   });

   return (
      <mesh scale={scale} position={position} ref={meshRef} rotation={[0, -Math.PI * 2, 0]}>
         {/* <Sphere /> */}
         <planeGeometry attach='geometry' args={[1, 1, 1, 5]} />
         <primitive object={material} attach='material' />
      </mesh>
   );
};

const TOTAL_CLOUDS = 3;
const Clouds = () => {
   const [pos] = useState(() => new Vector3(0, 3, -5));
   const cloudData = useMemo(() => {
      return Array.from({ length: TOTAL_CLOUDS }).map((_, index) => {
         return {
            scale: generateScale(index),
            position: generateRandomPosition(pos),
         };
      });
   }, [pos]);

   return (
      <group>
         {cloudData.map((data, index) => (
            <Cloud key={index} scale={data.scale} position={data.position} />
         ))}
      </group>
   );
};

export default Clouds;
