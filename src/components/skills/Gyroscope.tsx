import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Gyroscope() {
    const ring1 = useRef<THREE.Mesh>(null);
    const ring2 = useRef<THREE.Mesh>(null);
    const ring3 = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (ring1.current) {
            ring1.current.rotation.x = t * 0.4;
            ring1.current.rotation.y = t * 0.3;
        }
        if (ring2.current) {
            ring2.current.rotation.y = -t * 0.5;
            ring2.current.rotation.z = t * 0.6;
        }
        if (ring3.current) {
            ring3.current.rotation.x = -t * 0.2;
            ring3.current.rotation.z = -t * 0.4;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            <mesh ref={ring1}>
                <torusGeometry args={[3, 0.05, 16, 100]} />
                <meshStandardMaterial color="#00f3ff" metalness={0.8} roughness={0.2} emissive="#00f3ff" emissiveIntensity={1} />
            </mesh>
            <mesh ref={ring2}>
                <torusGeometry args={[4, 0.03, 16, 100]} />
                <meshStandardMaterial color="#3b82f6" metalness={0.9} roughness={0.1} emissive="#3b82f6" emissiveIntensity={1.5} />
            </mesh>
            <mesh ref={ring3}>
                <torusGeometry args={[5, 0.08, 16, 100]} />
                <meshStandardMaterial color="#0891b2" metalness={1.0} roughness={0.3} wireframe={true} />
            </mesh>
        </group>
    );
}
