"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Controller, FormProvider } from "react-hook-form"

import { cn } from "@/lib/utils"

// ------------------------

const Form = FormProvider

// ------------------------

const FormField = Controller

// ------------------------

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-2", className)} {...props} />
})
FormItem.displayName = "FormItem"

// ------------------------

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

// ------------------------

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  return <div ref={ref} {...props} />
})
FormControl.displayName = "FormControl"

// ------------------------

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-destructive", className)}
      {...props}
    />
  )
})
FormMessage.displayName = "FormMessage"

// ------------------------

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
}