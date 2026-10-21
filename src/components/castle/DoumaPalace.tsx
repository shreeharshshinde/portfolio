import React, { useMemo } from 'react';
import * as THREE from 'three';
import { castleMaterials, BoxLantern } from './ModularPieces';

// ─── Authentic Anime Materials for Douma's Lotus Temple ───────────────────────
const doumaMaterials = {
    // Deep dark inky obsidian water (high reflectivity, dark navy/black)
    darkWater: new THREE.MeshStandardMaterial({
        color: '#03080e',
        roughness: 0.05,
        metalness: 0.95,
    }),
    // Rich glowing shoji screen windows (radiant warm incandescent gold)
    shojiGlow: new THREE.MeshStandardMaterial({
        color: '#ffb347',
        emissive: '#ff6200',
        emissiveIntensity: 2.2,
        roughness: 0.35,
    }),
    // Super-bright window panel core
    shojiBright: new THREE.MeshStandardMaterial({
        color: '#ffe5a3',
        emissive: '#ff7700',
        emissiveIntensity: 2.8,
        roughness: 0.25,
    }),
    // Glowing golden grand staircase step risers
    stepGlow: new THREE.MeshStandardMaterial({
        color: '#ffd077',
        emissive: '#ff6600',
        emissiveIntensity: 3.0,
        roughness: 0.25,
    }),
    // Glowing pink/magenta lotus flower petals
    lotusPetalPink: new THREE.MeshStandardMaterial({
        color: '#ff69b4',
        emissive: '#ff1493',
        emissiveIntensity: 1.1,
        roughness: 0.45,
        side: THREE.DoubleSide,
    }),
    // Pale white tips for lotus petals
    lotusPetalWhite: new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: '#ff80bf',
        emissiveIntensity: 0.6,
        roughness: 0.4,
        side: THREE.DoubleSide,
    }),
    // Golden radiant center stamen
    lotusStamen: new THREE.MeshStandardMaterial({
        color: '#ffea00',
        emissive: '#ff9900',
        emissiveIntensity: 3.2,
        roughness: 0.2,
    }),
    // Lush emerald green lily pads (visible green in dark ambient)
    lilyPadGreen: new THREE.MeshStandardMaterial({
        color: '#1e5a36',
        emissive: '#0b2616',
        emissiveIntensity: 0.4,
        roughness: 0.55,
        metalness: 0.05,
    }),
    lilyPadLight: new THREE.MeshStandardMaterial({
        color: '#2d7a4b',
        emissive: '#0e331e',
        emissiveIntensity: 0.45,
        roughness: 0.5,
        metalness: 0.05,
    }),
    // Cool cyan/silver roof highlight rim (Douma's signature Ice aesthetic)
    cyanRoofTrim: new THREE.MeshStandardMaterial({
        color: '#1a3242',
        emissive: '#0c2738',
        emissiveIntensity: 0.65,
        roughness: 0.45,
    }),
    // Vermilion/crimson temple trim & railings
    shrineVermilion: new THREE.MeshStandardMaterial({
        color: '#8b1402',
        roughness: 0.6,
        metalness: 0.15,
    }),
    // Sacred shimenawa straw rope
    shimenawaRope: new THREE.MeshStandardMaterial({
        color: '#cfb178',
        roughness: 0.85,
        metalness: 0.05,
    }),
    // Stone embankment border for the pond
    embankmentStone: new THREE.MeshStandardMaterial({
        color: '#120b08',
        roughness: 0.9,
        metalness: 0.05,
    }),
};

// ─── Multi-Pane Shoji Window Wall ─────────────────────────────────────────────
// Generates authentic Japanese glowing grid windows with dark wooden mullions
interface ShojiWindowWallProps {
    width: number;
    height: number;
    rows?: number;
    cols?: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
}

