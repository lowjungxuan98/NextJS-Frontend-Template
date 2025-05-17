"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export function OtpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]
  const router = useRouter()

  // Focus the first input field on component mount
  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus()
    }
  }, [inputRefs])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value
    // Only allow numeric inputs
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Move to next input if current input is filled
      if (value && index < 5 && inputRefs[index + 1]?.current) {
        inputRefs[index + 1].current?.focus()
      }
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()
    
    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("")
      setOtp(newOtp)
      
      // Focus the last input
      inputRefs[5].current?.focus()
    }
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const otpCode = otp.join("")
    
    // Check if OTP is complete
    if (otpCode.length !== 6) {
      return
    }
    
    setIsLoading(true)

    try {
      // Replace with your OTP verification logic
      console.log("Verifying OTP:", otpCode)
      setTimeout(() => {
        router.push("/")
      }, 1000)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={inputRefs[index]}
                className="w-10 h-12 text-center text-lg"
                value={digit}
                maxLength={1}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                disabled={isLoading}
                required
              />
            ))}
          </div>
          <Button 
            type="submit" 
            disabled={isLoading || otp.join("").length !== 6}
            className="mt-2"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </form>
    </div>
  )
} 