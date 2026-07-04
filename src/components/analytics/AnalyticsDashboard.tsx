import React, { useEffect, useState } from 'react';
import { getAnalyticsStats, type AnalyticsStats } from '../../lib/analytics';
import { StatCard } from './StatCard';
import { MiniChart } from './MiniChart';
import { Users, Eye, ArrowLeft, Monitor, Smartphone, Repeat, Activity, Globe } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
    const [stats, setStats] = useState<AnalyticsStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getAnalyticsStats();
                setStats(data);
            } catch (err) {
                console.error('Failed to load stats', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-orange-500 font-mono tracking-widest animate-pulse text-sm">
                INITIALIZING_ANALYTICS_CORE...
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-red-500 font-mono tracking-widest text-sm">
                SYSTEM_FAILURE: UNABLE TO CONNECT TO DATA_LAKE
            </div>
        );
    }

    const totalDevices = stats.deviceBreakdown.desktop + stats.deviceBreakdown.mobile || 1;

    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans relative overflow-x-hidden">
            {/* Scanline overlay */}
            <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.006),rgba(0,255,0,0.006),rgba(0,0,255,0.006))] bg-[length:100%_4px,3px_100%] opacity-30 z-50"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* ───── Header ───── */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 border-b border-orange-500/20 pb-6 gap-6">
                    <div>
                        <h1
                            className="text-2xl md:text-3xl font-bold tracking-[0.2em] text-orange-400"
                            style={{ fontFamily: '"Share Tech Mono", monospace' }}
                        >
                            SYSTEM_ANALYTICS
                        </h1>
                        <p className="text-orange-500/50 tracking-widest text-xs font-mono mt-2 uppercase">
                            // Global Reach &amp; Telemetry Dashboard
                        </p>
                    </div>
                    <button
                        onClick={() => (window.location.href = '/')}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-widest border border-white/20 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all text-white/50 hover:text-white rounded-sm"
                    >
                        <ArrowLeft size={14} /> RETURN_TO_BASE
                    </button>
                </div>

                {/* ───── KPI Cards ───── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        title="UNIQUE_VISITORS"
                        value={stats.totalUniqueVisitors.toLocaleString()}
                        icon={<Users size={18} />}
                    />
                    <StatCard
                        title="PAGE_VIEWS"
                        value={stats.totalPageViews.toLocaleString()}
                        icon={<Eye size={18} />}
                    />
                    <StatCard
                        title="DAU"
                        value={stats.dailyActiveUsers.toLocaleString()}
                        icon={<Activity size={18} />}
                    />
                    <StatCard
                        title="RETURNING"
                        value={stats.returningUsers.toLocaleString()}
                        icon={<Repeat size={18} />}
                    />
                </div>

                {/* ───── Charts Row ───── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
                    {/* Traffic trend (30 days) */}
                    <div className="lg:col-span-2 border border-white/5 bg-white/[0.02] p-6 rounded-sm">
                        <h3 className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-8">
                            Traffic_Trend // 30 Days
                        </h3>
                        <MiniChart
                            data={stats.dailyTrend.map(d => d.count)}
                            height={140}
                        />
                        <div className="flex justify-between mt-3 text-[9px] text-white/20 font-mono">
                            <span>{stats.dailyTrend[0]?.date}</span>
                            <span>{stats.dailyTrend[stats.dailyTrend.length - 1]?.date}</span>
                        </div>
                    </div>

                    {/* Device breakdown */}
                    <div className="border border-white/5 bg-white/[0.02] p-6 rounded-sm">
                        <h3 className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-6">
                            Device_Telemetry
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs font-mono mb-2 text-white/70">
                                    <span className="flex items-center gap-2">
                                        <Monitor size={14} className="text-orange-400" /> Desktop
                                    </span>
                                    <span>{stats.deviceBreakdown.desktop}</span>
                                </div>
                                <div className="h-2 bg-black rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-orange-500 rounded-full transition-all duration-700"
                                        style={{
                                            width: `${(stats.deviceBreakdown.desktop / totalDevices) * 100}%`,
                                            boxShadow: '0 0 6px rgba(249,115,22,0.6)',
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-mono mb-2 text-white/70">
                                    <span className="flex items-center gap-2">
                                        <Smartphone size={14} className="text-orange-400" /> Mobile
                                    </span>
                                    <span>{stats.deviceBreakdown.mobile}</span>
                                </div>
                                <div className="h-2 bg-black rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-orange-400/60 rounded-full transition-all duration-700"
                                        style={{
                                            width: `${(stats.deviceBreakdown.mobile / totalDevices) * 100}%`,
                                            boxShadow: '0 0 6px rgba(249,115,22,0.4)',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Percentage summary */}
                        <div className="mt-6 pt-4 border-t border-white/5 flex justify-between text-[10px] font-mono text-white/30">
                            <span>Desktop {Math.round((stats.deviceBreakdown.desktop / totalDevices) * 100)}%</span>
                            <span>Mobile {Math.round((stats.deviceBreakdown.mobile / totalDevices) * 100)}%</span>
                        </div>
                    </div>
                </div>

                {/* ───── Bottom Row ───── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Top Referrers */}
                    <div className="border border-white/5 bg-white/[0.02] p-6 rounded-sm">
                        <h3 className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-6 flex items-center gap-2">
                            <Globe size={12} className="text-orange-500/50" /> Top_Referrers
                        </h3>
                        <div className="space-y-3">
                            {stats.topReferrers.map((ref, i) => {
                                const maxRef = stats.topReferrers[0]?.count || 1;
                                return (
                                    <div key={i}>
                                        <div className="flex justify-between text-xs font-mono mb-1">
                                            <span className="text-white/60 truncate max-w-[200px]">{ref.referrer}</span>
                                            <span className="text-orange-400/80">{ref.count}</span>
                                        </div>
                                        <div className="h-1 bg-black/50 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-orange-500/40 rounded-full transition-all duration-500"
                                                style={{ width: `${(ref.count / maxRef) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                            {stats.topReferrers.length === 0 && (
                                <p className="text-white/20 text-xs font-mono">NO_REFERRER_DATA</p>
                            )}
                        </div>
                    </div>

                    {/* New vs Returning */}
                    <div className="border border-white/5 bg-white/[0.02] p-6 rounded-sm flex flex-col justify-between">
                        <h3 className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-6">
                            User_Classification
                        </h3>
                        <div className="flex items-center justify-center gap-12 flex-1">
                            {/* New */}
                            <div className="text-center">
                                <span
                                    className="text-4xl text-orange-400 block mb-2"
                                    style={{
                                        fontFamily: '"Share Tech Mono", monospace',
                                        textShadow: '0 0 8px rgba(249,115,22,0.7)',
                                    }}
                                >
                                    {stats.newUsers.toLocaleString()}
                                </span>
                                <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">New</span>
                            </div>
                            {/* Divider */}
                            <div className="h-16 w-px bg-orange-500/20"></div>
                            {/* Returning */}
                            <div className="text-center">
                                <span
                                    className="text-4xl text-orange-300/80 block mb-2"
                                    style={{
                                        fontFamily: '"Share Tech Mono", monospace',
                                        textShadow: '0 0 8px rgba(249,115,22,0.4)',
                                    }}
                                >
                                    {stats.returningUsers.toLocaleString()}
                                </span>
                                <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Returning</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ───── Footer ───── */}
                <div className="mt-12 pt-4 border-t border-white/5 text-center">
                    <p className="text-[10px] font-mono tracking-widest text-white/20 uppercase">
                        // Shreeharsh Portfolio Analytics Core v1.0. All data privacy-first &amp; anonymized.
                    </p>
                </div>
            </div>
        </div>
    );
};
