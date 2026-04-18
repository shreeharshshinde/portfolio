import React, { useState, useRef, useEffect, Suspense, type RefObject } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LoadingScreen } from './components/loading/LoadingScreen';

// Lazy load heavy sections
const AboutSection = React.lazy(() => import('./components/AboutSection').then(module => ({ default: module.AboutSection })));
const SkillsSection = React.lazy(() => import('./components/skills/SkillSelection').then(module => ({ default: module.SkillsSection })));
const ProjectsSection = React.lazy(() => import('./components/ProjectSection').then(module => ({ default: module.ProjectsSection })));
const ContactSection = React.lazy(() => import('./components/ContactSection').then(module => ({ default: module.ContactSection })));
const Footer = React.lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));
const AnalyticsDashboard = React.lazy(() => import('./components/analytics/AnalyticsDashboard').then(module => ({ default: module.AnalyticsDashboard })));

export interface NavLink {
    id: string;
    title: string;
    ref: RefObject<HTMLDivElement | null>;
}

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('home');
    const [isLoading, setIsLoading] = useState(true);
    const [currentView, setCurrentView] = useState<'main' | 'analytics'>('main');

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
        
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.get('view') === 'analytics' || window.location.pathname === '/analytics') {
            setCurrentView('analytics');
            setIsLoading(false);
        }

        return () => window.removeEventListener('scroll', handleManualScroll);
    }, []);

    const handleLoadingComplete = (audio: HTMLAudioElement | null) => {
        setIsLoading(false);
        // "After some given seconds slowly fades away"
        if (audio) {
            // Keep playing for 5 seconds to overlap with Hero section
            setTimeout(() => {
                // Start fade out
                const fadeInterval = setInterval(() => {
                    if (audio.volume > 0.05) {
                        // Decrease volume gradually
                        audio.volume = Math.max(0, audio.volume - 0.05);
                    } else {
                        // Cleanup
                        audio.volume = 0;
                        audio.pause();
                        clearInterval(fadeInterval);
                    }
                }, 1000); // 200ms * 16 steps (0.8 -> 0) is approx 3.2 seconds fade
            }, 5000);
        }
    };

    if (isLoading) {
        return <LoadingScreen onComplete={handleLoadingComplete} />;
    }

    if (currentView === 'analytics') {
        return (
            <Suspense fallback={<div className="h-screen bg-[#050505] flex items-center justify-center font-mono text-orange-500 animate-pulse tracking-widest text-xs">INITIALIZING...</div>}>
                <AnalyticsDashboard />
            </Suspense>
        );
    }

    return (
        <div className="bg-gray-950 text-white font-sans antialiased">
            <Header navLinks={navLinks} activeSection={activeSection} setActiveSection={setActiveSection} onScroll={handleScroll} />
            <main>
                <section id="home" ref={homeRef} className="h-screen w-full relative">
                    <HeroSection />
                </section>
                <section id="about" ref={aboutRef}>
                    <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center text-white/20">Loading Mission Data...</div>}>
                        <AboutSection />
                    </Suspense>
                </section>
                <section id="skills" ref={skillsRef} className="min-h-screen relative">
                    <Suspense fallback={<div className="h-screen bg-black" />}>
                        <SkillsSection />
                    </Suspense>
                </section>
                <section id="projects" ref={projectsRef}>
                    <Suspense fallback={<div className="h-screen bg-black" />}>
                        <ProjectsSection />
                    </Suspense>
                </section>
                <section id="contact" ref={contactRef}>
                    <Suspense fallback={<div className="h-screen bg-black" />}>
                        <ContactSection />
                    </Suspense>
                </section>
            </main>

            <Suspense fallback={null}>
                <Footer />
            </Suspense>
        </div>
    );
};

export default App;
