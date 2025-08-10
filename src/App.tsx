import React, { useState, useRef, useEffect } from 'react';
import type { RefObject } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/skills/SkillSelection';
import { ProjectsSection } from './components/ProjectSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export interface NavLink {
    id: string;
    title: string;
    ref: RefObject<HTMLDivElement | null>;
}

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('home');

    const homeRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    const navLinks: NavLink[] = [
        { id: 'home', title: 'Home', ref: homeRef },
        { id: 'about', title: 'About', ref: aboutRef },
        { id: 'skills', title: 'Skills', ref: skillsRef },
        { id: 'projects', title: 'Projects', ref: projectsRef },
        { id: 'contact', title: 'Contact', ref: contactRef },
    ];

    const handleScroll = (ref: RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    useEffect(() => {
        const handleManualScroll = () => {
            const sections = [homeRef, aboutRef, skillsRef, projectsRef, contactRef];
            const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'];
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (let i = sections.length - 1; i >= 0; i--) {
                if (sections[i].current?.offsetTop !== undefined && sections[i].current!.offsetTop <= scrollPosition) {
                    setActiveSection(sectionIds[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleManualScroll);
        return () => window.removeEventListener('scroll', handleManualScroll);
    }, []);

    return (
        <div className="bg-gray-900 text-white font-sans antialiased">
            <Header navLinks={navLinks} activeSection={activeSection} setActiveSection={setActiveSection} onScroll={handleScroll} />
            <main>
                <section id="home" ref={homeRef} className="h-screen w-full relative">
                    <HeroSection />
                </section>
                <section id="about" ref={aboutRef} className="bg-gray-800">
                    <AboutSection />
                </section>
                <section id="skills" ref={skillsRef} className="h-screen relative">
                    <SkillsSection />
                </section>
                <section id="projects" ref={projectsRef} className="bg-gray-800">
                    <ProjectsSection />
                </section>
                <section id="contact" ref={contactRef}>
                    <ContactSection />
                </section>
            </main>
            
            <Footer />
        </div>
    );
};

export default App;
