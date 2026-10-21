import * as THREE from 'three';

// ─── Single Continuous Unified Camera Path ────────────────────────────────────
// Centripetal Catmull-Rom (alpha=0.5) prevents overshooting at the
// widely-spaced void-transit waypoints adjacent to densely-packed castle zones.
//
// Progress Zones (approximate — spline distributes evenly by waypoint count):
//   0.00 → 0.53  Main Castle Descent  (High Sky → Akaza's Arena)
//   0.53 → 0.57  HIGH-SPEED void dash  (2 pts, ~935m Z range)
//   0.57 → 0.70  Douma's Lotus Palace  (7 pts, ~84m Z range — slow cinematic)
//   0.70 → 0.73  HIGH-SPEED void return (2 pts, ~1184m Z range)
//   0.73 → 1.00  Moon Sanctum → Imperial Throne

export const cameraPoints: THREE.Vector3[] = [
    // ── ZONE 1: HIGH VOID & OPENING SPIRAL ───────────────────────────────────
    // Camera starts high above, looking down — descends in a gentle S-arc
    new THREE.Vector3(   0,  205,  -55),  // p≈0.000 — apex, above all towers
    new THREE.Vector3(  14,  182,  -28),  // p≈0.029 — drift right, slight banking
    new THREE.Vector3(  -8,  158,    0),  // p≈0.059 — sweep left, descending

    // ── ZONE 2: NORTH GATE APPROACH (CENTER-LEFT SWEEP) ──────────────────────
    new THREE.Vector3( -22,  134,   22),  // p≈0.088 — pass left of north gate
    new THREE.Vector3( -36,  112,   46),  // p≈0.118 — deep west run, pagoda in view
    new THREE.Vector3( -30,   96,   68),  // p≈0.147 — arc back center-right

    // ── ZONE 3: WEST WING CORRIDOR ───────────────────────────────────────────
    new THREE.Vector3( -18,   82,   90),  // p≈0.176 — glide between tower columns
    new THREE.Vector3(   4,   68,  110),  // p≈0.206 — cross-over center
    new THREE.Vector3(  26,   54,  130),  // p≈0.235 — sweep right toward east wing

    // ── ZONE 4: EAST FLAME WING ───────────────────────────────────────────────
    new THREE.Vector3(  36,   42,  150),  // p≈0.265 — banking rightward
    new THREE.Vector3(  30,   28,  172),  // p≈0.294 — past flame towers
    new THREE.Vector3(  14,   16,  192),  // p≈0.324 — spiral back inward

    // ── ZONE 5: MIDDLE BRIDGE CROSSING ───────────────────────────────────────
    new THREE.Vector3(  -4,    4,  210),  // p≈0.353 — cross central bridge low
    new THREE.Vector3( -20,   -6,  226),  // p≈0.382 — drift left, approaching arena
    new THREE.Vector3( -34,  -16,  242),  // p≈0.412 — deep left perimeter swing

    // ── ZONE 6: AKAZA'S ARENA ─────────────────────────────────────────────────
    new THREE.Vector3( -30,  -26,  258),  // p≈0.441 — arc around arena edge
    new THREE.Vector3( -14,  -34,  272),  // p≈0.471 — diving off ledge
    new THREE.Vector3(  -6,  -42,  285),  // p≈0.500 — bottom of arena, slow down

    // ── VOID TRANSIT 1: HIGH-SPEED DASH TO DOUMA ─────────────────────────────
    // Sparse waypoints (2 pts across ~1155m) → camera rockets forward
    new THREE.Vector3(   2,  -50,  750),  // p≈0.529 — blasting through void
    new THREE.Vector3(   2,  -53, 1200),  // p≈0.559 — closing in on blue realm

    // ── ZONE 7: DOUMA'S LOTUS PALACE ─────────────────────────────────────────
    // 9 closely-spaced waypoints across 92m → very slow cinematic drift
    new THREE.Vector3(   0, -54.0, 1358), // p≈0.588 — enter boardwalk approach
    new THREE.Vector3(   0, -54.5, 1378), // p≈0.608 — glide over dark water
    new THREE.Vector3(  -8, -55.0, 1398), // p≈0.618 — drift left past lotus beds
    new THREE.Vector3(  -4, -55.5, 1418), // p≈0.628 — arc back center
    new THREE.Vector3(   0, -55.8, 1438), // p≈0.638 — approach main courtyard
    new THREE.Vector3(   4, -56.0, 1455), // p≈0.648 — slight right toward shrine
    new THREE.Vector3(   6, -56.2, 1472), // p≈0.658 — ascending steps vista
    new THREE.Vector3(   4, -56.5, 1485), // p≈0.668 — inner shrine
    new THREE.Vector3(   0, -56.5, 1494), // p≈0.678 — pause at apex

    // ── VOID TRANSIT 2: HIGH-SPEED RETURN ────────────────────────────────────
    // 2 sparse waypoints across ~1160m → rockets back
    new THREE.Vector3(   0,  -60,  900),  // p≈0.706 — blasting back through void
    new THREE.Vector3(   6,  -62,  352),  // p≈0.735 — re-entering castle depths

    // ── ZONE 8: KOKUSHIBO'S MOON SANCTUM ─────────────────────────────────────
    new THREE.Vector3(  28,  -72,  375),  // p≈0.765 — emerge right of moon monolith
    new THREE.Vector3(  16,  -80,  400),  // p≈0.794 — arc left toward center

    // ── ZONE 9: GRAND HALL & IMPERIAL CONVERGENCE ────────────────────────────
    new THREE.Vector3(   4,  -86,  425),  // p≈0.824 — fly into grand hall mouth
    new THREE.Vector3(  -8,  -89,  450),  // p≈0.853 — sweep left aisle
    new THREE.Vector3(  -2,  -91,  470),  // p≈0.882 — leveling out, final descent
    new THREE.Vector3(   0,  -92,  488),  // p≈0.912 — slow approach
    new THREE.Vector3(   0, -92.5, 495),  // p≈1.000 — Imperial Throne rest
];

