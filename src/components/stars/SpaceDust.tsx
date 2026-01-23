import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
uniform float uTime;
attribute float aScale;
attribute float aSpeed;
attribute float aRandom;
varying vec3 vColor;

void main() {
    vec3 pos = position;
    
    // CHAOS TRANSITION LOGIC
    float settleTime = 17.0; 
    float progress = smoothstep(0.0, settleTime, uTime);
    float chaos = 1.0 - progress;
    
    // Orbital mechanics
    float baseRadius = length(pos.xz);
    // Explicit safety check to prevent division by zero
    baseRadius = max(baseRadius, 0.1);
    
    // Orbit Speed
    float orbitSpeed = 40.0 * aSpeed / pow(baseRadius, 1.5);
    float angle = uTime * orbitSpeed + aRandom * 6.28;
    
    // Chaos
    float effectiveRadius = baseRadius + ((aRandom * 2.0 - 1.0) * 15.0 * chaos);
    effectiveRadius = max(effectiveRadius, 0.1); // Safety check

    float chaosHeight = (aRandom - 0.5) * 25.0 * chaos;

    // Apply new positions
    pos.x = cos(angle) * effectiveRadius;
    pos.z = sin(angle) * effectiveRadius;
    pos.y = chaosHeight + sin(uTime * 0.5 + aRandom * 10.0) * 0.2;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Point size attenuation with safety clamp
    // If z is positive (behind camera), this can be weird, but usually handled by clipping.
    // Clamp z to be at least slightly negative to avoid divide by zero.
    float zDist = max(-mvPosition.z, 0.1);
    gl_PointSize = aScale * (150.0 / zDist);
    
    // Color Logic
    float normalizedDist = clamp((effectiveRadius - 5.0) / 20.0, 0.0, 1.0);
    vec3 colorHot = vec3(1.0, 0.9, 0.6); 
    vec3 colorCool = vec3(1.0, 0.27, 0.0);
    vColor = mix(colorHot, colorCool, normalizedDist);
}
`;

const fragmentShader = `
varying vec3 vColor;

void main() {
    // distance from center of point (0.0 to 0.5)
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    
    // Soft glow
    float glow = 1.0 - (d * 2.0);
    glow = max(0.0, glow); // Clamp to avoid negative pow base
    glow = pow(glow, 1.5);
    
    gl_FragColor = vec4(vColor, glow * 0.9);
}
`;

const SpaceDust: React.FC<{ count?: number }> = ({ count = 2000 }) => {
    const pointsRef = useRef<THREE.Points>(null);
    const startTimeRef = useRef<number | null>(null);

    const uniformData = useMemo(() => ({
        uTime: { value: 0 },
    }), []);

    // Create Geometry only once (or when count changes)
    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();

        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        const speeds = new Float32Array(count);
        const randoms = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // Skew distribution closer to center
            const rRandom = Math.pow(Math.random(), 0.5);
            const r = 5 + rRandom * 25;

            const theta = Math.random() * Math.PI * 2;

            positions[i * 3] = r * Math.cos(theta);
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = r * Math.sin(theta);

            scales[i] = Math.random();
            speeds[i] = 0.5 + Math.random() * 0.5;
            randoms[i] = Math.random();
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
        geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
        geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

        return geo;
    }, [count]);

    useFrame((state) => {
        if (pointsRef.current) {
            if (startTimeRef.current === null) {
                startTimeRef.current = state.clock.getElapsedTime();
            }
            const localTime = state.clock.getElapsedTime() - startTimeRef.current;

            const material = pointsRef.current.material as THREE.ShaderMaterial;
            if (material.uniforms) {
                material.uniforms.uTime.value = localTime;
            }
        }
    });

    return (
        <points ref={pointsRef} geometry={geometry}>
            <shaderMaterial
                attach="material"
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniformData}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export default SpaceDust;
