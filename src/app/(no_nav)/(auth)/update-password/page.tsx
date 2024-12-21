// app/update-password/page.tsx
'use client';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { InputWithLabel } from '@/components/ui/input-label';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/ui/loading';
import { createClient } from '@/utils/supabase/client';

const passwordSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
});

type SchemaProps = z.infer<typeof passwordSchema>;

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const searchParams = useSearchParams();
  const supabase = createClient();

  const form = useForm<SchemaProps>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const validateToken = async () => {
      const access_token = searchParams.get('access_token');
      const refresh_token = searchParams.get('refresh_token');

      if (!access_token || !refresh_token) {
        toast.error('Invalid reset link');
        return;
      }

      try {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) throw error;
        setIsValidToken(true);
      } catch (error) {
        console.error('Session error:', error);
        toast.error('Invalid or expired reset link');
        router.push('/login');
      }
    };

    validateToken();
  }, [searchParams, router]);

  const handlePasswordReset = async (values: SchemaProps) => {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      form.setError('confirmPassword', {
        message: 'Passwords do not match',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      toast.success('Password updated successfully');
      form.reset();
      router.push('/login');
    } catch (error) {
      console.error('Update error:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to update password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <div className="p-8 rounded-xl space-y-4 text-center">
        <LoadingSpinner />
        <p>Validating reset link...</p>
      </div>
    );
  }

  return (
    <div
      className="p-8 rounded-xl space-y-4 text-center border border-black-50"
      style={{
        background:
          'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
      }}
    >
      <h1 className="font-bold text-3xl mb-2">Update your password</h1>
      <p className="text-gray-300 mb-8 text-sm font-satoshi text-wrap">
        Enter your new password below.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlePasswordReset)}
          className="space-y-4"
        >
          <FormItem>
            <FormField
              name="password"
              render={({ field }) => (
                <>
                  <InputWithLabel
                    label="Password"
                    type="password"
                    {...field}
                    disabled={isLoading}
                  />
                  <FormMessage className="mt-0.5 text-start">
                    {form.formState?.errors?.password?.message}
                  </FormMessage>
                </>
              )}
            />
          </FormItem>
          <FormField
            name="confirmPassword"
            render={({ field }) => (
              <>
                <InputWithLabel
                  label="Confirm password"
                  type="password"
                  {...field}
                  disabled={isLoading}
                />
                <FormMessage className="mt-0.5 text-start">
                  {form.formState?.errors?.confirmPassword?.message}
                </FormMessage>
              </>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            variant="secondary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                Updating password...
              </>
            ) : (
              'Update password'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
