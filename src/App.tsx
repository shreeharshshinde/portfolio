import React, { useState, useRef, useEffect, Suspense, type RefObject } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LoadingScreen } from './components/loading/LoadingScreen';

// Lazy load heavy sections
const AboutSection = React.lazy(() => import('./components/AboutSection').then(module => ({ default: module.AboutSection })));
const SkillsSection = React.lazy(() => import('./components/skills/SkillSelection').then(module => ({ default: module.SkillsSection })));
const ProjectsSection = React.lazy(() => import('./components/ProjectSection').then(module => ({ default: module.ProjectsSection })));
const ContactSection = React.lazy(() => import('./components/ContactSection').then(module => ({ default: module.ContactSection })));
const Footer = React.lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));
const ProjectCanvas = React.lazy(() => import('./components/mission/ProjectCanvas').then(module => ({ default: module.ProjectCanvas })));

export interface NavLink {
    id: string;
    title: string;
    ref: RefObject<HTMLDivElement | null>;
}

const PortfolioHome: React.FC = () => {
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

    // Scroll to top on mount if returning from project
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== '/') {
            navigate('/');
        }
    }, []); // Run only once on mount

    const handleLoadingComplete = (audio: HTMLAudioElement | null) => {
        setIsLoading(false);
        if (audio) {
            setTimeout(() => {
                const fadeInterval = setInterval(() => {
                    if (audio.volume > 0.05) {
                        audio.volume = Math.max(0, audio.volume - 0.05);
                    } else {
                        audio.volume = 0;
                        audio.pause();
                        clearInterval(fadeInterval);
                    }
                }, 1000);
            }, 5000);
        }
    };

    if (isLoading) {
        return <LoadingScreen onComplete={handleLoadingComplete} />;
    }

    return (
        <Routes>
            <Route path="/" element={<PortfolioHome />} />
            <Route path="/mission/:slug" element={
                <Suspense fallback={<div className="h-screen w-screen bg-black" />}>
                    <ProjectCanvas />
                </Suspense>
            } />
        </Routes>
    );
};

export default App;
