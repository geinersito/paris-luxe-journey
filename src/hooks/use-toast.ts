
import * as React from "react"
import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  duration?: number
  action?: React.ReactNode
  variant?: "default" | "destructive" | "success"
}

export function toast(props: ToastProps) {
  sonnerToast(props.title, {
    description: props.description,
    duration: props.duration || 5000,
    action: props.action,
  })
}

export function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
    toasts: [] as any[]
  }
}
