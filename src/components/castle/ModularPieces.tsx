import React, { useMemo } from 'react';
import * as THREE from 'three';

// ─── Materials — Blazing Orange-Red Demon Slayer Anime Palette ─────────────────
export const castleMaterials = {
    darkWood: new THREE.MeshStandardMaterial({
        color: '#160802',
        roughness: 0.85,
        metalness: 0.05,
    }),
    agedWood: new THREE.MeshStandardMaterial({
        color: '#281105',
        roughness: 0.75,
        metalness: 0.1,
    }),
    vermilionTrim: new THREE.MeshStandardMaterial({
        color: '#7A1806',
        roughness: 0.65,
        metalness: 0.15,
    }),
    roofTile: new THREE.MeshStandardMaterial({
        color: '#140804',
        roughness: 0.7,
        metalness: 0.08,
    }),
    // Glowing warm shoji screens — authentic Japanese paper lantern glow
    shojiScreen: new THREE.MeshStandardMaterial({
        color: '#FFA845',
        emissive: '#FF5E05',
        emissiveIntensity: 1.0,
        roughness: 0.5,
    }),
    stoneBase: new THREE.MeshStandardMaterial({
        color: '#1A0E08',
        roughness: 0.95,
        metalness: 0.05,
    }),
    // Warm incandescent lantern core (balanced to prevent overexposed blobs)
    lanternGlow: new THREE.MeshStandardMaterial({
        color: '#FFE2B8',
        emissive: '#FF9520',
        emissiveIntensity: 2.5,
        roughness: 0.3,
    }),
};

// ─── Modular Pagoda Roof Tier ─────────────────────────────────────────────────
interface PagodaRoofProps {
    scale?: number;
    position?: [number, number, number];
}

export const PagodaRoof: React.FC<PagodaRoofProps> = ({ scale = 1, position = [0, 0, 0] }) => {
    return (
        <group position={position} scale={scale}>
            {/* Lower flared eave plate */}
            <mesh position={[0, 0, 0]} material={castleMaterials.roofTile}>
                <boxGeometry args={[4.4, 0.24, 4.4]} />
            </mesh>

            {/* Main sloped roof pyramid */}
            <mesh
                position={[0, 0.45, 0]}
                rotation={[0, Math.PI / 4, 0]}
                material={castleMaterials.roofTile}
            >
                <cylinderGeometry args={[0.6, 3.5, 0.8, 4]} />
            </mesh>

            {/* Vermilion eave support rim */}
            <mesh position={[0, -0.15, 0]} material={castleMaterials.vermilionTrim}>
                <boxGeometry args={[3.9, 0.14, 3.9]} />
            </mesh>

            {/* Corner finials / eave sweeps */}
            <mesh position={[2.0, 0.18, 2.0]} material={castleMaterials.vermilionTrim}>
                <coneGeometry args={[0.2, 0.45, 4]} />
            </mesh>
            <mesh position={[-2.0, 0.18, 2.0]} material={castleMaterials.vermilionTrim}>
                <coneGeometry args={[0.2, 0.45, 4]} />
            </mesh>
            <mesh position={[2.0, 0.18, -2.0]} material={castleMaterials.vermilionTrim}>
                <coneGeometry args={[0.2, 0.45, 4]} />
            </mesh>
            <mesh position={[-2.0, 0.18, -2.0]} material={castleMaterials.vermilionTrim}>
                <coneGeometry args={[0.2, 0.45, 4]} />
            </mesh>
        </group>
    );
};

// ─── Small Floor Box Lantern (As seen lined up in Image 1) ─────────────────────
export const BoxLantern: React.FC<{ position: [number, number, number]; size?: number }> = ({
    position,
    size = 0.35,
}) => {
    return (
        <group position={position}>
            {/* Dark wood frame */}
            <mesh material={castleMaterials.darkWood}>
                <boxGeometry args={[size * 1.1, size * 1.3, size * 1.1]} />
            </mesh>
            {/* Glowing paper core */}
            <mesh material={castleMaterials.lanternGlow}>
                <boxGeometry args={[size * 0.9, size * 1.15, size * 0.9]} />
            </mesh>
        </group>
    );
};

