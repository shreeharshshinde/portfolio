import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from './stars/Stars';
import { Nebula } from './stars/Nebula';
import { Text } from '@react-three/drei';


export const HeroSection: React.FC = () => (
    <>
        <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
                <Stars />
                <Nebula />
            </Suspense>
        </Canvas>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 drop-shadow-[0_0_10px_rgba(77,208,225,0.7)] animate-pulse">
                Shreeharsh Shinde
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light mb-8 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                Aspiring Software Developer | Nagpur, India
            </p>
            <a
                href="#contact"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30"
            >
                Get In Touch
            </a>
        </div>
        {/* Floating particles */}
        {/* <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-white animate-pulse"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 5 + 2}px`,
                        height: `${Math.random() * 5 + 2}px`,
                        opacity: Math.random() * 0.7 + 0.3,
                        animationDuration: `${Math.random() * 3 + 2}s`,
                        animationDelay: `${Math.random() * 2}s`
                    }}
                />
            ))}
        </div> */}
    </>
);
