'use client';
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

// zod
import { z } from 'zod';
import { signupSchema } from '@/lib/zod/schemas/signup';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { signUp } from '@/actions/user/account/signup';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OrSeparator from './or-separator';

type SchemaProps = z.infer<typeof signupSchema>;

export default function SignupForm(opts: { prefilledEmail?: string }) {
  const { prefilledEmail } = opts;

  const router = useRouter();
  const form = useForm<SchemaProps>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: prefilledEmail || '',
      password: '',
    },
  });

  const { mutateAsync: server_signup, isPending } = useMutation({
    mutationFn: (values: SchemaProps) => signUp(values.email, values.password),
    onSuccess: () => {
      // show success toast
      toast.success(
        'Signup successful! Please check your email to verify your account.'
      );
      // set a value in local storage to initiate that this is a new user
      // and will need onboarding once they have logged in.
      localStorage.setItem('onboarding', 'true');

      // redirect to verify email page
      router.push('/verify-email');
    },
    onError: (error) => {
      // show error toast
      toast.error(error.message);
    },
  });

  const handleSignup = (values: SchemaProps) => server_signup(values);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSignup)}
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
                  placeholder="team@techblitz.dev"
                  {...field}
                  autoComplete="email"
                />
                <FormMessage>
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
              <div className="col-span-12">
                <InputWithLabel
                  label="Password"
                  type="password"
                  placeholder="********"
                  {...field}
                  autoComplete="new-password"
                />
                <FormMessage>
                  {form.formState?.errors?.password?.message}
                </FormMessage>
              </div>
            </FormControl>
          )}
        />
        <FormItem className="col-span-full">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
            variant="secondary"
          >
            {isPending ? 'Loading...' : 'Sign Up'}
          </Button>
        </FormItem>

        <OrSeparator />

        <span className="col-span-full text-sm text-gray-300 hover:text-white duration-300">
          Already have an account?{' '}
          <Link href="/login" prefetch className="underline">
            Sign in
          </Link>
        </span>
      </form>
    </Form>
  );
}
