import * as React from "react"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("grid gap-2", className)}
      {...props}
    />
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef(
  ({ className, children, value, checked, onChange, ...props }, ref) => {
    return (
      <label
        className={cn(
          "flex items-center space-x-2 cursor-pointer",
          className
        )}
      >
        <input
          type="radio"
          ref={ref}
          value={value}
          checked={checked}
          onChange={onChange}
          className="sr-only"
          {...props}
        />
        <div
          className={cn(
            "h-4 w-4 rounded-full border border-primary transition-all duration-200",
            checked
              ? "bg-primary border-primary"
              : "bg-background border-muted-foreground"
          )}
        >
          {checked && (
            <div className="h-full w-full rounded-full bg-primary-foreground scale-50" />
          )}
        </div>
        {children}
      </label>
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
