import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ForgotPasswordForm } from "./forgot-password-form"

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your password",
}

export default function ForgotPasswordPage() {
  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle className="text-lg tracking-tight">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address and we&apos;ll send you a 
          link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
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