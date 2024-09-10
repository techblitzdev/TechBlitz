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
import { signupSchema } from "@/lib/zod/schemas/signup"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { signUp } from "@/actions/user/signup"

type SchemaProps = z.infer<typeof signupSchema>

export default function SignupForm() {
  const form = useForm<SchemaProps>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    }
  })

  const { 
    data,
    mutateAsync: server_signup,
    isPending
  } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      // redirect to dashboard

    }
  })

  const handleSignup = (values: SchemaProps) => {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSignup)}
      >
        
      </form>
    </Form>
  )
}