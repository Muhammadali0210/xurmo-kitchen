"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UtensilsCrossed, FolderTree, ArrowRight } from "lucide-react"
import { getAllDishes, getAllCategories } from "@/lib/data"

export default function AdminDashboardPage() {
  const [dishCount, setDishCount] = useState(0)
  const [categoryCount, setCategoryCount] = useState(0)

  useEffect(() => {
    const dishes = getAllDishes()
    const categories = getAllCategories()
    setDishCount(dishes.length)
    setCategoryCount(categories.length)
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2 border-green-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Jami taomlar</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{dishCount}</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Jami kategoriyalar</CardTitle>
            <FolderTree className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{categoryCount}</div>
          </CardContent>
        </Card>
      </div>

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
                href="/admin/dishes"
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

        <Card className="border-2 border-green-100">
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
        </Card>
      </div>
    </div>
  )
}
