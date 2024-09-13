'use server'
import { supabase } from '@/lib/supabase';
import { type AuthResponse } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { prisma } from '@/utils/prisma';

const cookiesStore = cookies();

export const signUp = async (
  email: string,
  password: string
): Promise<AuthResponse['data']['user'] | null> => {

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    // easy access to the user object
    const user = data.user;

    // throw an error if required fields cannot be found
    if (!user || !user.id || !user.email) throw new Error(error?.message);

    // only set the cookie if the auth sign up is successful
    const userId = user.id;
    cookiesStore.set('userId', userId);

    // REMEMBER EMAIL AUTH IS OFF!

    // if the user sign up is successful, add the user to the database
    await prisma.users.create({
      data: {
        uid: user.id,
        email: user.email,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: '',
        answers: undefined,
        lastLogin: new Date(),
        userLevel: 'STANDARD'
        //hasAuthenticatedEmail: false
      }
    });

    // set the user level on the supabase user object
    user.user_metadata.userLevel = 'STANDARD';

    // return the user object so we can extract the user.id on the front end
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    return null;
  }
};