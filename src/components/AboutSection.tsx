import React, { useState } from 'react';

export const AboutSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    React.useEffect(() => {
        setIsVisible(true);
    }, []);

    const skills = [
        { name: "Backend Development", level: 90, color: "from-emerald-500 to-teal-600" },
        { name: "Frontend Development", level: 85, color: "from-blue-500 to-indigo-600" },
        { name: "Database Design", level: 80, color: "from-purple-500 to-violet-600" },
        { name: "DevOps & Cloud", level: 75, color: "from-orange-500 to-red-600" },
        { name: "Problem Solving", level: 95, color: "from-cyan-500 to-blue-600" }
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-40 right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            <div className="relative z-10 container mx-auto px-6 py-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">
                        About Me
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
                    {/* Left Column - Text Content */}
                    <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <span className="text-3xl mr-3">👨‍💻</span>
                                Who I Am
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                I am a passionate and driven computer science student with a strong foundation in software development principles and a keen interest in building robust, scalable backend systems. My journey in technology is fueled by a curiosity to solve complex problems and a desire to create impactful applications.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                The HENNGE Global Internship challenge was a fantastic experience that tested my ability to think recursively and handle real-world API authentication protocols. It solidified my interest in backend engineering and my ambition to contribute to a forward-thinking, global company like HENNGE.
                            </p>
                        </div>

                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <span className="text-3xl mr-3">🎯</span>
                                What I Do
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                I specialize in backend development, creating robust APIs, and designing scalable database architectures. My expertise includes Python, Node.js, and modern web technologies.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and playing chess.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Skills & Stats */}
                    <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {/* Skills Section */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500">
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                                <span className="text-3xl mr-3">⚡</span>
                                Skills & Expertise
                            </h3>
                            <div className="space-y-6">
                                {skills.map((skill, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-300 font-medium">{skill.name}</span>
                                            <span className="text-cyan-400 font-bold">{skill.level}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div 
                                                className={`h-2 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                                                style={{ width: `${skill.level}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 text-center">
                                <div className="text-3xl font-bold text-cyan-400 mb-2">15+</div>
                                <div className="text-gray-400 text-sm">Projects Completed</div>
                            </div>
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 text-center">
                                <div className="text-3xl font-bold text-purple-400 mb-2">3+</div>
                                <div className="text-gray-400 text-sm">Years Experience</div>
                            </div>
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 text-center">
                                <div className="text-3xl font-bold text-emerald-400 mb-2">10+</div>
                                <div className="text-gray-400 text-sm">Technologies</div>
                            </div>
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 text-center">
                                <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                                <div className="text-gray-400 text-sm">Learning Mode</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-40 left-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute top-40 left-10 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        </div>
    );
};
