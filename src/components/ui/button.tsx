import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border-2.5 border-ink font-body text-[15px] font-bold transition-[transform,box-shadow,background] duration-250 ease-[cubic-bezier(0.2,0.8,0.2,1)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0_#121214] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-violet text-white shadow-brutal hover:-translate-x-[3px] hover:-translate-y-[3px] hover:bg-[#7B4FFF] hover:shadow-brutal-hover",
        ghost:
          "bg-paper text-ink shadow-brutal-sm hover:-translate-x-[3px] hover:-translate-y-[3px] hover:bg-lime hover:shadow-brutal-hover",
        ink: "bg-ink text-paper shadow-brutal hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal-hover",
        lime: "bg-lime text-ink shadow-brutal-sm hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal-hover",
      },
      size: {
        default: "px-7 py-[15px]",
        sm: "px-5 py-3 text-sm",
        lg: "px-8 py-4 text-base",
        icon: "size-[42px] p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
    children: ReactNode;
  };

export function Button({
  className,
  variant,
  size,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

export { buttonVariants };
