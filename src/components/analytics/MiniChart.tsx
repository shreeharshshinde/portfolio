import React from 'react';

interface MiniChartProps {
    data: number[];
    color?: string;
    height?: number;
}

export const MiniChart: React.FC<MiniChartProps> = ({ data = [], color = '#f97316', height = 40 }) => {
    if (!data.length) return <div style={{ height }} className="w-full flex items-center justify-center text-white/20 text-[10px]">NO DATA</div>;

    const max = Math.max(...data, 1);
    const min = Math.min(...data, 0);
    const range = max - min || 1;

    return (
        <div style={{ height }} className="w-full flex items-end gap-1 overflow-hidden opacity-80">
            {data.map((val, i) => {
                const percent = ((val - min) / range) * 100;
                return (
                    <div 
                        key={i} 
                        className="flex-1 bg-orange-500 hover:bg-orange-400 transition-colors duration-300 rounded-t-sm"
                        style={{ 
                            height: `${Math.max(percent, 5)}%`,
                            backgroundColor: color,
                            boxShadow: `0 0 5px ${color}`
                        }}
                        title={`Value: ${val}`}
                    ></div>
                );
            })}
        </div>
    );
};
