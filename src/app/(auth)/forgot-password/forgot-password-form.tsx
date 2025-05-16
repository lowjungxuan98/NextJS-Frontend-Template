"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      // Replace with your password reset logic
      setTimeout(() => {
        setIsEmailSent(true)
        // Optional: redirect to a confirmation page
        // router.push("/otp")
      }, 1000)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      {isEmailSent ? (
        <div className="text-center">
          <p className="mb-4">We&apos;ve sent you an email with a link to reset your password.</p>
          <Button variant="outline" onClick={() => router.push("/login")}>
            Back to login
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                disabled={isLoading}
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending reset link..." : "Send reset link"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
} 