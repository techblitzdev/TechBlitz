import React from 'react';
import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0';
import { Resend } from 'resend';
import { renderAsync } from '@react-email/components';
import { MagicLinkEmail } from './_templates/magic-link.tsx';
import { TechBlitzSignUpEmail } from './_templates/sign-up.tsx';
import { ResetPasswordEmail } from './_templates/reset-password.tsx';
import { EmailChangeEmail } from './_templates/email-change.tsx';
const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string);
const hookSecret = Deno.env.get('SEND_EMAIL_HOOK_SECRET') as string;
const supabaseUrl = Deno.env.get('NEXT_PUBLIC_SUPABASE_URL') as string;
const updateUserRedirectUrl = Deno.env.get(
  'UPDATE_USER_REDIRECT_URL'
) as string;

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return new Response('not allowed', { status: 400 });
  }

  const payload = await req.text();
  const headers = Object.fromEntries(req.headers);
  const wh = new Webhook(hookSecret);
  try {
    const {
      user,
      email_data: { token, token_hash, redirect_to, email_action_type },
    } = wh.verify(payload, headers) as {
      user: {
        email: string;
        user_metadata: {
          username: string;
          lang: string;
        };
      };
      email_data: {
        token: string;
        token_hash: string;
        redirect_to: string;
        email_action_type: string;
        site_url: string;
        token_new: string;
        token_hash_new: string;
      };
    };

    // init for the email template & subject
    let html: string;
    let subject: string;
    let from: string = 'TechBlitz <team@techblitz.dev>';

    if (email_action_type === 'signup') {
      const redirect_to_url = `${redirect_to}/login`;
      from = 'welcome <team@techblitz.dev>';
      html = await renderAsync(
        React.createElement(TechBlitzSignUpEmail, {
          username: user['user_metadata'].lang,
          confirmationLink: `${supabaseUrl}/auth/v1/verify?token=${token_hash}&type=signup&redirect_to=${redirect_to_url}`,
        })
      );
      subject = 'Welcome to TechBlitz!';
    } else if (email_action_type == 'login') {
      html = await renderAsync(
        React.createElement(MagicLinkEmail, {
          supabase_url: Deno.env.get('NEXT_PUBLIC_SUPABASE_URL') ?? '',
          token,
          token_hash,
          redirect_to,
          email_action_type,
        })
      );
      subject = 'Sign in to TechBlitz';
    }
    // for sending pass word reset emails
    else if (email_action_type === 'recovery') {
      // redirect the user to the update password page
      const redirect_to_url = `${redirect_to}/update-password`;
      from = 'TechBlitz <team@techblitz.dev>';
      // go grab the react email template
      html = await renderAsync(
        React.createElement(ResetPasswordEmail, {
          username: user['user_metadata'].username,
          resetLink: `${supabaseUrl}/auth/v1/verify?token=${token_hash}&type=recovery&redirect_to=${redirect_to_url}&code=${token}`,
        })
      );
      subject = 'Reset your password';
    } else if (email_action_type === 'email_change') {
      const redirect_to_url = `${redirect_to}/dashboard`;
      html = await renderAsync(
        React.createElement(EmailChangeEmail, {
          username: user['user_metadata'].username,
          redirect_to: `${supabaseUrl}/auth/v1/verify?token=${token_hash}&type=email_change&redirect_to=${redirect_to_url}`,
        })
      );
      subject = 'Email Address Updated';
    } else {
      return new Response(`email action type not found: ${email_action_type}`, {
        status: 400,
      });
    }

    const { error } = await resend.emails.send({
      from,
      to: [user.email],
      subject,
      html,
    });
    if (error) {
      throw error;
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        error: {
          http_code: (error as { code?: number })?.code ?? 500,
          message:
            (error as { message?: string })?.message ??
            'An unknown error occurred',
        },
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const responseHeaders = new Headers();
  responseHeaders.set('Content-Type', 'application/json');
  return new Response(JSON.stringify({}), {
    status: 200,
    headers: responseHeaders,
  });
});
