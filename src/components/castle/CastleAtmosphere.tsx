import React from 'react';

interface CastleAtmosphereProps {
    progress?: number;
}

export const CastleAtmosphere: React.FC<CastleAtmosphereProps> = () => {
    return (
        <>
            {/* ── Volumetric Dark Amber Void Fog ────────────────────────── */}
            {/* Soft dark fog so towers and lanterns emerge naturally from the darkness */}
            <fogExp2 attach="fog" args={['#0a0301', 0.008]} />

            {/* ── Very Subtle Base Ambient Fill ──────────────────────────── */}
            {/* Kept minimal so the scene is primarily lit by castle lamps and windows */}
            <ambientLight color="#260c04" intensity={0.35} />

            {/* ── COMMENTED OUT: Environment Sun/Rays & Distant Horizon Light ──
               As requested: we now rely totally on castle lights, glowing shoji screens, and lamps.
               Uncomment below if you wish to re-enable the distant horizon furnace rift later.
            */}

            {/*
            <hemisphereLight args={['#FF8825', '#7A1802', 1.2]} />

            <directionalLight
                position={[0, 10, 520]}
                intensity={1.5}
                color="#FFA035"
                castShadow={false}
            />

            <directionalLight
                position={[0, -100, 200]}
                intensity={1.4}
                color="#FF3300"
                castShadow={false}
            />

            <directionalLight
                position={[-50, 130, 80]}
                intensity={1.6}
                color="#FF9525"
                castShadow={false}
            />

            <pointLight position={[0, 80, 50]} distance={240} decay={2} intensity={60} color="#FFA030" />
            <pointLight position={[-20, 10, 200]} distance={260} decay={2} intensity={70} color="#FF7510" />
            <pointLight position={[0, -65, 410]} distance={280} decay={2} intensity={90} color="#FFA020" />

            <group position={[0, 0, 500]}>
                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[1200, 420, 32, 16]} />
                </mesh>
                <pointLight
                    position={[0, 0, -20]}
                    intensity={90}
                    distance={600}
                    decay={1.8}
                    color="#FF7510"
                />
            </group>
            */}
        </>
    );
};
