import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { corsHeaders } from '../_shared/cors.ts';

/**
 * We need to get the question for the previous day
 *
 * We only need to return:
 * - the uid
 * - the correct answer
 */
const getPreviousDaysQuestion = async (supabaseClient: SupabaseClient) => {
  console.log('hit getPreviousDaysQuestion inside sync-user-streak');

  // get the previous day's date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const previousDay = yesterday.toISOString().split('T')[0];

  const { data, error: questionsError } = await supabaseClient
    .from('Questions')
    .select('*')
    .eq('questionDate', previousDay)
    .limit(1);

  console.log('questions', data);
  console.log('previousDay', previousDay);

  if (questionsError) throw questionsError;

  return {
    data,
    previousDay,
  };
};

const getTodaysAnswers = async (
  supabaseClient: SupabaseClient,
  previousDay: string,
  questionUid: string
) => {
  console.log('hit getTodaysAnswers inside sync-user-streak');
  // now go and get the questions that have been answered for the previous day
  const { data: answers, error: answersError } = await supabaseClient
    .from('Answers')
    .select('*')
    .eq('questionUid', questionUid);

  console.log('answers', answers);

  if (answersError) throw answersError;

  return { answers };
};

// Rest of the code remains the same

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const token = req.headers.get('Authorization');

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

    const { data, previousDay } = await getPreviousDaysQuestion(supabaseClient);

    const { answers } = await getTodaysAnswers(
      supabaseClient,
      previousDay,
      data[0].uid
    );

    const { userAnswers: correctUserIds } = getCorrectAnswers(answers);

    const allUserIds = await getAllUsers(supabaseClient);
    const usersToUpdate = getUsersWhoHaventAnsweredCorrectly(
      allUserIds,
      correctUserIds
    );

    console.log({
      users: allUserIds,
      totalUsers: allUserIds.length,
      correctAnswers: correctUserIds.length,
      usersToUpdate: usersToUpdate.length,
    });

    const user = await updateStreak(supabaseClient, usersToUpdate);

    return new Response(JSON.stringify({ user, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
