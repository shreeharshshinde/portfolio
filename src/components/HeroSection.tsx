import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from './stars/Stars';

export const HeroSection: React.FC = () => (
    <>
        <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
                <Stars />
            </Suspense>
        </Canvas>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
                Shreeharsh Shinde
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light mb-8">
                Aspiring Software Developer | Nagpur, India
            </p>
            <a
                href="#contact"
                className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-cyan-600 transition-transform duration-300 transform hover:scale-105"
            >
                Get In Touch
            </a>
        </div>
    </>
);
