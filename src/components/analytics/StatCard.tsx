import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon }) => {
    return (
        <div className="relative group flex flex-col p-4 bg-[#0a0a0a]/80 backdrop-blur-md rounded-sm border border-orange-500/20 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">{title}</span>
                {icon && <div className="text-orange-500/50">{icon}</div>}
            </div>
            
            <div className="flex items-end gap-3 mt-auto">
                <span 
                    className="text-3xl text-orange-400 font-bold leading-none tracking-widest"
                    style={{ 
                        fontFamily: '"Share Tech Mono", monospace',
                        textShadow: '0 0 5px rgba(249,115,22,0.8), 0 0 10px rgba(249,115,22,0.5)' 
                    }}
                >
                    {value}
                </span>
                
                {trend && (
                    <span className={`text-xs font-mono mb-1 ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {trend.isPositive ? '▲' : '▼'} {Math.abs(trend.value)}%
                    </span>
                )}
            </div>
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-1 h-1 bg-white/30"></div>
            <div className="absolute bottom-0 right-0 w-1 h-1 bg-white/30"></div>
        </div>
    );
};
