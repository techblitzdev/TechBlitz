import React from 'react';
import { Input } from './input';
import { cn } from '@/utils/cn';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

// react hook form
import { Path } from 'react-hook-form';
import { Checkbox } from './checkbox';

interface IFormProps {
  [key: string]: string;
}

interface InputWithLabelProps {
  type: string;
  name: string;
  value?: string | string[];
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
  checkbox?: Path<IFormProps>;
  inputClassName?: Path<IFormProps>;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, inputClassName, ...props }, ref) => {
    return (
      <div
        className={cn`
          flex flex-col gap-y-1.5
          ${props.wrapperclassname}
        `}
      >
        <div className="flex gap-x-1 items-center">
          <label className="text-sm text-muted-foreground text-white/80 font-inter font-medium">
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
                <TooltipContent>{props.question.text}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className={cn('flex items-center gap-x-2', inputClassName)}>
          {props.checkbox && <Checkbox></Checkbox>}
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
      </div>
    );
  }
);

InputWithLabel.displayName = 'InputWithLabel';

export { InputWithLabel };
