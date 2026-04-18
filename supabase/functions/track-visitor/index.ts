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

    const payload = await req.json()
    const country = req.headers.get('cf-ipcountry') || req.headers.get('x-country') || 'Unknown'

    // Insert visitor event
    const { error: insertError } = await supabase
      .from('visitor_events')
      .insert({
        ...payload,
        country
      })

    if (insertError) throw insertError

    // Get unique visitor count
    const { count } = await supabase
      .from('visitor_events')
      .select('visitor_hash', { count: 'exact', head: true })

    // Approximate unique count via the view
    const { count: uniqueCount } = await supabase
      .from('unique_visitors')
      .select('*', { count: 'exact', head: true })

    return new Response(
      JSON.stringify({ success: true, unique_visitors: uniqueCount || 0, total_views: count || 0 }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
