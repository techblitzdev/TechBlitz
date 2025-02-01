import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function NoDailyQuestion(opts: {
  variant?: 'default' | 'secondary' | 'accent'
  textSize?: 'sm' | 'base' | 'lg'
  textAlign?: 'center' | 'left' | 'right'
}) {
  const { variant = 'secondary', textSize = 'base', textAlign = 'start' } = opts

  return (
    <>
      <div
        className={cn(
          'font-satoshi w-full flex flex-col gap-y-1 justify-center h-full',
          `text-${textAlign}`,
        )}
      >
        <>
          <p className="text-lg font-semibold">
            The issue is on our end, not yours!
          </p>
          <p className={`text-${textSize}`}>
            It seems there's no question available for today. Please reach out
            to
            <br />
            our support team to help resolve this.
          </p>
          <Button variant={variant} href="/contact" className="mt-2">
            Contact Support
          </Button>
        </>
      </div>
    </>
  )
}
