import fpPromise from '@fingerprintjs/fingerprintjs';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isSupabaseConfigured = SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_URL.includes('your-project');

const supabase = isSupabaseConfigured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// ---------- Types ----------

export interface AnalyticsStats {
    totalUniqueVisitors: number;
    totalPageViews: number;
    dailyActiveUsers: number;
    newUsers: number;
    returningUsers: number;
    deviceBreakdown: { mobile: number; desktop: number };
    topReferrers: { referrer: string; count: number }[];
    dailyTrend: { date: string; count: number }[];
}

// ---------- Helpers ----------

const getSessionId = (): string => {
    let session = sessionStorage.getItem('visitor_session_id');
    if (!session) {
        session = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);
        sessionStorage.setItem('visitor_session_id', session);
    }
    return session;
};

// ---------- Public API ----------

/**
 * Track the current visit. Returns the unique visitor count.
 * Deduplicates per browser-session (one track per tab lifetime).
 */
export const trackVisit = async (): Promise<number> => {
    try {
        const fp = await fpPromise.load();
        const result = await fp.get();
        const visitorHash = result.visitorId;
        const sessionId = getSessionId();

        // Guard: only track once per session
        if (sessionStorage.getItem('visit_tracked_this_session')) {
            return parseInt(localStorage.getItem('cached_portfolio_views') || '0');
        }

        const metadata = {
            visitor_hash: visitorHash,
            session_id: sessionId,
            page_path: window.location.pathname,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
            screen_width: window.screen.width,
            screen_height: window.screen.height,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            is_mobile: /Mobi|Android/i.test(navigator.userAgent),
        };

        let uniqueCount = 0;

        if (isSupabaseConfigured && supabase) {
            const { data, error } = await supabase.functions.invoke('track-visitor', {
                body: metadata,
            });
            if (!error && data?.unique_visitors) {
                uniqueCount = data.unique_visitors;
            } else {
                console.warn('Analytics track error:', error);
                // Fallback to cache
                const cached = localStorage.getItem('cached_portfolio_views');
                uniqueCount = cached ? parseInt(cached) : 0;
            }
        } else {
            // Supabase not configured — increment local mock
            const cached = localStorage.getItem('cached_portfolio_views');
            uniqueCount = cached ? parseInt(cached) + 1 : 1338;
        }

        sessionStorage.setItem('visit_tracked_this_session', 'true');
        localStorage.setItem('cached_portfolio_views', uniqueCount.toString());
        return uniqueCount;
    } catch (e) {
        console.error('Failed to track visit:', e);
        return parseInt(localStorage.getItem('cached_portfolio_views') || '0');
    }
};

/**
 * Fetch full aggregated analytics from the backend.
 * Falls back to realistic mock data if Supabase is not configured.
 */
export const getAnalyticsStats = async (): Promise<AnalyticsStats> => {
    if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.functions.invoke('get-stats');
        if (error) throw error;
        return data as AnalyticsStats;
    }

    // ---------- Generate realistic mock data ----------
    const today = new Date();
    const dailyTrend = Array.from({ length: 30 }, (_, i) => {
        const d = new Date(today.getTime() - (29 - i) * 24 * 60 * 60 * 1000);
        return {
            date: d.toISOString().split('T')[0],
            count: Math.floor(20 + Math.random() * 60),
        };
    });

    return {
        totalUniqueVisitors: 1338,
        totalPageViews: 2450,
        dailyActiveUsers: 47,
        newUsers: 900,
        returningUsers: 438,
        deviceBreakdown: { mobile: 540, desktop: 798 },
        topReferrers: [
            { referrer: 'google.com', count: 312 },
            { referrer: 'github.com', count: 189 },
            { referrer: 'linkedin.com', count: 145 },
            { referrer: 'Direct', count: 420 },
            { referrer: 'twitter.com', count: 78 },
        ],
        dailyTrend,
    };
};
