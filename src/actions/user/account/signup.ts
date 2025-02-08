'use server';
import { supabase } from '@/lib/supabase';
import { type AuthResponse } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';
import { createUserMissionRecords } from '@/actions/daily-missions/create-user-missions-record';
import { sendWelcomeEmail } from '@/actions/misc/send-welcome-email';

const cookiesStore = cookies();

export const signUp = async (
  email: string,
  password: string,
  referralCode?: string
): Promise<{
  user: AuthResponse['data']['user'] | null;
  error?: string;
}> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    // If there's an auth error, return it
    if (error) {
      return {
        user: null,
        error: error.message,
      };
    }

    // easy access to the user object
    const user = data.user;

    // throw an error if required fields cannot be found
    if (!user || !user.id || !user.email) {
      return {
        user: null,
        error: 'Missing required user information',
      };
    }

    // only set the cookie if the auth sign up is successful
    const userId = user.id;
    cookiesStore.set('userId', userId);

    try {
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
          referralCode,
        },
      });

      // create a user mission record on sign up
      await createUserMissionRecords({ uid: user.id });

      // send the welcome email to the user
      await sendWelcomeEmail({
        email: user.email,
      });
    } catch (dbError: any) {
      return {
        user: null,
        error: 'Failed to sign up with the provided credentials, please contact support.',
      };
    }

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
          from: 'TechBlitz <team@techblitz.dev>',
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
    return {
      user,
      error: undefined,
    };
  } catch (error: any) {
    console.error('Error signing up:', error);
    return {
      user: null,
      error: error.message || 'An unexpected error occurred',
    };
  }
};
