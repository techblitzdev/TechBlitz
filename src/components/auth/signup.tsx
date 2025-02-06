'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputWithLabel } from '@/components/ui/input-label';
import GoogleLogo from '@/components/ui/icons/google';
import OrSeparator from '@/components/auth/or-separator';
import GithubLogo from '@/components/ui/icons/github';
import { DiscordLogoIcon } from '@radix-ui/react-icons';

import { toast } from 'sonner';
import type { z } from 'zod';
import { signupSchema } from '@/lib/zod/schemas/signup';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { signUp } from '@/actions/user/account/signup';
import { oauth } from '@/actions/user/account/oauth';

type SchemaProps = z.infer<typeof signupSchema>;

export default function SignupForm(opts: { prefilledEmail?: string }) {
  const { prefilledEmail } = opts;
  const [showEmailForm, setShowEmailForm] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');

  const form = useForm<SchemaProps>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: prefilledEmail || '',
      password: '',
      referralCode: ref || undefined,
    },
  });

  const { mutateAsync: handleSignUp, isPending } = useMutation({
    mutationFn: async (values: SchemaProps) => {
      const result = await signUp(values.email, values.password, ref || undefined);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      toast.success('Signup successful! Please check your email to verify your account.');
      localStorage.setItem('onboarding', 'true');
      router.push('/verify-email');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="w-full mx-auto mt-8 space-y-6">
      {!showEmailForm ? (
        <div className="space-y-4">
          {/* being disabled for now as waiting for google project to be approved */}
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
              Continue with Google
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
              Continue with GitHub
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
              Continue with Discord
            </Button>
          </form>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => handleSignUp(values))}
            className="space-y-4"
          >
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
                    <InputWithLabel
                      label="Password"
                      type="password"
                      placeholder="********"
                      {...field}
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full" variant="secondary">
              {isPending ? 'Loading...' : 'Sign Up'}
            </Button>
          </form>
        </Form>
      )}

      <OrSeparator />

      <Button onClick={() => setShowEmailForm(!showEmailForm)} className="w-full" variant="default">
        {showEmailForm ? 'Continue with GitHub/Discord' : 'Continue with Email'}
      </Button>
    </div>
  );
}
