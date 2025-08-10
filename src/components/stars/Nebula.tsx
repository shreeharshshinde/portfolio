import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Nebula: React.FC = () => {
    const nebulaRef = useRef<THREE.Mesh>(null);
    const particlesRef = useRef<THREE.Points>(null);
    
    // Create a large sphere for the nebula
    const geometry = new THREE.SphereGeometry(10, 64, 64);
    
    // Create a custom shader material for the nebula
    const nebulaMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            color1: { value: new THREE.Color(0x4a00e0) },
            color2: { value: new THREE.Color(0x8e2de2) },
            color3: { value: new THREE.Color(0x00c9ff) },
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
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vPosition;
            
            void main() {
                // Create swirling patterns
                float noise = sin(vUv.x * 10.0 + time) * cos(vUv.y * 8.0 + time * 0.7);
                noise += sin(vUv.x * 15.0 - time * 1.2) * cos(vUv.y * 12.0 + time * 0.9);
                
                // Create layers of color based on noise
                vec3 color = mix(color1, color2, noise * 0.5 + 0.5);
                color = mix(color, color3, sin(time * 0.5) * 0.5 + 0.5);
                
                // Add some transparency and glow
                float alpha = 0.1 + abs(noise) * 0.2;
                alpha *= smoothstep(0.0, 1.0, vNormal.z * 0.5 + 0.5);
                
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
            color: { value: new THREE.Color(0xffffff) },
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