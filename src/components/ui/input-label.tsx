import React from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

// react hook form 
import { UseFormRegister, Path, Controller } from 'react-hook-form';

interface IFormProps {
  [key: string]: string;
}

interface InputWithLabelProps {
  type: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  wrapperclassname?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  autoComplete?: string;
  question?: {
    text: string;
    icon: React.ReactNode;
  };

  // react hook form props
  label?: Path<IFormProps>;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, ...props }, ref) => {
    return (
      <div 
        className={cn`
          flex flex-col gap-y-1.5
          ${props.wrapperclassname}
        `}
      >
        <div className="flex gap-x-1 items-center">
          <label 
            className="text-sm text-muted-foreground text-white/80 font-inter font-medium"
          >
            {label}
          </label>
          {props.question && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger
                  className="text-white/50 hover:text-white"
                  onClick={(e) => e.preventDefault()}
                >
                  {props.question.icon}
                </TooltipTrigger>
                <TooltipContent>
                  {props.question.text}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <Input 
          ref={ref}
          {...props}
          className="
            bg-transparent w-full p-2 placeholder:text-white/50 autofill:!bg-transparent border border-black-50
            focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 px-4
            hover:border-white/50
          "
        />
      </div>
      
    );
  }
);

InputWithLabel.displayName = 'InputWithLabel';

export { InputWithLabel };
