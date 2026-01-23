import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NebulaProps {
    scale?: number;
    opacity?: number;
}

export const Nebula: React.FC<NebulaProps> = ({
    scale = 20,
    opacity = 0.5
}) => {
    const nebulaRef = useRef<THREE.Mesh>(null);
    const particlesRef = useRef<THREE.Points>(null);

    // Create a large sphere for the nebula
    const geometry = new THREE.SphereGeometry(scale, 64, 64);

    // Create a custom shader material for the nebula
    const nebulaMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            // For now, I'll just use the scale/speed/opacity props to differentiate layers
            uOpacity: { value: opacity },
            color1: { value: new THREE.Color(0x020617) }, // Deepest space blue/black
            color2: { value: new THREE.Color(0x0f172a) }, // Slate
            color3: { value: new THREE.Color(0x00f3ff) }, // Neon Blue (Brighter)
            color4: { value: new THREE.Color(0xd97706) }, // Amber (Accents)
            color5: { value: new THREE.Color(0x3b82f6) }, // Bright Blue (added for neon feel)
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vPosition;
            
            void main() {
                vUv = uv;
                vNormal = normalize(normalMatrix * normal);
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform vec3 color1;
            uniform vec3 color2;
            uniform vec3 color3;
            uniform vec3 color4;
            uniform vec3 color5;
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vPosition;
            
            // 2D Random function
            float random (in vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            // 2D Noise function
            float noise (in vec2 st) {
                vec2 i = floor(st);
                vec2 f = fract(st);
                
                // Four corners in 2D of a tile
                float a = random(i);
                float b = random(i + vec2(1.0, 0.0));
                float c = random(i + vec2(0.0, 1.0));
                float d = random(i + vec2(1.0, 1.0));
                
                // Smooth interpolation
                vec2 u = f*f*(3.0-2.0*f);
                
                return mix(a, b, u.x) +
                        (c - a)* u.y * (1.0 - u.x) +
                        (d - b) * u.x * u.y;
            }
            
            void main() {
                // Create more complex swirling patterns with multiple noise layers
                float noise1 = sin(vUv.x * 8.0 + time * 0.3) * cos(vUv.y * 6.0 + time * 0.5);
                float noise2 = sin(vUv.x * 12.0 - time * 0.7) * cos(vUv.y * 10.0 + time * 0.4);
                float noise3 = sin(vUv.x * 16.0 + time * 0.9) * cos(vUv.y * 14.0 - time * 0.6);
                
                // Combine noise layers with different weights
                float combinedNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
                
                // Add some animated turbulence
                float turbulence = noise(vec2(vUv.x * 3.0 + time * 0.2, vUv.y * 3.0));
                combinedNoise += turbulence * 0.3;
                
                // Create dynamic color transitions
                float timeMod1 = sin(time * 0.2) * 0.5 + 0.5;
                float timeMod2 = cos(time * 0.3) * 0.5 + 0.5;
                float timeMod3 = sin(time * 0.4 + 1.0) * 0.5 + 0.5;
                
                // Mix colors in a more complex way for vibrant transitions
                // Mix colors - darker base
                vec3 colorA = mix(color1, color2, timeMod1);
                vec3 colorB = mix(color3, color4, timeMod2);
                vec3 colorC = mix(color2, color5, timeMod3);
                
                // Final color mixing - favor the dark base colors
                vec3 color = mix(colorA, colorB, combinedNoise * 0.4 + 0.3); // Less intense brights
                color = mix(color, colorC, sin(time * 0.6) * 0.3 + 0.3);
                
                // Add some position-based variation
                float positionFactor = (vPosition.x + vPosition.y + vPosition.z) / 60.0;
                color = mix(color, mix(color1, color5, positionFactor), 0.4);
                
                // Add some transparency and glow with enhanced effects
                float alpha = 0.1 + abs(combinedNoise) * 0.2; // More transparent
                alpha *= smoothstep(0.0, 1.0, vNormal.z * 0.5 + 0.5);
                alpha *= uOpacity;
                
                // Add pulsing effect for more dynamic appearance
                alpha *= 0.8 + 0.2 * sin(time * 1.5);
                
                gl_FragColor = vec4(color, alpha);
            }
        `,
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });

    // Create particles for the nebula
    const particleCount = 100;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Position particles in a sphere
        const radius = 8 + Math.random() * 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i3 + 2] = radius * Math.cos(phi);

        // Random sizes
        particleSizes[i] = Math.random() * 0.2 + 0.05;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            color: { value: new THREE.Color(0xa5f3fc) }, // Very light cyan
        },
        vertexShader: `
            attribute float size;
            uniform float time;
            varying vec3 vColor;
            
            void main() {
                vColor = vec3(1.0, 1.0, 1.0);
                vec3 pos = position;
                // Add subtle movement to particles
                pos.x += sin(time * 0.5 + position.y * 0.5) * 0.1;
                pos.y += cos(time * 0.3 + position.x * 0.5) * 0.1;
                pos.z += sin(time * 0.7 + position.z * 0.5) * 0.1;
                
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            uniform vec3 color;
            
            void main() {
                // Create a circular particle
                vec2 coord = gl_PointCoord - vec2(0.5);
                float len = length(coord);
                if (len > 0.5) discard;
                
                // Add glow effect
                float alpha = 1.0 - smoothstep(0.3, 0.5, len);
                gl_FragColor = vec4(vColor * color, alpha * 0.8);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (nebulaRef.current) {
            const material = nebulaRef.current.material as THREE.ShaderMaterial;
            material.uniforms.time.value = time;
            // Slowly rotate the nebula
            nebulaRef.current.rotation.x = time * 0.02;
            nebulaRef.current.rotation.y = time * 0.01;
        }

        if (particlesRef.current) {
            const material = particlesRef.current.material as THREE.ShaderMaterial;
            material.uniforms.time.value = time;
        }
    });

    return (
        <>
            <mesh ref={nebulaRef} geometry={geometry} material={nebulaMaterial} />
            <points ref={particlesRef} geometry={particleGeometry} material={particleMaterial} />
        </>
    );
};