// ─── Modular Hanging Paper Lantern ────────────────────────────────────────────
export const PaperLantern: React.FC<{ position?: [number, number, number]; withLight?: boolean }> = ({
    position = [0, 0, 0],
    withLight = false,
}) => {
    return (
        <group position={position}>
            {/* Hanging cord */}
            <mesh position={[0, 0.4, 0]} material={castleMaterials.darkWood}>
                <cylinderGeometry args={[0.02, 0.02, 0.8, 6]} />
            </mesh>
            {/* Top cap */}
            <mesh position={[0, 0.08, 0]} material={castleMaterials.darkWood}>
                <cylinderGeometry args={[0.32, 0.38, 0.08, 6]} />
            </mesh>
            {/* Glowing lantern body */}
            <mesh position={[0, -0.22, 0]} material={castleMaterials.lanternGlow}>
                <cylinderGeometry args={[0.34, 0.30, 0.58, 6]} />
            </mesh>
            {/* Bottom cap */}
            <mesh position={[0, -0.52, 0]} material={castleMaterials.darkWood}>
                <cylinderGeometry args={[0.26, 0.2, 0.06, 6]} />
            </mesh>
            {withLight && (
                <pointLight
                    color="#FFA030"
                    intensity={22}
                    distance={18}
                    decay={1.8}
                    position={[0, -0.22, 0]}
                />
            )}
        </group>
    );
};

// ─── Modular Japanese Castle Tower ────────────────────────────────────────────
interface TowerProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
    tiers?: 2 | 3;
    hasLantern?: boolean;
}

export const TowerStructure: React.FC<TowerProps> = ({
    position,
    rotation = [0, 0, 0],
    scale = 1,
    tiers = 3,
    hasLantern = false,
}) => {
    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* Stone Foundation */}
            <mesh position={[0, 1.2, 0]} material={castleMaterials.stoneBase}>
                <boxGeometry args={[4.6, 2.4, 4.6]} />
            </mesh>

            {/* Balustrade around foundation floor */}
            <mesh position={[0, 2.5, 2.2]} material={castleMaterials.vermilionTrim}>
                <boxGeometry args={[4.4, 0.4, 0.1]} />
            </mesh>
            <mesh position={[0, 2.5, -2.2]} material={castleMaterials.vermilionTrim}>
                <boxGeometry args={[4.4, 0.4, 0.1]} />
            </mesh>
            <mesh position={[2.2, 2.5, 0]} material={castleMaterials.vermilionTrim}>
                <boxGeometry args={[0.1, 0.4, 4.4]} />
            </mesh>
            <mesh position={[-2.2, 2.5, 0]} material={castleMaterials.vermilionTrim}>
                <boxGeometry args={[0.1, 0.4, 4.4]} />
            </mesh>

            {/* Balcony corner box lanterns (Image 1 style) */}
            <BoxLantern position={[2.0, 2.6, 2.0]} size={0.35} />
            <BoxLantern position={[-2.0, 2.6, 2.0]} size={0.35} />
            <BoxLantern position={[2.0, 2.6, -2.0]} size={0.35} />
            <BoxLantern position={[-2.0, 2.6, -2.0]} size={0.35} />

            {/* Floor 1 — Timber Body with Inner Shoji Screens */}
            <mesh position={[0, 3.8, 0]} material={castleMaterials.darkWood}>
                <boxGeometry args={[3.6, 2.8, 3.6]} />
            </mesh>
            {/* Glowing Shoji Panels on all 4 faces */}
            <mesh position={[0, 3.8, 1.82]} material={castleMaterials.shojiScreen}>
                <planeGeometry args={[2.8, 2.2]} />
            </mesh>
            <mesh position={[0, 3.8, -1.82]} rotation={[0, Math.PI, 0]} material={castleMaterials.shojiScreen}>
                <planeGeometry args={[2.8, 2.2]} />
            </mesh>
            <mesh position={[1.82, 3.8, 0]} rotation={[0, Math.PI / 2, 0]} material={castleMaterials.shojiScreen}>
                <planeGeometry args={[2.8, 2.2]} />
            </mesh>
            <mesh position={[-1.82, 3.8, 0]} rotation={[0, -Math.PI / 2, 0]} material={castleMaterials.shojiScreen}>
                <planeGeometry args={[2.8, 2.2]} />
            </mesh>

            {/* Roof Tier 1 */}
            <PagodaRoof position={[0, 5.3, 0]} scale={1.1} />

            {/* Floor 2 */}
            <mesh position={[0, 7.3, 0]} material={castleMaterials.darkWood}>
                <boxGeometry args={[3.0, 2.6, 3.0]} />
            </mesh>
            <mesh position={[0, 7.3, 1.52]} material={castleMaterials.shojiScreen}>
                <planeGeometry args={[2.2, 1.9]} />
            </mesh>
            <mesh position={[0, 7.3, -1.52]} rotation={[0, Math.PI, 0]} material={castleMaterials.shojiScreen}>
                <planeGeometry args={[2.2, 1.9]} />
            </mesh>
            <mesh position={[1.52, 7.3, 0]} rotation={[0, Math.PI / 2, 0]} material={castleMaterials.shojiScreen}>
                <planeGeometry args={[2.2, 1.9]} />
            </mesh>
            <mesh position={[-1.52, 7.3, 0]} rotation={[0, -Math.PI / 2, 0]} material={castleMaterials.shojiScreen}>
                <planeGeometry args={[2.2, 1.9]} />
            </mesh>

            {/* Floor 2 balcony lanterns */}
            <BoxLantern position={[1.5, 6.2, 1.5]} size={0.3} />
            <BoxLantern position={[-1.5, 6.2, 1.5]} size={0.3} />

            {/* Roof Tier 2 */}
            <PagodaRoof position={[0, 8.7, 0]} scale={0.92} />

            {/* Floor 3 (if 3-tier pagoda) */}
            {tiers === 3 && (
                <>
                    <mesh position={[0, 10.4, 0]} material={castleMaterials.darkWood}>
                        <boxGeometry args={[2.4, 2.4, 2.4]} />
                    </mesh>
                    <mesh position={[0, 10.4, 1.22]} material={castleMaterials.shojiScreen}>
                        <planeGeometry args={[1.7, 1.7]} />
                    </mesh>
                    <mesh position={[0, 10.4, -1.22]} rotation={[0, Math.PI, 0]} material={castleMaterials.shojiScreen}>
                        <planeGeometry args={[1.7, 1.7]} />
                    </mesh>

                    {/* Top Roof Tier */}
                    <PagodaRoof position={[0, 11.8, 0]} scale={0.76} />
                    {/* Top Spire / Finial */}
                    <mesh position={[0, 13.0, 0]} material={castleMaterials.vermilionTrim}>
                        <cylinderGeometry args={[0.08, 0.18, 1.8, 6]} />
                    </mesh>
                </>
            )}

            {/* Optional hanging lantern */}
            {hasLantern && (
                <PaperLantern
                    position={[2.5, 4.8, 2.5]}
                    withLight
                />
            )}
        </group>
    );
};

