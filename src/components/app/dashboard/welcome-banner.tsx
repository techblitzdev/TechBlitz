import { getUserDisplayName } from '@/utils/user'
import { useUserServer } from '@/hooks/use-user-server'
import { redirect } from 'next/navigation'

export default async function WelcomeMessage() {
  const user = await useUserServer()
  if (!user) return redirect('/login')

  return (
    <h1 className="text-2xl font-bold">
      Welcome back, {getUserDisplayName(user)}
    </h1>
  )
}
