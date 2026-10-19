import React, { useMemo } from 'react';
import { TowerStructure, CorridorBridge, PaperLantern, BoxLantern, castleMaterials } from './ModularPieces';

export const CastleWorld: React.FC = () => {
    // ─── Tower Layout Across All 7 Wings ──────────────────────────────────────
    const towers = useMemo(() => {
        return [
            // ── ZONE 1: THE FALL / FREEFALL (Y ~ 90-150, Z ~ -30 to 30) ──────────────
            {
                position: [-38, 120, -10] as [number, number, number],
                rotation: [0, 0.4, 0] as [number, number, number],
                scale: 1.5,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [42, 105, 15] as [number, number, number],
                rotation: [0, -0.6, 0] as [number, number, number],
                scale: 1.4,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                // Inverted ceiling tower (Image 2 style)
                position: [0, 168, 15] as [number, number, number],
                rotation: [Math.PI, 0.2, 0] as [number, number, number],
                scale: 1.6,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                // Sideways horizontal tower sticking out of the right void wall (Image 1 style)
                position: [58, 115, -5] as [number, number, number],
                rotation: [0, 0, Math.PI / 2] as [number, number, number],
                scale: 1.3,
                tiers: 2 as const,
                hasLantern: false,
            },
            {
                // Sideways tower from left
                position: [-55, 130, 25] as [number, number, number],
                rotation: [0, 0, -Math.PI / 2] as [number, number, number],
                scale: 1.3,
                tiers: 2 as const,
                hasLantern: false,
            },

            // ── ZONE 2: GRAND CORRIDOR (Y ~ 50-85, Z ~ 35-90) ────────────────────────
            {
                position: [-24, 52, 50] as [number, number, number],
                rotation: [0, 0.3, 0] as [number, number, number],
                scale: 1.6,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [26, 48, 65] as [number, number, number],
                rotation: [0, -0.4, 0] as [number, number, number],
                scale: 1.6,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                // Inverted overhead tower spanning the corridor
                position: [-10, 95, 75] as [number, number, number],
                rotation: [Math.PI, 0.8, 0] as [number, number, number],
                scale: 1.5,
                tiers: 3 as const,
                hasLantern: false,
            },
            {
                position: [15, 98, 85] as [number, number, number],
                rotation: [Math.PI, -0.5, 0] as [number, number, number],
                scale: 1.4,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [-48, 65, 80] as [number, number, number],
                rotation: [0, 0, -Math.PI / 2] as [number, number, number],
                scale: 1.3,
                tiers: 2 as const,
                hasLantern: false,
            },

            // ── ZONE 3: RENGOKU'S FLAME WING (Y ~ 20-45, Z ~ 100-155) ────────────────
            {
                position: [36, 16, 115] as [number, number, number],
                rotation: [0, 0.8, 0] as [number, number, number],
                scale: 1.7,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [12, 10, 140] as [number, number, number],
                rotation: [0, -0.5, 0] as [number, number, number],
                scale: 1.4,
                tiers: 2 as const,
                hasLantern: true,
            },
            {
                position: [52, 28, 135] as [number, number, number],
                rotation: [0, 1.2, 0] as [number, number, number],
                scale: 1.5,
                tiers: 3 as const,
                hasLantern: false,
            },
            {
                // Inverted ceiling structure
                position: [25, 68, 125] as [number, number, number],
                rotation: [Math.PI, -0.3, 0] as [number, number, number],
                scale: 1.4,
                tiers: 2 as const,
                hasLantern: true,
            },

            // ── ZONE 4: AKAZA'S ARENA (Y ~ -10 to 18, Z ~ 165-225) ───────────────────
            {
                position: [-44, -5, 185] as [number, number, number],
                rotation: [0, 0.2, 0] as [number, number, number],
                scale: 1.6,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [-14, -12, 215] as [number, number, number],
                rotation: [0, -0.9, 0] as [number, number, number],
                scale: 1.5,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [-52, 6, 220] as [number, number, number],
                rotation: [0, 1.5, 0] as [number, number, number],
                scale: 1.7,
                tiers: 3 as const,
                hasLantern: false,
            },
            {
                // Inverted ceiling pavilion
                position: [-28, 45, 200] as [number, number, number],
                rotation: [Math.PI, 0.5, 0] as [number, number, number],
                scale: 1.6,
                tiers: 3 as const,
                hasLantern: true,
            },

            // ── ZONE 5: DOUMA'S PALACE (Y ~ -35 to -15, Z ~ 235-295) ─────────────────
            {
                position: [14, -38, 255] as [number, number, number],
                rotation: [0, 0.6, 0] as [number, number, number],
                scale: 1.7,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [42, -32, 275] as [number, number, number],
                rotation: [0, -0.7, 0] as [number, number, number],
                scale: 1.5,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [-20, -25, 270] as [number, number, number],
                rotation: [0, 1.1, 0] as [number, number, number],
                scale: 1.4,
                tiers: 2 as const,
                hasLantern: false,
            },
            {
                // Inverted pavilion
                position: [20, 18, 275] as [number, number, number],
                rotation: [Math.PI, -0.4, 0] as [number, number, number],
                scale: 1.4,
                tiers: 2 as const,
                hasLantern: true,
            },

            // ── ZONE 6: KOKUSHIBO'S SANCTUM (Y ~ -65 to -45, Z ~ 305-365) ────────────
            {
                position: [-24, -68, 325] as [number, number, number],
                rotation: [0, -0.5, 0] as [number, number, number],
                scale: 1.8,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [18, -62, 345] as [number, number, number],
                rotation: [0, 0.8, 0] as [number, number, number],
                scale: 1.6,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [-38, -55, 355] as [number, number, number],
                rotation: [0, -1.3, 0] as [number, number, number],
                scale: 1.7,
                tiers: 3 as const,
                hasLantern: false,
            },
            {
                // Inverted high monolith
                position: [-5, -12, 340] as [number, number, number],
                rotation: [Math.PI, 0.7, 0] as [number, number, number],
                scale: 1.5,
                tiers: 3 as const,
                hasLantern: true,
            },

            // ── ZONE 7: GRAND HALL (Y ~ -95 to -75, Z ~ 380-450) ─────────────────────
            {
                position: [-30, -96, 410] as [number, number, number],
                rotation: [0, 0.3, 0] as [number, number, number],
                scale: 1.9,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [30, -96, 410] as [number, number, number],
                rotation: [0, -0.3, 0] as [number, number, number],
                scale: 1.9,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [-45, -90, 440] as [number, number, number],
                rotation: [0, 0.6, 0] as [number, number, number],
                scale: 1.6,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                position: [45, -90, 440] as [number, number, number],
                rotation: [0, -0.6, 0] as [number, number, number],
                scale: 1.6,
                tiers: 3 as const,
                hasLantern: true,
            },
            {
                // Central High Throne Monolith in distance
                position: [0, -85, 470] as [number, number, number],
                rotation: [0, 0, 0] as [number, number, number],
                scale: 2.3,
                tiers: 3 as const,
                hasLantern: true,
            },
        ];
    }, []);

    // ─── Bridges Connecting Impossible Orientations ───────────────────────────
    const bridges = useMemo(() => {
        return [
            // Across the Grand Corridor
            {
                start: [-24, 55, 50] as [number, number, number],
                end: [26, 50, 65] as [number, number, number],
                width: 2.6,
                hasLanterns: true,
            },
            // Flame Wing Chasm bridge
            {
                start: [12, 13, 140] as [number, number, number],
                end: [36, 19, 115] as [number, number, number],
                width: 2.8,
                hasLanterns: true,
            },
            // Akaza Arena bridge
            {
                start: [-44, -2, 185] as [number, number, number],
                end: [-14, -9, 215] as [number, number, number],
                width: 3.0,
                hasLanterns: true,
            },
            // Douma Palace bridge
            {
                start: [14, -35, 255] as [number, number, number],
                end: [42, -29, 275] as [number, number, number],
                width: 2.4,
                hasLanterns: true,
            },
            // Grand Hall converging bridges
            {
                start: [-30, -93, 410] as [number, number, number],
                end: [0, -84, 455] as [number, number, number],
                width: 3.6,
                hasLanterns: true,
            },
            {
                start: [30, -93, 410] as [number, number, number],
                end: [0, -84, 455] as [number, number, number],
                width: 3.6,
                hasLanterns: true,
            },
        ];
    }, []);

    // ─── Foreground Balcony with Floor Lanterns (Directly inspired by Image 1) ─
    const balconyLanterns = useMemo(() => {
        const list: [number, number, number][] = [];
        for (let x = -14; x <= 14; x += 3.5) {
            list.push([x, 62.4, 25]);
        }
        return list;
    }, []);

    return (
        <group name="infinity-castle-world">
            {/* ── Foreground Viewing Balcony (Image 1 foreground platform) ── */}
            <mesh position={[0, 61, 24]} material={castleMaterials.agedWood}>
                <boxGeometry args={[32, 0.8, 12]} />
            </mesh>
            {/* Front Balustrade */}
            <mesh position={[0, 62.1, 29.5]} material={castleMaterials.vermilionTrim}>
                <boxGeometry args={[32, 0.9, 0.2]} />
            </mesh>
            {/* Row of glowing box lanterns along the foreground balustrade */}
            {balconyLanterns.map((pos, idx) => (
                <BoxLantern key={`balcony-l-${idx}`} position={pos} size={0.5} />
            ))}

            {/* ── Akaza's Arena Stone Platform ──────────────────────────────── */}
            <mesh position={[-25, -14, 205]} material={castleMaterials.stoneBase}>
                <cylinderGeometry args={[28, 30, 3, 16]} />
            </mesh>
            {/* Arena inner battle compass ring */}
            <mesh
                position={[-25, -12.4, 205]}
                rotation={[-Math.PI / 2, 0, 0]}
                material={castleMaterials.vermilionTrim}
            >
                <ringGeometry args={[19, 21, 32]} />
            </mesh>

            {/* ── Grand Hall Massive Podium ─────────────────────────────────── */}
            <mesh position={[0, -98, 440]} material={castleMaterials.stoneBase}>
                <boxGeometry args={[76, 4, 76]} />
            </mesh>

            {/* ── All Tower Structures ───────────────────────────────────────── */}
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

            {/* ── All Connecting Bridges ────────────────────────────────────── */}
            {bridges.map((bridge, idx) => (
                <CorridorBridge
                    key={`bridge-${idx}`}
                    start={bridge.start}
                    end={bridge.end}
                    width={bridge.width}
                    hasLanterns={bridge.hasLanterns}
                />
            ))}

            {/* ── Strategic Glowing Paper Lanterns ──────────────────────────── */}
            <PaperLantern position={[0, 80, 45]} withLight />
            <PaperLantern position={[10, 45, 90]} withLight />
            <PaperLantern position={[22, 28, 130]} withLight />
            <PaperLantern position={[-25, 2, 195]} withLight />
            <PaperLantern position={[8, -25, 265]} withLight />
            <PaperLantern position={[-10, -55, 335]} withLight />
            <PaperLantern position={[0, -80, 420]} withLight />
        </group>
    );
};
