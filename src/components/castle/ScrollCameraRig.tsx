import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { cameraPositionCurve, getCameraPosition, getCameraLookAt } from './cameraPath';

interface ScrollCameraRigProps {
    progress: number;
}

export const ScrollCameraRig: React.FC<ScrollCameraRigProps> = ({ progress }) => {
    const { camera, pointer } = useThree();

    // Intermediate vectors for smooth damping
    const targetPos = useRef(new THREE.Vector3());
    const targetLookAt = useRef(new THREE.Vector3());
    const currentLookAt = useRef(new THREE.Vector3(0, 60, 20));
    const previousTangent = useRef(new THREE.Vector3());
    const nextTangent = useRef(new THREE.Vector3());
    const orientationTarget = useRef(new THREE.Object3D());
    const smoothedProgress = useRef(progress);
    const currentBank = useRef(0);
    const initialized = useRef(false);

    useFrame((_, delta) => {
        const targetProgress = THREE.MathUtils.clamp(progress, 0, 1);
        smoothedProgress.current = THREE.MathUtils.damp(smoothedProgress.current, targetProgress, 2.4, delta);
        const p = smoothedProgress.current;

        // Compute targets from Catmull-Rom splines
        getCameraPosition(p, targetPos.current);
        getCameraLookAt(p, targetLookAt.current);

        // Subtle mouse parallax offset
        const parallaxX = pointer.x * 2.5;
        const parallaxY = pointer.y * 1.5;
        targetPos.current.x += parallaxX;
        targetPos.current.y += parallaxY;

        if (!initialized.current) {
            camera.position.copy(targetPos.current);
            currentLookAt.current.copy(targetLookAt.current);
            camera.lookAt(currentLookAt.current);
            initialized.current = true;
            return;
        }

        const positionFactor = 1 - Math.exp(-4.5 * delta);
        camera.position.lerp(targetPos.current, positionFactor);

        const rotationFactor = 1 - Math.exp(-6 * delta);
        currentLookAt.current.lerp(targetLookAt.current, rotationFactor);

        const tangentOffset = 0.025;
        cameraPositionCurve.getTangent(
            Math.max(0, p - tangentOffset),
            previousTangent.current
        );
        cameraPositionCurve.getTangent(
            Math.min(1, p + tangentOffset),
            nextTangent.current
        );
        const previousHeading = Math.atan2(previousTangent.current.x, previousTangent.current.z);
        const nextHeading = Math.atan2(nextTangent.current.x, nextTangent.current.z);
        const headingChange = Math.atan2(
            Math.sin(nextHeading - previousHeading),
            Math.cos(nextHeading - previousHeading)
        );
        const targetBank = THREE.MathUtils.clamp(-headingChange * 0.45, -0.14, 0.14);
        currentBank.current = THREE.MathUtils.damp(currentBank.current, targetBank, 3.5, delta);

        orientationTarget.current.position.copy(camera.position);
        orientationTarget.current.up.copy(camera.up);
        orientationTarget.current.lookAt(currentLookAt.current);
        orientationTarget.current.rotateZ(currentBank.current);
        camera.quaternion.slerp(orientationTarget.current.quaternion, rotationFactor);
    });

    return null;
};
