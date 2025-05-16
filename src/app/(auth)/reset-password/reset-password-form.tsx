"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter, useSearchParams } from "next/navigation"
import { authService } from "@/lib/api"

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isResetSuccess, setIsResetSuccess] = useState(false)
  const [error, setError] = useState("")
  const [token, setToken] = useState<string | null>(null)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get token from URL on component mount
  useEffect(() => {
    const tokenParam = searchParams.get("token")
    if (!tokenParam) {
      setError("Invalid or missing reset token. Please request a new password reset link.")
      return
    }
    setToken(tokenParam)
  }, [searchParams])

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    
    if (!token) {
      setError("Invalid or missing reset token. Please request a new password reset link.")
      return
    }
    
    setIsLoading(true)
    setError("")

    // Get form data
    const formData = new FormData(event.target as HTMLFormElement)
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      // Call the auth service to reset password
      await authService.resetPassword(token, password)
      setIsResetSuccess(true)
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error) {
      console.error(error)
      setError("Failed to reset password. The link may have expired. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Show error message if no token is provided
  if (error && !token) {
    return (
      <div className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button variant="outline" onClick={() => router.push("/forgot-password")}>
          Request new reset link
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {isResetSuccess ? (
        <div className="text-center">
          <p className="mb-4">Your password has been successfully reset.</p>
          <p className="text-sm text-muted-foreground mb-4">You will be redirected to the login page in a few seconds.</p>
          <Button onClick={() => router.push("/login")}>
            Go to login
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={isLoading}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={isLoading}
                required
              />
            </div>
            {error && (
              <div className="text-sm text-red-500">{error}</div>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Resetting password..." : "Reset password"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
} 