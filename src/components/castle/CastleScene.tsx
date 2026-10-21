import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { CastleAtmosphere } from './CastleAtmosphere';
import { CastleParticles } from './CastleParticles';
import { CastleWorld } from './CastleWorld';
import { ScrollCameraRig } from './ScrollCameraRig';

interface CastleSceneProps {
    progress: number;
}

export const CastleScene: React.FC<CastleSceneProps> = ({ progress }) => {
    return (
        <div className="canvas-root">
            <Canvas
                gl={{
                    antialias: false,
                    alpha: false,
                    powerPreference: 'high-performance',
                }}
                camera={{
                    fov: 52,
                    near: 0.5,
                    far: 1800,
                    position: [0, 205, -55],
                }}
                dpr={[1, 1.75]}
            >
                {/* Deep atmospheric smoky abyss background */}
                <color attach="background" args={['#140502']} />

                <Suspense fallback={null}>
                    <CastleAtmosphere progress={progress} />
                    <CastleParticles count={900} progress={progress} />
                    <CastleWorld progress={progress} />
                    <ScrollCameraRig progress={progress} />

                    <EffectComposer enableNormalPass={false} multisampling={0}>
                        <Bloom
                            luminanceThreshold={0.65}
                            luminanceSmoothing={0.5}
                            intensity={0.65}
                            mipmapBlur
                        />
                        <Vignette
                            eskil={false}
                            offset={0.22}
                            darkness={0.65}
                        />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
};
