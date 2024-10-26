'use client';
import { useState } from 'react';
// zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userDetailsSchema } from '@/lib/zod/schemas/user-details-schema';
import { z } from 'zod';
// components
import { toast } from 'sonner';
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { InputWithLabel } from '@/components/ui/input-label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateUser } from '@/actions/user/update-user';
// types
import type { UserRecord, UserUpdatePayload } from '@/types/User';
import type { States } from '@/types/Utils';

import { getUserDisplayName } from '@/utils/user';

type SchemaProps = z.infer<typeof userDetailsSchema>;

export default function UserProfileSheet({ user }: { user: UserRecord }) {
  const [state, setState] = useState<States>('idle');

  const form = useForm<SchemaProps>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      username: user.username || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email,
      profilePicture: user.userProfilePicture || '',
    },
  });

  const onSubmit = async (values: SchemaProps) => {
    setState('loading');
    try {
      const updatedVals: UserUpdatePayload = {
        ...values,
        uid: user.uid,
      };

      await updateUser({
        userDetails: updatedVals,
      });

      toast.success('Profile updated successfully');
      setState('success');
    } catch (e) {
      console.error(e);
      toast.error('An error occurred while updating your profile');
      setState('error');
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('files', file);
    formData.append('userId', user?.uid);
    formData.append('route', 'user-profile-pictures');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const { logoUrl } = await res.json();
      form.setValue('profilePicture', logoUrl);
    } catch (e) {
      console.error(e);
      toast.error('An error occurred while uploading the profile picture');
    }
  };

  return (
    <SheetContent
      forceMount
      className="bg-black border-l border-black-50"
      side="right"
    >
      <div className="flex flex-col gap-y-4">
        <SheetHeader className="flex flex-col gap-y-2">
          <SheetTitle className="text-2xl">
            {getUserDisplayName(user)}
          </SheetTitle>
          <SheetDescription className="text-white/70">
            Edit your profile details below.
          </SheetDescription>
          <Separator className="bg-black-50" />
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem className="flex gap-x-4 items-center z-[5000]">
                  <FormControl>
                    <>
                      <div className="bg-white p-2 rounded-full size-16"></div>
                      <label
                        htmlFor="logo-file-upload"
                        className="cursor-pointer flex flex-col"
                      >
                        <span className="font-semibold">Upload logo</span>
                        <span className="text-xs font-light">Max 2MB</span>
                      </label>
                      <Input
                        id="logo-file-upload"
                        type="file"
                        className="!hidden"
                        onChange={handleFileUpload}
                      />
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
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
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithLabel
                      disabled
                      label="Public email"
                      type="text"
                      autoComplete="email"
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
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* <Button onClick={() => console.log('clicked')}>Click me</Button> */}

            <FormItem>
              <Button type="submit" className="w-full" variant="secondary">
                {state === 'loading' ? 'Saving...' : 'Save'}
              </Button>
            </FormItem>
          </form>
        </Form>
      </div>
    </SheetContent>
  );
}
