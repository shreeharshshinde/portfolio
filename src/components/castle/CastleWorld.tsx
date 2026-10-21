import React, { useMemo } from 'react';
import { TowerStructure, CorridorBridge, PaperLantern, BoxLantern, castleMaterials } from './ModularPieces';
import { DoumaPalace } from './DoumaPalace';

interface CastleWorldProps {
    progress?: number;
}

export const CastleWorld: React.FC<CastleWorldProps> = ({ progress = 0 }) => {
    // ── Domain Separation ────────────────────────────────────────────────────
    // Douma's Lotus Palace is at Z = 1536 — physically far away in its own blue void.
    // The camera travels through the void to reach it (no jump cut).
    // Hide the main castle towers while inside Douma's realm so they don't appear
    // in the distance behind the camera during transit.
    const isInsideDouma = progress >= 0.545 && progress <= 0.705;
    const showDoumaRealm = progress >= 0.52 && progress <= 0.73;
    // ─── Precision Tower Placement for Zero-Clipping Clearance ────────────────
    // Every tower is positioned safely outside the flight path (minimum 8m-14m distance),
    // allowing the camera to weave close to eaves, balconies, and lanterns without intersecting.
    const towers = useMemo(() => {
        return [
            // ── ZONE 1: HIGH SKY & INVERTED CEILINGS (0.00 – 0.10) ───────────────────
            {
                position: [-18, 175, -28] as [number, number, number],
                rotation: [0, 0.4, 0] as [number, number, number],
                scale: 1.6,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [24, 168, -12] as [number, number, number],
                rotation: [0, -0.5, 0] as [number, number, number],
                scale: 1.5,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                // Inverted ceiling pagoda hanging far above opening dive
                position: [0, 215, 0] as [number, number, number],
                rotation: [Math.PI, 0.25, 0] as [number, number, number],
                scale: 1.7,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                // Horizontal tower from right abyss wall
                position: [46, 155, -22] as [number, number, number],
                rotation: [0, 0, Math.PI / 2] as [number, number, number],
                scale: 1.4,
                tiers: 2 as const,
                hasLantern: false,
            },
            {
                // Horizontal tower from left abyss wall
                position: [-44, 160, 5] as [number, number, number],
                rotation: [0, 0, -Math.PI / 2] as [number, number, number],
                scale: 1.4,
                tiers: 2 as const,
                hasLantern: false,
            },

            // ── ZONE 2: WEST WING CORRIDOR SLALOM (0.10 – 0.25) ──────────────────────
            // Flanking towers for the wide LEFT sweep (path is at X = -28 to -32)
            {
                // Outer West Tower (camera glides right past its right eave)
                position: [-45, 115, 48] as [number, number, number],
                rotation: [0, 0.3, 0] as [number, number, number],
                scale: 1.7,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                // Inner West Tower
                position: [-14, 110, 52] as [number, number, number],
                rotation: [0, -0.4, 0] as [number, number, number],
                scale: 1.6,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                // Inverted overhead tower spanning above chasm crossing
                position: [-5, 118, 75] as [number, number, number],
                rotation: [Math.PI, 0.4, 0] as [number, number, number],
                scale: 1.6,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [18, 92, 85] as [number, number, number],
                rotation: [0, -0.6, 0] as [number, number, number],
                scale: 1.6,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [-38, 80, 88] as [number, number, number],
                rotation: [0, 0.8, 0] as [number, number, number],
                scale: 1.5,
                tiers: 2 as const,
                hasLantern: false,
            },

            // ── ZONE 3: EAST FLAME WING CANYON (0.25 – 0.40) ─────────────────────────
            // Flanking towers for the wide RIGHT sweep (path is at X = +22 to +34)
            {
                // Outer East Flame Tower (camera sweeps along its inner balconies)
                position: [48, 56, 136] as [number, number, number],
                rotation: [0, -0.4, 0] as [number, number, number],
                scale: 1.8,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                // Inner East Tower
                position: [18, 58, 135] as [number, number, number],
                rotation: [0, 0.6, 0] as [number, number, number],
                scale: 1.7,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                // Inverted ceiling structure over flame wing chasm
                position: [32, 82, 145] as [number, number, number],
                rotation: [Math.PI, 0.2, 0] as [number, number, number],
                scale: 1.6,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [42, 32, 165] as [number, number, number],
                rotation: [0, -0.7, 0] as [number, number, number],
                scale: 1.7,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [8, 36, 162] as [number, number, number],
                rotation: [0, 1.1, 0] as [number, number, number],
                scale: 1.5,
                tiers: 2 as const,
                hasLantern: false,
            },

            // ── ZONE 4: AKAZA'S ARENA PERIMETER (0.40 – 0.55) ────────────────────────
            // Ring of towers surrounding the orbital path (path is at X = -34, Z = 215)
            {
                // Outer perimeter tower
                position: [-48, -4, 212] as [number, number, number],
                rotation: [0, 0.8, 0] as [number, number, number],
                scale: 1.8,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                // Front edge tower
                position: [-10, 8, 185] as [number, number, number],
                rotation: [0, 0.2, 0] as [number, number, number],
                scale: 1.7,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                // Opposing arena tower on far side
                position: [-8, -10, 230] as [number, number, number],
                rotation: [0, -1.2, 0] as [number, number, number],
                scale: 1.6,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                // Inverted ceiling pavilion suspended high above combat ring
                position: [-25, 48, 215] as [number, number, number],
                rotation: [Math.PI, 0.45, 0] as [number, number, number],
                scale: 1.8,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                // Chasm ledge diving tower
                position: [-45, -22, 245] as [number, number, number],
                rotation: [0, 0.5, 0] as [number, number, number],
                scale: 1.7,
                tiers: 3 as const,
                hasLantern: true,
            },

            // ── ZONE 5: DOUMA'S PALACE CANYON (0.55 – 0.70) ──────────────────────────
            // Symmetrical Douma Palace & Lotus Pond are rendered as an architectural complex below.
            // Keeping high inverted ceiling tower and canyon rim tower for abyssal depth:
            {
                // Inverted overhead palace wing suspended high in abyss ceiling
                position: [-20, -5, 295] as [number, number, number],
                rotation: [Math.PI, -0.3, 0] as [number, number, number],
                scale: 1.6,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                // Far right abyss canyon wall tower
                position: [24, -45, 275] as [number, number, number],
                rotation: [0, 0.9, 0] as [number, number, number],
                scale: 1.6,
                tiers: 2 as const,
                hasLantern: false,
            },

            // ── ZONE 6: KOKUSHIBO'S MOON SANCTUM (0.70 – 0.85) ───────────────────────
            // Wide RIGHT sweep (path is at X = +26, Z = 360)
            {
                // Outer Moon Monolith
                position: [42, -68, 358] as [number, number, number],
                rotation: [0, -0.8, 0] as [number, number, number],
                scale: 1.9,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                // Inner Moon Pillar
                position: [10, -68, 362] as [number, number, number],
                rotation: [0, 0.7, 0] as [number, number, number],
                scale: 1.8,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                // Inverted dark ceiling monolith
                position: [24, -25, 360] as [number, number, number],
                rotation: [Math.PI, 0.5, 0] as [number, number, number],
                scale: 1.7,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [-16, -75, 348] as [number, number, number],
                rotation: [0, -0.6, 0] as [number, number, number],
                scale: 1.7,
                tiers: 2 as const,
                hasLantern: false,
            },
            {
                position: [28, -86, 392] as [number, number, number],
                rotation: [0, -0.3, 0] as [number, number, number],
                scale: 1.8,
                tiers: 3 as const,
                hasLantern: true,
            },

            // ── ZONE 7: GRAND HALL IMPERIAL COLONNADE (0.85 – 1.00) ──────────────────
            // Flanking colonnade: path is right down the center at X = 0 (18m clearance!)
            {
                position: [-18, -95, 415] as [number, number, number],
                rotation: [0, 0.2, 0] as [number, number, number],
                scale: 2.0,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [18, -95, 415] as [number, number, number],
                rotation: [0, -0.2, 0] as [number, number, number],
                scale: 2.0,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [-22, -94, 445] as [number, number, number],
                rotation: [0, 0.3, 0] as [number, number, number],
                scale: 2.1,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [22, -94, 445] as [number, number, number],
                rotation: [0, -0.3, 0] as [number, number, number],
                scale: 2.1,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [-26, -93, 475] as [number, number, number],
                rotation: [0, 0.4, 0] as [number, number, number],
                scale: 2.0,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [26, -93, 475] as [number, number, number],
                rotation: [0, -0.4, 0] as [number, number, number],
                scale: 2.0,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                // The Colossal Imperial Throne Pagoda (Z = 520, camera stops at Z = 495)
                position: [0, -88, 520] as [number, number, number],
                rotation: [0, 0, 0] as [number, number, number],
                scale: 2.7,
                tiers: 3 as const,
                hasLantern: true,
            },
        ];
    }, []);

    // ─── Bridges Connecting Impossible Orientations (Clean Flight Clearance) ───
    const bridges = useMemo(() => {
        return [
            // High West Wing bridge
            {
                start: [-45, 118, 48] as [number, number, number],
                end: [-14, 114, 52] as [number, number, number],
                width: 2.8,
                hasLanterns: true,
            },
            // High chasm bridge (camera flies smoothly UNDER this at Y = 80, Z = 95)
            {
                start: [-20, 92, 95] as [number, number, number],
                end: [18, 92, 95] as [number, number, number],
                width: 3.0,
                hasLanterns: true,
            },
            // East Flame Wing diagonal canyon bridge
            {
                start: [18, 60, 135] as [number, number, number],
                end: [48, 58, 136] as [number, number, number],
                width: 3.2,
                hasLanterns: true,
            },
            // Lower flame wing bridge
            {
                start: [8, 38, 162] as [number, number, number],
                end: [42, 34, 165] as [number, number, number],
                width: 2.8,
                hasLanterns: true,
            },
            // Arena entry bridge
            {
                start: [-48, -2, 212] as [number, number, number],
                end: [-25, -12, 215] as [number, number, number],
                width: 3.4,
                hasLanterns: true,
            },
            // Moon Sanctum chasm crossing bridge
            {
                start: [10, -66, 362] as [number, number, number],
                end: [42, -66, 358] as [number, number, number],
                width: 3.4,
                hasLanterns: true,
            },
            // Grand Hall imperial left wing bridge
            {
                start: [-22, -92, 445] as [number, number, number],
                end: [-5, -88, 485] as [number, number, number],
                width: 3.8,
                hasLanterns: true,
            },
            // Grand Hall imperial right wing bridge
            {
                start: [22, -92, 445] as [number, number, number],
                end: [5, -88, 485] as [number, number, number],
                width: 3.8,
                hasLanterns: true,
            },
        ];
    }, []);

    // ─── Rows of Floor Box Lanterns Along Key Walkways & Arenas ───────────────
    const arenaPerimeterLanterns = useMemo(() => {
        const list: [number, number, number][] = [];
        const radius = 28;
        const centerX = -25;
        const centerZ = 215;
        const centerY = -12.2;
        for (let i = 0; i < 16; i++) {
            const angle = (i / 16) * Math.PI * 2;
            list.push([
                centerX + Math.cos(angle) * radius,
                centerY,
                centerZ + Math.sin(angle) * radius,
            ]);
        }
        return list;
    }, []);

    const grandHallAisleLanterns = useMemo(() => {
        const list: [number, number, number][] = [];
        for (let z = 415; z <= 495; z += 10) {
            list.push([-8, -91.5, z]);
            list.push([8, -91.5, z]);
        }
        return list;
    }, []);

    return (
        <group name="infinity-castle-world">
            {/* ── 1. The Main Infinity Castle Domain (Amber Wood, Bridges, Arenas) ── */}
            {/* Hidden while inside Douma's sub-space so the domains never clash! */}
            <group name="main-infinity-castle" visible={!isInsideDouma}>
                {/* ── Akaza's Arena Stone Combat Platform ───────────────────── */}
                <mesh position={[-25, -14, 215]} material={castleMaterials.stoneBase}>
                    <cylinderGeometry args={[29, 31, 3.5, 24]} />
                </mesh>
                <mesh
                    position={[-25, -12.1, 215]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    material={castleMaterials.vermilionTrim}
                >
                    <ringGeometry args={[20, 22, 36]} />
                </mesh>
                {arenaPerimeterLanterns.map((pos, idx) => (
                    <BoxLantern key={`arena-l-${idx}`} position={pos} size={0.45} />
                ))}

                {/* ── Grand Hall Massive Ceremonial Floor ───────────────────── */}
                <mesh position={[0, -96, 465]} material={castleMaterials.stoneBase}>
                    <boxGeometry args={[85, 5, 110]} />
                </mesh>
                <mesh
                    position={[0, -93.4, 465]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    material={castleMaterials.vermilionTrim}
                >
                    <planeGeometry args={[13, 105]} />
                </mesh>
                {grandHallAisleLanterns.map((pos, idx) => (
                    <BoxLantern key={`hall-l-${idx}`} position={pos} size={0.45} />
                ))}

                {/* ── All Tower Structures (With verified flight clearance) ─── */}
                {towers.map((tower, idx) => (
                    <TowerStructure
                        key={`tower-${idx}`}
                        position={tower.position}
                        rotation={tower.rotation}
                        scale={tower.scale}
                        tiers={tower.tiers}
                        hasLantern={tower.hasLantern}
                    />
                ))}

                {/* ── All Crossing Bridges (Camera weaves above and under) ──── */}
                {bridges.map((bridge, idx) => (
                    <CorridorBridge
                        key={`bridge-${idx}`}
                        start={bridge.start}
                        end={bridge.end}
                        width={bridge.width}
                        hasLanterns={bridge.hasLanterns}
                    />
                ))}

                {/* ── Atmospheric Lantern Markers Along Flight Path ────────── */}
                <PaperLantern position={[0, 190, -45]} withLight />
                <PaperLantern position={[-26, 120, 30]} withLight />
                <PaperLantern position={[0, 75, 95]} withLight />
                <PaperLantern position={[32, 45, 145]} withLight />
                <PaperLantern position={[-32, 0, 220]} withLight />
                <PaperLantern position={[24, -70, 365]} withLight />
                <PaperLantern position={[0, -84, 430]} withLight />
                <PaperLantern position={[0, -88, 505]} withLight />
            </group>

            {/* ── 2. Douma's Remote Lotus Sub-Space Dimension (Cult of Eternal Paradise) ── */}
            {/* Located >1000m away at Z = 1536 — completely isolated in blue celestial void */}
            <group name="douma-pocket-dimension" visible={showDoumaRealm}>
                <DoumaPalace position={[0, -60, 1536]} />
            </group>
        </group>
    );
};
