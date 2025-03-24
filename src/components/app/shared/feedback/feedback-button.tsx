'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FeedbackModal } from '@/components/app/shared/feedback/feedback-modal';
import type React from 'react';
import MsgWriting from '@/components/ui/icons/msg-writing';

interface FeedbackButtonProps {
  showText?: boolean;
  reference?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function FeedbackButton({
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
          variant={title ? 'default' : 'ghost'}
          padding={title ? 'md' : 'none'}
          className="items-center gap-2 p-2"
        >
          {title && <p className="text-sm hidden md:block">{title}</p>}
          {icon && <MsgWriting height="1.25rem" width="1.25rem" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 bg-white dark:bg-black-75 text-black dark:text-white border border-secondary dark:border-black-50"
        align="end"
      >
        <FeedbackModal title={title} description={description} reference={reference}>
          {children}
        </FeedbackModal>
      </PopoverContent>
    </Popover>
  );
}
