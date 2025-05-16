import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "./login-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle className="text-lg tracking-tight">Login</CardTitle>
        <CardDescription>
          Enter your email and password below to <br />
          log into your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <p className="text-center text-sm text-muted-foreground px-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline underline-offset-4 hover:text-primary">
            Sign up
          </Link>
        </p>
        <p className="text-center text-sm text-muted-foreground">
          <Link href="/forgot-password" className="underline underline-offset-4 hover:text-primary">
            Forgot your password?
          </Link>
        </p>
        <p className="text-center text-sm text-muted-foreground px-6">
          By clicking login, you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  )
}