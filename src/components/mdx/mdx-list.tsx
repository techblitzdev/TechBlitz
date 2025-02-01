import { cn } from '@/lib/utils'

export default function MdxList({
  children,
  ordered = false,
}: {
  children: React.ReactNode
  ordered?: boolean
}) {
  const List = ordered ? 'ol' : 'ul'

  return (
    <List
      className={cn(
        'my-6 ml-6 list-disc space-y-2 marker:text-white [&>li]:text-base',
      )}
    >
      {children}
    </List>
  )
}
