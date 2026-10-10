import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogFeed: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-950 text-white font-sans antialiased relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0)_80%)]"></div>
            </div>
            
            <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
                {/* Header Section */}
                <div className="mb-16">
                    <button 
                        onClick={() => navigate('/')}
                        className="mb-8 text-xs font-mono text-orange-400 hover:text-orange-300 uppercase tracking-widest flex items-center gap-2 group"
                    >
                        <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Return to Base
                    </button>
                    
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                        MISSION BLOGS
                    </h1>
                    <p className="text-gray-400 font-mono text-sm tracking-[0.2em] uppercase max-w-2xl">
                        Archived transmissions, development blogs, and engineering insights from the frontier.
                    </p>
                </div>

                {/* Log Feed Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Placeholder Card 1 */}
                    <div onClick={() => navigate('/blogs/endurance-loading-scene')} className="group relative border border-white/10 bg-black/40 backdrop-blur-sm p-6 hover:border-orange-500/50 transition-all duration-500 cursor-pointer overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Decorative corners */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:border-orange-500 transition-colors"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-hover:border-orange-500 transition-colors"></div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-mono tracking-widest text-orange-400">T-DATE: 2026.10.10</span>
                                <span className="text-[10px] font-mono text-white/30 border border-white/10 px-2 py-0.5 rounded-full">SYSTEM ARCHITECTURE</span>
                            </div>
                            
                            <h2 className="text-xl font-bold mb-3 group-hover:text-orange-100 transition-colors">Building the Endurance Loading Scene</h2>
                            <p className="text-sm text-gray-400 mb-6 flex-grow">
                                A deep dive into utilizing Three.js, React Three Fiber, and Draco compression to create an immersive gravity-assist loading sequence.
                            </p>
                            
                            <div className="flex items-center text-xs font-mono text-white/50 group-hover:text-white transition-colors uppercase tracking-widest">
                                <span>Decrypting Log</span>
                                <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:animate-pulse text-orange-400">...</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Add more placeholder cards here as needed */}
                </div>
            </div>
            
            {/* Scanlines */}
            <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.02)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_4px,3px_100%] opacity-20 z-50"></div>
        </div>
    );
};

export default BlogFeed;
