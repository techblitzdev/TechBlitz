import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowRightIcon } from '@radix-ui/react-icons';
// packages
// next
import Link, { LinkProps } from 'next/link';
import { cn } from '@/utils/cn';

type ButtonElementProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorElementProps = React.LinkHTMLAttributes<LinkProps>;

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  href?: string;
  asChild?: boolean;
  special?: boolean;
  arrow?: boolean;
}

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
      fontSize: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      rounded: {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-2xl hover:rounded-xl',
      },
      padding: {
        none: '!p-0',
        sm: 'px-2 py-1',
        md: 'px-4 py-2',
        lg: 'px-8 py-4',
        xl: 'px-10 py-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonProps & (ButtonElementProps | AnchorElementProps)
>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      special,
      rounded,
      href,
      arrow,
      padding,
      fontSize,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : href ? Link : 'button';
    const compProps = href ? { href, ...props } : { ...props };

    return (
      <div className="w-full relative">
        {/** @ts-expect-error - the element tag has been changed */}
        <Comp
          className={cn(
            arrow && 'px-10 overflow-hidden relative group',
            buttonVariants({
              variant,
              size,
              className,
              rounded,
              fontSize,
              padding,
            })
          )}
          ref={ref}
          {...compProps}
        >
          {props.children}
          {arrow ? (
            <div className="overflow-hidden absolute right-4">
              <ArrowRightIcon
                className="
                  size-4 ml-2 -translate-x-4 overflow-hidden opacity-0
                  transition-transform duration-300 group-hover:translate-x-0
                  group-hover:opacity-100
                "
              />
            </div>
          ) : null}
        </Comp>
      </div>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
