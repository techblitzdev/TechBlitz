'use client';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { InputWithLabel } from '@/components/ui/input-label';
import { updateUserAuth } from '@/actions/user/authed/update-user-auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoadingSpinner from '@/components/ui/loading';

const passwordSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
});

type SchemaProps = z.infer<typeof passwordSchema>;

/**
 * The page the user hits after they click the link in their email to reset their password.
 */
export default function UpdatePasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SchemaProps>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

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
      await updateUserAuth({
        password,
      });

      toast.success('Password updated');
      form.reset();
      router.push('/login');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
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