const ShojiWindowWall: React.FC<ShojiWindowWallProps> = ({
    width,
    height,
    rows = 3,
    cols = 4,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
}) => {
    return (
        <group position={position} rotation={rotation}>
            {/* Glowing inner paper screen */}
            <mesh position={[0, 0, 0]} material={doumaMaterials.shojiGlow}>
                <planeGeometry args={[width, height]} />
            </mesh>

            {/* Perimeter dark timber frame */}
            <mesh position={[0, height / 2, 0.02]} material={castleMaterials.darkWood}>
                <boxGeometry args={[width + 0.1, 0.14, 0.06]} />
            </mesh>
            <mesh position={[0, -height / 2, 0.02]} material={castleMaterials.darkWood}>
                <boxGeometry args={[width + 0.1, 0.14, 0.06]} />
            </mesh>
            <mesh position={[-width / 2, 0, 0.02]} material={castleMaterials.darkWood}>
                <boxGeometry args={[0.14, height, 0.06]} />
            </mesh>
            <mesh position={[width / 2, 0, 0.02]} material={castleMaterials.darkWood}>
                <boxGeometry args={[0.14, height, 0.06]} />
            </mesh>

            {/* Horizontal mullion bars */}
            {Array.from({ length: rows - 1 }).map((_, r) => {
                const y = -height / 2 + (height / rows) * (r + 1);
                return (
                    <mesh key={`h-${r}`} position={[0, y, 0.015]} material={castleMaterials.darkWood}>
                        <boxGeometry args={[width, 0.08, 0.04]} />
                    </mesh>
                );
            })}

            {/* Vertical mullion bars */}
            {Array.from({ length: cols - 1 }).map((_, c) => {
                const x = -width / 2 + (width / cols) * (c + 1);
                return (
                    <mesh key={`v-${c}`} position={[x, 0, 0.015]} material={castleMaterials.darkWood}>
                        <boxGeometry args={[0.08, height, 0.04]} />
                    </mesh>
                );
            })}
        </group>
    );
};

// ─── Japanese Curved Pagoda Eave Roof ─────────────────────────────────────────
interface CurvedRoofTierProps {
    width: number;
    depth: number;
    height?: number;
    eaveFlare?: number;
    position?: [number, number, number];
}

const CurvedRoofTier: React.FC<CurvedRoofTierProps> = ({
    width,
    depth,
    height = 1.4,
    eaveFlare = 1.2,
    position = [0, 0, 0],
}) => {
    return (
        <group position={position}>
            {/* Underside vermilion support plate */}
            <mesh position={[0, 0, 0]} material={castleMaterials.vermilionTrim}>
                <boxGeometry args={[width, 0.22, depth]} />
            </mesh>

            {/* Sloped Roof Pyramid */}
            <mesh
                position={[0, height / 2 + 0.1, 0]}
                rotation={[0, Math.PI / 4, 0]}
                material={castleMaterials.roofTile}
            >
                <cylinderGeometry
                    args={[width * 0.22, (Math.max(width, depth) * eaveFlare) / Math.SQRT2, height, 4]}
                />
            </mesh>

            {/* Cool cyan/silver roof highlight rim along lower eave */}
            <mesh position={[0, 0.08, 0]} material={doumaMaterials.cyanRoofTrim}>
                <boxGeometry args={[width * eaveFlare, 0.14, depth * eaveFlare]} />
            </mesh>

            {/* 4 Swept Corner Eave Horns */}
            {[
                [(width * eaveFlare) / 2, (depth * eaveFlare) / 2],
                [(-width * eaveFlare) / 2, (depth * eaveFlare) / 2],
                [(width * eaveFlare) / 2, (-depth * eaveFlare) / 2],
                [(-width * eaveFlare) / 2, (-depth * eaveFlare) / 2],
            ].map(([x, z], idx) => (
                <mesh key={`horn-${idx}`} position={[x, 0.22, z]} material={doumaMaterials.cyanRoofTrim}>
                    <coneGeometry args={[0.22, 0.6, 4]} />
                </mesh>
            ))}
        </group>
    );
};

// ─── 3D Glowing Lotus Flower ──────────────────────────────────────────────────
interface LotusFlowerProps {
    position: [number, number, number];
    scale?: number;
    rotationY?: number;
}

