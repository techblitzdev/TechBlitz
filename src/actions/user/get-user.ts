'use server'
import { createClient as createServerClient } from "@/utils/supabase/server";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";


/**
 * Get the user from the server - used in api routes, server componets & server actions
 * 
 * @returns 
 */
export const getUserFromSession = 
  async () => {
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore);
    return supabase?.auth?.getUser();
  }
