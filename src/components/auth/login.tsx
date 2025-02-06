'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputWithLabel } from '@/components/ui/input-label';
import GoogleLogo from '@/components/ui/icons/google';
import OrSeparator from '@/components/auth/or-separator';
import GithubLogo from '@/components/ui/icons/github';
import { DiscordLogoIcon } from '@radix-ui/react-icons';

import { toast } from 'sonner';
import type { z } from 'zod';
import { loginSchema } from '@/lib/zod/schemas/login';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { login } from '@/actions/user/account/login';
import { oauth } from '@/actions/user/account/oauth';

type SchemaProps = z.infer<typeof loginSchema>;

export default function LoginForm(opts: { redirectUrl: string; onboarding: string }) {
  const { redirectUrl, onboarding } = opts;
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const form = useForm<SchemaProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = useCallback(
    async (values: SchemaProps) => {
      setIsPending(true);
      try {
        const user = await login({
          email: values.email,
          password: values.password,
        });

        if (user) {
          toast.success('Logged in successfully');

          if (onboarding) {
            localStorage.setItem('onboarding', 'true');
          }

          // Preload the dashboard page to improve perceived performance
          router.prefetch('/dashboard');

          if (localStorage.getItem('onboarding')) {
            router.push('/onboarding');
          } else if (redirectUrl) {
            router.push(redirectUrl);
          } else {
            router.push('/dashboard');
          }
        }
      } catch (error) {
        console.error(error);
        toast.error('An error has occurred, please try again.');
      } finally {
        setIsPending(false);
      }
    },
    [redirectUrl, router, onboarding]
  );

  return (
    <div className="w-full mx-auto mt-8 space-y-6">
      {!showEmailForm ? (
        <div className="space-y-4">
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await oauth('google', true);
            }}
          >
            <Button
              type="submit"
              variant="outline"
              className="w-full bg-white text-black hover:bg-gray-100 hover:text-black"
            >
              <GoogleLogo />
              Sign in with Google
            </Button>
          </form>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await oauth('github', true);
            }}
          >
            <Button
              type="submit"
              variant="outline"
              className="w-full bg-[#24292e] text-white hover:bg-[#2f363d] border-none hover:text-white"
            >
              <GithubLogo className="w-5 h-5 mr-2" />
              Sign in with GitHub
            </Button>
          </form>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await oauth('discord', true);
            }}
          >
            <Button
              type="submit"
              variant="outline"
              className="w-full bg-[#5865F2] text-white hover:bg-[#4752C4] border-none hover:text-white"
            >
              <DiscordLogoIcon className="w-5 h-5 mr-2" />
              Sign in with Discord
            </Button>
          </form>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithLabel
                      label="Email"
                      type="email"
                      placeholder="team@techblitz.dev"
                      {...field}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <InputWithLabel
                        label="Password"
                        type="password"
                        placeholder="********"
                        {...field}
                        autoComplete="current-password"
                      />
                      <div className="text-end">
                        <Link
                          href="/login/forgot-password"
                          className="text-xs text-gray-300 hover:text-white duration-300"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full" variant="secondary">
              {isPending ? 'Loading...' : 'Log In'}
            </Button>
          </form>
        </Form>
      )}

      <OrSeparator />

      <Button onClick={() => setShowEmailForm(!showEmailForm)} className="w-full" variant="default">
        {showEmailForm ? 'Sign in with Google/GitHub/Discord' : 'Sign in with Email'}
      </Button>
    </div>
  );
}
