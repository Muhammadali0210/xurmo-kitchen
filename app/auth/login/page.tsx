"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
// import login from "@/action/login.action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "Tizimga kirishda xatolik yuz berdi");
      }
      router.push('/admin');
      console.log("Kirish muvaffaqiyatli");
      
    } catch (err) {
      setError("Foydalanuvchi nomi yoki parol xato");
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <Card className="w-full max-w-md border-2 border-green-100">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-green-800">Admin Panel</CardTitle>
          <CardDescription>Menyularni boshqarish uchun tizimga kiring</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Foydalanuvchi nomi</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="border-green-200 focus:border-green-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Parol</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border-green-200 focus:border-green-400"
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Kirish..." : "Kirish"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

