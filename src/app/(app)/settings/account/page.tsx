"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/hooks/use-user";
import { updateUserAuth } from "@/actions/user/authed/update-user-auth";
import { updateUserSchema } from "@/lib/zod/schemas/update-user";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import LoadingSpinner from "@/components/ui/loading";
import DeleteAccountModal from "@/components/app/settings/delete-account-modal";
import { Separator } from "@/components/ui/separator";
import { InputWithLabel } from "@/components/ui/input-label";

type SchemaProps = z.infer<typeof updateUserSchema>;

export default function SettingsProfilePage() {
  const { user, isLoading } = useUser();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { mutateAsync: server_updateUserAuth, isPending } = useMutation({
    mutationFn: (values: SchemaProps) => updateUserAuth(values),
    onSuccess: () => {
      toast.success(
        "Account updated successfully, please check your email for further instructions.",
      );
    },
    onError: (error) => {
      toast.error(`Failed to update user auth: ${error}`);
    },
  });

  const form = useForm<SchemaProps>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: user?.email || "",
      password: "",
    },
  });

  const onSubmit = async (values: SchemaProps) => {
    try {
      await server_updateUserAuth(values);
    } catch (error) {
      console.error("Failed to update user auth:", error);
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
          className="w-full space-y-6 p-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithLabel
                    label="Email Address"
                    type="email"
                    autoComplete="email"
                    placeholder={user?.email || "Email Address"}
                    {...field}
                    value={field.value || ""}
                  />
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
                <FormControl>
                  <InputWithLabel
                    label="Password"
                    type="password"
                    autoComplete="password"
                    placeholder="********"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  Leave blank to keep your current password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-wrap gap-4">
            <Button type="submit">
              {isPending ? <LoadingSpinner /> : "Save changes"}
            </Button>
            <Button
              variant="destructive"
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-fit"
            >
              Delete account
            </Button>
            <DeleteAccountModal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
