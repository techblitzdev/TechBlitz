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
import { signUp } from "@/actions/user/signup"
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

  const handleLogin = (values: SchemaProps) => { }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="grid grid-cols-12 gap-4 w-96 mt-8"
      >


      </form>
    </Form>
  )
}