// ─── Modular Corridor / Bridge with Lantern Rows ───────────────────────────────
interface CorridorBridgeProps {
    start: [number, number, number];
    end: [number, number, number];
    width?: number;
    hasLanterns?: boolean;
}

export const CorridorBridge: React.FC<CorridorBridgeProps> = ({
    start,
    end,
    width = 2.6,
    hasLanterns = true,
}) => {
    const vStart = new THREE.Vector3(...start);
    const vEnd = new THREE.Vector3(...end);
    const distance = vStart.distanceTo(vEnd);
    const center = vStart.clone().add(vEnd).multiplyScalar(0.5);

    const direction = vEnd.clone().sub(vStart).normalize();
    const orientation = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        direction
    );
    const euler = new THREE.Euler().setFromQuaternion(orientation);

    // Compute lantern intervals along bridge edges
    const lanternPositions = useMemo(() => {
        if (!hasLanterns) return [];
        const count = Math.max(2, Math.floor(distance / 5));
        const list: { left: [number, number, number]; right: [number, number, number] }[] = [];
        for (let i = 0; i <= count; i++) {
            const z = -distance / 2 + (distance / count) * i;
            list.push({
                left: [-width / 2 + 0.25, 0.4, z],
                right: [width / 2 - 0.25, 0.4, z],
            });
        }
        return list;
    }, [distance, width, hasLanterns]);

    return (
        <group position={[center.x, center.y, center.z]} rotation={euler}>
            {/* Wooden Floor Planks */}
            <mesh material={castleMaterials.agedWood}>
                <boxGeometry args={[width, 0.32, distance]} />
            </mesh>

            {/* Left Railing */}
            <mesh position={[-width / 2 + 0.1, 0.65, 0]} material={castleMaterials.vermilionTrim}>
                <boxGeometry args={[0.16, 0.9, distance]} />
            </mesh>

            {/* Right Railing */}
            <mesh position={[width / 2 - 0.1, 0.65, 0]} material={castleMaterials.vermilionTrim}>
                <boxGeometry args={[0.16, 0.9, distance]} />
            </mesh>

            {/* Row of small floor lanterns along both edges (Image 1 style) */}
            {lanternPositions.map((pos, idx) => (
                <React.Fragment key={idx}>
                    <BoxLantern position={pos.left} size={0.28} />
                    <BoxLantern position={pos.right} size={0.28} />
                </React.Fragment>
            ))}
        </group>
    );
};
