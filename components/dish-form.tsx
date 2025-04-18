"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { IFood } from "@/types"
import { createFood, updateFood } from "@/action/food.action"
interface DishFormProps {
  dish?: IFood
  onSuccess: () => void
}

export default function DishForm({ dish, onSuccess }: DishFormProps) {
  const [title, setTitle] = useState(dish?.title || "")
  const [price, setPrice] = useState(dish?.price.toString() || "")
  const [currency, setCurrency] = useState(dish?.currency || "USZ")
  const [description, setDescription] = useState(dish?.description || "")
  const [image, setImage] = useState(dish?.image || "/placeholder.svg?height=400&width=600")
  const [category, setCategory] = useState(dish?.category || "oshxona")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!title || !price || !description || !image || !category) {
        throw new Error("Barcha maydonlarni to'ldiring")
      }

      const dishData = {
        title,
        price: Number.parseFloat(price),
        currency,
        description,
        image,
        category,
      }

      if (dish) {
        await updateFood(dishData, dish._id as string);
      } else {
        await createFood(dishData);
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
        <Label htmlFor="title">Taom nomi</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-green-200 focus:border-green-400"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Narxi</Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-green-200 focus:border-green-400"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Valyuta</Label>
          <Input
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border-green-200 focus:border-green-400"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Tavsif</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px] border-green-200 focus:border-green-400"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Rasm URL</Label>
        <Input
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border-green-200 focus:border-green-400"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Kategoriya</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="border-green-200 focus:border-green-400">
            <SelectValue placeholder="Kategoriyani tanlang" />
          </SelectTrigger>
          <SelectContent>
              <SelectItem value={'oshxona'}>
                Oshxona taomlari
              </SelectItem>
              <SelectItem value={'choyxona'}>
                Choyxona taomlari
              </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
        {loading ? "Saqlanmoqda..." : dish ? "Saqlash" : "Qo'shish"}
      </Button>
    </form>
  )
}
