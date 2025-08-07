import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

    React.useEffect(() => {
        setIsVisible(true);
    }, []);

    const socialLinks = [
        {
            name: "LinkedIn",
            url: "#",
            icon: "💼",
            color: "from-blue-500 to-blue-600",
            hoverColor: "from-blue-400 to-blue-500"
        },
        {
            name: "GitHub",
            url: "#",
            icon: "🐙",
            color: "from-gray-700 to-gray-800",
            hoverColor: "from-gray-600 to-gray-700"
        },
        {
            name: "Twitter",
            url: "#",
            icon: "🐦",
            color: "from-sky-500 to-sky-600",
            hoverColor: "from-sky-400 to-sky-500"
        },
        {
            name: "Email",
            url: "mailto:shindeshreeharsh157@gmail.com",
            icon: "📧",
            color: "from-red-500 to-red-600",
            hoverColor: "from-red-400 to-red-500"
        }
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            <div className="relative z-10 container mx-auto px-6 py-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">
                        Get In Touch
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full mb-8"></div>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        I'm currently seeking internship opportunities and am excited to connect with fellow developers, recruiters, and tech enthusiasts. Whether you have a question or just want to say hi, feel free to reach out!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
                    {/* Left Column - Contact Info */}
                    <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {/* Contact Card */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <span className="text-3xl mr-3">💬</span>
                                Let's Connect
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology and development.
                            </p>
                            
                            {/* Contact Details */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">📧</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">Email</div>
                                        <div className="text-gray-400">shindeshreeharsh157@gmail.com</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">📍</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">Location</div>
                                        <div className="text-gray-400">Available for remote work worldwide</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">⏰</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">Availability</div>
                                        <div className="text-gray-400">Open to new opportunities</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="text-center">
                            <a 
                                href="mailto:shindeshreeharsh157@gmail.com" 
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full text-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg shadow-cyan-500/25"
                            >
                                <span className="mr-3">👋</span>
                                Say Hello
                                <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Social Links */}
                    <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500">
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                                <span className="text-3xl mr-3">🌐</span>
                                Connect With Me
                            </h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group relative p-6 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-105 ${
                                            hoveredSocial === social.name ? 'ring-2 ring-cyan-500/50 shadow-lg shadow-cyan-500/20' : ''
                                        }`}
                                        onMouseEnter={() => setHoveredSocial(social.name)}
                                        onMouseLeave={() => setHoveredSocial(null)}
                                    >
                                        {/* Background Gradient */}
                                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                                        
                                        {/* Content */}
                                        <div className="relative z-10 text-center">
                                            <div className="text-4xl mb-3">{social.icon}</div>
                                            <div className="text-white font-semibold">{social.name}</div>
                                        </div>

                                        {/* Hover Glow Effect */}
                                        <div 
                                            className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl ${
                                                hoveredSocial === social.name ? 'animate-pulse' : ''
                                            }`}
                                            style={{ 
                                                background: `radial-gradient(circle at center, ${social.color.split('-')[1]}50020, transparent 70%)` 
                                            }}
                                        ></div>
                                    </a>
                                ))}
                            </div>

                            {/* Additional Info */}
                            <div className="mt-8 p-6 bg-gray-700/30 rounded-xl border border-gray-600/30">
                                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                                    <span className="text-2xl mr-2">🚀</span>
                                    What I'm Looking For
                                </h4>
                                <ul className="text-gray-300 space-y-2 text-sm">
                                    <li>• Backend Development Internships</li>
                                    <li>• Full-Stack Development Opportunities</li>
                                    <li>• Open Source Project Collaborations</li>
                                    <li>• Tech Community Engagement</li>
                                </ul>
                            </div>
                        </div>
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
