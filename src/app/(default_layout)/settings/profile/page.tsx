'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { userDetailsSchema } from '@/lib/zod/schemas/user-details-schema';
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

type SchemaProps = z.infer<typeof userDetailsSchema>;

export default function SettingsProfilePage() {
  const { user } = useUser();

  const form = useForm<SchemaProps>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      username: user?.username || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      showTimeTaken: user?.showTimeTaken || false,
    },
  });

  const onSubmit = async (values: SchemaProps) => {
    console.log({
      values,
    });

    try {
      const updatedVals: UserUpdatePayload = {
        ...values,
        uid: user?.uid || '',
        showTimeTaken: values?.showTimeTaken || false,
      };

      await updateUser({
        userDetails: updatedVals,
      });

      toast.success('Profile updated successfully');
    } catch (e) {
      console.error(e);
      toast.error('An error occurred while updating your profile');
    }
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
                            checked={field.value}
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

          <Button type="submit" variant="secondary">
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
