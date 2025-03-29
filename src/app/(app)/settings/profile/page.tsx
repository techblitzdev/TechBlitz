'use client';
import { useEffect } from 'react';

import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputWithLabel } from '@/components/ui/input-label';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import LoadingSpinner from '@/components/ui/loading';
import LogoutButton from '@/components/auth/logout';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import CodeEditorPreview from '@/components/app/settings/code-preview';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUser } from '@/hooks/use-user';
import { updateUser } from '@/actions/user/authed/update-user';

import { userDetailsSchema } from '@/lib/zod/schemas/user-details-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UserUpdatePayload } from '@/types/User';
import { themes } from 'prism-react-renderer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getUpgradeUrl } from '@/utils';

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
      codeEditorTheme: user?.codeEditorTheme || 'vs-dark',
      userProfilePicture: user?.userProfilePicture || '',
      aboutMeAiHelp: user?.aboutMeAiHelp || '',
      sendPromotionalEmails: user?.sendPromotionalEmails || false,
      fasterThanAiGameMode: user?.fasterThanAiGameMode || false,
      userXp: user?.userXp || 0,
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
        codeEditorTheme: user.codeEditorTheme || 'vs-dark',
        userProfilePicture: user.userProfilePicture || '',
        aboutMeAiHelp: user.aboutMeAiHelp || '',
        sendPromotionalEmails: user.sendPromotionalEmails,
        fasterThanAiGameMode: user.fasterThanAiGameMode,
        userXp: user.userXp,
      });
    }
  }, [user, isLoading, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: SchemaProps) => {
      const changedValues = Object.entries(values).reduce((acc, [key, value]) => {
        if (value !== user?.[key as keyof typeof user]) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);

      const updatedVals: Partial<UserUpdatePayload> = {
        ...changedValues,
        uid: user?.uid || '',
      };

      const updatedUser = await updateUser({ userDetails: updatedVals });
      return updatedUser;
    },
    onMutate: async (newUserData) => {
      await queryClient.cancelQueries({ queryKey: ['user-details'] });
      const previousUser = queryClient.getQueryData(['user-details']);
      queryClient.setQueryData(['user-details'], (old: any) => ({
        ...old,
        ...newUserData,
      }));
      return { previousUser };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['user-details'], context?.previousUser);
      toast.error('An error occurred while updating your profile');
      console.error(err);
    },
    onSuccess: () => {
      toast.success('Profile updated successfully');
    },
  });

  const onSubmitProfilePicture = async (data: any) => {
    if (!user?.uid || !data.target.files[0]) return;

    const file = data.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes

    if (file.size > maxSize) {
      toast.error('File size must be less than 2MB');
      return;
    }

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

      if (logoUrl) {
        form.setValue('userProfilePicture', logoUrl);
        mutate({ ...form.getValues(), userProfilePicture: logoUrl });
      }
    } catch (e) {
      console.error(e);
      toast.error('Failed to upload profile picture');
    }
  };

  const onSubmit = (values: SchemaProps) => {
    mutate(values);
  };

  return (
    <div className="flex flex-col">
      <div className="space-y-1 p-8">
        <h1 className="text-3xl">Profile Settings</h1>
        <p className="text-base">Update your profile details and preferences.</p>
      </div>
      <Separator className="w-full bg-black-50" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 p-8">
          {/** profile picture */}
          <FormField
            control={form.control}
            name="userProfilePicture"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="relative size-16 md:size-24 rounded-full overflow-hidden border-2 border-black-50">
                    {field.value ? (
                      <img src={field.value} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-black flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="logo-file-upload" className="text-base font-medium">
                      Profile Picture
                    </Label>
                    <div className="flex gap-2">
                      <label
                        htmlFor="logo-file-upload"
                        className="cursor-pointer bg-primary hover:bg-primary/90 border border-black-50 text-primary-foreground px-4 py-2 rounded-md text-base"
                      >
                        Choose File
                      </label>
                      <Input
                        id="logo-file-upload"
                        type="file"
                        onChange={(e) => {
                          onSubmitProfilePicture(e);
                        }}
                        className="hidden"
                        accept="image/*"
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Recommended: Square image, at least 200x200px (max 2MB)
                    </p>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/** Username */}
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
                <FormMessage />
              </FormItem>
            )}
          />

          {/** First Name */}
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
                <FormMessage />
              </FormItem>
            )}
          />

          {/** Last Name */}
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
                <FormMessage />
              </FormItem>
            )}
          />

          {/** Show on leaderboard */}
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
                          <Label htmlFor="showTimeTaken" className="text-base">
                            Show on leaderboard
                          </Label>
                        </div>
                      </TooltipTrigger>
                    </Tooltip>
                  </TooltipProvider>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/** Send push notifications */}
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
                            className="bg-black-50"
                          />
                          <Label htmlFor="sendPushNotifications" className="text-base">
                            Send daily reminders
                          </Label>
                        </div>
                      </TooltipTrigger>
                    </Tooltip>
                  </TooltipProvider>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/** Faster than AI game mode */}
          <FormField
            control={form.control}
            name="fasterThanAiGameMode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-x-2">
                          <Switch
                            id="fasterThanAiGameMode"
                            checked={!!field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                            }}
                            className="bg-black-50"
                          />
                          <Label htmlFor="fasterThanAiGameMode" className="text-base">
                            Faster than AI game mode
                          </Label>
                        </div>
                      </TooltipTrigger>
                    </Tooltip>
                  </TooltipProvider>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/** Send promotional emails */}
          <FormField
            control={form.control}
            name="sendPromotionalEmails"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-x-2">
                          <Switch
                            id="sendPromotionalEmails"
                            checked={!!field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                            }}
                            className="bg-black-50"
                          />
                          <Label htmlFor="sendPromotionalEmails" className="text-base">
                            Send promotional emails
                          </Label>
                        </div>
                      </TooltipTrigger>
                    </Tooltip>
                  </TooltipProvider>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/** About me - only allow premium users to edit this */}
          <FormField
            control={form.control}
            name="aboutMeAiHelp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <Label htmlFor="aboutMeAiHelp" className="text-base">
                      Personalize your AI
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Provide a short description of yourself to help our AI understand you better.
                      This can include topics that interest you, or code weaknesses you want to
                      improve on.
                    </p>
                    <Textarea
                      id="aboutMeAiHelp"
                      placeholder="Enter a short description to help us make TechBlitz a more personalized experience for you."
                      className="resize-none"
                      {...field}
                      value={field.value || ''}
                      disabled={user?.userLevel === 'FREE'}
                      rows={4}
                    />
                    {user?.userLevel === 'FREE' && (
                      <div className="mt-2 text-sm text-red-500">
                        Upgrade to a premium account to enhance your AI.
                        <a href={getUpgradeUrl()} className="text-accent underline ml-1">
                          Upgrade now
                        </a>
                      </div>
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/** Code editor theme */}
          <FormField
            control={form.control}
            name="codeEditorTheme"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-4">
                    <Select value={field.value || 'vs-dark'} onValueChange={field.onChange}>
                      <SelectTrigger className="border border-black-50 w-full md:w-[250px]">
                        {field.value || user?.codeEditorTheme || 'Select a code editor theme'}
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(themes).map(([key]) => (
                          <SelectItem key={key} value={key}>
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <CodeEditorPreview theme={(field.value as keyof typeof themes) || 'vs-dark'} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap gap-4">
            <Button type="submit" variant="secondary" disabled={isPending} className="text-base">
              {isPending ? <LoadingSpinner /> : 'Save changes'}
            </Button>
            <LogoutButton variant="destructive" />
          </div>
        </form>
      </Form>
    </div>
  );
}
