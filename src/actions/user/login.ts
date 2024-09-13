'use server'
import { prisma } from "@/utils/prisma";
import { createClient as createServerClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * Logs the user into the application
 * 
 * @param email 
 * @param password 
 * @returns 
 */
export const login = async (email: string, password: string) => {
	const cookieStore = cookies();
	const supabase = createServerClient(cookieStore);

	if(!supabase) throw new Error('No supabase client found')

	if(!email || !password) throw new Error('Email and password are required')

	try {
		const { data: user, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) throw new Error(error.message);

		// get the user from the db
		const dbUser = await prisma.users.findUnique({
			where: {
				uid: user?.user.id
			}
		});

		// if the user is not found, add them to the db
		if (!dbUser) {
			await prisma.users.create({
				data: {
					uid: user?.user.id,
					email: user?.user.email as string,
					createdAt: new Date(),
					updatedAt: new Date(),
					name: '',
					answers: undefined,
					lastLogin: new Date()
				}
			});
		}
		else {
			// update the 'lastLoggedIn' field in the db
			await prisma.users.update({
				where: {
					uid: user?.user.id
				},
				data: {
					lastLogin: new Date()
				}
			});
		}

		console.log('User logged in', user);
		
		return user.user;
	} catch (error) {
		console.error('There as an error logging in', error);
		return false;
	}
}


