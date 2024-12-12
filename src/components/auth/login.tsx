'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { loginSchema } from '@/lib/zod/schemas/login';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login } from '@/actions/user/account/login';
import { InputWithLabel } from '../ui/input-label';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import { DiscordLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import {
  signInWithGithub,
  signInWithDiscord
} from '@/actions/user/account/oauth';

type SchemaProps = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const isPending = useRef(false);

  const form = useForm<SchemaProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleLogin = async (values: SchemaProps) => {
    isPending.current = true;
    const { email, password } = values;
    try {
      await login({
        email,
        password
      });

      toast.success('Logged in successfully');
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    isPending.current = false;
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
          <Link
            href="/signup"
            prefetch
            className="underline"
          >
            Sign up
          </Link>
        </span>
      </form>
      <div className="relative pt-5 pb-3 col-span-full">
        <Separator className=" bg-black-50" />
        <span className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-[#000000] px-2 text-xs text-gray-300">
          OR
        </span>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await signInWithGithub();
          }}
        >
          <Button
            type="submit"
            variant="ghost"
          >
            <GitHubLogoIcon className="size-4" />
          </Button>
        </form>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await signInWithDiscord();
          }}
        >
          <Button
            type="submit"
            variant="ghost"
          >
            <DiscordLogoIcon className="size-4" />
          </Button>
        </form>
      </div>
    </Form>
  );
}
