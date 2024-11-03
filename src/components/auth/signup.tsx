'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { signupSchema } from '@/lib/zod/schemas/signup';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/actions/user/signup';
import { InputWithLabel } from '../ui/input-label';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Separator } from '../ui/separator';
import Link from 'next/link';

type SchemaProps = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const form = useForm<SchemaProps>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync: server_signup, isPending } = useMutation({
    mutationFn: (values: SchemaProps) => signUp(values.email, values.password),
    onSuccess: () => {
      // show success toast
      toast.success('Signup successful!');
      // redirect to dashboard
      router.push('/dashboard');
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
                  placeholder="hello@meerge.dev"
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

        <Separator className="mt-1 col-span-full bg-black-50" />

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
