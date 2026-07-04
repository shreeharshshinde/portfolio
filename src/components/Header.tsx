import React, { useState, useEffect } from 'react';
import type { RefObject } from 'react';
import type { NavLink } from '../App';
import logo from '/assets/articuno.png'
import { Menu, X } from 'lucide-react';
import { ViewsCounter } from './ViewsCounter';

interface HeaderProps {
    navLinks: NavLink[];
    activeSection: string;
    setActiveSection: (id: string) => void;
    onScroll: (ref: RefObject<HTMLDivElement | null>) => void;
}

export const Header: React.FC<HeaderProps> = ({ navLinks, activeSection, setActiveSection, onScroll }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (link: NavLink) => {
        setActiveSection(link.id);
        onScroll(link.ref);
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-mono ${isScrolled
                ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-3'
                : 'bg-transparent border-b border-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center relative">

                {/* HUD Decoration Lines (Top Corners) */}
                <div className="absolute top-0 left-0 w-8 h-px bg-white/30"></div>
                <div className="absolute top-0 right-0 w-8 h-px bg-white/30"></div>

                {/* Logo/Brand - Sci-Fi Designation style */}
                <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="relative w-10 h-10 overflow-hidden border border-white/20 rounded-sm group-hover:border-orange-500/50 transition-colors duration-300">
                        <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-1 h-1 bg-white/50"></div>
                        <div className="absolute bottom-0 right-0 w-1 h-1 bg-white/50"></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-[0.1em] text-white group-hover:text-orange-100 transition-colors" style={{ fontFamily: '"Dune Rise", sans-serif' }}>
                            SHREEHARSH
                        </span>
                        <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase group-hover:text-orange-500/80 transition-colors">
                            System Portfolio // V2.0
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Desktop Navigation - HUD Style */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNavClick(link)}
                                className={`relative px-5 py-2 text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 group overflow-hidden ${activeSection === link.id
                                    ? 'text-orange-400'
                                    : 'text-white/60 hover:text-white'
                                    }`}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {activeSection === link.id && <span className="text-[10px] animate-pulse">►</span>}
                                    {link.title}
                                </span>

                                {/* Hover/Active Background Effect */}
                                <div className={`absolute inset-0 bg-white/5 transform transition-transform duration-300 origin-left ${activeSection === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                    }`}></div>

                                {/* Bottom Border Accent */}
                                <div className={`absolute bottom-0 left-0 h-[1px] bg-orange-500/50 transition-all duration-300 ${activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`}></div>
                            </button>
                        ))}

                        {/* Trailing Decoration */}
                        <div className="w-12 h-px bg-gradient-to-r from-white/20 to-transparent ml-4 hidden md:block"></div>
                    </nav>

                    <ViewsCounter />

                    {/* Mobile Menu Button - Sci-Fi Trigger */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden relative w-10 h-10 flex items-center justify-center border border-white/20 rounded-sm hover:bg-white/5 transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={20} className="text-orange-400" /> : <Menu size={20} className="text-white/80" />}
                        {/* Corner ticks */}
                        <div className="absolute top-0 left-0 w-0.5 h-0.5 bg-white/50"></div>
                        <div className="absolute top-0 right-0 w-0.5 h-0.5 bg-white/50"></div>
                        <div className="absolute bottom-0 left-0 w-0.5 h-0.5 bg-white/50"></div>
                        <div className="absolute bottom-0 right-0 w-0.5 h-0.5 bg-white/50"></div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu - Data Panel Slide Down */}
            <div
                className={`md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="container mx-auto px-6 py-6 flex flex-col gap-2">
                    <div className="text-[10px] tracking-widest text-white/30 mb-2">// NAVIGATION TARGETS</div>
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleNavClick(link)}
                            className={`flex items-center gap-4 p-4 border border-transparent hover:border-white/10 hover:bg-white/5 transition-all text-left group ${activeSection === link.id ? 'bg-white/5 border-orange-500/20' : ''
                                }`}
                        >
                            <span className={`text-xs font-mono transition-colors ${activeSection === link.id ? 'text-orange-400' : 'text-white/40 group-hover:text-orange-400'
                                }`}>0{navLinks.indexOf(link) + 1}</span>

                            <span className={`text-sm tracking-[0.2em] uppercase font-mono ${activeSection === link.id ? 'text-white' : 'text-white/70 group-hover:text-white'
                                }`}>
                                {link.title}
                            </span>

                            {activeSection === link.id && <span className="ml-auto text-orange-400 animate-pulse text-xs">&lt;ACTIVE&gt;</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scanline overlay for pure aesthetics */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.02)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
        </header>
    );
};
