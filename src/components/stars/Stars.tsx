import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { inSphere } from 'maath/random';
import type { Points as PointsType } from 'three';

export const Stars: React.FC = (props) => {
    const ref = useRef<PointsType>(null);
    const [sphere] = useState<Float32Array>(() => {
        const result = inSphere(new Float32Array(5000), { radius: 1.5 });
        return result instanceof Float32Array ? result : new Float32Array(result);
    });

    useFrame((_, delta: number) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 25;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
                <PointMaterial
                    transparent
                    color="#4dd0e1"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};
