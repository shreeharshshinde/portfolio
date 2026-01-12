import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CosmicParticles: React.FC = () => {
    const particlesRef = useRef<THREE.Points>(null);

    // Create particles
    const particleCount = 3000; // Increased count
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    // const particleColors = new Float32Array(particleCount * 3); // Using uniform color for now for cohesion

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Position particles in a large sphere
        const radius = 50 + Math.random() * 100;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i3 + 2] = radius * Math.cos(phi);

        // Varied sizes for depth
        particleSizes[i] = Math.random() * 0.4 + 0.1;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    // Custom shader for twinkling space dust
    const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            color: { value: new THREE.Color(0xa5f3fc) }, // Cyan-ish white dust
        },
        vertexShader: `
            attribute float size;
            uniform float time;
            varying float vOpacity;
            
            void main() {
                vec3 pos = position;
                
                // Slow, drifting movement
                // pos.x += sin(time * 0.1 + position.z * 0.05) * 5.0; // Drifting
                // pos.y += cos(time * 0.05 + position.x * 0.05) * 5.0; 
                // Rotation around center
                float angle = time * 0.05;
                float x = pos.x * cos(angle) - pos.z * sin(angle);
                float z = pos.x * sin(angle) + pos.z * cos(angle);
                pos.x = x;
                pos.z = z;

                
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = size * (400.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
                
                // Twinkle effect based on position and time
                vOpacity = 0.5 + 0.5 * sin(time * 2.0 + position.x * 10.0);
            }
        `,
        fragmentShader: `
            uniform vec3 color;
            varying float vOpacity;
            
            void main() {
                // Soft circle
                vec2 coord = gl_PointCoord - vec2(0.5);
                float len = length(coord);
                if (len > 0.5) discard;
                
                float alpha = (1.0 - len * 2.0) * vOpacity; // Fade out from center
                gl_FragColor = vec4(color, alpha * 0.6);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });

    useFrame((state) => {
        if (particlesRef.current) {
            const material = particlesRef.current.material as THREE.ShaderMaterial;
            material.uniforms.time.value = state.clock.getElapsedTime();
        }
    });

    return (
        <points ref={particlesRef} geometry={particleGeometry} material={particleMaterial} />
    );
};