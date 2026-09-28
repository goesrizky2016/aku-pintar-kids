import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "ghost";
type Size = "default" | "icon-lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", type = "button", ...props }, ref) => {
    const variants: Record<Variant, string> = {
      default: "bg-slate-900 text-white hover:bg-slate-800",
      outline: "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
      ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
    };
    const sizes: Record<Size, string> = {
      default: "px-4 py-2",
      "icon-lg": "size-12 p-0",
    };
    return <button ref={ref} type={type} className={cn("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className)} {...props} />;
  },
);
Button.displayName = "Button";
