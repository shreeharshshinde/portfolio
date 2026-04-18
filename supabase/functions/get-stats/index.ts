// @ts-nocheck — This file runs in Deno on Supabase Edge Functions, not in the Vite build
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch all events
    const { data: events, error: fetchError } = await supabase
      .from('visitor_events')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) throw fetchError

    const allEvents = events || []
    const totalPageViews = allEvents.length

    // Unique visitors
    const hashSet = new Set(allEvents.map(e => e.visitor_hash))
    const totalUniqueVisitors = hashSet.size

    // New vs returning
    const hashCounts = {}
    allEvents.forEach(e => {
      hashCounts[e.visitor_hash] = (hashCounts[e.visitor_hash] || 0) + 1
    })
    const returningUsers = Object.values(hashCounts).filter(c => c > 1).length
    const newUsers = totalUniqueVisitors - returningUsers

    // Device breakdown
    const mobileCount = allEvents.filter(e => e.is_mobile).length
    const desktopCount = totalPageViews - mobileCount

    // Daily active users (unique hashes in last 24h)
    const now = new Date()
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const recentHashes = new Set(
      allEvents
        .filter(e => new Date(e.created_at) >= oneDayAgo)
        .map(e => e.visitor_hash)
    )
    const dailyActiveUsers = recentHashes.size

    // Top referrers
    const referrerCounts = {}
    allEvents.forEach(e => {
      const ref = e.referrer || 'Direct'
      referrerCounts[ref] = (referrerCounts[ref] || 0) + 1
    })
    const topReferrers = Object.entries(referrerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([referrer, count]) => ({ referrer, count }))

    // Daily trend (last 30 days, unique visitors per day)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const dailyMap = {}
    for (let i = 0; i < 30; i++) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const key = d.toISOString().split('T')[0]
      dailyMap[key] = new Set()
    }
    allEvents
      .filter(e => new Date(e.created_at) >= thirtyDaysAgo)
      .forEach(e => {
        const key = new Date(e.created_at).toISOString().split('T')[0]
        if (dailyMap[key]) dailyMap[key].add(e.visitor_hash)
      })
    const dailyTrend = Object.entries(dailyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, hashesSet]) => ({ date, count: hashesSet.size }))

    return new Response(
      JSON.stringify({
        totalUniqueVisitors,
        totalPageViews,
        dailyActiveUsers,
        newUsers,
        returningUsers,
        deviceBreakdown: { mobile: mobileCount, desktop: desktopCount },
        topReferrers,
        dailyTrend,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
