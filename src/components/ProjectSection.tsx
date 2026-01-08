import React, { useState } from 'react';
import { projects } from '../data/projects';
import { Github, ExternalLink } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#0a0a1a] via-gray-950 to-[#08191c] overflow-hidden py-20">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-radial from-purple-900/10 via-indigo-900/5 to-transparent rounded-full animate-pulse"></div>
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-black to-orange-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4 drop-shadow-lg">
                        My Projects
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        A selection of my work, showcasing innovative solutions and a passion for technology.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {projects.map((project, index) => {
                        const Icon = project.icon;
                        return (
                            <div
                                key={index}
                                className={`group relative bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-200 transform hover:scale-105 ${hoveredIndex === index ? 'shadow-2xl shadow-cyan-500/20' : 'shadow-xl'
                                    }`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Gradient Border Effect */}
                                <div className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-200 blur-md`}></div>

                                {/* Card Content */}
                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`p-2 rounded-lg bg-gradient-to-r ${project.gradient} text-white`}>
                                            <Icon size={32} />
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${project.gradient} text-white shadow-md`}>
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                                            Technologies Used
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-3 py-1 text-xs font-medium bg-gray-700/50 text-gray-300 rounded-full border border-gray-600/50"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Link */}
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center space-x-2 text-cyan-400 font-semibold hover:text-cyan-300 self-start transition-colors duration-300 hover:underline">
                                        <span>View on GitHub</span>
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <a href="https://github.com/shreeharshshinde" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:underline">
                        <span className="text-lg">View more on GitHub</span>
                        <Github size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
};

