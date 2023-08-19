export const fragmentShader = `
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
`;
