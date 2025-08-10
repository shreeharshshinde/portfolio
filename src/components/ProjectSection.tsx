import React, { useState } from 'react';

// --- SVG Icon Components for a professional look ---

const ShieldIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

const BrainIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-2.5-2.5V2zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 2.5-2.5V2z"></path><path d="M9 12c-2.5 0-2-4-2-4s2.5-1 5-1s5 1 5 1s.5 4-2 4"></path><path d="M15 12c2.5 0 2-4 2-4s-2.5-1-5-1s-5 1-5 1s-.5 4 2 4"></path></svg>
);

const ChartIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20V16"></path></svg>
);


interface Project {
    title: string;
    description: string;
    technologies: string[];
    link: string;
    category: string;
    gradient: string;
    icon: React.ReactNode;
}

export const ProjectsSection: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const projects: Project[] = [
        {
            title: "ERAWA",
            description: "A gamified web platform using Next.js to educate children on sensitive topics like Child Abuse, Child Labour, and more.",
            technologies: ["Next.js", "Tailwind CSS", "PostgreSQL", "Drizzle ORM"],
            link: "https://github.com/shreeharshshinde/ERAWA",
            category: "Full-Stack",
            gradient: "from-blue-500 to-indigo-600",
            icon: <ShieldIcon />
        },
        {
            title: "DreamFields",
            description: "An AI-powered career guidance platform using the MERN stack and Three.js to provide personalized recommendations for students.",
            technologies: ["React.js", "Node.js", "Meta AI", "Three.js"],
            link: "https://github.com/shreeharshshinde/DreamFields",
            category: "AI & Full-Stack",
            gradient: "from-purple-500 to-violet-600",
            icon: <BrainIcon />
        },
        {
            title: "Olympic Data Analysis",
            description: "An interactive Streamlit web app to analyze and visualize 120 years of Olympic data, from 1896 to 2016.",
            technologies: ["Python", "Streamlit", "Pandas", "Plotly"],
            link: "https://github.com/shreeharshshinde/olympic-analysis", // Replace with your actual link
            category: "Data Science",
            gradient: "from-emerald-500 to-teal-600",
            icon: <ChartIcon />
        }
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#0a0a1a] via-gray-950 to-[#08191c] overflow-hidden py-20">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
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
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className={`group relative bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-200 transform hover:scale-105 ${
                                hoveredIndex === index ? 'shadow-2xl shadow-cyan-500/20' : 'shadow-xl'
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
                                        {project.icon}
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
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-auto text-cyan-400 font-semibold hover:text-cyan-300 self-start transition-colors duration-300 hover:underline">
                                    View on GitHub &rarr;
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <a href="https://github.com/shreeharshshinde" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:underline">
                        <span className="text-lg">View more on GitHub</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};