// ─── Centripetal Catmull-Rom Curve ───────────────────────────────────────────
// alpha=0.5 is key: parametrizes by sqrt(arc-length), which prevents the
// "overshoot" that happens with classic catmullrom at mixed-density waypoints.
export const cameraPositionCurve = new THREE.CatmullRomCurve3(
    cameraPoints,
    false,
    'centripetal',
    0.5
);

// ─── Zone Boundaries (keep in sync with ScrollCameraRig.tsx) ─────────────────
export const ZONE = {
    castleStart:  0.000,
    transit1In:   0.500,   // Arena dive-off → void starts
    transit1Out:  0.588,   // Douma entry
    doumaIn:      0.588,
    doumaOut:     0.678,
    transit2In:   0.678,   // Return void starts
    transit2Out:  0.765,   // Moon sanctum entry
    castleEnd:    1.000,
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const _tmp = new THREE.Vector3();

export function isInTransit(p: number): boolean {
    return (p > ZONE.transit1In  && p < ZONE.transit1Out) ||
           (p > ZONE.transit2In  && p < ZONE.transit2Out);
}

export function isInDouma(p: number): boolean {
    return p >= ZONE.doumaIn && p <= ZONE.doumaOut;
}

// ─── Sample Position ──────────────────────────────────────────────────────────
export function getCameraPosition(progress: number, out = new THREE.Vector3()): THREE.Vector3 {
    return cameraPositionCurve.getPoint(THREE.MathUtils.clamp(progress, 0, 1), out);
}

// ─── Sample Look-At ───────────────────────────────────────────────────────────
// Zone-aware look-ahead keeps the camera anticipating turns without rubber-banding.
// The focal attraction system only applies the single nearest focal point per
// frame to avoid fight/jitter when two foci overlap.
export function getCameraLookAt(progress: number, out = new THREE.Vector3()): THREE.Vector3 {
    const p = THREE.MathUtils.clamp(progress, 0, 1);

    const inT = isInTransit(p);
    const inD = isInDouma(p);

    // Adaptive look-ahead:
    //  Transit:  very tight — just point forward into void
    //  Douma:    wide — linger on palace facade as camera drifts past
    //  Castle:   standard
    let lookAhead = 0.038;
    if (inT)      lookAhead = 0.018;
    else if (inD) lookAhead = 0.085;

    const lookT = Math.min(1.0, p + lookAhead);
    cameraPositionCurve.getPoint(lookT, out);

    // ── Focal Attractions ─────────────────────────────────────────────────────
    // Softly pull gaze toward key architectural focal points.
    // Only the single closest active focal point fires per frame.
    type Focal = { at: number; x: number; y: number; z: number; w: number; r: number };
    const foci: Focal[] = [
        { at: 0.118, x: -40, y: 108, z:  58,   w: 0.22, r: 0.055 }, // West pagoda
        { at: 0.265, x:  40, y:  38, z: 158,   w: 0.28, r: 0.055 }, // East flame tower
        { at: 0.441, x: -28, y: -22, z: 258,   w: 0.35, r: 0.060 }, // Akaza arena lamp
        { at: 0.638, x:   0, y: -52, z:1505,   w: 0.50, r: 0.090 }, // Douma shrine centre
        { at: 0.668, x:   0, y: -52, z:1510,   w: 0.50, r: 0.090 }, // Douma shrine hold
        { at: 0.765, x:  30, y: -74, z: 380,   w: 0.28, r: 0.060 }, // Moon monolith
        { at: 0.960, x:   0, y: -91, z: 520,   w: 0.45, r: 0.060 }, // Imperial throne
    ];

    let bestDist = Infinity;
    let bestFactor = 0;
    let bestFocal: Focal | null = null;

    for (const f of foci) {
        const dist = Math.abs(p - f.at);
        if (dist < f.r && dist < bestDist) {
            bestDist = dist;
            bestFactor = (1 - dist / f.r) * f.w;
            bestFocal = f;
        }
    }

    if (bestFocal !== null) {
        _tmp.set(bestFocal.x, bestFocal.y, bestFocal.z);
        out.lerp(_tmp, bestFactor);
    }

    return out;
}

// ─── Sample Tangent ───────────────────────────────────────────────────────────
export function getCameraTangent(progress: number, out = new THREE.Vector3()): THREE.Vector3 {
    return cameraPositionCurve.getTangent(THREE.MathUtils.clamp(progress, 0, 1), out);
}
