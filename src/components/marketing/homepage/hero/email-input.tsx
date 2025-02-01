"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const Schema = z.object({
  email: z.string().email(),
});

type SchemaProps = z.infer<typeof Schema>;

export default function HomepageHeroEmailSignup() {
  const router = useRouter();
  const form = useForm<SchemaProps>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: "",
    },
  });

  // validate the email input
  const handleEmailSignup = () => {
    if (form.getValues().email === "") {
      return;
    }

    router.push(`/signup?email=${form.getValues().email}&ref=homepage-hero`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleEmailSignup)}
        className="flex flex-col gap-y-3"
      >
        <div className="flex flex-col md:flex-row gap-3 md:items-end mt-3 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormControl>
                <div className="space-y-1">
                  <FormMessage>
                    {form.formState?.errors?.email?.message}
                  </FormMessage>
                  <Input
                    className="
										bg-transparent p-2 placeholder:text-white/50 autofill:!bg-transparent border border-black-50
										focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 px-4
										hover:border-white/50 w-full lg:w-72
										"
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    autoCapitalize="email"
                  />
                </div>
              </FormControl>
            )}
          />
          <Button
            variant="accent"
            className="w-full lg:w-fit items-center"
            onClick={() => handleEmailSignup()}
          >
            Get Started
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
        <p className="text-gray-400 text-xs pl-0.5">No credit card required.</p>
      </form>
    </Form>
  );
}
