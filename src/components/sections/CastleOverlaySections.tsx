import React from 'react';

interface CastleOverlaySectionsProps {
    progress: number;
}

export const CastleOverlaySections: React.FC<CastleOverlaySectionsProps> = ({ progress }) => {

    // Helper: compute opacity with smooth fade-in and fade-out based on progress
    const getZoneOpacity = (start: number, end: number) => {
        const span = end - start;
        const fadeIn = start + span * 0.2;
        const fadeOut = end - span * 0.2;

        if (progress < start || progress > end) return 0;
        if (progress < fadeIn) return (progress - start) / (fadeIn - start);
        if (progress > fadeOut) return (end - progress) / (end - fadeOut);
        return 1;
    };

    return (
        <div className="ui-layer fixed inset-0 pointer-events-none flex items-center justify-center p-6">
            {/* ── ZONE 1: THE FALL (0 - 10%) ──────────────────────────────── */}
            <div
                className="max-w-2xl text-center transition-all duration-700"
                style={{
                    opacity: getZoneOpacity(0.01, 0.10),
                    transform: `translateY(${(0.05 - progress) * 80}px)`,
                }}
            >
                <div className="font-jp text-sm tracking-widest text-neutral-400 mb-2">
                    無限城への墜落
                </div>
                <h1 className="font-title text-display-lg font-black text-white glow-text mb-4">
                    THE DESCENT
                </h1>
                <p className="text-neutral-300 text-sm sm:text-base font-light max-w-lg mx-auto leading-relaxed">
                    Falling through the shifting architecture of the Infinity Castle. Scroll down to navigate each domain.
                </p>
            </div>

            {/* ── ZONE 2: GRAND CORRIDOR (10 - 25%) ───────────────────────── */}
            <div
                className="max-w-3xl text-center transition-all duration-700"
                style={{
                    opacity: getZoneOpacity(0.10, 0.25),
                    transform: `translateY(${(0.175 - progress) * 80}px)`,
                }}
            >
                <div className="font-jp text-sm tracking-widest text-amber-300/80 mb-2">
                    大回廊 • 拠点
                </div>
                <h2 className="font-title text-display-lg font-bold text-white mb-3">
                    SHREEHARSH SHINDE
                </h2>
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                    <span className="glass px-3 py-1 text-xs tracking-wider uppercase text-amber-200">
                        Full-Stack Engineer
                    </span>
                    <span className="glass px-3 py-1 text-xs tracking-wider uppercase text-purple-200">
                        Creative 3D Web
                    </span>
                    <span className="glass px-3 py-1 text-xs tracking-wider uppercase text-neutral-300">
                        Systems Architect
                    </span>
                </div>
                <p className="text-neutral-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                    Forging high-performance digital experiences with React, Three.js, and modern distributed systems.
                </p>
            </div>

            {/* ── ZONE 3: RENGOKU'S FLAME WING (25 - 40%) ─────────────────── */}
            <div
                className="max-w-3xl text-center transition-all duration-700"
                style={{
                    opacity: getZoneOpacity(0.25, 0.40),
                    transform: `translateY(${(0.325 - progress) * 80}px)`,
                }}
            >
                <div className="font-jp text-sm tracking-widest text-orange-400 mb-2">
                    炎柱 • 煉獄 杏寿郎
                </div>
                <h2 className="font-title text-display-lg font-bold text-white mb-3 glow-text" style={{ textShadow: '0 0 30px #FF4500' }}>
                    BATTLE ARCHIVES
                </h2>
                <p className="text-orange-100/90 text-sm sm:text-base max-w-lg mx-auto mb-6">
                    &ldquo;Set your heart ablaze.&rdquo; Explore flagship web projects, production applications, and interactive experiments.
                </p>
                <div className="inline-block glass px-4 py-2 border border-orange-500/40 text-xs tracking-widest uppercase text-orange-300 font-mono">
                    Scroll Further to Enter Arena
                </div>
            </div>

            {/* ── ZONE 4: AKAZA'S ARENA (40 - 55%) ────────────────────────── */}
            <div
                className="max-w-3xl text-center transition-all duration-700"
                style={{
                    opacity: getZoneOpacity(0.40, 0.55),
                    transform: `translateY(${(0.475 - progress) * 80}px)`,
                }}
            >
                <div className="font-jp text-sm tracking-widest text-red-400 mb-2">
                    上弦の参 • 猗窩座
                </div>
                <h2 className="font-title text-display-lg font-bold text-white mb-3" style={{ textShadow: '0 0 30px #FF0000' }}>
                    COMBAT DISCIPLINES
                </h2>
                <p className="text-red-100/90 text-sm sm:text-base max-w-lg mx-auto mb-6">
                    Mastery of Frontend, Distributed Backends, WebGL Graphics, and Cloud Infrastructure.
                </p>
                <div className="flex justify-center gap-2 flex-wrap max-w-md mx-auto">
                    {['React', 'TypeScript', 'Three.js / WebGL', 'Node.js', 'Go', 'Docker', 'PostgreSQL'].map((tech) => (
                        <span key={tech} className="glass px-2.5 py-1 text-xs font-mono text-neutral-300 border border-neutral-700">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* ── ZONE 5: DOUMA'S PALACE (55 - 70%) ───────────────────────── */}
            <div
                className="max-w-3xl text-center transition-all duration-700"
                style={{
                    opacity: getZoneOpacity(0.55, 0.70),
                    transform: `translateY(${(0.625 - progress) * 80}px)`,
                }}
            >
                <div className="font-jp text-sm tracking-widest text-cyan-300 mb-2">
                    上弦の弐 • 童磨
                </div>
                <h2 className="font-title text-display-lg font-bold text-white mb-3" style={{ textShadow: '0 0 30px #ADD8E6' }}>
                    DEMON COMPENDIUM
                </h2>
                <p className="text-cyan-100/90 text-sm sm:text-base max-w-lg mx-auto mb-4">
                    The background story, philosophy, engineering trajectory, and competitive programming origins.
                </p>
            </div>

            {/* ── ZONE 6: KOKUSHIBO'S SANCTUM (70 - 85%) ──────────────────── */}
            <div
                className="max-w-3xl text-center transition-all duration-700"
                style={{
                    opacity: getZoneOpacity(0.70, 0.85),
                    transform: `translateY(${(0.775 - progress) * 80}px)`,
                }}
            >
                <div className="font-jp text-sm tracking-widest text-purple-400 mb-2">
                    上弦の壱 • 黒死牟
                </div>
                <h2 className="font-title text-display-lg font-bold text-white mb-3" style={{ textShadow: '0 0 30px #4400AA' }}>
                    MOON SCROLLS
                </h2>
                <p className="text-purple-100/90 text-sm sm:text-base max-w-lg mx-auto mb-4">
                    Deep dives into 3D graphics optimization, shader engineering, and full-stack software architecture.
                </p>
            </div>

            {/* ── ZONE 7: GRAND HALL (85 - 100%) ──────────────────────────── */}
            <div
                className="max-w-3xl text-center transition-all duration-700"
                style={{
                    opacity: getZoneOpacity(0.85, 1.0),
                    transform: `translateY(${(0.925 - progress) * 80}px)`,
                }}
            >
                <div className="font-jp text-sm tracking-widest text-neutral-400 mb-2">
                    最終決戦 • 無限城大広間
                </div>
                <h2 className="font-title text-display-lg font-bold text-white mb-3 glow-text">
                    FINAL AUDIENCE
                </h2>
                <p className="text-neutral-300 text-sm sm:text-base max-w-lg mx-auto mb-6">
                    Ready to build something extraordinary together? Send a Kasugai Crow or reach out directly.
                </p>
                <div className="flex justify-center gap-4 pointer-events-auto">
                    <a
                        href="mailto:shindeshreeharsh157@gmail.com"
                        className="glass px-6 py-3 font-title text-xs tracking-widest uppercase text-white hover:border-amber-400 transition-colors"
                    >
                        Send a Message
                    </a>
                    <a
                        href="https://github.com/shreeharsh157"
                        target="_blank"
                        rel="noreferrer"
                        className="glass px-6 py-3 font-title text-xs tracking-widest uppercase text-neutral-300 hover:text-white transition-colors"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    );
};
