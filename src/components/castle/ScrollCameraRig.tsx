import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
    getCameraPosition,
    getCameraLookAt,
    getCameraTangent,
    isInTransit,
    isInDouma,
} from './cameraPath';

interface ScrollCameraRigProps {
    progress: number;
}

// Pre-allocated scratch vectors — never re-created during render loop
const _targetPos   = new THREE.Vector3();
const _targetLook  = new THREE.Vector3();
const _fwd         = new THREE.Vector3();
const _right       = new THREE.Vector3();
const _up          = new THREE.Vector3();
const _refUp       = new THREE.Vector3();
const _tanA        = new THREE.Vector3();
const _tanB        = new THREE.Vector3();
const _rotMat      = new THREE.Matrix4();
const _baseQuat    = new THREE.Quaternion();
const _rollQuat    = new THREE.Quaternion();
const _rollAxis    = new THREE.Vector3();

// Tilt-fallback up vectors (used when camera looks nearly straight down/up)
const _UP_DIVE  = new THREE.Vector3(0, 0.15, -0.99).normalize(); // looking down-Z
const _UP_RISE  = new THREE.Vector3(0, 0.15,  0.99).normalize(); // looking up-Z

export const ScrollCameraRig: React.FC<ScrollCameraRigProps> = ({ progress }) => {
    const { camera, pointer } = useThree();

    // ── Smoothed progress tracking ────────────────────────────────────────────
    // smoothP follows rawP with a per-zone lag so the camera feels physically
    // "heavy" in castle zones but aggressively responsive during transit.
    const smoothP       = useRef(0);

    // ── Orientation state ─────────────────────────────────────────────────────
    const lookAtCurrent = useRef(new THREE.Vector3(0, 190, 0));  // lag-smoothed look-at
    const bankCurrent   = useRef(0);                              // current bank roll (rad)
    const initialized   = useRef(false);

    useFrame((_, delta) => {
        // Clamp to valid range
        const rawP = THREE.MathUtils.clamp(progress, 0, 1);

        // ── Zone flags ────────────────────────────────────────────────────────
        const inTransit = isInTransit(rawP);
        const inDouma   = isInDouma(rawP);

        // ── Progress smoothing ────────────────────────────────────────────────
        // Using MathUtils.damp which is frame-rate-independent exponential decay.
        // Castle: k=2.6 — gentle follow, avoids scroll micro-jitter being visible
        // Transit: k=8.0 — near-instant track so camera doesn't lag 800m behind
        // Douma: k=1.8  — even smoother, slow cinematic feel
        let dampK = 2.6;
        if (inTransit) dampK = 8.0;
        else if (inDouma) dampK = 1.8;

        smoothP.current = THREE.MathUtils.damp(smoothP.current, rawP, dampK, delta);
        const p = smoothP.current;

        // Re-evaluate zone flags using smoothed p
        const inTransitS = isInTransit(p);
        const inDoumaS   = isInDouma(p);

        // ── Sample spline (into pre-allocated scratch vectors) ────────────────
        getCameraPosition(p, _targetPos);
        getCameraLookAt(p, _targetLook);

        // ── Mouse parallax (disabled in transit — camera should stay on rails) ─
        if (!inTransitS) {
            const parallaxScale = inDoumaS ? 1.2 : 1.8;
            _targetPos.x += pointer.x * parallaxScale;
            _targetPos.y += pointer.y * (parallaxScale * 0.6);
        }

        // ── First frame: snap instantly, no lerp ─────────────────────────────
        if (!initialized.current) {
            camera.position.copy(_targetPos);
            lookAtCurrent.current.copy(_targetLook);
            smoothP.current = rawP;
            initialized.current = true;
            return; // skip rest of first frame
        }

        // ── Position lerp ─────────────────────────────────────────────────────
        // exp-decay lerp: frame-rate independent, proportional to distance.
        // posK controls how quickly camera catches up to the spline point.
        // Transit: very high k so camera doesn't visibly lag while rocketing.
        let posK = 5.5;
        if (inTransitS) posK = 11.0;
        else if (inDoumaS) posK = 3.5;

        const posF = 1 - Math.exp(-posK * delta);
        camera.position.lerp(_targetPos, posF);

        // ── Look-at lerp ──────────────────────────────────────────────────────
        // Rotation tracking is always a bit faster than position to avoid the
        // camera position "going ahead" while orientation lags behind.
        let rotK = 7.5;
        if (inTransitS) rotK = 14.0;
        else if (inDoumaS) rotK = 4.5;

        const rotF = 1 - Math.exp(-rotK * delta);
        lookAtCurrent.current.lerp(_targetLook, rotF);

        // ── Gimbal-free orthonormal orientation ───────────────────────────────
        // Build a full camera rotation matrix from forward + world-up, then
        // extract quaternion. This is immune to gimbal lock.
        _fwd.subVectors(lookAtCurrent.current, camera.position).normalize();

        // Dynamic world-up: when camera looks nearly straight up or down,
        // tilt the reference up vector to avoid gimbal lock at the pole.
        _refUp.set(0, 1, 0);
        const dotUp = _fwd.dot(_refUp);

        if (dotUp < -0.78) {
            // Camera looking steeply downward — lean up vector backward
            const blend = THREE.MathUtils.smoothstep(-dotUp, 0.78, 0.96);
            _refUp.lerp(_UP_DIVE, blend).normalize();
        } else if (dotUp > 0.78) {
            // Camera looking steeply upward — lean up vector forward
            const blend = THREE.MathUtils.smoothstep(dotUp, 0.78, 0.96);
            _refUp.lerp(_UP_RISE, blend).normalize();
        }

        _right.crossVectors(_fwd, _refUp).normalize();
        _up.crossVectors(_right, _fwd).normalize();

        // Compose rotation matrix: columns are [right, up, -fwd]
        _rotMat.makeBasis(_right, _up, _fwd.clone().negate());
        _baseQuat.setFromRotationMatrix(_rotMat);

        // ── Aerodynamic banking ───────────────────────────────────────────────
        // Sample tangent slightly before and after p to detect yaw change rate.
        // Banking is completely suppressed in transit (perfectly flat horizon).
        let targetBank = 0;
        if (!inTransitS) {
            const tanDelta = 0.024;
            getCameraTangent(Math.max(0, p - tanDelta), _tanA);
            getCameraTangent(Math.min(1, p + tanDelta), _tanB);

            const yawA = Math.atan2(_tanA.x, _tanA.z);
            const yawB = Math.atan2(_tanB.x, _tanB.z);
            // Minimal-angle yaw difference
            const hdiff = Math.atan2(Math.sin(yawB - yawA), Math.cos(yawB - yawA));

            const bankScale = inDoumaS ? 0.20 : 0.42; // gentler banking in Douma
            const bankMax   = inDoumaS ? 0.10 : 0.18; // ±rad
            targetBank = THREE.MathUtils.clamp(-hdiff * bankScale, -bankMax, bankMax);
        }

        // Smooth bank toward target — faster release than acquire (natural feel)
        const bankK = targetBank === 0 ? 3.5 : 5.0;
        bankCurrent.current = THREE.MathUtils.damp(bankCurrent.current, targetBank, bankK, delta);

        // ── Opening corkscrew roll (p: 0.02 → 0.22) ──────────────────────────
        // Rotates exactly 360° as the camera descends from the apex.
        // Uses smoothstep so it eases in and out (no harsh snap at start/end).
        const spinT  = THREE.MathUtils.smoothstep(p, 0.02, 0.22);
        const spinRad = spinT * Math.PI * 2; // one full revolution

        // ── Apply roll = corkscrew + bank ────────────────────────────────────
        const totalRoll = spinRad + bankCurrent.current;
        if (Math.abs(totalRoll) > 0.0001) {
            _rollAxis.copy(_fwd); // roll around the forward axis
            _rollQuat.setFromAxisAngle(_rollAxis, totalRoll);
            _baseQuat.premultiply(_rollQuat);
        }

        // Slerp current camera quaternion toward target (rotation tracking speed)
        camera.quaternion.slerp(_baseQuat, rotF);
    });

    return null;
};
