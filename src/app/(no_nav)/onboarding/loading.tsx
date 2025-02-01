import Logo from '@/components/ui/logo'
import StarsBackground from '@/components/ui/stars-background'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

export default function OnboardingLoading() {
  return (
    <div className="relative container">
      <StarsBackground className="-z-10" />
      <div className="flex flex-col min-h-screen items-center">
        <Link href="/" className="pl-0 md:pl-8 p-8 pb-0 flex justify-center">
          <Logo />
        </Link>
        <div className="flex-1 flex items-center justify-center p-4 max-w-72 sm:max-w-96 lg:max-w-[30rem]">
          <Card
            className="border border-black-50 rounded-lg shadow-xl overflow-hidden min-w-72 sm:min-w-96 lg:min-w-[30rem] relative"
            style={{
              background:
                'radial-gradient(128% 107% at 0% 0%, #212121 0%, rgb(0,0,0) 77.61%)',
            }}
          >
            <div className="p-6 space-y-4">
              <Skeleton className="h-8 w-3/4 bg-black-50" />
              <Skeleton className="h-4 w-full bg-black-50" />
              <Skeleton className="h-4 w-5/6 bg-black-50" />
              <Skeleton className="h-10 w-full bg-black-50" />
            </div>
            <div className="p-6 flex justify-end">
              <Skeleton className="h-10 w-32 bg-black-50" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
