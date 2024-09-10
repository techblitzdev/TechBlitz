'use client'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/lib/zod/schemas/login"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { login } from "@/actions/user/login"
import { InputWithLabel } from "../ui/input-label"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type SchemaProps = z.infer<typeof loginSchema>

export default function LoginForm() {
  const router = useRouter()
  
  const form = useForm<SchemaProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const { 
    data,
    mutateAsync: server_login,
    isPending
  } = useMutation({
    mutationFn: (values: SchemaProps) => login(values.email, values.password),
    onSuccess: () => {
      // show success toast
      toast.success("Login successful!")
      // redirect to dashboard
      router.push("/dashboard")
    },
    onError: (error) => {
      // show error toast
      toast.error(error.message)
    }
  })

  const handleLogin = (values: SchemaProps) => server_login(values)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="grid grid-cols-12 gap-4 w-96 mt-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormControl>
              <div className="col-span-6">
                <InputWithLabel
                  label="Email"
                  type="email"
                  {...field}
                />
                <FormMessage>{form.formState?.errors?.email?.message}</FormMessage>
              </div>
            </FormControl>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormControl>
              <div className="col-span-6">
                <InputWithLabel
                  label="Password"
                  type="password"
                  {...field}
                />
                <FormMessage>{form.formState?.errors?.password?.message}</FormMessage>
              </div>
            </FormControl>
          )}
        />
        <FormItem className="col-span-full">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "Loading..." : "Login"}
          </Button>
        </FormItem>
      </form>
    </Form>
  )
}