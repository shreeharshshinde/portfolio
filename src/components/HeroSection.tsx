import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from './stars/Stars';
import BlackHole from './stars/BlackHole';
import SpaceDust from './stars/SpaceDust';

const AutoRotator = () => {
    useFrame((state) => {
        // Slowly rotate the camera around the center
        const t = state.clock.getElapsedTime() * 0.05;
        // Adjust radius based on screen width - push back on mobile to fit screen
        const isMobile = window.innerWidth < 768;
        const radius = isMobile ? 14 : 12; // Mobile radius 14 (closer/larger)

        state.camera.position.x = Math.sin(t) * radius;
        state.camera.position.z = Math.cos(t) * radius;
        state.camera.lookAt(0, 0, 0);
    });
    return null;
};

export const HeroSection: React.FC = () => (
    <div className="relative w-full h-screen overflow-hidden">
        <Canvas className="pointer-events-none" camera={{ position: [0, 2, 12], fov: 45 }}>
            <Suspense fallback={null}>
                <color attach="background" args={['#000000']} />

                {/* Visual Effects */}
                <BlackHole />
                <SpaceDust count={5000} />
                <Stars />

                {/* Lighting */}
                <ambientLight intensity={0.5} />

                {/* Auto Rotation - Non-interactive */}
                <AutoRotator />
            </Suspense>
        </Canvas>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 pointer-events-none px-4">
            {/* Minimal Text Container */}
            <div className="pointer-events-auto">
                <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tighter mb-2 drop-shadow-2xl opacity-90 mix-blend-overlay">
                    SHREEHARSH
                </h1>
                <h2 className="text-4xl md:text-6xl font-light text-orange-100/80 tracking-[0.2em] mb-12 uppercase mix-blend-screen">
                    Shinde
                </h2>

                <div className="flex flex-col items-center gap-6">
                    <p className="text-sm md:text-base text-gray-400 font-mono tracking-[0.3em] uppercase opacity-60">
                        Full Stack Developer &middot; Creative Technologist
                    </p>

                    <a
                        href="#contact"
                        className="group relative inline-flex items-center justify-center px-10 py-4 text-sm font-bold text-white transition-all duration-500 bg-transparent border border-white/20 rounded-full hover:bg-white/5 hover:border-white/40 hover:scale-105 tracking-widest uppercase overflow-hidden backdrop-blur-sm"
                    >
                        <span className="relative z-10">Enter Portfolio</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
);
