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
} from '@/components/ui/form';
import { InputWithLabel } from '@/components/ui/input-label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// types
import { UserRecord } from '@/types/User';
// actions
import { getUserDisplayName } from '@/utils/user';

// zod
import { userDetailsSchema } from '@/lib/zod/schemas/user-details-schema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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

  const updateUserDetails = async (values: SchemaProps) => {};

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
                  <FormControl>
                    <div className="flex gap-x-4 items-center">
                      <div className="bg-white p-2 rounded-full size-16"></div>
                      <Button variant="default" className="cursor-pointer">
                        Upload Logo
                      </Button>
                      <Input
                        id="logo-file-upload"
                        type="file"
                        onChange={() => {}}
                        className="!hidden"
                      />
                    </div>
                  </FormControl>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormControl>
                    <>
                      <InputWithLabel
                        label="Username"
                        type="text"
                        autoComplete="username"
                        {...field}
                      />
                    </>
                  </FormControl>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormControl>
                    <>
                      <InputWithLabel
                        label="First name"
                        type="text"
                        autoComplete="given-name"
                        {...field}
                      />
                    </>
                  </FormControl>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormControl>
                    <>
                      <InputWithLabel
                        label="Last name"
                        type="text"
                        autoComplete="family-name"
                        {...field}
                      />
                    </>
                  </FormControl>
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
