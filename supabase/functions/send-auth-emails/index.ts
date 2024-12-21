import React from 'react';
import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0';
import { Resend } from 'resend';
import { renderAsync } from '@react-email/components';
import { MagicLinkEmail } from './_templates/magic-link.tsx';
import { TechBlitzSignUpEmail } from './_templates/sign-up.tsx';
import { ResetPasswordEmail } from './_templates/reset-password.tsx';
const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string);
const hookSecret = Deno.env.get('SEND_EMAIL_HOOK_SECRET') as string;
const supabaseUrl = Deno.env.get('NEXT_PUBLIC_SUPABASE_URL') as string;

Deno.serve(async (req) => {
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

    console.log(email_action_type);

    let html: string;
    let subject: string;

    if (email_action_type === 'signup') {
      const redirect_to_url = `${redirect_to}/login`;

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
    }
    // for sending pass word reset emails
    else if (email_action_type === 'recovery') {
      // go grab the react email template
      html = await renderAsync(
        React.createElement(ResetPasswordEmail, {
          username: user['user_metadata'].username,
          confirmationLink: `${supabaseUrl}/auth/v1/verify?token=${token_hash}&type=reset_password&redirect_to=${redirect_to}`,
        })
      );
    } else {
      throw new Error('Invalid email action type');
    }

    const { error } = await resend.emails.send({
      from: 'welcome <team@techblitz.dev>',
      to: [user.email],
      subject:
        email_action_type === 'signup'
          ? 'Welcome to TechBlitz!'
          : 'Sign in to TechBlitz',
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
