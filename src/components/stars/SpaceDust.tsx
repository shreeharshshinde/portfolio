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
    // Current position logic
    vec3 pos = position;
    
    // CHAOS TRANSITION LOGIC
    float settleTime = 17.0; // Seconds to fully settle
    float progress = smoothstep(0.0, settleTime, uTime); // 0.0 -> 1.0
    float chaos = 1.0 - progress; // 1.0 -> 0.0
    
    // Orbital mechanics
    float baseRadius = length(pos.xz);
    if (baseRadius < 0.1) baseRadius = 0.1;
    
    // KEPLERIAN MOTION (Physically accurate-ish)
    // Angular velocity w proportional to 1 / r^1.5
    // Adjusted constant for visual speed
    float orbitSpeed = 40.0 * aSpeed / pow(baseRadius, 1.5);
    float angle = uTime * orbitSpeed + aRandom * 6.28;
    
    // Chaos Logic (Same as before but refined)
    float effectiveRadius = baseRadius + ((aRandom * 2.0 - 1.0) * 15.0 * chaos);
    if (effectiveRadius < 0.1) effectiveRadius = 0.1;

    float chaosHeight = (aRandom - 0.5) * 25.0 * chaos;

    // Final Position
    pos.x = cos(angle) * effectiveRadius;
    pos.z = sin(angle) * effectiveRadius;
    pos.y = chaosHeight + sin(uTime * 0.5 + aRandom * 10.0) * 0.2;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aScale * (150.0 / -mvPosition.z);
    
    // COLOR GRADIENT LOGIC (Temperature)
    // Closer = Hotter (White/Yellow), Further = Cooler (Orange/Red)
    float normalizedDist = clamp((effectiveRadius - 5.0) / 20.0, 0.0, 1.0);
    
    vec3 colorHot = vec3(1.0, 0.9, 0.6); // White-ish Yellow
    vec3 colorCool = vec3(1.0, 0.27, 0.0); // Deep Orange (e.g. #ff4500)
    
    // Mix based on distance
    vColor = mix(colorHot, colorCool, normalizedDist);
}
`;

const fragmentShader = `
varying vec3 vColor;

void main() {
    // Circular particle
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    
    // Soft edge
    float glow = 1.0 - (r * 2.0);
    glow = pow(glow, 1.5);
    
    gl_FragColor = vec4(vColor, glow * 0.9);
}
`;

const SpaceDust: React.FC<{ count?: number }> = ({ count = 2000 }) => {
    const pointsRef = useRef<THREE.Points>(null);
    const startTimeRef = useRef<number | null>(null);

    const uniformData = useMemo(() => ({
        uTime: { value: 0 },
        // uColor removed, calculated in shader
    }), []);

    const { positions, scales, speeds, randoms } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        const speeds = new Float32Array(count);
        const randoms = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // Skew distribution closer to center for accretion disk look
            const rRandom = Math.pow(Math.random(), 0.5); // Square root distribution pulls particles inward
            const r = 5 + rRandom * 25; // 5 to 30

            const theta = Math.random() * Math.PI * 2;

            positions[i * 3] = r * Math.cos(theta);
            positions[i * 3 + 1] = 0; // Target is y=0
            positions[i * 3 + 2] = r * Math.sin(theta);

            scales[i] = Math.random();
            speeds[i] = 0.5 + Math.random() * 0.5; // Variable speeds
            randoms[i] = Math.random();
        }

        return { positions, scales, speeds, randoms };
    }, [count]);

    // Imperatively attach attributes to circumvent TypeScript JSX limits
    React.useLayoutEffect(() => {
        if (pointsRef.current) {
            const geometry = pointsRef.current.geometry;

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
            geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
            geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

            geometry.attributes.position.needsUpdate = true;
        }
    }, [positions, scales, speeds, randoms]);

    useFrame((state) => {
        if (pointsRef.current) {
            // Initialize start time on first frame
            if (startTimeRef.current === null) {
                startTimeRef.current = state.clock.getElapsedTime();
            }

            // Calculate local time
            const localTime = state.clock.getElapsedTime() - startTimeRef.current;

            const material = pointsRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = localTime;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry />
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