export const LotusFlower: React.FC<LotusFlowerProps> = ({
    position,
    scale = 1,
    rotationY = 0,
}) => {
    return (
        <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
            {/* Glowing Golden Core */}
            <mesh position={[0, 0.14, 0]} material={doumaMaterials.lotusStamen}>
                <sphereGeometry args={[0.15, 12, 10]} />
            </mesh>
            <mesh position={[0, 0.22, 0]} material={doumaMaterials.lotusStamen}>
                <cylinderGeometry args={[0.07, 0.12, 0.18, 8]} />
            </mesh>

            {/* Inner Ring of Upright Cupped Pink Petals */}
            {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i / 6) * Math.PI * 2;
                return (
                    <mesh
                        key={`inner-${i}`}
                        position={[Math.cos(angle) * 0.16, 0.22, Math.sin(angle) * 0.16]}
                        rotation={[0.35, -angle + Math.PI / 2, 0.35]}
                        material={doumaMaterials.lotusPetalPink}
                    >
                        <coneGeometry args={[0.15, 0.52, 5]} />
                    </mesh>
                );
            })}

            {/* Outer Ring of Flared Petals with White Tips */}
            {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2 + 0.25;
                return (
                    <mesh
                        key={`outer-${i}`}
                        position={[Math.cos(angle) * 0.3, 0.12, Math.sin(angle) * 0.3]}
                        rotation={[0.75, -angle + Math.PI / 2, 0.2]}
                        material={doumaMaterials.lotusPetalWhite}
                    >
                        <coneGeometry args={[0.2, 0.65, 5]} />
                    </mesh>
                );
            })}

            {/* Floating leaf base */}
            <mesh position={[0, 0.02, 0]} material={doumaMaterials.lilyPadGreen}>
                <cylinderGeometry args={[0.38, 0.42, 0.03, 10]} />
            </mesh>
        </group>
    );
};

// ─── Circular Lily Pad / Lotus Leaf ───────────────────────────────────────────
interface LilyPadProps {
    position: [number, number, number];
    radius?: number;
    rotationY?: number;
    lightTint?: boolean;
}

export const LilyPad: React.FC<LilyPadProps> = ({
    position,
    radius = 1.0,
    rotationY = 0,
    lightTint = false,
}) => {
    return (
        <group position={position} rotation={[0, rotationY, 0]}>
            <mesh material={lightTint ? doumaMaterials.lilyPadLight : doumaMaterials.lilyPadGreen}>
                <cylinderGeometry args={[radius, radius * 1.02, 0.03, 16]} />
            </mesh>
            {/* Vein / radial notch accent */}
            <mesh position={[0, 0.02, 0]} material={doumaMaterials.lilyPadGreen}>
                <cylinderGeometry args={[radius * 0.25, radius * 0.28, 0.02, 8]} />
            </mesh>
        </group>
    );
};

// ─── Standing Post Lantern (Toro) ─────────────────────────────────────────────
// Slender Japanese wooden post with warm glowing paper lantern and flared cap
interface StandingPostLanternProps {
    position: [number, number, number];
    height?: number;
    withLight?: boolean;
}

export const StandingPostLantern: React.FC<StandingPostLanternProps> = ({
    position,
    height = 2.6,
    withLight = false,
}) => {
    return (
        <group position={position}>
            {/* Wooden post sinking into water */}
            <mesh position={[0, height / 2 - 0.4, 0]} material={castleMaterials.darkWood}>
                <cylinderGeometry args={[0.06, 0.07, height + 1.2, 6]} />
            </mesh>

            {/* Base mounting collar */}
            <mesh position={[0, height - 0.2, 0]} material={castleMaterials.agedWood}>
                <boxGeometry args={[0.3, 0.08, 0.3]} />
            </mesh>

            {/* Glowing Lantern Core */}
            <mesh position={[0, height + 0.16, 0]} material={doumaMaterials.shojiGlow}>
                <boxGeometry args={[0.38, 0.54, 0.38]} />
            </mesh>

            {/* Dark wood frame struts */}
            <mesh position={[0.19, height + 0.16, 0.19]} material={castleMaterials.darkWood}>
                <boxGeometry args={[0.04, 0.56, 0.04]} />
            </mesh>
            <mesh position={[-0.19, height + 0.16, 0.19]} material={castleMaterials.darkWood}>
                <boxGeometry args={[0.04, 0.56, 0.04]} />
            </mesh>
            <mesh position={[0.19, height + 0.16, -0.19]} material={castleMaterials.darkWood}>
                <boxGeometry args={[0.04, 0.56, 0.04]} />
            </mesh>
            <mesh position={[-0.19, height + 0.16, -0.19]} material={castleMaterials.darkWood}>
                <boxGeometry args={[0.04, 0.56, 0.04]} />
            </mesh>

            {/* Flared Pyramidal Roof Cap */}
            <mesh
                position={[0, height + 0.52, 0]}
                rotation={[0, Math.PI / 4, 0]}
                material={castleMaterials.roofTile}
            >
                <cylinderGeometry args={[0.08, 0.6, 0.22, 4]} />
            </mesh>
            {/* Finial knob */}
            <mesh position={[0, height + 0.68, 0]} material={castleMaterials.darkWood}>
                <sphereGeometry args={[0.06, 8, 8]} />
            </mesh>

            {/* Warm light casting reflections onto water and boardwalk */}
            {withLight && (
                <pointLight
                    color="#FF9020"
                    intensity={15}
                    distance={12}
                    decay={2.0}
                    position={[0, height + 0.16, 0]}
                />
            )}
        </group>
    );
};

