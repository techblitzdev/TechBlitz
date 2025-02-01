'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode[]
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6',
        className,
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href,
  padded,
  gradientBg,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
  href?: string | null
  padded?: boolean
  gradientBg?: boolean
}) => {
  const renderContent = () => {
    const hasContent = title || description || icon

    return (
      <>
        {header}
        {hasContent && (
          <div className="group-hover/bento:translate-x-2 transition duration-200">
            {icon}
            {title && (
              <div className="font-bold text-white mb-1 mt-2 font-satoshi text-base md:text-lg">
                {title}
              </div>
            )}
            {description && (
              <div className="font-normal text-xs md:text-sm text-white">
                {description}
              </div>
            )}
          </div>
        )}
      </>
    )
  }

  const baseClasses = cn(
    'rounded-xl group/bento overflow-hidden hover:shadow-xl transition duration-200 shadow-input border border-black-50 justify-between flex flex-col',
    header || title || description || icon ? 'space-y-3 md:space-y-4' : '',
    className,
    padded ? 'p-3 md:p-4' : '',
  )

  return href ? (
    <Link href={href} className={baseClasses} prefetch>
      {renderContent()}
    </Link>
  ) : (
    <div
      className={baseClasses}
      style={
        gradientBg
          ? {
              background:
                'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
            }
          : undefined
      }
    >
      {renderContent()}
    </div>
  )
}
