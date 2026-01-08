import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { EnduranceScene } from './EnduranceScene';
import { Volume2, VolumeX, Play } from 'lucide-react';

interface LoadingScreenProps {
    onComplete: (audio: HTMLAudioElement | null) => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [started, setStarted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [muted, setMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isCompletedRef = useRef(false);

    // Initialize Audio
    useEffect(() => {
        audioRef.current = new Audio('/assets/Hanz_Zimmer_-_No_Time_for_Caution_Interstellar_O.S.T._(mp3.pm).mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.2; // Default to low volume
        audioRef.current.currentTime = 30; // Start at 30s as requested

        // Attempt autoplay immediately
        audioRef.current.play().catch(e => console.log("Autoplay blocked (will start on interaction):", e));

        return () => {
            // Only cleanup if we are NOT completing successfully (e.g. unmount)
            if (audioRef.current && !isCompletedRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const [loadingDots, setLoadingDots] = useState('.');

    // Loading Dots Animation
    useEffect(() => {
        if (!started) return;
        const interval = setInterval(() => {
            setLoadingDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);
        return () => clearInterval(interval);
    }, [started]);

    const handleStart = () => {
        setStarted(true);
        // Cinematic Transition
        if (audioRef.current) {
            audioRef.current.currentTime = 0; // Jump to climax/docking moment
            audioRef.current.volume = 0.8; // Full cinematic volume for visuals
            if (audioRef.current.paused && !muted) {
                audioRef.current.play().catch(console.error);
            }
        }

        // Simulate loading process
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.random() * 2;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);
                // Hand over audio to parent
                isCompletedRef.current = true;
                setTimeout(() => onComplete(audioRef.current), 1000);
            }
            setProgress(currentProgress);
        }, 100);
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        setMuted(!muted);
        if (audioRef.current) {
            audioRef.current.muted = !muted;
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black text-white font-mono overflow-hidden">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <color attach="background" args={['#000000']} />
                {started && <EnduranceScene />}
            </Canvas>

            {/* UI Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

                {!started ? (
                    <button
                        onClick={handleStart}
                        className="pointer-events-auto group relative px-12 py-4 bg-transparent border border-white/30 hover:border-white/80 transition-all duration-300 rounded-sm overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <div className="flex items-center gap-4 relative z-10">
                            <Play className="w-6 h-6 animate-pulse" />
                            <span className="text-xl tracking-[0.3em] font-light">INITIATE LAUNCH</span>
                        </div>
                    </button>
                ) : (
                    <div className="w-full max-w-3xl px-8 flex flex-col items-center gap-6">
                        {/* Loading Text */}
                        <div className="text-4xl md:text-6xl font-light tracking-[0.1em] text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                            LOADING<span className="w-24 inline-block text-left">{loadingDots}</span>
                        </div>

                        {/* Progress Bar - Sci-Fi Style */}
                        <div className="w-full h-1 bg-white/10 relative overflow-hidden rounded-full">
                            <div
                                className="absolute top-0 left-0 h-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)] transition-all duration-100 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="flex justify-between w-full text-xs text-white/50 tracking-[0.2em] font-light">
                            <span>SYSTEM CHECK</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Mute Button */}
            <button
                onClick={toggleMute}
                className="absolute top-8 right-8 pointer-events-auto p-3 text-white/50 hover:text-white transition-colors border border-white/10 rounded-full hover:bg-white/5"
            >
                {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            {/* Decoration Lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
    );
};
