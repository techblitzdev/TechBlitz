'use client';
import { useEffect } from 'react';

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { InputWithLabel } from '@/components/ui/input-label';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import LoadingSpinner from '@/components/ui/loading';
import LogoutButton from '@/components/auth/logout';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUser } from '@/hooks/useUser';
import { updateUser } from '@/actions/user/authed/update-user';

import { userDetailsSchema } from '@/lib/zod/schemas/user-details-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UserUpdatePayload } from '@/types/User';

type SchemaProps = z.input<typeof userDetailsSchema>;

export default function SettingsProfilePage() {
  const queryClient = useQueryClient();
  const { user, isLoading } = useUser();

  const form = useForm<SchemaProps>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      username: user?.username || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      showTimeTaken: user?.showTimeTaken || false,
      sendPushNotifications: user?.sendPushNotifications || false,
    },
  });

  useEffect(() => {
    if (!isLoading && user) {
      form.reset({
        username: user.username || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        showTimeTaken: user.showTimeTaken,
        sendPushNotifications: user.sendPushNotifications,
      });
    }
  }, [user, isLoading]);

  // Use mutation hook for handling the update
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: SchemaProps) => {
      // Only include fields that have been changed from their original values
      const changedValues = Object.entries(values).reduce(
        (acc, [key, value]) => {
          if (value !== user?.[key as keyof typeof user]) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, any>
      );

      const updatedVals: Partial<UserUpdatePayload> = {
        ...changedValues,
        uid: user?.uid || '',
      };

      const updatedUser = await updateUser({ userDetails: updatedVals });
      return updatedUser;
    },
    onMutate: async (newUserData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['user-details'] });

      // Snapshot the previous value
      const previousUser = queryClient.getQueryData(['user-details']);

      // Optimistically update to the new value
      queryClient.setQueryData(['user-details'], (old: any) => ({
        ...old,
        ...newUserData,
      }));

      // Return a context object with the snapshotted value
      return { previousUser };
    },
    onError: (err, _, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(['user-details'], context?.previousUser);
      toast.error('An error occurred while updating your profile');
      console.error(err);
    },
    onSuccess: () => {
      toast.success('Profile updated successfully');
    },
  });

  const onSubmit = (values: SchemaProps) => {
    mutate(values);
  };

  return (
    <div className="flex flex-col">
      <div className="space-y-1 p-8">
        <h1 className="text-2xl">Profile Settings</h1>
        <p className="text-sm">Update your profile details and preferences.</p>
      </div>
      <Separator className="w-full bg-black-50" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 p-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithLabel
                    label="Username"
                    type="text"
                    autoComplete="username"
                    placeholder={user?.username || 'Username'}
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithLabel
                    label="First name"
                    type="text"
                    autoComplete="given-name"
                    placeholder={user?.firstName || 'First name'}
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithLabel
                    label="Last name"
                    type="text"
                    autoComplete="family-name"
                    placeholder={user?.lastName || 'Last name'}
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="showTimeTaken"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-x-2">
                          <Switch
                            id="showTimeTaken"
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                            }}
                            className="bg-black-50"
                          />
                          <Label htmlFor="showTimeTaken">
                            Show on leaderboard
                          </Label>
                        </div>
                      </TooltipTrigger>
                    </Tooltip>
                  </TooltipProvider>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sendPushNotifications"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-x-2">
                          <Switch
                            id="sendPushNotifications"
                            checked={!!field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                            }}
                            disabled={true}
                            className="bg-black-50"
                          />
                          <Label htmlFor="sendPushNotifications">
                            Send push notifications (coming soon)
                          </Label>
                        </div>
                      </TooltipTrigger>
                    </Tooltip>
                  </TooltipProvider>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-wrap gap-4">
            <Button type="submit" variant="secondary" disabled={isPending}>
              {isPending ? <LoadingSpinner /> : 'Save changes'}
            </Button>
            <LogoutButton variant="destructive" />
          </div>
        </form>
      </Form>
    </div>
  );
}
