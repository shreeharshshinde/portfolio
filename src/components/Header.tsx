import React, { useState, useEffect } from 'react';
import type { RefObject } from 'react';
import type { NavLink } from '../App';

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
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            isScrolled 
                ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl border-b border-gray-800/50' 
                : 'bg-gray-900/80 backdrop-blur-sm shadow-lg'
        }`}>
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo/Brand */}
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                        Shreeharsh Shinde
                    </div>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-8">
                    {navLinks.map((link, index) => (
                        <li key={link.id}>
                            <button
                                onClick={() => handleNavClick(link)}
                                className={`relative text-lg font-semibold transition-all duration-300 group ${
                                    activeSection === link.id
                                        ? 'text-cyan-400'
                                        : 'text-gray-300 hover:text-cyan-400'
                                }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {link.title}
                                
                                {/* Underline Effect */}
                                <div className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full ${
                                    activeSection === link.id ? 'w-full' : ''
                                }`}></div>
                                
                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-cyan-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center space-y-1.5 group"
                >
                    <span className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                        isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}></span>
                    <span className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                        isMobileMenuOpen ? 'opacity-0' : ''
                    }`}></span>
                    <span className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                        isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}></span>
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-500 overflow-hidden ${
                isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="bg-gray-800/95 backdrop-blur-md border-t border-gray-700/50">
                    <ul className="container mx-auto px-6 py-4 space-y-4">
                        {navLinks.map((link, index) => (
                            <li key={link.id}>
                                <button
                                    onClick={() => handleNavClick(link)}
                                    className={`w-full text-left text-lg font-semibold transition-all duration-300 py-3 px-4 rounded-xl ${
                                        activeSection === link.id
                                            ? 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-400 border border-cyan-400/30'
                                            : 'text-gray-300 hover:bg-gray-700/50 hover:text-cyan-400'
                                    }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            activeSection === link.id ? 'bg-cyan-400' : 'bg-gray-500'
                                        }`}></div>
                                        {link.title}
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800/50">
                <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
                    style={{ 
                        width: `${(navLinks.findIndex(link => link.id === activeSection) + 1) / navLinks.length * 100}%` 
                    }}
                ></div>
            </div>
        </header>
    );
};
