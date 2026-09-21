import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../data/projects';
import { Github, ExternalLink, Database, FolderOpen, Terminal } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth >= 768) return; // Mobile only logic

            const center = window.innerHeight / 2;
            let minDistance = Infinity;
            let closestIndex = -1;

            cardRefs.current.forEach((card, index) => {
                if (card) {
                    const rect = card.getBoundingClientRect();
                    const cardCenter = rect.top + rect.height / 2;
                    const distance = Math.abs(center - cardCenter);

                    if (distance < minDistance) {
                        minDistance = distance;
                        closestIndex = index;
                    }
                }
            });

            if (closestIndex !== -1 && minDistance < window.innerHeight / 3) {
                setHoveredIndex(closestIndex);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative min-h-screen bg-black text-orange-50 font-mono py-24 overflow-hidden">
            {/* Background Grid */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(249, 115, 22, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.15) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Glowing Ambient Radial Backdrop */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-orange-600/10 blur-[150px] pointer-events-none rounded-full"></div>

            <div className="relative z-10 container mx-auto px-6 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col items-center mb-16 relative">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-3">
                        <Database size={14} className="animate-pulse" />
                        <span className="tracking-[0.3em] text-[11px] font-semibold">DATABASE ACCESS // ARCHIVES</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter mb-4 uppercase text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                        Mission Archives
                    </h2>
                    <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => {
                        const Icon = project.icon;
                        const isHovered = hoveredIndex === index;
                        const t = project.theme;

                        return (
                            <div
                                key={index}
                                ref={(el) => { cardRefs.current[index] = el; }}
                                className={`group flex flex-col relative bg-zinc-950/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden transition-all duration-500 ${
                                    isHovered 
                                        ? `${t.cardBorderHover} ${t.cardShadowHover} -translate-y-2` 
                                        : 'hover:border-white/20'
                                }`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
                            >
                                {/* Dynamic Gradient Mesh Background on Hover */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-b ${t.bgMeshHover}`}></div>

                                {/* Cybernetic Corner Bracket Accents */}
                                <div className={`absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 transition-colors duration-300 ${isHovered ? t.cornerAccent : 'border-white/15'}`}></div>
                                <div className={`absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 transition-colors duration-300 ${isHovered ? t.cornerAccent : 'border-white/15'}`}></div>
                                <div className={`absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 transition-colors duration-300 ${isHovered ? t.cornerAccent : 'border-white/15'}`}></div>
                                <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 transition-colors duration-300 ${isHovered ? t.cornerAccent : 'border-white/15'}`}></div>

                                {/* Scanline overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-15"></div>

                                {/* Header Bar */}
                                <div className="bg-white/[0.03] border-b border-white/10 px-5 py-3 flex justify-between items-center relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-1.5 rounded-lg border transition-all duration-300 ${isHovered ? t.iconBgText : 'bg-white/5 border-white/10 text-gray-400'}`}>
                                            <Icon size={20} />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10">
                                            <div className={`w-2 h-2 rounded-full ${isHovered ? t.ledGlow : 'bg-gray-600 animate-pulse'} transition-all duration-300`}></div>
                                        </div>
                                    </div>

                                    {/* Animated neon bottom bar on hover */}
                                    <div className={`absolute bottom-0 left-0 h-[2px] ${t.barBg} transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`}></div>
                                </div>

                                {/* Main Content Body */}
                                <div className="p-7 relative z-10 flex flex-col flex-1">
                                    <div className="mb-5">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-wider rounded-full border transition-all duration-300 ${isHovered ? t.categoryBadge : 'border-white/10 text-gray-400 bg-white/5'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? t.barBg : 'bg-gray-500'}`}></span>
                                            {project.category.toUpperCase()}
                                        </span>
                                        <h3 className={`text-2xl font-bold text-white mt-3 mb-2 tracking-tight transition-colors duration-300 ${t.titleHover}`}>
                                            {project.title}
                                        </h3>
                                    </div>

                                    <p className={`text-gray-400 text-sm leading-relaxed mb-7 border-l-2 pl-4 transition-all duration-300 ${isHovered ? `${t.descBorderHover} text-gray-300` : 'border-white/10'}`}>
                                        {project.description}
                                    </p>

                                    {/* Tech Stack Modules */}
                                    <div className="mb-7 mt-auto">
                                        <div className="text-[10px] text-gray-500 tracking-widest mb-3 uppercase flex items-center gap-1.5 font-bold">
                                            <FolderOpen size={11} className="text-gray-400" /> INSTALLED STACK
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, i) => (
                                                <span key={i} className={`text-xs px-2.5 py-1 rounded-md font-medium border transition-all duration-300 ${isHovered ? t.techTagHover : 'bg-white/[0.04] border-white/10 text-gray-400'}`}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer Link & Connection Status */}
                                    <div className="pt-5 border-t border-white/10 flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-[10px] text-gray-500 tracking-widest font-mono">
                                            <Terminal size={12} className="text-gray-400" />
                                            <span>ENCRYPTED</span>
                                        </div>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`group/btn flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-bold tracking-wider border transition-all duration-300 ${t.buttonStyle}`}
                                        >
                                            <span>ACCESS REPO</span> 
                                            <ExternalLink size={13} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Section Link */}
                <div className="text-center mt-20">
                    <a 
                        href="https://github.com/shreeharshshinde" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-white/10 bg-black/40 hover:bg-orange-500/10 hover:border-orange-500/50 text-gray-300 hover:text-orange-400 transition-all duration-300 tracking-[0.2em] text-xs font-bold uppercase group shadow-lg backdrop-blur-sm"
                    >
                        <span className="group-hover:mr-1 transition-all">Explore Full Archives</span> 
                        <Github size={16} className="transition-transform duration-300 group-hover:scale-110" />
                    </a>
                </div>
            </div>
        </div>
    );
};
