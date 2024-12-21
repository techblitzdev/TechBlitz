'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import OrSeparator from '@/components/auth/or-separator';

import { toast } from 'sonner';
import { InputWithLabel } from '@/components/ui/input-label';
import { Loader2 } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { resetPassword } from '@/actions/user/account/reset-password';

import Link from 'next/link';
import { useState } from 'react';

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

type SchemaProps = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SchemaProps>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const handlePasswordReset = async (values: SchemaProps) => {
    const { email } = values;
    setIsLoading(true);
    try {
      await resetPassword({
        email,
      });
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      toast.success('Password reset email sent');
    }
  };

  return (
    <div
      className="p-8 rounded-xl space-y-4 text-center border border-black-50"
      style={{
        background:
          'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
      }}
    >
      <h1 className="font-bold text-3xl mb-2 font-onest">
        Forgot your password?
      </h1>
      <p className="text-gray-300 mb-8 text-sm font-onest text-wrap">
        No need to worry, enter your email below to reset it.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlePasswordReset)}
          className="grid grid-cols-12 gap-4 w-full lg:w-96 mt-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormControl>
                <div className="col-span-12 relative">
                  <InputWithLabel
                    label="Email"
                    type="email"
                    {...field}
                    autoComplete="email"
                    disabled={isLoading}
                  />
                  <FormMessage className="mt-0.5 text-start">
                    {form.formState?.errors?.email?.message}
                  </FormMessage>
                </div>
              </FormControl>
            )}
          />
          <FormItem className="col-span-full">
            <Button
              type="submit"
              className="w-full"
              variant="secondary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending reset email...
                </>
              ) : (
                'Send reset email'
              )}
            </Button>
          </FormItem>

          <OrSeparator />

          <span className="col-span-full text-sm text-gray-300 hover:text-white duration-300">
            <Link href="/login">sign in</Link>
          </span>
        </form>
      </Form>
    </div>
  );
}
