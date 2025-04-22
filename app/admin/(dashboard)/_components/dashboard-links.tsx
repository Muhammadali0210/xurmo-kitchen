"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DashboardLinks() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-2 border-green-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-green-800">Taomlar</CardTitle>
            <CardDescription>Menyu taomlarini boshqaring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Taomlarni ko'rish va tahrirlash</p>
                <p className="text-xs text-muted-foreground">
                  Barcha taomlar ro'yxatini ko'ring, yangi taomlar qo'shing yoki mavjudlarini tahrirlang
                </p>
              </div>
              <Link
                href="/admin/menu"
                className="flex items-center text-sm font-medium text-green-600 hover:underline"
              >
                <span>Ochish</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-green-800">Kategoriyalar</CardTitle>
            <CardDescription>Taom kategoriyalarini boshqaring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Kategoriyalarni ko'rish va tahrirlash</p>
                <p className="text-xs text-muted-foreground">
                  Barcha kategoriyalar ro'yxatini ko'ring, yangilarini qo'shing yoki mavjudlarini tahrirlang
                </p>
              </div>
              <Link
                href="/admin/categories"
                className="flex items-center text-sm font-medium text-green-600 hover:underline"
              >
                <span>Ochish</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-green-800">Kontaktlar</CardTitle>
            <CardDescription>Kontakt ma'lumotlarini boshqaring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Kontakt ma'lumotlarini tahrirlash</p>
                <p className="text-xs text-muted-foreground">
                  Telefon raqamlar, manzil va ijtimoiy tarmoq havolalarini tahrirlang
                </p>
              </div>
              <Link
                href="/admin/contacts"
                className="flex items-center text-sm font-medium text-green-600 hover:underline"
              >
                <span>Ochish</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* <Card className="border-2 border-green-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-green-800">Sozlamalar</CardTitle>
            <CardDescription>Admin panel sozlamalari</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Parolni o'zgartirish</p>
                <p className="text-xs text-muted-foreground">Admin paneliga kirish uchun parolingizni o'zgartiring</p>
              </div>
              <Link
                href="/admin/settings"
                className="flex items-center text-sm font-medium text-green-600 hover:underline"
              >
                <span>Ochish</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card> */}
      </div>
  )
}
