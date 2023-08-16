import { useMemo } from 'react';
import { Color, ShaderMaterial } from 'three';
import { birdFragmentShader, vertexShader } from './birds.glsl';

// because the gpu is heavy on animations, when changing tabs, the animation stops
// see and test out how the tabs work in the first place

// what would be the texture like? What kind of texture should it contain?
// because the site will be slower if higher the texture

// whenever the bird is flying, it should be rotation and translate only
// when moving away the head should be directed out, left <-> right
// so i believe it is rotating the y-axis math.pi * 1/2 when flying towards the back
// find out which direction it is flying towards

// lighting -- the further away the bird (from the lighting) the less shade they will recieve

// may be better if it is a hook
const useBirdShader = () => {
   const colors = useMemo(() => new Color(0xff2200), []);
   const birdUniforms = {
      color: { value: colors },
      texturePosition: { value: null },
      textureVelocity: { value: null },
      time: { value: 0.0 },
      delta: { value: 0.0 },
   };

   const shaderMaterial = useMemo(
      () =>
         new ShaderMaterial({
            uniforms: birdUniforms,
            transparent: true,
            depthWrite: true,
            vertexColors: true,
            side: 2,
            vertexShader: `
            attribute float birdVertex;
            attribute vec2 reference; 
            attribute vec3 birdColor;

            uniform float time;         
            uniform float delta;
            uniform sampler2D texturePosition;
            uniform sampler2D textureVelocity;
        
            varying vec4 vColor; 
            varying float z;
            varying vec2 vUV;

            vec3 rotateY(vec3 position, float angle) {
                mat3 rotationMatrix = mat3(
                    cos(angle),  0.0, sin(angle),
                    0.0,        1.0, 0.0,
                    -sin(angle), 0.0, cos(angle)
                );
                return rotationMatrix * position;
            }
                
            void main() 
            {
                // testing               
                vec4 tmpPos = texture2D(texturePosition, reference);
                vec3 pos = tmpPos.xyz;
                vec3 velocity = normalize(texture2D( textureVelocity, reference).xyz);
                vec3 newPosition = position;

                if (birdVertex == 4.0 || birdVertex == 7.0) {
                    // flap wings -- 
                    float birdFlapTimes = 0.0;
                    float flapAmount = sin(time + tmpPos.w * 10.0) * 5.0; 
                    
                    newPosition.y += flapAmount;
                    birdFlapTimes += 1.0;

                    // if the bird flaps its wings more than 4 times
                    if (birdFlapTimes > 4.0) {
                        
                    }
                    // newPosition.y = sin( tmpPos.w ) * 5.0;
                }
                
                newPosition = mat3( modelMatrix ) * newPosition; // scaling down the bird
                
                velocity.z *= -1.0;
                float xz = length(velocity.xz );
                float xyz = 1.0;
                float x = sqrt( 1.0 - velocity.y * velocity.y );

                float cosry = velocity.x / xz;
                float sinry = velocity.z / xz;

                float cosrz = x / xyz;
                float sinrz = velocity.y / xyz;

                mat3 maty = mat3(
                    cosry, 0, -sinry,
                    0, 1, 0, 
                    sinry, 0, cosry
                );

                mat3 matz = mat3(
                    cosrz, sinrz, 0,
                    -sinrz, cosrz, 0,
                    0, 0, 1
                );

                // rotate the bird
                float angle = time;
                newPosition = rotateY(newPosition, angle); 
                // newPosition += pos;
                // vUV = uv;
                z = newPosition.z;
                vColor = vec4( birdColor, 1.0 );
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.);
            }
        `,
            fragmentShader: `
            varying vec4 vColor;
            varying float z;    
            // varying vUV;
        
            uniform vec3 color;
            
            uniform float time;         
            uniform float delta;
        
            void main()
            {
                // vec4 tmpPos = texture2D(texturePosition, uv);
                float z2 = 0.2 + (100. - z) / 100. * vColor.x;
                gl_FragColor = vec4( z2, z2, z2, 1.0 );
            }    
        `,
         }),
      []
   );

   return shaderMaterial;
};

export default useBirdShader;
