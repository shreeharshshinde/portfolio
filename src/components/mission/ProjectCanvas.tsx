import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, Float } from '@react-three/drei';
import { ArrowLeft, ExternalLink, Activity, Terminal, ShieldAlert, Cpu } from 'lucide-react';
import { projects } from '../../data/projects';
import { ProjectSceneBackground } from './ProjectSceneBackground';
import { WarpTunnel } from './WarpTunnel';

export const ProjectCanvas: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [warping, setWarping] = useState(true);

    const project = projects.find(p => p.title.toLowerCase().replace(/\\s+/g, '-') === slug);

    useEffect(() => {
        // Warp tunnel effect lasts for 1.5 seconds
        const timer = setTimeout(() => {
            setWarping(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    if (!project) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-black text-white font-mono">
                <ShieldAlert size={48} className="text-red-500 mb-4" />
                <h1 className="text-2xl mb-4">MISSION NOT FOUND</h1>
                <button 
                    onClick={() => navigate('/')}
                    className="px-4 py-2 border border-white/20 hover:bg-white/10 transition-colors"
                >
                    RETURN TO BASE
                </button>
            </div>
        );
    }

    const accentColor = project.theme.barBg.match(/rgba\\((.*?)\\)/)?.[0] || "#ffffff";
    const baseColor = project.gradient.split('-')[1] || "cyan";

    return (
        <div className="relative h-screen w-screen bg-black overflow-hidden select-none">
            {/* Back Button HUD Overlay */}
            <div className="absolute top-6 left-6 z-50">
                <button 
                    onClick={() => navigate('/')}
                    className="group flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-lg text-white font-mono text-sm hover:border-white/60 transition-all"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span>ABORT MISSION</span>
                </button>
            </div>

            {/* Static HUD Elements */}
            <div className="absolute bottom-6 left-6 z-50 text-white/50 font-mono text-xs flex flex-col gap-1 pointer-events-none">
                <div className="flex items-center gap-2 text-white/80"><Activity size={14} className="animate-pulse" /> SYSTEM ONLINE</div>
                <div>COORDINATES: {Math.random().toFixed(4)} N, {Math.random().toFixed(4)} W</div>
                <div>ENCRYPTION: AES-256</div>
            </div>

            {/* Canvas Scene */}
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                <Suspense fallback={null}>
                    {/* Background & Warp */}
                    <ProjectSceneBackground accentColor={project.gradient.includes('cyan') ? '#22d3ee' : project.gradient.includes('orange') ? '#f97316' : '#84cc16'} />
                    <WarpTunnel active={warping} />

                    {/* Main UI Panels - Hidden while warping */}
                    {/* {!warping && ( ... )} (Cards removed as per user request to leave empty space) */}
                </Suspense>
                
                {/* Free camera rotation */}
                <OrbitControls 
                    enableZoom={true} 
                    enablePan={false} 
                    minDistance={8} 
                    maxDistance={25}
                    autoRotate={!warping}
                    autoRotateSpeed={0.5}
                />
            </Canvas>

            {/* Warping Fullscreen Overlay Effect (White flash) */}
            <div 
                className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-1000 ${
                    warping ? 'opacity-10' : 'opacity-0'
                }`} 
            />
        </div>
    );
};
