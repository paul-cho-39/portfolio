const fragmentBirdVelocity = `
    uniform float uTime;
    uniform float testing;
    uniform float delta;
    uniform float separationDistance;
    uniform float alignmentDistance;
    uniform float cohesionDistance;
    uniform float freedomFactor;
    uniform vec3 predator; 

    const float width = resolution.x;
    const float height = resolution.y;

    const float PI = 3.1415926535;
    const float PI_2 = PI * 2.0;
    
    float zoneRadius = 40.0;
    float zoneRadiusSquared = zoneRadius * zoneRadius;

    
`;

const fragmentShader = `
    uniform float uTime; 
    uniform float delta;

    void main()
    {
        vec2 uv = gl_FragCoord.xy/ resolution.xy * 2.0 - 1.0;
        vec4 tempPos = texture2D(texturePosition, uv);
        vec3 position = tempPos.xyz;
        vec3 velocity = texture2D(textureVelocity, uv).xyz;

        float phase = tempPos.w;

        
    }
`;

export const vertexShader = `
    attribute vec2 reference; 
    attribute float birdVertex;
    attribute vec3 birdColor;

    uniform sampler2D texturePosition;
    uniform sampler2D textureVelocity;

    varying vec4 vColor; 
    varying float z;

    uniform float time;

    void main() 
    {
        vec4 tmpPos = textrue2D(texturePosition, reference);
        vec3 pos = tmpPos.xyz;
        vec3 velocity = normalize(texture2D( textureVelocity, reference).xyz);
        
        vec3 newPos = position;

        vColor = vec4( birdColor, 1.0 );
        z = newPos.z;

        gl_Position = projectionMatrix * viewMatrix * vec4( newPos, 1 );
    }
`;

const birdFragmentShader = `
    varying vec4 vColor;
    varying float z;    

    uniform vec3 color;

    void main()
    {
        float z2 = 0.2 + (1000. - z) / 1000. * vColor.x;
        gl_FragColor = vec4( z2, z2, z2, 1. );
    }    
`;
