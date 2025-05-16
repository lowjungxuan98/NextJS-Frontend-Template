import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { OtpForm } from "./otp-form"

export const metadata: Metadata = {
  title: "Verify OTP",
  description: "Enter your one-time password",
}

export default function OtpPage() {
  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle className="text-lg tracking-tight">Verification Code</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to your email or phone
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OtpForm />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          Didn&apos;t receive a code?{" "}
          <Link href="#" className="underline underline-offset-4 hover:text-primary">
            Resend code
          </Link>
        </p>
        <p className="text-center text-sm text-muted-foreground">
          <Link href="/login" className="underline underline-offset-4 hover:text-primary">
            Back to login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
} 