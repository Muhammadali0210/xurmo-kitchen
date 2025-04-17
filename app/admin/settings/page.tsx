"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { changePassword } from "@/lib/auth"

export default function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      if (newPassword !== confirmPassword) {
        throw new Error("Yangi parol va tasdiqlash paroli mos kelmaydi")
      }

      if (newPassword.length < 8) {
        throw new Error("Yangi parol kamida 8 ta belgidan iborat bo'lishi kerak")
      }

      const result = await changePassword(currentPassword, newPassword)

      if (result.success) {
        setSuccess("Parol muvaffaqiyatli o'zgartirildi")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        throw new Error(result.message || "Parolni o'zgartirishda xatolik yuz berdi")
      }
    } catch (err: any) {
      setError(err.message || "Parolni o'zgartirishda xatolik yuz berdi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-green-800">Parolni o'zgartirish</CardTitle>
          <CardDescription>Admin paneliga kirish uchun yangi parol o'rnating</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 border-green-200 bg-green-50 text-green-800">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Joriy parol</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border-green-200 focus:border-green-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">Yangi parol</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border-green-200 focus:border-green-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Yangi parolni tasdiqlang</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-green-200 focus:border-green-400"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? "O'zgartirilmoqda..." : "Parolni o'zgartirish"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
