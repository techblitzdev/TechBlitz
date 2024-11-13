'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@/hooks/useUser';
import { InputWithLabel } from '@/components/ui/input-label';
import { UserUpdatePayload } from '@/types/User';
import { updateUser } from '@/actions/user/update-user';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { userDetailsSchema } from '@/lib/zod/schemas/user-details-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '@/components/ui/loading';
import { logout } from '@/actions/user/logout';
import LogoutButton from '@/components/global/logout';

type SchemaProps = z.input<typeof userDetailsSchema>;

export default function SettingsProfilePage() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const form = useForm<SchemaProps>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      username: user?.username || null,
      firstName: user?.firstName || null,
      lastName: user?.lastName || null,
      showTimeTaken: user?.showTimeTaken || false,
    },
  });

  // Use mutation hook for handling the update
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: SchemaProps) => {
      const cleanedValues = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value !== null)
      );

      const updatedVals: Partial<UserUpdatePayload> = {
        ...cleanedValues,
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
    onError: (err, newUserData, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(['user-details'], context?.previousUser);
      toast.error('An error occurred while updating your profile');
      console.error(err);
    },
    onSuccess: (updatedUser) => {
      // Update the cache with the actual response data
      //queryClient.setQueryData(['user-details'], updatedUser);

      // Refetch to ensure cache is in sync with server
      //queryClient.invalidateQueries({ queryKey: ['user-details'] });

      toast.success('Profile updated successfully');
    },
  });

  const onSubmit = (values: SchemaProps) => {
    mutate(values);
  };

  return (
    <div className="flex flex-col gap-y-10">
      <h1 className="text-2xl">Profile Settings</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/2 space-y-6"
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
                        <div className="flex items-center gap-x-1">
                          <Switch
                            id="showTimeTaken"
                            checked={field.value || false}
                            onCheckedChange={field.onChange}
                            className="bg-black-50"
                          />
                          <Label htmlFor="showTimeTaken">Show time taken</Label>
                        </div>
                      </TooltipTrigger>
                    </Tooltip>
                  </TooltipProvider>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-4">
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
