import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-14 w-full rounded-lg bg-white/[0.08] border-0 border-b-2 border-white/20 px-4 pt-5 pb-2 text-base text-white placeholder:text-white/30 focus:border-b-rose-500 focus:bg-white/[0.12] focus:outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
