'use server';
import { resend } from '@/lib/resend';

const AUDIENCE_ID = '83fcadba-be84-4d3c-bb44-d3b705162a71';

export const handleAddAndRemoveFromPromotionalEmailsList = async ({
  email,
  firstName,
  lastName,
  status,
}: {
  email: string;
  firstName: string;
  lastName: string;
  status: 'add' | 'remove';
}) => {
  if (status === 'add') {
    await resend.contacts.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      unsubscribed: false,
      audienceId: AUDIENCE_ID,
    });
  } else {
    await resend.contacts.remove({
      email: email,
      audienceId: AUDIENCE_ID,
    });
  }
};
