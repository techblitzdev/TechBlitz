'use client';
import { useRef, useEffect, useCallback, useState } from 'react';
// components
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputWithLabel } from '@/components/ui/input-label';
import { toast } from 'sonner';
import { DiscordLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

// zod
import { loginSchema } from '@/lib/zod/schemas/login';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// actions
import { oauth } from '@/actions/user/account/oauth';
import { login } from '@/actions/user/account/login';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OrSeparator from '@/components/auth/or-separator';

type SchemaProps = z.infer<typeof loginSchema>;

export default function LoginForm(opts: { redirectUrl: string; onboarding: string }) {
  const { redirectUrl, onboarding } = opts;

  const router = useRouter();
  const isPending = useRef(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (onboarding) {
      localStorage.setItem('onboarding', 'true');
    }
  }, [onboarding]);

  const form = useForm<SchemaProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = useCallback(
    async (values: SchemaProps) => {
      isPending.current = true;
      const { email, password } = values;
      try {
        const user = await login({
          email,
          password,
        });

        if (user) {
          toast.success('Logged in successfully');

          // Preload the dashboard page to improve perceived performance
          router.prefetch('/dashboard');

          // check if we have the 'onboarding' key in local storage
          // if we do, redirect to the onboarding page
          if (localStorage.getItem('onboarding')) {
            router.push('/onboarding');
            return;
          }

          if (redirectUrl) {
            router.push(redirectUrl);
          } else {
            router.push('/dashboard');
          }
        }
      } catch (error) {
        console.error(error);
        toast.error('An error has occurred, please try again.');
      } finally {
        isPending.current = false;
      }
    },
    [redirectUrl, router]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="grid grid-cols-12 gap-4 w-full lg:w-96 mt-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormControl>
              <div className="col-span-12">
                <InputWithLabel
                  label="Email"
                  type="email"
                  {...field}
                  autoComplete="email"
                  inputClassName="gap-x-0"
                />
                <FormMessage className="mt-0.5 text-start">
                  {form.formState?.errors?.email?.message}
                </FormMessage>
              </div>
            </FormControl>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormControl>
              <div className="col-span-12 relative">
                <InputWithLabel
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  {...field}
                  autoComplete="current-password"
                  inputClassName="gap-x-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[34px] text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-5" />
                  ) : (
                    <EyeIcon className="size-5" />
                  )}
                </button>
                <FormMessage className="mt-0.5 text-start">
                  {form.formState?.errors?.password?.message}
                </FormMessage>
                <Link
                  href="/login/forgot-password"
                  prefetch
                  className="absolute top-0 text-xs text-gray-300 hover:text-white duration-300 text-start mt-1 right-0"
                >
                  Forgot password?
                </Link>
              </div>
            </FormControl>
          )}
        />
        <FormItem className="col-span-full">
          <Button type="submit" disabled={isPending.current} className="w-full" variant="secondary">
            {isPending.current ? 'Loading...' : 'Login'}
          </Button>
        </FormItem>

        <span className="col-span-full text-sm text-gray-300 hover:text-white duration-300">
          Don't have an account?{' '}
          <Link href="/signup" prefetch className="underline">
            Sign up
          </Link>
        </span>
      </form>
      <OrSeparator />
      <div className="flex gap-1 items-center justify-center">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await oauth('github', Boolean(onboarding));
          }}
        >
          <Button type="submit" variant="ghost" padding="md">
            <GitHubLogoIcon className="size-4" />
          </Button>
        </form>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await oauth('discord', Boolean(onboarding));
          }}
        >
          <Button type="submit" variant="ghost" padding="md">
            <DiscordLogoIcon className="size-4" />
          </Button>
        </form>
      </div>
    </Form>
  );
}
