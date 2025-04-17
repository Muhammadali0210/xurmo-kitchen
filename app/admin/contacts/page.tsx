"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash, Plus } from "lucide-react"
import { getContacts, updateContacts, type ContactInfo } from "@/lib/contact-data"

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactInfo>({
    address: "",
    email: "",
    phones: [""],
    social: {
      facebook: "",
      instagram: "",
      telegram: "",
    },
    workingHours: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setContacts(getContacts())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      // Filter out empty phone numbers
      const filteredPhones = contacts.phones.filter((phone) => phone.trim() !== "")

      if (filteredPhones.length === 0) {
        throw new Error("Kamida bitta telefon raqami kiritilishi kerak")
      }

      const updatedContacts = {
        ...contacts,
        phones: filteredPhones,
      }

      updateContacts(updatedContacts)
      setSuccess("Kontakt ma'lumotlari muvaffaqiyatli saqlandi")
    } catch (err: any) {
      setError(err.message || "Ma'lumotlarni saqlashda xatolik yuz berdi")
    } finally {
      setLoading(false)
    }
  }

  const addPhone = () => {
    setContacts({
      ...contacts,
      phones: [...contacts.phones, ""],
    })
  }

  const removePhone = (index: number) => {
    const newPhones = [...contacts.phones]
    newPhones.splice(index, 1)
    setContacts({
      ...contacts,
      phones: newPhones,
    })
  }

  const updatePhone = (index: number, value: string) => {
    const newPhones = [...contacts.phones]
    newPhones[index] = value
    setContacts({
      ...contacts,
      phones: newPhones,
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-green-800">Kontakt ma'lumotlari</CardTitle>
          <CardDescription>Restoran kontakt ma'lumotlarini o'zgartirish</CardDescription>
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-green-800">Asosiy ma'lumotlar</h3>

              <div className="space-y-2">
                <Label htmlFor="address">Manzil</Label>
                <Textarea
                  id="address"
                  value={contacts.address}
                  onChange={(e) => setContacts({ ...contacts, address: e.target.value })}
                  className="border-green-200 focus:border-green-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={contacts.email}
                  onChange={(e) => setContacts({ ...contacts, email: e.target.value })}
                  className="border-green-200 focus:border-green-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="working-hours">Ish vaqti</Label>
                <Input
                  id="working-hours"
                  value={contacts.workingHours}
                  onChange={(e) => setContacts({ ...contacts, workingHours: e.target.value })}
                  className="border-green-200 focus:border-green-400"
                  placeholder="Dushanba-Juma: 9:00-18:00"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-green-800">Telefon raqamlar</h3>
                <Button type="button" variant="outline" size="sm" onClick={addPhone}>
                  <Plus className="mr-2 h-4 w-4" />
                  Qo'shish
                </Button>
              </div>

              {contacts.phones.map((phone, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={phone}
                    onChange={(e) => updatePhone(index, e.target.value)}
                    className="border-green-200 focus:border-green-400"
                    placeholder="Telefon raqami"
                  />
                  {contacts.phones.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removePhone(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-green-800">Ijtimoiy tarmoqlar</h3>

              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={contacts.social.facebook}
                  onChange={(e) =>
                    setContacts({
                      ...contacts,
                      social: { ...contacts.social, facebook: e.target.value },
                    })
                  }
                  className="border-green-200 focus:border-green-400"
                  placeholder="https://facebook.com/yourpage"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={contacts.social.instagram}
                  onChange={(e) =>
                    setContacts({
                      ...contacts,
                      social: { ...contacts.social, instagram: e.target.value },
                    })
                  }
                  className="border-green-200 focus:border-green-400"
                  placeholder="https://instagram.com/yourpage"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telegram">Telegram</Label>
                <Input
                  id="telegram"
                  value={contacts.social.telegram}
                  onChange={(e) =>
                    setContacts({
                      ...contacts,
                      social: { ...contacts.social, telegram: e.target.value },
                    })
                  }
                  className="border-green-200 focus:border-green-400"
                  placeholder="https://t.me/yourpage"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
