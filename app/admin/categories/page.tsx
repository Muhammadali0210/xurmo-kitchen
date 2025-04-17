"use client"

import { useState, useEffect } from "react"
import { Pencil, Trash, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllCategories, deleteCategory, type Category } from "@/lib/data"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ConfirmDialog } from "@/components/confirm-dialog"
import CategoryForm from "@/components/category-form"

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false)
  const [isEditCategoryDialogOpen, setIsEditCategoryDialogOpen] = useState(false)

  useEffect(() => {
    setCategories(getAllCategories())
  }, [])

  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete)
      setCategories(getAllCategories())
      setCategoryToDelete(null)
      setIsConfirmDialogOpen(false)
    }
  }

  const handleDeleteClick = (id: string) => {
    setCategoryToDelete(id)
    setIsConfirmDialogOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category)
    setIsEditCategoryDialogOpen(true)
  }

  const handleAddCategorySuccess = () => {
    setIsAddCategoryDialogOpen(false)
    setCategories(getAllCategories())
  }

  const handleEditCategorySuccess = () => {
    setIsEditCategoryDialogOpen(false)
    setCategories(getAllCategories())
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-green-800">Kategoriyalar</CardTitle>
          <Dialog open={isAddCategoryDialogOpen} onOpenChange={setIsAddCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                Yangi kategoriya
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Yangi kategoriya qo'shish</DialogTitle>
              </DialogHeader>
              <CategoryForm onSuccess={handleAddCategorySuccess} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="overflow-hidden">
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-gray-500">/{category.slug}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditCategory(category)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:ml-2">Tahrirlash</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteClick(category.id)}>
                      <Trash className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:ml-2">O'chirish</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedCategory && (
        <Dialog open={isEditCategoryDialogOpen} onOpenChange={setIsEditCategoryDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Kategoriyani tahrirlash</DialogTitle>
            </DialogHeader>
            <CategoryForm category={selectedCategory} onSuccess={handleEditCategorySuccess} />
          </DialogContent>
        </Dialog>
      )}

      <ConfirmDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        title="Kategoriyani o'chirish"
        description="Haqiqatan ham bu kategoriyani o'chirmoqchimisiz? Bu kategoriyaga tegishli barcha taomlar ham o'chiriladi. Bu amalni ortga qaytarib bo'lmaydi."
        onConfirm={handleDeleteConfirm}
        confirmText="O'chirish"
      />
    </div>
  )
}
