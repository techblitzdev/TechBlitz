import { createClient, type SupabaseClient } from "jsr:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

/**
 * Fetch the previous day's question with only required fields.
 */
const getPreviousDaysQuestion = async (supabaseClient: SupabaseClient) => {
  console.log("Fetching previous day question in sync-user-streak");

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const previousDay = yesterday.toISOString().split("T")[0];

  const { data, error } = await supabaseClient
    .from("Questions")
    .select("uid, correctAnswer")
    .eq("questionDate", previousDay)
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching question:", error);
    throw new Error("Unable to fetch the previous day’s question");
  }

  console.log("Previous day question:", data);
  return { question: data, previousDay };
};

/**
 * Fetch all answers for the given question UID.
 */
const getTodaysAnswers = async (
  supabaseClient: SupabaseClient,
  questionUid: string,
) => {
  console.log("Fetching answers for question:", questionUid);

  const { data, error } = await supabaseClient
    .from("Answers")
    .select("userUid, correctAnswer")
    .eq("questionUid", questionUid);

  if (error) {
    console.error("Error fetching answers:", error);
    throw new Error("Unable to fetch answers for the question");
  }

  console.log("Fetched answers:", data);
  return data;
};

/**
 * Update streaks for users who haven't answered correctly.
 */
const updateStreak = async (
  supabaseClient: SupabaseClient,
  usersToUpdate: string[],
) => {
  console.log("Updating streaks for users:", usersToUpdate);

  const { error } = await supabaseClient
    .from("Streaks")
    .update({
      streakStart: null,
      streakEnd: null,
      currentstreakCount: 0,
    })
    .in("userUid", usersToUpdate);

  if (error) {
    console.error("Error updating streaks:", error);
    throw new Error("Unable to update streaks");
  }

  console.log("Streaks updated successfully");
  return "ok";
};

/**
 * Helper to extract correct answers from the list of answers.
 */
const getCorrectAnswers = (answers: any[]) => {
  return answers
    .filter((answer) => answer.correctAnswer)
    .map((answer) => answer.userUid);
};

/**
 * Fetch all users in the system.
 */
const getAllUsers = async (supabaseClient: SupabaseClient) => {
  const { data, error } = await supabaseClient.from("Users").select("uid");
  if (error) throw new Error("Unable to fetch users");
  return data.map((user: { uid: string }) => user.uid);
};

/**
 * Get users who haven't answered correctly.
 */
const getUsersWhoHaventAnsweredCorrectly = (
  allUsers: string[],
  correctUserIds: string[],
) => {
  const correctUserSet = new Set(correctUserIds);
  return allUsers.filter((userId) => !correctUserSet.has(userId));
};

/**
 * Entry point for the Deno server.
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization") ?? "" },
        },
      },
    );

    if (!supabaseClient) {
      console.log("NO SUPABASE CLIENT");
      throw new Error("Unable to connect to Supabase");
    }

    const { question } = await getPreviousDaysQuestion(supabaseClient);

    if (!question) {
      throw new Error("No question found for the previous day");
    }

    const answers = await getTodaysAnswers(supabaseClient, question.uid);
    const correctUserIds = getCorrectAnswers(answers);

    const allUserIds = await getAllUsers(supabaseClient);
    const usersToUpdate = getUsersWhoHaventAnsweredCorrectly(
      allUserIds,
      correctUserIds,
    );

    console.log({
      totalUsers: allUserIds.length,
      correctAnswers: correctUserIds.length,
      usersToUpdate: usersToUpdate.length,
    });

    await updateStreak(supabaseClient, usersToUpdate);

    return new Response(
      JSON.stringify({
        message: "Streaks updated successfully",
        stats: {
          totalUsers: allUserIds.length,
          correctAnswers: correctUserIds.length,
          usersUpdated: usersToUpdate.length,
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
