'use client';
import { useRef } from 'react';
// components
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { InputWithLabel } from '@/components/ui/input-label';
import { toast } from 'sonner';
import { DiscordLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';

// zod
import { loginSchema } from '@/lib/zod/schemas/login';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// actions
import { oauth } from '@/actions/user/account/oauth';
import { login } from '@/actions/user/account/login';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import OrSeparator from '@/components/auth/or-separator';

type SchemaProps = z.infer<typeof loginSchema>;

export default function LoginForm() {
  // get the redirectUrl from the url
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl');

  const router = useRouter();
  const isPending = useRef(false);

  const form = useForm<SchemaProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (values: SchemaProps) => {
    isPending.current = true;
    const { email, password } = values;
    try {
      await login({
        email,
        password,
      });

      toast.success('Logged in successfully');

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
    } catch (error) {
      console.error(error);
    } finally {
      isPending.current = false;
    }
  };

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
                  type="password"
                  {...field}
                  autoComplete="current-password"
                />
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
          <Button
            type="submit"
            disabled={isPending.current}
            className="w-full"
            variant="secondary"
          >
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
            await oauth('github');
          }}
        >
          <Button type="submit" variant="ghost" padding="md">
            <GitHubLogoIcon className="size-4" />
          </Button>
        </form>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await oauth('discord');
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
