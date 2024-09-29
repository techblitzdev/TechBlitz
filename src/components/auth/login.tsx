'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { loginSchema } from '@/lib/zod/schemas/login';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login } from '@/actions/user/login';
import { InputWithLabel } from '../ui/input-label';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

type SchemaProps = z.infer<typeof loginSchema>;

export default function LoginForm() {
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
    const res = await login(values.email, values.password);

    if (res) {
      toast.success('Logged in successfully');
      router.push('/dashboard');
    } else {
      toast.error('There was an error logging in');
    }
    isPending.current = false;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="grid grid-cols-12 gap-4 w-96 mt-8"
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
                  {...field}
                  autoComplete="current-password"
                />
                <FormMessage>
                  {form.formState?.errors?.password?.message}
                </FormMessage>
              </div>
            </FormControl>
          )}
        />
        <FormItem className="col-span-full">
          <Button type="submit" disabled={isPending.current} className="w-full">
            {isPending.current ? 'Loading...' : 'Login'}
          </Button>
        </FormItem>
      </form>
    </Form>
  );
}
