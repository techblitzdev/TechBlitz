'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { InputWithLabel } from '@/components/ui/input-label'
import { toast } from 'sonner'
import type { z } from 'zod'
import { signupSchema } from '@/lib/zod/schemas/signup'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { signUp } from '@/actions/user/account/signup'
import { useRouter, useSearchParams } from 'next/navigation'
import GithubLogo from '../ui/icons/github'
import { DiscordLogoIcon } from '@radix-ui/react-icons'
import OrSeparator from './or-separator'
import { oauth } from '@/actions/user/account/oauth'

type SchemaProps = z.infer<typeof signupSchema>

export default function SignupForm(opts: { prefilledEmail?: string }) {
  const { prefilledEmail } = opts
  const [showEmailForm, setShowEmailForm] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const ref = searchParams.get('ref')

  const form = useForm<SchemaProps>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: prefilledEmail || '',
      password: '',
      referralCode: ref || undefined,
    },
  })

  const { mutateAsync: handleSignUp, isPending } = useMutation({
    mutationFn: async (values: SchemaProps) => {
      const result = await signUp(
        values.email,
        values.password,
        ref || undefined,
      )
      if (result.error) {
        throw new Error(result.error)
      }
      return result
    },
    onSuccess: () => {
      toast.success(
        'Signup successful! Please check your email to verify your account.',
      )
      localStorage.setItem('onboarding', 'true')
      router.push('/verify-email')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return (
    <div className="w-full mx-auto mt-8 space-y-6">
      {!showEmailForm ? (
        <div className="space-y-4">
          {/* being disabled for now as waiting for google project to be approved */}
          {/* <form
            onSubmit={async (event) => {
              event.preventDefault();
              await oauth('google', true);
            }}
          >
            <Button
              type="submit"
              variant="outline"
              className="w-full bg-white text-black hover:bg-gray-100 hover:text-black"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </form> */}
          <form
            onSubmit={async (event) => {
              event.preventDefault()
              await oauth('github', true)
            }}
          >
            <Button
              type="submit"
              variant="outline"
              className="w-full bg-[#24292e] text-white hover:bg-[#2f363d] border-none hover:text-white"
            >
              <GithubLogo className="w-5 h-5 mr-2" />
              Continue with GitHub
            </Button>
          </form>
          <form
            onSubmit={async (event) => {
              event.preventDefault()
              await oauth('discord', true)
            }}
          >
            <Button
              type="submit"
              variant="outline"
              className="w-full bg-[#5865F2] text-white hover:bg-[#4752C4] border-none hover:text-white"
            >
              <DiscordLogoIcon className="w-5 h-5 mr-2" />
              Continue with Discord
            </Button>
          </form>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => handleSignUp(values))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithLabel
                      label="Email"
                      type="email"
                      placeholder="team@techblitz.dev"
                      {...field}
                      autoComplete="email"
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
                      placeholder="********"
                      {...field}
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
              className="w-full"
              variant="secondary"
            >
              {isPending ? 'Loading...' : 'Sign Up'}
            </Button>
          </form>
        </Form>
      )}

      <OrSeparator />

      <Button
        onClick={() => setShowEmailForm(!showEmailForm)}
        className="w-full"
        variant="default"
      >
        {showEmailForm ? 'Continue with GitHub/Discord' : 'Continue with Email'}
      </Button>
    </div>
  )
}
