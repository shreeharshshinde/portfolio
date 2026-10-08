import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WarpTunnelProps {
    active: boolean;
}

export const WarpTunnel: React.FC<WarpTunnelProps> = ({ active }) => {
    const linesRef = useRef<THREE.Group>(null);
    const progressRef = useRef(0);

    const streaks = useMemo(() => {
        return Array.from({ length: 300 }, (_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 4 + 0.5;
            const z = (Math.random() - 0.5) * 80;
            const length = Math.random() * 2 + 0.5;
            return { angle, radius, z, length, speed: Math.random() * 0.5 + 0.8, id: i };
        });
    }, []);

    useFrame((_, delta) => {
        if (!active || !linesRef.current) return;
        progressRef.current = Math.min(progressRef.current + delta * 0.6, 1);

        linesRef.current.children.forEach((child, i) => {
            const streak = streaks[i];
            if (!streak) return;
            const mesh = child as THREE.Mesh;
            mesh.position.z += streak.speed * delta * 60 * progressRef.current;
            if (mesh.position.z > 40) {
                mesh.position.z -= 80;
            }
            if (mesh.material instanceof THREE.MeshBasicMaterial) {
                mesh.material.opacity = progressRef.current * 0.8;
            }
        });
    });

    return (
        <group ref={linesRef}>
            {streaks.map((s) => {
                const x = Math.cos(s.angle) * s.radius;
                const y = Math.sin(s.angle) * s.radius;
                return (
                    <mesh key={s.id} position={[x, y, s.z]}>
                        <boxGeometry args={[0.01, 0.01, s.length]} />
                        <meshBasicMaterial
                            color={new THREE.Color().setHSL(0.55 + Math.random() * 0.1, 1, 0.8)}
                            transparent
                            opacity={0}
                        />
                    </mesh>
                );
            })}
        </group>
    );
};
