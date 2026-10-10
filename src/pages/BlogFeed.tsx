import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';


// Dummy navLinks since Header needs them, but Header will route using /#id
const blogNavLinks = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'skills', title: 'Skills' },
    { id: 'projects', title: 'Projects' },
    { id: 'contact', title: 'Contact' },
    { id: 'blogs', title: 'Blogs', path: '/blogs' },
];

const BlogFeed: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-950 text-white font-sans antialiased relative overflow-hidden">
            <Header navLinks={blogNavLinks} activeSection="blogs" />


            
            <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
                {/* Header Section */}
                <div className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white tracking-tighter drop-shadow-2xl mix-blend-screen opacity-90" style={{ fontFamily: '"Dune Rise", sans-serif' }}>
                        MISSION BLOGS
                    </h1>
                    <p className="text-orange-100/80 font-mono text-sm tracking-[0.3em] uppercase max-w-2xl">
                        Archived transmissions, development blogs, and engineering insights from the frontier.
                    </p>
                </div>

                {/* Log Feed Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Premium Card 1 */}
                    <div 
                        onClick={() => navigate('/blogs/endurance-loading-scene')} 
                        className="group relative bg-black/40 backdrop-blur-md border border-white/10 p-8 cursor-pointer transition-all duration-500 hover:border-orange-500/50 hover:bg-white/5 hover:scale-[1.02] overflow-hidden rounded-sm"
                    >
                        {/* Glow effect behind card on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                        
                        {/* High-tech corner accents */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/20 group-hover:border-orange-400 transition-colors duration-500"></div>
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/20 group-hover:border-orange-400 transition-colors duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/20 group-hover:border-orange-400 transition-colors duration-500"></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/20 group-hover:border-orange-400 transition-colors duration-500"></div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                                    <span className="text-[10px] font-mono tracking-widest text-orange-400/90">T-DATE: 2026.10.10</span>
                                </div>
                                <span className="text-[9px] font-mono text-white/50 border border-white/10 px-2 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm group-hover:border-orange-500/30 transition-colors">SYSTEM ARCHITECTURE</span>
                            </div>
                            
                            <h2 className="text-2xl font-bold mb-4 text-white/90 group-hover:text-orange-100 transition-colors tracking-tight">Building the Endurance Loading Scene</h2>
                            
                            <p className="text-sm text-gray-400 mb-8 flex-grow leading-relaxed group-hover:text-gray-300 transition-colors">
                                A deep dive into utilizing Three.js, React Three Fiber, and Draco compression to create an immersive gravity-assist loading sequence.
                            </p>
                            
                            <div className="flex items-center text-xs font-mono text-white/40 group-hover:text-orange-400 transition-colors uppercase tracking-[0.2em]">
                                <span>Decrypting Log</span>
                                <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:animate-pulse">_</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            
            {/* Scanlines Overlay */}
            <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.02)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_4px,3px_100%] opacity-20 z-50"></div>
        </div>
    );
};

export default BlogFeed;
