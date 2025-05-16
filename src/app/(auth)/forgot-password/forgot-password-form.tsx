"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/api"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    // Get form data
    const formData = new FormData(event.target as HTMLFormElement)
    const email = formData.get("email") as string

    try {
      // Call the auth service to send password reset email
      await authService.forgotPassword(email)
      setIsEmailSent(true)
    } catch (error) {
      console.error(error)
      setError("Failed to send reset link. Please try again.")
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
                name="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                disabled={isLoading}
                required
              />
            </div>
            {error && (
              <div className="text-sm text-red-500">{error}</div>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending reset link..." : "Send reset link"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
} 