// ─── Boardwalk Pier on Stilts ─────────────────────────────────────────────────
interface BoardwalkProps {
    start: [number, number, number];
    end: [number, number, number];
    width?: number;
    stiltInterval?: number;
    withPostLanterns?: boolean;
}

export const Boardwalk: React.FC<BoardwalkProps> = ({
    start,
    end,
    width = 3.4,
    stiltInterval = 4.0,
    withPostLanterns = true,
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
    const stiltCount = Math.max(2, Math.floor(distance / stiltInterval));

    return (
        <group position={[center.x, center.y, center.z]} rotation={euler}>
            {/* Main Wooden Plank Surface */}
            <mesh material={castleMaterials.agedWood}>
                <boxGeometry args={[width, 0.26, distance]} />
            </mesh>

            {/* Side Guard Curbs */}
            <mesh position={[-width / 2 + 0.08, 0.16, 0]} material={castleMaterials.darkWood}>
                <boxGeometry args={[0.12, 0.16, distance]} />
            </mesh>
            <mesh position={[width / 2 - 0.08, 0.16, 0]} material={castleMaterials.darkWood}>
                <boxGeometry args={[0.12, 0.16, distance]} />
            </mesh>

            {/* Vertical Timber Stilts dipping into the dark water */}
            {Array.from({ length: stiltCount + 1 }).map((_, i) => {
                const z = -distance / 2 + (distance / stiltCount) * i;
                return (
                    <React.Fragment key={`stilts-${i}`}>
                        <mesh position={[-width / 2 + 0.35, -2.4, z]} material={castleMaterials.darkWood}>
                            <cylinderGeometry args={[0.1, 0.12, 4.8, 6]} />
                        </mesh>
                        <mesh position={[width / 2 - 0.35, -2.4, z]} material={castleMaterials.darkWood}>
                            <cylinderGeometry args={[0.1, 0.12, 4.8, 6]} />
                        </mesh>
                        <mesh position={[0, -1.6, z]} material={castleMaterials.darkWood}>
                            <boxGeometry args={[width - 0.4, 0.16, 0.16]} />
                        </mesh>
                    </React.Fragment>
                );
            })}

            {/* Standing Post Lanterns along edges */}
            {withPostLanterns &&
                Array.from({ length: Math.max(1, Math.floor(distance / 6.0)) }).map((_, i) => {
                    const z = -distance / 2 + 2.5 + i * 6.0;
                    return (
                        <React.Fragment key={`pl-${i}`}>
                            <StandingPostLantern
                                position={[-width / 2 - 0.4, 0, z]}
                                height={2.4}
                                withLight={i % 2 === 0}
                            />
                            <StandingPostLantern
                                position={[width / 2 + 0.4, 0, z + 3.0]}
                                height={2.4}
                                withLight={i % 2 === 1}
                            />
                        </React.Fragment>
                    );
                })}
        </group>
    );
};

// ─── Pagoda Wing Component ────────────────────────────────────────────────────
// Symmetrical multi-tiered pagoda tower with arrays of glowing shoji window screens,
// vermilion balcony balustrades, rows of warm lanterns, and curved Japanese eaves
interface PagodaWingProps {
    position: [number, number, number];
    isLeftWing?: boolean;
}

const PagodaWing: React.FC<PagodaWingProps> = ({ position, isLeftWing = true }) => {
    return (
        <group position={position}>
            {/* ── Tier 1: Ground Floor Hall ─────────────────────────────────── */}
            <mesh position={[0, 2.5, 0]} material={castleMaterials.darkWood}>
                <boxGeometry args={[12.0, 5.0, 10.0]} />
            </mesh>

            {/* Front Glowing Shoji Window Array */}
            <ShojiWindowWall
                width={10.8}
                height={3.8}
                rows={3}
                cols={6}
                position={[0, 2.6, 5.04]}
            />
            {/* Outer Flank Shoji Window Array */}
            <ShojiWindowWall
                width={8.8}
                height={3.8}
                rows={3}
                cols={5}
                position={[isLeftWing ? -6.04 : 6.04, 2.6, 0]}
                rotation={[0, isLeftWing ? -Math.PI / 2 : Math.PI / 2, 0]}
            />

            {/* Tier 1 Balustrade Railing */}
            <mesh position={[0, 1.0, 5.8]} material={doumaMaterials.shrineVermilion}>
                <boxGeometry args={[13.2, 0.8, 0.14]} />
            </mesh>
            <mesh
                position={[isLeftWing ? -6.6 : 6.6, 1.0, 0]}
                rotation={[0, Math.PI / 2, 0]}
                material={doumaMaterials.shrineVermilion}
            >
                <boxGeometry args={[11.6, 0.8, 0.14]} />
            </mesh>

            {/* Row of glowing balcony lanterns */}
            {[-4.8, -2.4, 0, 2.4, 4.8].map((x, idx) => (
                <BoxLantern key={`t1-l-${idx}`} position={[x, 1.5, 5.6]} size={0.38} />
            ))}

            {/* Tier 1 Curved Pagoda Roof Eave */}
            <CurvedRoofTier width={14.8} depth={12.8} height={1.6} eaveFlare={1.2} position={[0, 5.2, 0]} />

            {/* ── Tier 2: Mid-Level Balcony & Chamber ───────────────────────── */}
            <mesh position={[0, 8.5, 0]} material={castleMaterials.darkWood}>
                <boxGeometry args={[9.0, 4.6, 7.8]} />
            </mesh>

            {/* Tier 2 Front Shoji Windows */}
            <ShojiWindowWall
                width={7.8}
                height={3.4}
                rows={2}
                cols={4}
                position={[0, 8.5, 3.94]}
            />
            <ShojiWindowWall
                width={6.8}
                height={3.4}
                rows={2}
                cols={4}
                position={[isLeftWing ? -4.54 : 4.54, 8.5, 0]}
                rotation={[0, isLeftWing ? -Math.PI / 2 : Math.PI / 2, 0]}
            />

            {/* Tier 2 Balustrade */}
            <mesh position={[0, 7.0, 4.6]} material={doumaMaterials.shrineVermilion}>
                <boxGeometry args={[10.2, 0.7, 0.12]} />
            </mesh>
            {[-3.2, 0, 3.2].map((x, idx) => (
                <BoxLantern key={`t2-l-${idx}`} position={[x, 7.5, 4.45]} size={0.34} />
            ))}

            {/* Tier 2 Curved Pagoda Roof Eave */}
            <CurvedRoofTier width={11.6} depth={10.4} height={1.4} eaveFlare={1.2} position={[0, 11.0, 0]} />

            {/* ── Tier 3: Upper Chamber & Crowning Pagoda Roof ───────────────── */}
            <mesh position={[0, 14.0, 0]} material={castleMaterials.darkWood}>
                <boxGeometry args={[6.5, 4.2, 5.8]} />
            </mesh>

            {/* Tier 3 Shoji Windows */}
            <ShojiWindowWall
                width={5.4}
                height={3.0}
                rows={2}
                cols={3}
                position={[0, 14.0, 2.94]}
            />

            {/* Top Crowning Pagoda Roof */}
            <CurvedRoofTier width={8.8} depth={8.0} height={1.8} eaveFlare={1.25} position={[0, 16.3, 0]} />

            {/* Crowning Golden Pagoda Spire (Sorin) */}
            <mesh position={[0, 18.8, 0]} material={doumaMaterials.shrineVermilion}>
                <cylinderGeometry args={[0.08, 0.2, 2.6, 6]} />
            </mesh>
            <mesh position={[0, 20.0, 0]} material={doumaMaterials.lotusStamen}>
                <sphereGeometry args={[0.26, 8, 8]} />
            </mesh>
        </group>
    );
};

// ─── Center Shrine Entrance & Grand Illuminated Staircase ─────────────────────
// Wide flight of steps glowing with incandescent amber light, leading up to Douma's shrine
const CenterShrineCompound: React.FC<{ position: [number, number, number] }> = ({ position }) => {
    const stepCount = 18;
    const stairWidth = 9.2;
    const stairRise = 0.35;
    const stairRun = 0.62;

    return (
        <group position={position}>
            {/* ── Grand Central Staircase ───────────────────────────────────── */}
            {Array.from({ length: stepCount }).map((_, i) => {
                const y = i * stairRise + 0.18;
                const z = 6.0 - i * stairRun;
                return (
                    <group key={`step-${i}`} position={[0, y, z]}>
                        {/* Dark wood tread */}
                        <mesh material={castleMaterials.agedWood}>
                            <boxGeometry args={[stairWidth, stairRise, stairRun + 0.08]} />
                        </mesh>
                        {/* Glowing amber step riser light (Signature feature from anime image!) */}
                        <mesh position={[0, 0, stairRun / 2 + 0.02]} material={doumaMaterials.stepGlow}>
                            <planeGeometry args={[stairWidth - 0.3, stairRise * 0.75]} />
                        </mesh>
                        {/* Flanking stepped lanterns every 3 steps */}
                        {i % 3 === 0 && (
                            <>
                                <BoxLantern position={[-stairWidth / 2 - 0.35, stairRise * 0.8, 0]} size={0.34} />
                                <BoxLantern position={[stairWidth / 2 + 0.35, stairRise * 0.8, 0]} size={0.34} />
                            </>
                        )}
                    </group>
                );
            })}

            {/* Staircase Balustrades */}
            <mesh
                position={[-stairWidth / 2 - 0.4, 3.2, 1.2]}
                rotation={[-Math.atan2(stairRise, stairRun), 0, 0]}
                material={doumaMaterials.shrineVermilion}
            >
                <boxGeometry args={[0.26, 0.8, 12.8]} />
            </mesh>
            <mesh
                position={[stairWidth / 2 + 0.4, 3.2, 1.2]}
                rotation={[-Math.atan2(stairRise, stairRun), 0, 0]}
                material={doumaMaterials.shrineVermilion}
            >
                <boxGeometry args={[0.26, 0.8, 12.8]} />
            </mesh>

            {/* ── Entrance Landing Platform ─────────────────────────────────── */}
            <mesh position={[0, 6.2, -4.5]} material={castleMaterials.agedWood}>
                <boxGeometry args={[11.5, 0.5, 6.0]} />
            </mesh>

            {/* Torii-Style Entrance Columns */}
            <mesh position={[-4.2, 9.4, -2.8]} material={doumaMaterials.shrineVermilion}>
                <cylinderGeometry args={[0.4, 0.46, 6.4, 12]} />
            </mesh>
            <mesh position={[4.2, 9.4, -2.8]} material={doumaMaterials.shrineVermilion}>
                <cylinderGeometry args={[0.4, 0.46, 6.4, 12]} />
            </mesh>
            {/* Crossbeam Lintel */}
            <mesh position={[0, 12.5, -2.8]} material={doumaMaterials.shrineVermilion}>
                <boxGeometry args={[11.2, 0.65, 0.65]} />
            </mesh>

            {/* Sacred Shimenawa Straw Rope */}
            <mesh position={[0, 11.7, -2.6]} rotation={[0, 0, Math.PI / 2]} material={doumaMaterials.shimenawaRope}>
                <cylinderGeometry args={[0.16, 0.1, 8.8, 8]} />
            </mesh>
            {/* Hanging paper shide tassels */}
            {[-3.0, -1.5, 0, 1.5, 3.0].map((x, idx) => (
                <mesh key={`tassel-${idx}`} position={[x, 11.2, -2.55]} material={doumaMaterials.lotusPetalWhite}>
                    <coneGeometry args={[0.14, 0.7, 4]} />
                </mesh>
            ))}

            {/* Glowing Sanctuary Inner Dais (Douma's Throne Hall) */}
            <ShojiWindowWall
                width={8.6}
                height={5.4}
                rows={3}
                cols={4}
                position={[0, 9.2, -5.2]}
            />
            {/* Intense Golden Inner Light radiating from Douma's shrine */}
            <pointLight
                color="#FFA025"
                intensity={50}
                distance={28}
                decay={1.8}
                position={[0, 9.4, -3.2]}
            />

            {/* Entrance Curved Eave Roof */}
            <CurvedRoofTier width={12.4} depth={6.8} height={1.5} eaveFlare={1.2} position={[0, 13.6, -3.0]} />

            {/* ── High Rear Sanctum Tower (Creates the 3-Peak Skyline!) ─────── */}
            <mesh position={[0, 17.5, -7.5]} material={castleMaterials.darkWood}>
                <boxGeometry args={[11.0, 12.0, 8.5]} />
            </mesh>

            {/* Rear Tower Shoji Windows (Floor 2 & 3) */}
            <ShojiWindowWall
                width={9.4}
                height={4.2}
                rows={2}
                cols={4}
                position={[0, 18.0, -3.22]}
            />

            {/* High Crowning Central Roof */}
            <CurvedRoofTier width={14.0} depth={11.0} height={2.2} eaveFlare={1.25} position={[0, 24.0, -7.5]} />

            {/* Crowning Spire */}
            <mesh position={[0, 26.8, -7.5]} material={doumaMaterials.shrineVermilion}>
                <cylinderGeometry args={[0.12, 0.26, 3.2, 6]} />
            </mesh>
            <mesh position={[0, 28.2, -7.5]} material={doumaMaterials.lotusStamen}>
                <sphereGeometry args={[0.34, 8, 8]} />
            </mesh>
        </group>
    );
};

// ─── Douma Lotus Palace Compound ──────────────────────────────────────────────
export const DoumaPalace: React.FC<{ position?: [number, number, number]; rotation?: [number, number, number] }> = ({
    position = [0, -60, 1536],
    rotation = [0, 0, 0],
}) => {
    // ── Precomputed Lotus Blossoms & Lily Pads ────────────────────────────────
    const { lotusList, lilyPadList } = useMemo(() => {
        const lotuses: { pos: [number, number, number]; scale: number; rotY: number }[] = [];
        const pads: { pos: [number, number, number]; radius: number; rotY: number; light: boolean }[] = [];

        let seed = 77;
        const rand = () => {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        };

        // 1. Prominent Foreground Clusters (Framing view near temple staircase)
        for (let i = 0; i < 20; i++) {
            const x = -14 + (rand() - 0.5) * 26;
            const z = -28 + (rand() - 0.5) * 22;
            lotuses.push({
                pos: [x, 0.05, z],
                scale: 0.9 + rand() * 0.8,
                rotY: rand() * Math.PI * 2,
            });
        }

        // 2. Midground Pond Clusters along boardwalk approach
        for (let i = 0; i < 40; i++) {
            const x = (rand() - 0.5) * 56;
            const z = -65 + (rand() - 0.5) * 55;
            lotuses.push({
                pos: [x, 0.05, z],
                scale: 0.65 + rand() * 0.6,
                rotY: rand() * Math.PI * 2,
            });
        }

        // 3. Dense Lily Pad Carpet spanning the approach
        for (let i = 0; i < 110; i++) {
            const x = (rand() - 0.5) * 68;
            const z = -50 + (rand() - 0.5) * 90;
            pads.push({
                pos: [x, 0.02, z],
                radius: 0.75 + rand() * 0.85,
                rotY: rand() * Math.PI * 2,
                light: rand() > 0.5,
            });
        }

        return { lotusList: lotuses, lilyPadList: pads };
    }, []);

    return (
        <group position={position} rotation={rotation} name="douma-lotus-palace">
            {/* ── 1. The Reflective Dark Obsidian Lotus Pond ─────────────────── */}
            {/* Deep dark water plane reflecting the golden palace windows and lanterns */}
            <mesh position={[0, 0, -42]} rotation={[-Math.PI / 2, 0, 0]} material={doumaMaterials.darkWater}>
                <planeGeometry args={[86, 126]} />
            </mesh>

            {/* Dark Stone Perimeter Border Embankment */}
            <mesh position={[0, 0.4, 21]} material={doumaMaterials.embankmentStone}>
                <boxGeometry args={[86, 0.8, 1.4]} />
            </mesh>
            <mesh position={[0, 0.4, -105]} material={doumaMaterials.embankmentStone}>
                <boxGeometry args={[86, 0.8, 1.4]} />
            </mesh>
            <mesh position={[-43, 0.4, -42]} material={doumaMaterials.embankmentStone}>
                <boxGeometry args={[1.4, 0.8, 126]} />
            </mesh>
            <mesh position={[43, 0.4, -42]} material={doumaMaterials.embankmentStone}>
                <boxGeometry args={[1.4, 0.8, 126]} />
            </mesh>

            {/* Subtle cool cyan accent light near the water (soft shimmer, no blowout) */}
            <pointLight
                color="#00D0E0"
                intensity={12}
                distance={55}
                decay={2.0}
                position={[0, 4, -45]}
            />

            {/* ── 2. Floating Lily Pads & Blooming Lotus Flowers ─────────────── */}
            {lilyPadList.map((pad, idx) => (
                <LilyPad
                    key={`pad-${idx}`}
                    position={pad.pos}
                    radius={pad.radius}
                    rotationY={pad.rotY}
                    lightTint={pad.light}
                />
            ))}

            {lotusList.map((lotus, idx) => (
                <LotusFlower
                    key={`lotus-${idx}`}
                    position={lotus.pos}
                    scale={lotus.scale}
                    rotationY={lotus.rotY}
                />
            ))}

            {/* ── 3. Boardwalk Pier Network on Stilts (Matching Photo!) ──────── */}
            {/* Main Central Approach Pier (Leading from Entry Portal to Grand Staircase) */}
            <Boardwalk
                start={[0, 0.6, -96]}
                end={[0, 0.6, -1]}
                width={3.8}
                stiltInterval={4.0}
                withPostLanterns
            />

            {/* Left Transverse Crossing Boardwalk */}
            <Boardwalk
                start={[-24, 0.6, -24]}
                end={[0, 0.6, -24]}
                width={3.0}
                stiltInterval={4.5}
                withPostLanterns
            />

            {/* Right Transverse Crossing Boardwalk */}
            <Boardwalk
                start={[0, 0.6, -24]}
                end={[24, 0.6, -24]}
                width={3.0}
                stiltInterval={4.5}
                withPostLanterns
            />

            {/* Exit Portal Boardwalk Spur (Guiding flight path into the dimensional gateway) */}
            <Boardwalk
                start={[0, 0.6, -24]}
                end={[14, 0.6, -12]}
                width={3.4}
                stiltInterval={4.0}
                withPostLanterns
            />

            {/* Angled Pier Spoke (Foreground depth framing from photo) */}
            <Boardwalk
                start={[-16, 0.6, -42]}
                end={[-4, 0.6, -28]}
                width={2.4}
                stiltInterval={4.0}
                withPostLanterns={false}
            />

            {/* ── 4. The Grand Symmetrical Palace Facade ─────────────────────── */}
            {/* Stone Foundation Podium */}
            <mesh position={[0, 1.5, 3.5]} material={castleMaterials.stoneBase}>
                <boxGeometry args={[48.0, 3.0, 22.0]} />
            </mesh>

            {/* Front Balustrade Railings */}
            <mesh position={[-16.0, 3.4, 14.2]} material={doumaMaterials.shrineVermilion}>
                <boxGeometry args={[15.0, 0.8, 0.15]} />
            </mesh>
            <mesh position={[16.0, 3.4, 14.2]} material={doumaMaterials.shrineVermilion}>
                <boxGeometry args={[15.0, 0.8, 0.15]} />
            </mesh>

            {/* Continuous row of lanterns along the lower terrace */}
            {[-22, -19, -16, -13, -10, 10, 13, 16, 19, 22].map((x, idx) => (
                <BoxLantern key={`terrace-l-${idx}`} position={[x, 3.9, 14.0]} size={0.4} />
            ))}

            {/* Side Gallery Colonnades extending left and right */}
            <mesh position={[-19.5, 4.5, 4.5]} material={castleMaterials.agedWood}>
                <boxGeometry args={[8.5, 0.35, 13.0]} />
            </mesh>
            <mesh position={[19.5, 4.5, 4.5]} material={castleMaterials.agedWood}>
                <boxGeometry args={[8.5, 0.35, 13.0]} />
            </mesh>

            {/* Center Grand Illuminated Staircase & Entrance Shrine */}
            <CenterShrineCompound position={[0, 0, 7.0]} />

            {/* Symmetrical Left Pagoda Wing */}
            <PagodaWing position={[-17.0, 0, 4.5]} isLeftWing />

            {/* Symmetrical Right Pagoda Wing */}
            <PagodaWing position={[17.0, 0, 4.5]} isLeftWing={false} />
        </group>
    );
};
