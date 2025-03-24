import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link, { LinkProps } from 'next/link';
import { cn } from '@/lib/utils';

type ButtonElementProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorElementProps = React.LinkHTMLAttributes<LinkProps>;

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  href?: string;
  asChild?: boolean;
  special?: boolean;
  arrow?: boolean;
  fullWidth?: boolean;
  wrapperClassName?: string;
  disabled?: boolean;
  target?: string;
}

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 font-onest',
  {
    variants: {
      variant: {
        default:
          'bg-secondary dark:bg-primary text-black dark:text-primary-foreground shadow hover:bg-secondary/90 dark:hover:bg-primary/90',
        destructive:
          'bg-red-600 dark:bg-red-600 text-destructive-foreground shadow-sm hover:bg-destructive/90 dark:hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm shadow-black/5 hover:bg-primary hover:text-accent-foreground',
        secondary:
          'bg-secondary dark:bg-primary text-secondary-foreground shadow-sm hover:bg-secondary/80 dark:hover:bg-primary/80',
        ghost: 'hover:text-gray-400 duration-300',
        link: 'text-primary underline-offset-4 hover:underline',
        accent: 'bg-accent text-white shadow-sm hover:bg-accent/90 font-onest',
        // premium is accent but with a shimmering effect
        premium:
          'font-onest !bg-gradient-to-r !from-accent !via-accent/80 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors',
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
      fullWidth: {
        true: 'w-full',
        false: 'inline-flex',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
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
      rounded,
      href,
      arrow,
      padding,
      fontSize,
      fullWidth,
      wrapperClassName,
      disabled,
      target,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : href ? Link : 'button';
    const compProps = href ? { href, ...props } : { ...props };

    return (
      <div className={cn({ 'w-full': fullWidth, relative: true }, wrapperClassName)}>
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
              fullWidth,
            })
          )}
          ref={ref}
          disabled={disabled}
          target={target}
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
