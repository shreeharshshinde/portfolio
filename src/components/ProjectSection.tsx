import React, { useState } from 'react';
import { projects } from '../data/projects';
import { Github, ExternalLink, Database, FolderOpen } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="relative min-h-screen bg-black text-cyan-50 font-mono py-20 overflow-hidden">

            {/* Background Grid */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            <div className="relative z-10 container mx-auto px-6 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col items-center mb-16 relative">
                    <div className="flex items-center gap-2 text-cyan-500/60 mb-2">
                        <Database size={16} />
                        <span className="tracking-[0.3em] text-xs">DATABASE ACCESS</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4 mix-blend-screen uppercase">
                        Mission Archives
                    </h2>
                    <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => {
                        const Icon = project.icon;
                        const isHovered = hoveredIndex === index;

                        return (
                            <div
                                key={index}
                                className={`group relative bg-gray-900/60 border border-white/5 overflow-hidden transition-all duration-300 ${isHovered ? 'border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.15)]' : ''}`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Scanline overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>

                                {/* Header Bar */}
                                <div className="bg-white/5 border-b border-white/5 p-4 flex justify-between items-center relative">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-1.5 rounded-sm ${isHovered ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-gray-500'} transition-colors`}>
                                            <Icon size={20} />
                                        </div>
                                        <span className="text-xs tracking-widest text-gray-400 uppercase">FILE_0{index + 1}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                                        <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
                                        <div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]' : 'bg-green-500/20'} transition-all`}></div>
                                    </div>

                                    {/* Animated bar on hvoer */}
                                    <div className={`absolute bottom-0 left-0 h-0.5 bg-cyan-500 transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`}></div>
                                </div>

                                {/* Content */}
                                <div className="p-8 relative">
                                    <div className="mb-6">
                                        <span className={`inline-block px-2 py-0.5 text-[10px] tracking-wider border ${isHovered ? 'border-cyan-500 text-cyan-400' : 'border-gray-700 text-gray-600'} transition-colors mb-4`}>
                                            {project.category.toUpperCase()}
                                        </span>
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors uppercase tracking-tight">
                                            {project.title}
                                        </h3>
                                    </div>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-8 border-l-2 border-white/10 pl-4">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="mb-8">
                                        <div className="text-[10px] text-gray-500 tracking-widest mb-3 uppercase flex items-center gap-2">
                                            <FolderOpen size={10} /> MODULES INSTALLED
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, i) => (
                                                <span key={i} className="text-xs bg-white/5 px-2 py-1 text-gray-400 border border-transparent group-hover:border-cyan-500/20 transition-colors">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer Link */}
                                    <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                                        <span className="text-[10px] text-gray-600 tracking-widest">SECURE CONNECTION</span>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-wider hover:text-white transition-colors group/link">
                                            ACCESS REPO <ExternalLink size={12} className="group-hover/link:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-20">
                    <a href="https://github.com/shreeharshshinde" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 border border-white/10 hover:border-cyan-500/50 text-gray-400 hover:text-cyan-400 transition-all tracking-[0.2em] text-sm uppercase group">
                        <span className="group-hover:mr-2 transition-all">Explore Full Archives</span> <Github size={16} className="inline mb-1 group-hover:ml-1 transition-all" />
                    </a>
                </div>
            </div>
        </div>
    );
};
