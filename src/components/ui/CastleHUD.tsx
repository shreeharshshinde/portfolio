import React from 'react';
import { WING_CONFIGS, getActiveWing } from '../../data/hashira';
import type { CastleWing } from '../../types';

interface CastleHUDProps {
    progress: number;
    onJumpToWing: (wingId: CastleWing) => void;
}

export const CastleHUD: React.FC<CastleHUDProps> = ({ progress, onJumpToWing }) => {
    const activeWing = getActiveWing(progress);

    return (
        <div className="ui-layer fixed inset-0 pointer-events-none select-none">
            {/* ── Top Header Bar ─────────────────────────────────────────── */}
            <header className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-4">
                    <span className="font-title text-xl font-bold tracking-widest text-white glow-text">
                        SHREEHARSH
                    </span>
                    <span className="text-xs uppercase tracking-widest text-neutral-400 border border-neutral-700/60 px-2 py-0.5 rounded-xs">
                        V3.0
                    </span>
                    <span className="font-jp text-sm text-neutral-500 tracking-wider hidden sm:inline">
                        無限城
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <span className="text-xs font-mono text-neutral-400">
                        {Math.round(progress * 100)}%
                    </span>
                    <div className="w-24 sm:w-36 h-[2px] bg-neutral-800 rounded-full overflow-hidden">
                        <div
                            className="h-full transition-all duration-150 ease-out"
                            style={{
                                width: `${Math.round(progress * 100)}%`,
                                backgroundColor: activeWing.lightColor,
                                boxShadow: `0 0 8px ${activeWing.lightColor}`,
                            }}
                        />
                    </div>
                </div>
            </header>

            {/* ── Right-Side Wing Navigation Dots ────────────────────────── */}
            <nav className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-end gap-4 pointer-events-auto">
                {WING_CONFIGS.map((wing) => {
                    const isActive = activeWing.id === wing.id;
                    return (
                        <button
                            key={wing.id}
                            onClick={() => onJumpToWing(wing.id)}
                            className="group flex items-center gap-3 cursor-pointer py-1 text-right focus:outline-none"
                            aria-label={`Jump to ${wing.label}`}
                        >
                            <span
                                className={`text-xs uppercase tracking-widest transition-all duration-300 font-title opacity-0 group-hover:opacity-100 ${
                                    isActive ? 'opacity-100 text-white font-bold' : 'text-neutral-400'
                                }`}
                            >
                                {wing.label}
                            </span>
                            <div
                                className={`rounded-full transition-all duration-300 ${
                                    isActive
                                        ? 'w-3 h-3 scale-125'
                                        : 'w-1.5 h-1.5 opacity-40 group-hover:opacity-100 group-hover:scale-125'
                                }`}
                                style={{
                                    backgroundColor: isActive ? wing.lightColor : '#ffffff',
                                    boxShadow: isActive ? `0 0 10px ${wing.lightColor}` : 'none',
                                }}
                            />
                        </button>
                    );
                })}
            </nav>

            {/* ── Bottom-Left Active Wing Card ───────────────────────────── */}
            <div className="absolute bottom-8 left-8 pointer-events-auto">
                <div className="glass px-5 py-3 border-l-2 transition-colors duration-500" style={{ borderLeftColor: activeWing.lightColor }}>
                    <div className="text-[10px] tracking-widest text-neutral-400 uppercase font-mono">
                        Current Chamber
                    </div>
                    <div className="font-title text-lg sm:text-xl font-bold tracking-wider text-white">
                        {activeWing.label}
                    </div>
                    {activeWing.demonName && (
                        <div className="text-xs text-neutral-400 font-jp tracking-wider mt-0.5">
                            Domain: {activeWing.demonName}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Initial Scroll Down Cue ─────────────────────────────────── */}
            {progress < 0.04 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center flex flex-col items-center gap-2 animate-breathe pointer-events-none">
                    <span className="text-xs uppercase tracking-widest text-neutral-400 font-title">
                        Scroll to Descend
                    </span>
                    <div className="w-4 h-7 border border-neutral-500 rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-neutral-300 rounded-full animate-bounce" />
                    </div>
                </div>
            )}
        </div>
    );
};
