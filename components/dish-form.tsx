"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ICategory, IFood } from "@/types"
import { createFood, updateFood } from "@/action/food.action"
import uploadToImageKit from "@/action/image-kit.action"
import { UploadIcon, X } from "lucide-react"
interface DishFormProps {
  dish?: IFood
  categories: ICategory[]
  onSuccess: () => void
  pathName: string
}

export default function DishForm({ dish, categories, onSuccess, pathName }: DishFormProps) {
  const [title, setTitle] = useState(dish?.title || "")
  const [price, setPrice] = useState(dish?.price.toString() || "")
  const [currency, setCurrency] = useState(dish?.currency || "USZ")
  const [description, setDescription] = useState(dish?.description || "")
  const [image, setImage] = useState(dish?.image || "")
  const [categoryId, setCategoryId] = useState(dish?.categoryId || "oshxona")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(dish?.image || null)


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // if (file) {
      //   const newImageUrl = await uploadToImageKit(file) // URL ni olamiz
      //   setImage(newImageUrl as string);
      //   console.log(image);
      //   setFile(null)
      // }

      if (!title || !price || !description || !categoryId) {
        throw new Error("Barcha maydonlarni to'ldiring")
      }

      const dishData = {
        title,
        price: Number.parseFloat(price),
        currency,
        description,
        image: file ? (await uploadToImageKit(file)) : image,
        categoryId
      }

      if (dish) {
        console.log("Dish updated:", dishData);
        
        await updateFood(dishData, dish._id as string, pathName);
      } else {
        await createFood(dishData, pathName);
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

      <div className="grid grid-cols-2 gap-4">
        <div className="grid-cols-1 max-sm:max-h-[160px]">
          {
            !preview && (
              <div className="space-y-2 w-full h-full">
                <Label htmlFor="image">Rasm</Label>
                <div className="relative h-[220px] w-full border border-dashed border-green-200 rounded-lg">
                  <div onClick={() => document.getElementById("image")?.click()} className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-white cursor-pointer shadow-lg border border-green-300 rounded-full flex items-center justify-center">
                    <UploadIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border-green-200 opacity-0 absolute top-0 left-0 h-full w-full cursor-pointer"
                  />
                </div>
              </div>
            )
          }

          {preview && (
            <div className="relative h-full w-full">
              <div onClick={() => setPreview(null)} className="absolute -top-[10px] -right-[10px] w-[40px] h-[40px] bg-white cursor-pointer shadow-lg border border-green-300 rounded-full flex items-center justify-center">
                <X />
              </div>
              <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-md border" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
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
          <div className="space-y-2">
            <Label htmlFor="category">Kategoriya</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="border-green-200 focus:border-green-400">
                <SelectValue placeholder="Kategoriyani tanlang" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id as string}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>


      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
        {loading ? "Saqlanmoqda..." : dish ? "Saqlash" : "Qo'shish"}
      </Button>
    </form>
  )
}
