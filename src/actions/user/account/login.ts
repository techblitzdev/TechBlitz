"use server";
import { prisma } from "@/lib/prisma";
import { createClient as createServerClient } from "@/utils/supabase/server";
import { revalidateTag } from "next/cache";

/**
 * Logs the user into the application
 *
 * @param email
 * @param password
 * @returns
 */
export const login = async (opts: { email: string; password: string }) => {
  const { email, password } = opts;
  const supabase = await createServerClient();

  if (!supabase) throw new Error("No supabase client found");

  if (!email || !password) throw new Error("Email and password are required");

  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  try {
    // get the user from the db
    const dbUser = await prisma.users.findUnique({
      where: {
        uid: user.user.id,
      },
    });

    // if the user is not found, add them to the db
    if (!dbUser) {
      // First check if email already exists
      const existingUserWithEmail = await prisma.users.findUnique({
        where: {
          email: user.user.email,
        },
      });

      if (existingUserWithEmail) {
        return;
      }

      await prisma.users.create({
        data: {
          uid: user?.user.id,
          email: user?.user.email as string,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastLogin: new Date(),
          userLevel: "FREE",
        },
      });
    } else {
      // update the 'lastLoggedIn' field in the db
      await prisma.users.update({
        where: {
          uid: user.user.id,
        },
        data: {
          lastLogin: new Date(),
        },
      });
    }

    revalidateTag("user-details");

    return user.user;
  } catch (error) {
    console.error("Database error:", error);
    return {
      error,
    };
  }
};
