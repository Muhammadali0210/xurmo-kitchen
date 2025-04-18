"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ICategory } from "@/types"
import { createCategory } from "@/action/category.action"

interface CategoryFormProps {
  category?: ICategory
  onSuccess: () => void
}

export default function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  const [name, setName] = useState(category?.name || "");
  const [type, setType] = useState(category?.type || "");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!name || !type) {
        throw new Error("Barcha maydonlarni to'ldiring")
      }

      const categoryData = {
        name,
        type: type.toLowerCase()
      }

      if (category) {
        console.log("Category updated:", categoryData);
        
        // updateCategory(category.id, categoryData)
      } else {
        await createCategory(categoryData)
      }

      onSuccess()
    } catch (err: any) {
      setError(err.message || "Xatolik yuz berdi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-sm font-medium text-destructive">{error}</div>}

      <div className="space-y-2">
        <Label htmlFor="name">Kategoriya nomi</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-green-200 focus:border-green-400"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">URL manzil (type)</Label>
        <Input
          id="slug"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border-green-200 focus:border-green-400"
          required
        />
        <p className="text-xs text-muted-foreground">Faqat kichik harflar, raqamlar va chiziqchalardan foydalaning</p>
      </div>

      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
        {loading ? "Saqlanmoqda..." : category ? "Saqlash" : "Qo'shish"}
      </Button>
    </form>
  )
}
