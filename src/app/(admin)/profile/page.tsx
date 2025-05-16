"use client"

import { useEffect, useState } from "react"
import { Main } from "@/components/layout/main"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User } from "@/lib/api/model/auth"

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('auth')
    if (userData) {
      try {
        const parsedData = JSON.parse(userData)
        setUser(parsedData.user)
      } catch (error) {
        console.error("Failed to parse user data", error)
      }
    }
  }, [])

  return (
    <Main>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              View and manage your account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user ? (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={user.name} readOnly />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user.email} readOnly />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value={user.role} readOnly />
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${user.isEmailVerified ? 'bg-green-500' : 'bg-amber-500'}`} />
                  <span className="text-sm">
                    {user.isEmailVerified ? 'Email verified' : 'Email not verified'}
                  </span>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button>Update Profile</Button>
                  <Button variant="outline">Change Password</Button>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center text-muted-foreground">
                Loading profile information...
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Main>
  )
}