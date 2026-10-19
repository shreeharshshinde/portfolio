import * as THREE from 'three';

// ─── Camera Position Curve ────────────────────────────────────────────────────
// Camera swoops through the void and weaves through impossible castle wings
export const cameraPositionPoints: THREE.Vector3[] = [
    // 0.00 - Freefall start (high void)
    new THREE.Vector3(0, 160, -20),
    // 0.06 - Plummeting downwards
    new THREE.Vector3(5, 115, 10),
    // 0.15 - Grand Corridor entry (approaching main gates)
    new THREE.Vector3(0, 75, 45),
    // 0.22 - Flying along the colonnade
    new THREE.Vector3(12, 55, 75),
    // 0.30 - Rengoku Flame Wing entry
    new THREE.Vector3(30, 38, 110),
    // 0.38 - Deep inside Flame Wing
    new THREE.Vector3(15, 25, 145),
    // 0.45 - Akaza Arena approach
    new THREE.Vector3(-25, 12, 180),
    // 0.52 - Circling Akaza Arena platform
    new THREE.Vector3(-30, -5, 215),
    // 0.60 - Douma Frozen Palace entrance
    new THREE.Vector3(-5, -20, 250),
    // 0.68 - Gliding past Douma's icy pavilions
    new THREE.Vector3(20, -32, 285),
    // 0.75 - Kokushibo Moon Sanctum entrance
    new THREE.Vector3(10, -48, 320),
    // 0.82 - Dropping through the dark moon chamber
    new THREE.Vector3(-15, -62, 355),
    // 0.90 - Grand Hall approach
    new THREE.Vector3(-5, -78, 395),
    // 1.00 - Final Grand Hall battle site
    new THREE.Vector3(0, -88, 435),
];

export const cameraPositionCurve = new THREE.CatmullRomCurve3(
    cameraPositionPoints,
    false, // not closed
    'catmullrom',
    0.5 // tension
);

// ─── Camera Look-At Curve ─────────────────────────────────────────────────────
// Where the camera gazes at any point during the scroll
export const cameraLookAtPoints: THREE.Vector3[] = [
    // 0.00 - Looking straight down into the vortex abyss
    new THREE.Vector3(0, 60, 20),
    // 0.06 - Looking ahead at the first towers emerging from fog
    new THREE.Vector3(2, 40, 50),
    // 0.15 - Looking along the Grand Corridor
    new THREE.Vector3(8, 50, 95),
    // 0.22 - Looking towards Rengoku Wing flames
    new THREE.Vector3(25, 35, 125),
    // 0.30 - Looking at Flame battle scrolls
    new THREE.Vector3(20, 22, 160),
    // 0.38 - Looking toward the Akaza arena
    new THREE.Vector3(-15, 10, 190),
    // 0.45 - Centered on Akaza combat ring
    new THREE.Vector3(-10, -10, 225),
    // 0.52 - Looking toward the ice palace
    new THREE.Vector3(5, -25, 260),
    // 0.60 - Gazing at Douma's frozen fan structures
    new THREE.Vector3(15, -35, 295),
    // 0.68 - Looking down toward Moon Sanctum
    new THREE.Vector3(0, -50, 330),
    // 0.75 - Gazing at Kokushibo's crescent blade shrine
    new THREE.Vector3(-10, -65, 365),
    // 0.82 - Gazing down into the Grand Hall abyss
    new THREE.Vector3(0, -82, 405),
    // 0.90 - Gazing at the central grand staircase
    new THREE.Vector3(0, -90, 445),
    // 1.00 - Framing the final audience chamber
    new THREE.Vector3(0, -92, 470),
];

export const cameraLookAtCurve = new THREE.CatmullRomCurve3(
    cameraLookAtPoints,
    false,
    'catmullrom',
    0.5
);

// Helper functions for sampling
export function getCameraPosition(progress: number, out = new THREE.Vector3()): THREE.Vector3 {
    const clamped = THREE.MathUtils.clamp(progress, 0, 1);
    return cameraPositionCurve.getPoint(clamped, out);
}

export function getCameraLookAt(progress: number, out = new THREE.Vector3()): THREE.Vector3 {
    const clamped = THREE.MathUtils.clamp(progress, 0, 1);
    return cameraLookAtCurve.getPoint(clamped, out);
}
