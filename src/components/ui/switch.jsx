"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

function Switch({ className, ...props }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer relative inline-flex h-12 w-28 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        "focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}>
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "absolute left-1 top-1 h-10 w-10 rounded-full bg-background transition-transform",
          "dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground",
          // ✅ move all the way right minus padding (track width - thumb size - left/right padding)
          "data-[state=checked]:translate-x-[calc(100%--1.5rem)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
