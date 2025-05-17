import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ResetPasswordForm } from "./reset-password-form"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Create a new password for your account",
}

export default function ResetPasswordPage() {
  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle className="text-lg tracking-tight">Reset Password</CardTitle>
        <CardDescription>
          Enter a new password for your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </CardContent>
      <CardFooter>
        <p className="text-center w-full text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link href="/login" className="underline underline-offset-4 hover:text-primary">
            Back to login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
} 