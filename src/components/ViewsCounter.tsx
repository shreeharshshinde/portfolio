import { Eye } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export const ViewsCounter: React.FC = () => {
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        const fetchViews = async () => {
            try {
                // Fetch to counterapi.dev to increment and get the current view count
                const namespace = 'shreeharsh_portfolio';
                const name = 'global_views';
                const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${name}/up`);

                if (response.ok) {
                    const data = await response.json();
                    setViews(data.count);
                    localStorage.setItem('cached_portfolio_views', data.count.toString());
                } else {
                    throw new Error('API request failed');
                }
            } catch (error) {
                console.warn("Could not fetch global views. Falling back to local cache.");
                const cached = localStorage.getItem('cached_portfolio_views');
                const nextCount = cached ? parseInt(cached) + 1 : 1337; // cool starting number if no data
                setViews(nextCount);
                localStorage.setItem('cached_portfolio_views', nextCount.toString());
            }
        };

        fetchViews();
    }, []);

    return (
        <div className="relative group flex items-center justify-center p-1 cursor-default">
            {/* Tech border effect */}
            <div className="absolute inset-0 border border-white/10 group-hover:border-orange-500/50 rounded-sm transition-colors duration-300"></div>

            {/* Background glowing layer */}
            <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm"></div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-1 h-1 bg-white/50 group-hover:bg-orange-400/80 transition-colors"></div>
            <div className="absolute bottom-0 right-0 w-1 h-1 bg-white/50 group-hover:bg-orange-400/80 transition-colors"></div>

            <div className="relative z-10 flex items-center gap-3 px-3 py-1.5 bg-[#0a0a0a]/80 backdrop-blur-md rounded-sm border border-orange-500/20 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-center relative">
                    {views === null ? (
                        <div className="w-4 h-4 border-2 border-orange-500/30 border-t-orange-400 rounded-full animate-spin"></div>
                    ) : (
                        <Eye size={18} className="text-orange-400 group-hover:text-orange-300 transition-colors drop-shadow-[0_0_5px_rgba(249,115,22,1)]" />
                    )}
                </div>

                <div className="flex items-center justify-center pt-0.5">
                    <span 
                        className="text-lg text-orange-400 leading-none tracking-[0.15em] transition-all duration-300 pointer-events-none select-none"
                        style={{ 
                            fontFamily: '"Share Tech Mono", monospace',
                            textShadow: '0 0 5px rgba(249,115,22,0.8), 0 0 10px rgba(249,115,22,0.6)' 
                        }}
                    >
                        {views === null ? '------' : views.toString().padStart(6, '0')}
                    </span>
                </div>
            </div>
        </div>
    );
};
