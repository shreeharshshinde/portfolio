import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Points, PointMaterial } from '@react-three/drei';

const SpaceDust: React.FC<{ count?: number }> = ({ count = 2000 }) => {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate random points in a sphere/disk
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const distanceArray = new Float32Array(count); // Store initial distance to simulate orbit

        for (let i = 0; i < count; i++) {
            // Random distribution but biased towards a disk
            const radius = 5 + Math.random() * 20; // 5 to 25
            const angle = Math.random() * Math.PI * 2;
            const heightSpread = (Math.random() - 0.5) * 5; // -2.5 to 2.5

            const x = radius * Math.cos(angle);
            const z = radius * Math.sin(angle);
            const y = heightSpread * (1 - (radius - 5) / 20); // Tighter at edges? No, looser at edges maybe

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;

            distanceArray[i] = radius;
        }
        return { pos, distanceArray };
    }, [count]);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.getElapsedTime();
        const positionsAttribute = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;

        for (let i = 0; i < count; i++) {
            // Simple orbital mechanics simulation (ish)
            // v = sqrt(GM/r), so closer = faster

            // We can just rotate them based on their initial radius
            const radius = positions.distanceArray[i];
            const speed = 2.0 / (radius * radius * 0.1 + 1); // 1/r^2 falloff roughly

            // Get current pos
            const currentAngle = time * speed + i; // Offset by index to randomize start

            const x = radius * Math.cos(currentAngle);
            const z = radius * Math.sin(currentAngle);

            // Update position
            positionsAttribute.setX(i, x);
            positionsAttribute.setZ(i, z);
            // Y stays mostly consistent but maybe slight wave?
            positionsAttribute.setY(i, positions.pos[i * 3 + 1] + Math.sin(time + i) * 0.1);
        }

        positionsAttribute.needsUpdate = true;
    });

    return (
        <Points ref={pointsRef} positions={positions.pos} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#88ccff"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.6}
            />
        </Points>
    );
};

export default SpaceDust;
