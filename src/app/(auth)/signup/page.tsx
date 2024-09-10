import SignupForm from "@/components/auth/signup"

export default function SignupPage() {
  return (
    <div className="container text-white h-screen flex flex-col items-center justify-center py-20">
      <h1 className="font-bold text-3xl">Sign up page</h1>
      <SignupForm />
    </div>
  )
}