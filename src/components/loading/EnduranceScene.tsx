import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Stars } from '@react-three/drei';
import * as THREE from 'three';

export const EnduranceScene: React.FC = () => {
    const endurance = useGLTF('/assets/interstellar__endurance_high_fidelity.glb');
    const planet = useGLTF('/assets/neptune.glb');

    const enduranceRef = useRef<THREE.Group>(null);
    const planetRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Planet rotation - very slow
        if (planetRef.current) {
            planetRef.current.rotation.y = time * 1.25;
        }

        // Endurance movement
        // Passing from bottom-left to right with Gravity Assist Curve
        if (enduranceRef.current) {
            // Speed (Synced with audio)
            const speed = 3.2;
            const startX = -18;
            const endX = 35;
            const totalDistance = endX - startX;

            // Calculate X position
            const currentX = ((time * speed) % totalDistance) + startX;

            // Normalized progress (0 to 1)
            const progress = (currentX - startX) / totalDistance;

            // Y Position: Diagonal rise
            // Starts low (-4) and rises to top (+2)
            const currentY = -4 + (progress * 6);

            // Z Position: GRAVITY CURVE / SLINGSHOT
            // Smoothly arcs into the screen towards the planet
            // Goes from 0 -> -8 -> 0 roughly
            const currentZ = -Math.sin(progress * Math.PI) * 8;

            enduranceRef.current.position.set(currentX, currentY, currentZ);

            // ROTATION
            // 1. Self-Axis Spin (The Ring) - Constant rotation
            enduranceRef.current.rotation.y += 0.01;

            // 2. Banking / Orientation to curve
            // Face slightly towards the direction of travel + gravity pull
            enduranceRef.current.rotation.z = Math.PI / 2 - (progress * 0.5);
            enduranceRef.current.rotation.x = Math.sin(time * 0.5) * 0.1; // Gentle sway
        }
    });

    return (
        <>
            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#ffaa88" />
            <directionalLight position={[-10, 0, -5]} intensity={0.5} color="#4455ff" />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Planet - Background */}
            <group ref={planetRef} position={[0, 2, -15]} scale={[0.7, 0.7, 0.7]}>
                <primitive object={planet.scene} />
            </group>

            {/* Endurance - Foreground */}
            <group ref={enduranceRef} position={[-20, -5, 0]} scale={[0.07, 0.07, 0.07]} rotation={[0, Math.PI / 2, 0]}>
                <primitive object={endurance.scene} />
            </group>
        </>
    );
};

// Preload assets
useGLTF.preload('/assets/interstellar__endurance_high_fidelity.glb');
useGLTF.preload('/assets/neptune.glb');
