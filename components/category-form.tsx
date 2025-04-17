"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addCategory, updateCategory, type Category } from "@/lib/data"

interface CategoryFormProps {
  category?: Category
  onSuccess: () => void
}

export default function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  const [name, setName] = useState(category?.name || "")
  const [slug, setSlug] = useState(category?.slug || "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)

    // Auto-generate slug if user hasn't manually edited it
    if (!category || slug === category.slug) {
      setSlug(
        newName
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!name || !slug) {
        throw new Error("Barcha maydonlarni to'ldiring")
      }

      const categoryData = {
        name,
        slug,
      }

      if (category) {
        updateCategory(category.id, categoryData)
      } else {
        addCategory(categoryData)
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
          onChange={handleNameChange}
          className="border-green-200 focus:border-green-400"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">URL manzil (slug)</Label>
        <Input
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
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
