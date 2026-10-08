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
                    {!warping && (
                        <group>
                            {/* Central Data Panel */}
                            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
                                <Html 
                                    transform 
                                    distanceFactor={12} 
                                    position={[0, 0, 0]}
                                    style={{
                                        transition: 'all 0.5s',
                                        opacity: warping ? 0 : 1,
                                    }}
                                >
                                    <div className="w-[600px] bg-black/70 backdrop-blur-xl border-t border-b border-white/20 p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col font-mono relative overflow-hidden group">
                                        <div className={`absolute top-0 left-0 w-full h-[2px] ${project.theme.barBg}`}></div>
                                        
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`p-3 bg-white/5 border border-white/10 rounded-xl`}>
                                                <project.icon size={32} className="text-white" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 tracking-[0.3em] uppercase mb-1">{project.category}</div>
                                                <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
                                                    {project.title}
                                                </h1>
                                            </div>
                                        </div>

                                        <p className="text-gray-300 text-lg leading-relaxed mb-8 border-l-2 border-white/20 pl-4">
                                            {project.description}
                                        </p>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3 font-bold tracking-widest uppercase">
                                                    <Cpu size={14} /> TECH STACK
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies.map(tech => (
                                                        <span key={tech} className="px-2 py-1 bg-white/10 text-white text-xs rounded border border-white/10">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex flex-col justify-between">
                                                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3 font-bold tracking-widest uppercase">
                                                    <Terminal size={14} /> REPOSITORY
                                                </div>
                                                <a 
                                                    href={project.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className={`mt-auto flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-bold tracking-widest border border-white/20 rounded-md transition-colors`}
                                                >
                                                    INITIALIZE LINK <ExternalLink size={16} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </Html>
                            </Float>

                            {/* Side Decorative Panels */}
                            <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
                                <Html transform distanceFactor={10} position={[-8, 2, -2]} rotation={[0, Math.PI / 6, 0]}>
                                    <div className="w-48 bg-black/60 border border-white/10 p-4 backdrop-blur-md font-mono text-xs text-gray-400 opacity-70 hover:opacity-100 transition-opacity">
                                        <div className="border-b border-white/20 pb-2 mb-2">SYSTEM DIAGNOSTICS</div>
                                        {Array.from({length: 5}).map((_, i) => (
                                            <div key={i} className="flex justify-between mb-1">
                                                <span>SEC_0{i+1}</span>
                                                <span className="text-green-400">OK</span>
                                            </div>
                                        ))}
                                    </div>
                                </Html>
                            </Float>

                            <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
                                <Html transform distanceFactor={10} position={[8, -2, -2]} rotation={[0, -Math.PI / 6, 0]}>
                                    <div className="w-64 bg-black/60 border border-white/10 p-4 backdrop-blur-md font-mono text-xs text-gray-400 opacity-70 hover:opacity-100 transition-opacity">
                                        <div className="border-b border-white/20 pb-2 mb-3">RUNTIME_LOG</div>
                                        <div className="text-[10px] space-y-2">
                                            <div className="text-gray-500">{">>"} Establishing secure channel...</div>
                                            <div className="text-gray-500">{">>"} Authenticating user token...</div>
                                            <div className="text-white">{">>"} Access granted to {project.title}</div>
                                            <div className="text-white animate-pulse">{">>"} Waiting for command_</div>
                                        </div>
                                    </div>
                                </Html>
                            </Float>
                        </group>
                    )}
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
