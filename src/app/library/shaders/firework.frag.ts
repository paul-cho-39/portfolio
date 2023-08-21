export const fragmentShader = `
varying vec2 vUV;
                
uniform vec2 velocity;
uniform float uRotation;
uniform vec3 color;

uniform sampler2D pattern;

void main() 
{             
    gl_FragColor = texture2D(pattern, vUV);
    gl_FragColor.rgb *= color;
    float overage = max(0., length( color ) - 1.) / 4.;
    gl_FragColor.rgb += overage * texture2D( pattern, vUV ).rgb;
} 
`;
