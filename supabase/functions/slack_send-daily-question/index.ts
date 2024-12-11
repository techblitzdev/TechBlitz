import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { corsHeaders } from '../_shared/cors.ts';

// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

console.log('Hello from Functions!');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // get today's date
  const today = new Date();

  // get the day of the week
  const day = today.getDay();

  // if today is Sunday or Saturday, return
  if (day === 0 || day === 6) {
    return new Response("It's the weekend! No daily question today.");
  }

  // get the current time
  const time = today.getHours();

  // if it's before 9am, return

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization') ?? '' }
        }
      }
    );

    const { data, error } = await supabase
      .from('Questions')
      .select('uid, correctAnswer')
      .eq(questionDate, today.toISOString().split('T')[0])
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error('No question found for today');
    }

    return new Response(data);
  } catch (error) {
    console.error(error);
  }

  // const { name } = await req.json()
  // const data = {
  //   message: `Hello ${name}!`,
  // }

  // return new Response(
  //   JSON.stringify(data),
  //   { headers: { "Content-Type": "application/json" } },
  // )
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/slack_send-daily-question' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
