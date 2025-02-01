"use server";
import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function oauth(provider: Provider, onboarding?: boolean) {
  const supabase = await createClient();

  const callbackUrl = new URL("/auth/callback", process.env.NEXT_PUBLIC_URL);

  // if onboarding is true, we need the searchParams.next to be /onboarding
  if (onboarding) {
    callbackUrl.searchParams.set("next", "/onboarding");
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: callbackUrl.toString(),
    },
  });

  if (error) throw new Error(error.message);

  redirect(data.url);
}
