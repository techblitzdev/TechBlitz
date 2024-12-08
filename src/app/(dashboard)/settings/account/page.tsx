'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useUser } from '@/hooks/useUser';
import { updateUserAuth } from '@/actions/user/update-user-auth';
import { updateUserSchema } from '@/lib/zod/schemas/update-user';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/ui/loading';
import DeleteAccountModal from '@/components/settings/delete-account-modal';
import { Separator } from '@/components/ui/separator';

type SchemaProps = z.infer<typeof updateUserSchema>;

export default function SettingsProfilePage() {
  const { user, isLoading } = useUser();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { mutateAsync: server_updateUserAuth, isPending } = useMutation({
    mutationFn: (values: SchemaProps) => updateUserAuth(values),
    onSuccess: () => {
      toast.success(
        'Account updated successfully, please check your email for further instructions.'
      );
    },
    onError: (error) => {
      toast.error(`Failed to update user auth: ${error}`);
    },
  });

  const form = useForm<SchemaProps>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: user?.email || '',
      password: '',
    },
  });

  const onSubmit = async (values: SchemaProps) => {
    try {
      await server_updateUserAuth(values);
    } catch (error) {
      console.error('Failed to update user auth:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="space-y-1 p-8">
        <h1 className="text-2xl">Account Settings</h1>
        <p className="text-sm">Update your account details and preferences.</p>
      </div>
      <Separator className="w-full bg-black-50" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/2 space-y-6 p-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder={user?.email} {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormDescription>
                  Leave blank to keep your current password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isPending ? <LoadingSpinner /> : 'Save changes'}
          </Button>
        </form>
      </Form>
      <Button
        variant="destructive"
        onClick={() => setIsDeleteModalOpen(true)}
        className="w-fit mx-8 mb-8"
      >
        Delete account
      </Button>
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
