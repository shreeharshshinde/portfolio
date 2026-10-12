import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const glitterVertexShader = `
uniform float uTime;
uniform vec2 uMouse;

attribute float aScale;
attribute float aRandom;
attribute float aSpeed;
attribute vec3 aColor;

varying vec3 vColor;
varying float vTwinkle;

void main() {
    vColor = aColor;

    vec3 pos = position;

    // Organic 3D drifting
    float t = uTime * 0.25 * aSpeed;
    pos.x += sin(t + aRandom * 6.28) * 1.2;
    pos.y += cos(t * 0.8 + aRandom * 4.14) * 1.0;
    pos.z += sin(t * 0.6 + aRandom * 8.31) * 0.8;

    // Interactive gentle mouse parallax
    pos.x += uMouse.x * (1.5 + aRandom * 1.0);
    pos.y += uMouse.y * (1.5 + aRandom * 1.0);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Smooth organic shimmer without blinding flash rays
    vTwinkle = sin(uTime * (1.4 + aSpeed * 1.8) + aRandom * 6.28) * 0.35 + 0.75;

    // Rich, clearly visible point size with distance attenuation
    float dist = max(-mvPosition.z, 0.1);
    gl_PointSize = (aScale * vTwinkle) * (180.0 / dist);
}
`;

const glitterFragmentShader = `
varying vec3 vColor;
varying float vTwinkle;

void main() {
    // Distance from center of point (0.0 to 0.5)
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;

    // Bright glowing center with soft circular falloff
    float core = exp(-d * 8.0);
    float glow = pow(max(0.0, 1.0 - d * 2.0), 1.6);
    float alpha = clamp(core * 0.9 + glow * 0.75, 0.0, 1.0) * vTwinkle;

    // Shimmering diamond-ice blue highlights in the center
    vec3 glitterColor = mix(vColor, vec3(0.85, 0.95, 1.0), core * 0.7);

    gl_FragColor = vec4(glitterColor, alpha * 0.95);
}
`;

const GlitterField: React.FC<{ count?: number }> = ({ count = 3000 }) => {
    const pointsRef = useRef<THREE.Points>(null!);
    const materialRef = useRef<THREE.ShaderMaterial>(null!);
    const { mouse } = useThree();
    const mouseSmooth = useRef({ x: 0, y: 0 });

    const [positions, scales, speeds, randoms, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const sc = new Float32Array(count);
        const sp = new Float32Array(count);
        const rnd = new Float32Array(count);
        const col = new Float32Array(count * 3);

        // Vibrant, luminous blue glitter palette
        const palette = [
            new THREE.Color('#00e5ff'), // Neon cyan
            new THREE.Color('#38bdf8'), // Electric sky blue
            new THREE.Color('#60a5fa'), // Radiant cornflower blue
            new THREE.Color('#2563eb'), // Royal sapphire blue
            new THREE.Color('#0284c7'), // Deep cobalt cyan
            new THREE.Color('#93c5fd'), // Shimmering diamond ice blue
            new THREE.Color('#818cf8'), // Soft cosmic indigo
            new THREE.Color('#a5f3fc'), // Ultra bright aquamarine
        ];

        for (let i = 0; i < count; i++) {
            // Wide volumetric frustum so glitters surround the screen
            pos[i * 3 + 0] = (Math.random() - 0.5) * 38;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 28;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 1;

            // Noticeable particle scales: mix of fine glitters and prominent luminous specks
            const isJewel = Math.random() < 0.2;
            sc[i] = isJewel ? Math.random() * 1.5 + 1.2 : Math.random() * 0.9 + 0.6;

            sp[i] = Math.random() * 1.2 + 0.5;
            rnd[i] = Math.random();

            const color = palette[Math.floor(Math.random() * palette.length)];
            col[i * 3 + 0] = color.r;
            col[i * 3 + 1] = color.g;
            col[i * 3 + 2] = color.b;
        }

        return [pos, sc, sp, rnd, col];
    }, [count]);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
        }),
        []
    );

    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value += delta;

            mouseSmooth.current.x += (mouse.x * 0.6 - mouseSmooth.current.x) * 0.04;
            mouseSmooth.current.y += (mouse.y * 0.6 - mouseSmooth.current.y) * 0.04;

            materialRef.current.uniforms.uMouse.value.set(
                mouseSmooth.current.x,
                mouseSmooth.current.y
            );
        }

        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.012;
            pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.008) * 0.02;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-aScale"
                    args={[scales, 1]}
                />
                <bufferAttribute
                    attach="attributes-aSpeed"
                    args={[speeds, 1]}
                />
                <bufferAttribute
                    attach="attributes-aRandom"
                    args={[randoms, 1]}
                />
                <bufferAttribute
                    attach="attributes-aColor"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                vertexShader={glitterVertexShader}
                fragmentShader={glitterFragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export const BlueGlitterBackground: React.FC<{ count?: number; opacity?: number }> = ({
    count = 3000,
    opacity = 1.0,
}) => {
    return (
        <div 
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
            style={{ opacity }}
            aria-hidden="true"
        >
            {/* Luminous Ambient Blue Nebula Glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(14,65,160,0.22),transparent_70%)]" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(2,132,199,0.14),transparent_70%)]" />

            {/* 3D WebGL Blue Glitter Shaders Canvas */}
            <Canvas
                camera={{ position: [0, 0, 15], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ width: '100%', height: '100%' }}
            >
                <Suspense fallback={null}>
                    <GlitterField count={count} />
                </Suspense>
            </Canvas>

            {/* Subtle Vignette to ensure text readability */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/60" />
        </div>
    );
};

export default BlueGlitterBackground;
