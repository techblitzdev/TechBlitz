'use client';
// components
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Form,
  FormDescription,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
} from '@/components/ui/form';
import { InputWithLabel } from '@/components/ui/input-label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// types
import { UserRecord, UserUpdatePayload } from '@/types/User';
// actions
import { getUserDisplayName } from '@/utils/user';

// zod
import { userDetailsSchema } from '@/lib/zod/schemas/user-details-schema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { updateUser } from '@/actions/user/update-user';
import { toast } from 'sonner';

type SchemaProps = z.infer<typeof userDetailsSchema>;

export default function UserProfileSheet(opts: { user: UserRecord }) {
  const { user } = opts;

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

  const updateUserDetails = async (values: SchemaProps, data: any) => {
    const formData = new FormData();
    formData.append('files', data.target.files[0]);
    formData.append('userId', user?.uid);
    formData.append('route', 'user-profile-pictures');

    try {
      // upload the file
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const { logoUrl } = await res.json();

      const updatedVals: UserUpdatePayload = {
        ...values,
        uid: user.uid,
      };
      if (logoUrl) {
        updatedVals.userProfilePicture = logoUrl;
      }

      // update the user
      await updateUser({
        userDetails: updatedVals,
      });

      // toast to confirm
      toast.success('Profile updated successfully');
    } catch (e) {
      console.error(e);
      toast.error('An error occurred while updating your profile');
    }
  };

  return (
    <SheetContent
      forceMount
      className="bg-black border-l border-black-50"
      side="right"
    >
      <SheetHeader>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <SheetTitle className="text-2xl">
              {getUserDisplayName(user)}
            </SheetTitle>
            <SheetDescription className="text-white/70">
              Edit your profile details below.
            </SheetDescription>
            <Separator className="bg-black-50" />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(updateUserDetails)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem className="flex gap-x-4 items-center">
                    <FormControl>
                      <>
                        <div className="bg-white p-2 rounded-full size-16"></div>
                        <label
                          htmlFor="logo-file-upload"
                          className="cursor-pointer"
                        >
                          Upload Logo
                        </label>
                        <Input
                          id="logo-file-upload"
                          type="file"
                          className="!hidden"
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

              <Button type="submit" className="w-full" variant="secondary">
                Save changes
              </Button>
            </form>
          </Form>
        </div>
      </SheetHeader>
    </SheetContent>
  );
}
