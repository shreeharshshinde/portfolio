import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CastleScene } from './components/castle/CastleScene';
import { CastleHUD } from './components/ui/CastleHUD';
import { CastleOverlaySections } from './components/sections/CastleOverlaySections';
import { WING_CONFIGS } from './data/hashira';
import type { CastleWing } from './types';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Setup GSAP ScrollTrigger
    useGSAP(
        () => {
            if (!scrollContainerRef.current) return;

            const st = ScrollTrigger.create({
                trigger: scrollContainerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.8,
                onUpdate: (self) => {
                    setScrollProgress(self.progress);
                },
            });

            return () => {
                st.kill();
            };
        },
        { scope: scrollContainerRef }
    );

    // Quick jump to wing from HUD navigation
    const handleJumpToWing = (wingId: CastleWing) => {
        const wing = WING_CONFIGS.find((w) => w.id === wingId);
        if (!wing) return;

        // Target mid-point of the wing's range
        const targetProgress = wing.scrollStart + (wing.scrollEnd - wing.scrollStart) * 0.35;
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const targetY = targetProgress * totalScroll;

        window.scrollTo({
            top: targetY,
            behavior: 'smooth',
        });
    };

    return (
        <div ref={scrollContainerRef} className="relative w-full bg-black text-white" style={{ height: '800vh' }}>
            {/* Fixed 3D Infinity Castle Scene */}
            <CastleScene progress={scrollProgress} />

            {/* Interactive HUD (Header, Progress Bar, Wing Navigation) */}
            <CastleHUD progress={scrollProgress} onJumpToWing={handleJumpToWing} />

            {/* Scroll-Triggered Story & Content Overlays */}
            <CastleOverlaySections progress={scrollProgress} />
        </div>
    );
};

export default App;
