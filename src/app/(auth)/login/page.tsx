import LoginForm from "@/components/auth/login"

export default function SignupPage() {
  return (
    <div className="container text-white h-screen flex flex-col items-center justify-center py-20">
      <h1 className="font-bold text-4xl font-inter">Welcome Back!</h1>
      <LoginForm />
    </div>
  )
}