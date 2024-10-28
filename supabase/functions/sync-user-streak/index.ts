// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { createClient, type SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts'

/**
 * We need to get the question for the current day
 * 
 * We only need to return:
 * - the uid
 * - the correct answer
 */
const getTodaysQuestion = async (supabaseClient: SupabaseClient) => {
  console.log('hit getTodaysQuestion inside sync-user-streak')

  // get the current date
  const today = new Date().toISOString().split('T')[0]

  const { data, error: questionsError } =
    await supabaseClient
      .from('Questions')
      .select('*')
      .eq('questionDate', today)
      .limit(1)
  
  console.log('questions', data)
  console.log('today', today)
  
  if (questionsError) throw questionsError

  return {
    data,
    today
  }
}

const getTodaysAnswers = async (supabaseClient: SupabaseClient, today: string, questionUid: string) => {
  console.log('hit getTodaysAnswers inside sync-user-streak')
  // now go and get the questions that have been answered for the current day
  const { data: answers, error: answersError } = 
    await supabaseClient
      .from('Answers')
      .select('*')
      .eq('questionUid', questionUid)
  
  console.log('answers', answers)
  
  if (answersError) throw answersError

  return { answers }
}

const getCorrectAnswers = (answers) => {
  console.log('hit getCorrectAnswers inside sync-user-streak')
  
  // Filter answers to get users who answered correctly
  const userAnswers = answers
    .filter(answer => answer.correctAnswer === true)
    .map(answer => answer.userUid)
  
  console.log('userAnswers', userAnswers)
  
  return {
    userAnswers
  }
}

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // First get the token from the Authorization header
  const token = req.headers.get('Authorization')

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );
  
    const { data, today } = await getTodaysQuestion(supabaseClient)

    const { answers } = await getTodaysAnswers(supabaseClient, today, data[0].uid)

    // now we have the answers, we need to check which user's answered the question
    // correctly and update their streak
    const { userAnswers } = getCorrectAnswers(supabaseClient, answers)

    // now we need to get the user's who answered the question correctly
    // and update their streak
    console.log({
      userAnswers
    })


    return new Response(JSON.stringify({ user, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/sync-user-streak' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
