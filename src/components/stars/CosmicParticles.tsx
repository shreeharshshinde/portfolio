import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CosmicParticles: React.FC = () => {
    const particlesRef = useRef<THREE.Points>(null);
    
    // Create particles
    const particleCount = 2000;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleColors = new Float32Array(particleCount * 3);
    
    // Color palette for cosmic particles
    const colors = [
        new THREE.Color(0x4dd0e1), // Cyan
        new THREE.Color(0x9c27b0), // Purple
        new THREE.Color(0x2196f3), // Blue
        new THREE.Color(0xffeb3b), // Yellow
        new THREE.Color(0xff5722), // Orange
    ];
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Position particles in a sphere with some randomness
        const radius = 30 + Math.random() * 70;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i3 + 2] = radius * Math.cos(phi);
        
        // Random sizes
        particleSizes[i] = Math.random() * 0.5 + 0.1;
        
        // Random colors from our palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        particleColors[i3] = color.r;
        particleColors[i3 + 1] = color.g;
        particleColors[i3 + 2] = color.b;
    }
    
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            opacity: { value: 0.8 },
        },
        vertexShader: `
            attribute float size;
            attribute vec3 color;
            uniform float time;
            varying vec3 vColor;
            
            void main() {
                vColor = color;
                vec3 pos = position;
                // Add subtle movement to particles
                pos.x += sin(time * 0.2 + position.y * 0.1) * 0.5;
                pos.y += cos(time * 0.15 + position.x * 0.1) * 0.5;
                pos.z += sin(time * 0.1 + position.z * 0.1) * 0.5;
                
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            uniform float opacity;
            
            void main() {
                // Create a circular particle with glow
                vec2 coord = gl_PointCoord - vec2(0.5);
                float len = length(coord);
                if (len > 0.5) discard;
                
                // Add glow effect
                float alpha = 1.0 - smoothstep(0.2, 0.5, len);
                gl_FragColor = vec4(vColor, alpha * opacity);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });
    
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        
        if (particlesRef.current) {
            const material = particlesRef.current.material as THREE.ShaderMaterial;
            material.uniforms.time.value = time;
        }
    });
    
    return (
        <points ref={particlesRef} geometry={particleGeometry} material={particleMaterial} />
    );
};