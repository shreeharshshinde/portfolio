import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Camera-Anchored Micro-Dust Shader ────────────────────────────────────────
// The dust cloud moves with the camera in world space, guaranteeing uniform,
// continuous dust presence from 0% to 100% of the descent.
const CameraDustShader = {
    uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
        uDoumaWeight: { value: 0 },
    },
    vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uPixelRatio;

        attribute float aScale;
        attribute float aSpeed;
        attribute float aRandom;

        varying float vRandom;
        varying float vAlpha;

        void main() {
            vRandom = aRandom;

            // Local coordinates relative to camera group
            vec3 pos = position;

            // Slow, organic floating motion
            pos.y += sin(uTime * 0.5 * aSpeed + aRandom * 6.28) * 1.5;
            pos.x += cos(uTime * 0.3 * aSpeed + aRandom * 6.28) * 1.2;
            pos.z += sin(uTime * 0.25 * aSpeed + aRandom * 3.14) * 1.2;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;

            float dist = max(-mvPosition.z, 0.1);

            // Tiny micro-dust size: strictly 1.0px to 2.2px
            float pSize = (55.0 / dist) * aScale * uPixelRatio;
            gl_PointSize = clamp(pSize, 1.0, 2.2);

            // Soft distance fade: fade out when right against camera lens or beyond 60m
            float nearFade = smoothstep(1.5, 5.0, dist);
            float farFade = 1.0 - smoothstep(45.0, 70.0, dist);
            vAlpha = nearFade * farFade;
        }
    `,
    fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform float uDoumaWeight;
        varying float vRandom;
        varying float vAlpha;

        void main() {
            // Circular particle distance
            vec2 coord = gl_PointCoord - vec2(0.5);
            float r = length(coord);
            if (r > 0.5) discard;

            // Crisp dust mote core with soft edge falloff
            float falloff = smoothstep(0.5, 0.08, r);

            // Castle warm amber dust vs Douma crystalline ice sparkle
            vec3 castleDust = vec3(1.0, 0.65, 0.18); // #FFA62E warm radiant amber
            vec3 doumaIce = vec3(0.55, 0.88, 1.0);   // #8CE0FF icy cyan crystalline motes
            vec3 dustColor = mix(castleDust, doumaIce, uDoumaWeight);

            // Organic light sparkle / shimmer
            float sparkle = 0.65 + 0.35 * sin(uTime * 2.2 + vRandom * 50.0);

            float alpha = falloff * vAlpha * sparkle * 0.92;
            gl_FragColor = vec4(dustColor, alpha);
        }
    `,
};

interface CastleParticlesProps {
    count?: number;
    progress?: number;
}

export const CastleParticles: React.FC<CastleParticlesProps> = ({ count = 900, progress = 0 }) => {
    const groupRef = useRef<THREE.Group>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { gl, camera } = useThree();

    // Box dimensions centered around camera: 80m wide, 60m high, 80m deep
    const boxBounds = useMemo(() => ({ x: 80, y: 60, z: 80 }), []);

    // Initial random positions inside camera-relative box
    const { positions, scales, speeds, randoms } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        const speeds = new Float32Array(count);
        const randoms = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * boxBounds.x;
            positions[i * 3 + 1] = (Math.random() - 0.5) * boxBounds.y;
            positions[i * 3 + 2] = (Math.random() - 0.5) * boxBounds.z;

            scales[i] = 0.5 + Math.random() * 0.4;
            speeds[i] = 0.4 + Math.random() * 0.6;
            randoms[i] = Math.random();
        }

        return { positions, scales, speeds, randoms };
    }, [count, boxBounds]);

    const customMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.clone(CameraDustShader.uniforms),
            vertexShader: CameraDustShader.vertexShader,
            fragmentShader: CameraDustShader.fragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
    }, []);

    useFrame((state, delta) => {
        // 1. Physically anchor dust cloud group to the camera position
        // This guarantees particles exist everywhere the camera travels!
        if (groupRef.current) {
            groupRef.current.position.copy(camera.position);
        }

        // 2. Update shader uniforms
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            materialRef.current.uniforms.uPixelRatio.value = gl.getPixelRatio();
            const enterFactor = THREE.MathUtils.smoothstep(progress, 0.54, 0.575);
            const exitFactor = 1.0 - THREE.MathUtils.smoothstep(progress, 0.698, 0.73);
            materialRef.current.uniforms.uDoumaWeight.value = enterFactor * exitFactor;
        }

        // 3. Very slow drift & local boundary wrap inside the camera-relative volume
        if (groupRef.current) {
            const points = groupRef.current.children[0] as THREE.Points;
            if (points && points.geometry) {
                const posAttr = points.geometry.attributes.position as THREE.BufferAttribute;
                const arr = posAttr.array as Float32Array;
                const halfX = boxBounds.x / 2;
                const halfY = boxBounds.y / 2;
                const halfZ = boxBounds.z / 2;

                for (let i = 0; i < count; i++) {
                    // Gentle vertical drift
                    arr[i * 3 + 1] += speeds[i] * delta * 1.4;

                    // Wrap within camera local volume
                    if (arr[i * 3 + 1] > halfY) arr[i * 3 + 1] = -halfY;
                    if (arr[i * 3 + 1] < -halfY) arr[i * 3 + 1] = halfY;
                    if (arr[i * 3 + 0] > halfX) arr[i * 3 + 0] = -halfX;
                    if (arr[i * 3 + 0] < -halfX) arr[i * 3 + 0] = halfX;
                    if (arr[i * 3 + 2] > halfZ) arr[i * 3 + 2] = -halfZ;
                    if (arr[i * 3 + 2] < -halfZ) arr[i * 3 + 2] = halfZ;
                }
                posAttr.needsUpdate = true;
            }
        }
    });

    return (
        <group ref={groupRef} name="camera-anchored-dust">
            <points>
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
                </bufferGeometry>
                <primitive object={customMaterial} ref={materialRef} attach="material" />
            </points>
        </group>
    );
};
