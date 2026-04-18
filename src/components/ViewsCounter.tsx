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

            <div className="relative z-10 flex items-center gap-3 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-sm">
                <div className="flex items-center justify-center relative">
                    {views === null ? (
                        <div className="w-3 h-3 border-2 border-orange-500/30 border-t-orange-400 rounded-full animate-spin"></div>
                    ) : (
                        <Eye size={14} className="text-orange-400 group-hover:text-orange-300 transition-colors drop-shadow-[0_0_2px_rgba(249,115,22,0.8)]" />
                    )}
                </div>

                <div className="flex flex-col">
                    <span className="text-[8px] tracking-[0.2em] text-white/40 uppercase leading-none mb-1 group-hover:text-white/60 transition-colors">
                        VISITORS
                    </span>
                    <span className="text-xs font-mono text-white font-bold leading-none tracking-wider group-hover:text-orange-100 transition-colors">
                        {views === null ? '----' : views.toLocaleString().padStart(6, '0')}
                    </span>
                </div>
            </div>
        </div>
    );
};
