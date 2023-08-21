export const vertextShader = `
uniform float uTime; 
uniform float uRotation;

varying vec2 vUV;

void main() 
{
    vUV = uv;

    vec2 center = vec2(0.5, 0.5);

    vec2 centeredPosition = position.xy;
    float cosRot = cos(uRotation);
    float sinRot = sin(uRotation);
    vec2 rotatedPosition;
    rotatedPosition.x = centeredPosition.x * cosRot - centeredPosition.y * sinRot;
    rotatedPosition.y = centeredPosition.x * sinRot + centeredPosition.y * cosRot;

    // Move back by the pivot offset
    rotatedPosition += center;

    // Set the final position
    vec4 finalPosition = vec4(rotatedPosition, position.z, 1.0);
    // finalPosition.z += ;                
    
    gl_Position = projectionMatrix * modelViewMatrix * finalPosition;
}
`;
