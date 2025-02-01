'use client'

import { ChatBubbleIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { FeedbackModal } from '@/components/app/shared/feedback/feedback-modal'
import type React from 'react'

interface FeedbackButtonProps {
  showText?: boolean
  reference?: string
  title?: string
  description?: string
  children?: React.ReactNode
  icon?: React.ReactNode
}

export default function FeedbackButton({
  showText = true,
  reference,
  title,
  description,
  children,
  icon,
}: FeedbackButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={showText ? 'default' : 'ghost'}
          className="items-center gap-2 p-2"
          wrapperClassName="hidden sm:flex"
        >
          {icon || <ChatBubbleIcon className="size-4 block md:hidden" />}
          {showText && (
            <p className="text-sm hidden md:block">{title || 'Feedback'}</p>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 bg-black-75 text-white border border-black-50"
        align="end"
      >
        <FeedbackModal
          title={title}
          description={description}
          reference={reference}
        >
          {children}
        </FeedbackModal>
      </PopoverContent>
    </Popover>
  )
}
