import React, { useState } from 'react';

interface Project {
    title: string;
    description: string;
    technologies: string[];
    link: string;
    category: string;
    color: string;
    gradient: string;
    icon: string;
}

export const ProjectsSection: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const projects: Project[] = [
        {
            title: "E-commerce API",
            description: "A fully-featured RESTful API for an e-commerce platform with product management, authentication, and order processing.",
            technologies: ["Python", "Flask", "PostgreSQL", "Docker"],
            link: "#",
            category: "Backend",
            color: "#10b981",
            gradient: "from-emerald-500 to-teal-600",
            icon: "🛒"
        },
        {
            title: "Real-time Chat App",
            description: "A web-based chat application using WebSockets for real-time communication between multiple users.",
            technologies: ["Node.js", "Express", "Socket.IO", "React.js"],
            link: "#",
            category: "Full-Stack",
            color: "#3b82f6",
            gradient: "from-blue-500 to-indigo-600",
            icon: "💬"
        },
        {
            title: "Portfolio Website",
            description: "A personal portfolio built with React and Three.js, featuring dynamic 3D backgrounds and responsive design.",
            technologies: ["React.js", "TypeScript", "Three.js", "Tailwind CSS"],
            link: "#",
            category: "Frontend",
            color: "#8b5cf6",
            gradient: "from-purple-500 to-violet-600",
            icon: "🎨"
        }
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#121225] to-[#000000] overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Nebula-like background elements */}
                <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-radial from-purple-900/20 via-indigo-900/10 to-transparent rounded-full"></div>
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Enhanced Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a78bfa' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            <div className="relative z-10 container mx-auto px-6 py-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
                        My Projects
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Explore my latest work and creations, showcasing innovative solutions and cutting-edge technologies
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {projects.map((project, index) => (
                        <div
                            key={index}
                            className={`group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 ${
                                hoveredIndex === index ? 'ring-2 ring-cyan-500/50 shadow-2xl shadow-cyan-500/30' : 'shadow-xl'
                            }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Gradient Border Effect */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                            
                            {/* Card Content */}
                            <div className="relative z-10">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="text-4xl">{project.icon}</div>
                                    <span
                                        className="px-3 py-1 text-xs font-semibold rounded-full text-white shadow-md"
                                        style={{ backgroundColor: project.color }}
                                    >
                                        {project.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-300 mb-6 leading-relaxed">
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
                                                className="px-3 py-1 text-xs font-medium bg-gray-700/50 text-gray-300 rounded-full border border-gray-600/50 hover:border-cyan-500/50 transition-all duration-300 hover:bg-cyan-500/10"
                                            >
                                                {tech}
                                            </span>
                                ))}
                            </div>
                        </div>

                                {/* Action Button */}
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                                        hoveredIndex === index
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25'
                                            : 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500'
                                    }`}
                                >
                                    View on GitHub
                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>

                            {/* Hover Glow Effect */}
                            <div 
                                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${
                                    hoveredIndex === index ? 'animate-pulse' : ''
                                }`}
                                style={{ 
                                    background: `radial-gradient(circle at center, ${project.color}20, transparent 70%)` 
                                }}
                            ></div>
                    </div>
                ))}
            </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
                        <span className="text-lg">View more projects on GitHub</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        </div>
    );
};
