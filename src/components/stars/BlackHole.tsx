import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Sphere } from '@react-three/drei';

const BlackHole: React.FC = () => {
    const diskRef = useRef<THREE.Mesh>(null);
    const eventHorizonRef = useRef<THREE.Mesh>(null);

    // Vertex Shader for Accretion Disk
    const vertexShader = `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;

        void main() {
            vUv = uv;
            vPosition = position;
            
            // Rotate the disk
            float angle = time * 0.15;
            mat2 rotate = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            
            vec3 transformed = position;
            transformed.xz = rotate * transformed.xz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
        }
    `;

    // Fragment Shader for Accretion Disk
    const fragmentShader = `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        uniform vec3 colorInner;
        uniform vec3 colorOuter;

        // Noise function
        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        float noise(vec2 st) {
            vec2 i = floor(st);
            vec2 f = fract(st);
            float a = random(i);
            float b = random(i + vec2(1.0, 0.0));
            float c = random(i + vec2(0.0, 1.0));
            float d = random(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        void main() {
            // Distance from center
            float dist = length(vPosition.xz);
            
            // Create spiraling arms
            float angle = atan(vPosition.z, vPosition.x);
            float spiral = sin(angle * 4.0 + dist * 0.8 - time * 1.5);
            
            // Noise for structure
            float n = noise(vPosition.xz * 1.5 + time * 0.3);
            
            // Intensity based on distance and spiral
            // Wider fade out
            float intensity = smoothstep(2.4, 4.0, dist) * smoothstep(12.0, 6.0, dist);
            intensity *= (0.7 + 0.3 * spiral) * (0.8 + 0.2 * n);
            
            // Color gradient - Shift towards red/orange at edges
            vec3 color = mix(colorInner, colorOuter, smoothstep(3.0, 10.0, dist));
            
            // Add thermal glow
            float thermal = exp(-1.0 * abs(dist - 3.5));
            color += vec3(1.0, 0.4, 0.1) * thermal * 0.5;
            
            // Glow effect
            float glow = exp(-0.8 * abs(dist - 5.0));
            
            float alpha = intensity + glow * 0.3;
            
            // Discard center for black hole
            if(dist < 2.5) alpha = 0.0; // Hard edge for event horizon shadow on disk
            
            gl_FragColor = vec4(color + vec3(glow * 0.5), alpha);
        }
    `;

    const uniforms = useMemo(
        () => ({
            time: { value: 0 },
            // Interstellar style colors: intense warm white/yellow inner, fading to deep red/orange outer
            colorInner: { value: new THREE.Color('#ffddaa') }, // Warm light
            colorOuter: { value: new THREE.Color('#ff3300') }, // Deep Red/Orange
        }),
        []
    );

    useFrame((state) => {
        if (diskRef.current) {
            (diskRef.current.material as THREE.ShaderMaterial).uniforms.time.value = state.clock.getElapsedTime();
        }
    });

    return (
        <group>
            {/* Event Horizon (The Black Sphere) */}
            <Sphere ref={eventHorizonRef} args={[2.45, 64, 64]}>
                <meshBasicMaterial color="#000000" />
            </Sphere>

            {/* Accretion Disk - Wider */}
            <mesh ref={diskRef} rotation={[0.2, 0, 0]}>
                <cylinderGeometry args={[12, 12, 0.1, 128, 1, true]} />
                <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                    transparent
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* Photon Ring (Glowing edge around black hole) */}
            <mesh rotation={[0.2, 0, 0]}>
                <torusGeometry args={[2.5, 0.03, 32, 100]} />
                <meshBasicMaterial color="#ffaa88" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
            </mesh>

            {/* Soft Glow Billboard behind */}
            {/* <mesh position={[0, 0, -1]}>
                <planeGeometry args={[15, 15]} />
                <meshBasicMaterial color="#cc4400" transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh> */}
        </group>
    );
};

export default BlackHole;
