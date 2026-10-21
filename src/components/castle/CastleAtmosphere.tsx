import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CastleAtmosphereProps {
    progress?: number;
}

export const CastleAtmosphere: React.FC<CastleAtmosphereProps> = ({ progress = 0 }) => {
    const { scene } = useThree();
    const fogRef = useRef<THREE.FogExp2>(null);
    const ambientRef = useRef<THREE.AmbientLight>(null);

    // Reusable color instances for 0-allocation runtime blending
    const castleFogColor = React.useMemo(() => new THREE.Color('#0a0301'), []);
    const doumaFogColor = React.useMemo(() => new THREE.Color('#020a14'), []);
    const currentFogColor = React.useMemo(() => new THREE.Color('#0a0301'), []);

    const castleAmbientColor = React.useMemo(() => new THREE.Color('#260c04'), []);
    const doumaAmbientColor = React.useMemo(() => new THREE.Color('#051b2c'), []);
    const currentAmbientColor = React.useMemo(() => new THREE.Color('#260c04'), []);

    const castleBgColor = React.useMemo(() => new THREE.Color('#140502'), []);
    const doumaBgColor = React.useMemo(() => new THREE.Color('#020812'), []);
    const currentBgColor = React.useMemo(() => new THREE.Color('#140502'), []);

    useFrame(() => {
        // Douma's realm runs from p = 0.57 -> 0.70 (eye-level lotus palace section)
        // Fade in during approach transit (0.54 -> 0.57) and out during return (0.70 -> 0.73)
        const enterFactor = THREE.MathUtils.smoothstep(progress, 0.54, 0.575);
        const exitFactor = 1.0 - THREE.MathUtils.smoothstep(progress, 0.698, 0.73);
        const doumaWeight = enterFactor * exitFactor;

        // Smoothly blend volumetric fog color & density
        currentFogColor.lerpColors(castleFogColor, doumaFogColor, doumaWeight);
        if (fogRef.current) {
            fogRef.current.color.copy(currentFogColor);
            fogRef.current.density = THREE.MathUtils.lerp(0.0055, 0.0062, doumaWeight);
        }

        // Smoothly blend ambient fill light
        currentAmbientColor.lerpColors(castleAmbientColor, doumaAmbientColor, doumaWeight);
        if (ambientRef.current) {
            ambientRef.current.color.copy(currentAmbientColor);
            ambientRef.current.intensity = THREE.MathUtils.lerp(0.35, 0.52, doumaWeight);
        }

        // Smoothly blend 3D canvas background color
        currentBgColor.lerpColors(castleBgColor, doumaBgColor, doumaWeight);
        if (scene.background instanceof THREE.Color) {
            scene.background.copy(currentBgColor);
        }
    });

    return (
        <>
            {/* Volumetric Void Fog that transitions from dark amber to midnight cyan */}
            <fogExp2 ref={fogRef} attach="fog" args={['#0a0301', 0.0055]} />

            {/* Subtle base ambient fill that transitions to cool blue inside Douma's realm */}
            <ambientLight ref={ambientRef} color="#260c04" intensity={0.35} />
        </>
    );
};
