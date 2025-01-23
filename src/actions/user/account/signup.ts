'use server';
import { supabase } from '@/lib/supabase';
import { type AuthResponse } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';

const cookiesStore = cookies();

export const signUp = async (
  email: string,
  password: string,
  referralCode?: string
): Promise<AuthResponse['data']['user'] | null> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
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
        answers: undefined,
        lastLogin: new Date(),
        userLevel: 'FREE',
        showTimeTaken: true, // default this to true, the user has change this in the onboarding step one
        //hasAuthenticatedEmail: false
        referralCode,
      },
    });

    // if there is a referral code, get the user with that uid, and send an email
    if (referralCode) {
      const referralUser = await prisma.users.findUnique({
        where: {
          uid: referralCode,
        },
      });

      if (referralUser) {
        // send the referral user an email wih the discount code
        await resend.emails.send({
          from: 'team@techblitz.dev',
          to: referralUser.email,
          subject: 'Your discount code for TechBlitz!',
          html: `<p>You have referred a friend to TechBlitz! Use the code ${process.env.REFERRAL_CODE} to get 10% off any premium plan.</p>`,
        });
      }
    }

    // set the user level on the supabase user object
    user.user_metadata.userLevel = 'FREE';

    // create a subscription for the user
    await prisma.subscriptions.create({
      data: {
        userUid: user.id,
        active: true,
        createdAt: new Date(),
        planId: '',
        productId: '',
        startDate: new Date(),
        updatedAt: new Date(),
      },
    });

    // return the user object so we can extract the user.id on the front end
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    return null;
  }
};
