"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadIcon, X } from "lucide-react"
import { createGallery, updateGallery } from "@/action/galery.action"
import uploadToImageKit from "@/action/image-kit.action"

import type { IGalery } from "@/types"

interface GalleryFormProps {
  gallery?: IGalery
  onSuccess: () => void
  pathName: string
}

export default function GalleryForm({ gallery, onSuccess, pathName }: GalleryFormProps) {
  const [images, setImages] = useState(gallery?.images || [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(gallery?.images[0] || null)

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
      let imageUrl = images[0] || ""
      if (file) {
        try {
          const res = await uploadToImageKit(file) // URL ni olamiz
          imageUrl = res
          setFile(null)
        } catch (error) {
          console.log("Fayl yuklanmadi");
          const fallback = "/placeholder.png"
          setImages([fallback])
          imageUrl = fallback
        }
      }

      if (!imageUrl) {
        throw new Error("Rasm tanlanmagan")
      }

      const galleryData = {
        images: [imageUrl],
      }
      console.log(imageUrl);

      if (gallery && gallery._id) {
        await updateGallery(galleryData, gallery._id, pathName);
      } else {
        await createGallery(galleryData, pathName);
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

      {
        !preview && (
          <div className="space-y-2">
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
        )}

      {preview && (
        <div className="relative h-[200px] w-full">
          <div onClick={() => setPreview(null)} className="absolute -top-[10px] -right-[10px] w-[40px] h-[40px] bg-white cursor-pointer shadow-lg border border-green-300 rounded-full flex items-center justify-center">
            <X />
          </div>
          <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-md border" />
        </div>
      )}

      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
        {loading ? "Saqlanmoqda..." : gallery ? "Saqlash" : "Qo'shish"}
      </Button>
    </form>
  )
}

