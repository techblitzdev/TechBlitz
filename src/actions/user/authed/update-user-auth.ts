'use server';
import { createClient as createServerClient } from '@/utils/supabase/server';
import type { UserAttributes } from "@supabase/supabase-js";
import { prisma } from '@/utils/prisma';
import { cookies } from "next/headers";

export const updateUserAuth = async (opts: {
  email?: string;
  password?: string;
}) => {
  const { email, password } = opts;

  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  const updates: UserAttributes = {}
  // construct the object to pass to updateUser
  if (email) updates.email = email;
  if (password) updates.password = password;

  const { data, error } = await supabase.auth.updateUser(updates, {
    emailRedirectTo: `${process.env.NEXT_PUBLIC_UPDATE_USER_REDIRECT_URL}?email=${email}`
  })

  if (error) {
    throw error
  }

  const userUid = data?.user?.id

  // if the email has been updated, we need to update the email in the db
  if (email) {
    await prisma.users.update({
      where: {
        uid: userUid
      },
      data: {
        email
      }
    })
  }

  return data
}