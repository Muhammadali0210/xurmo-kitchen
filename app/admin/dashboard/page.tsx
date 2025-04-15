"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Pencil, Trash, Plus, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllDishes, getAllCategories, deleteDish, deleteCategory, type Dish, type Category } from "@/lib/data"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DishForm from "@/components/dish-form"
import CategoryForm from "@/components/category-form"

export default function AdminDashboardPage() {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isAddDishDialogOpen, setIsAddDishDialogOpen] = useState(false)
  const [isEditDishDialogOpen, setIsEditDishDialogOpen] = useState(false)
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false)
  const [isEditCategoryDialogOpen, setIsEditCategoryDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dishes")
  const router = useRouter()

  useEffect(() => {
    // In a real app, you would check if the user is authenticated
    // and redirect to login if not
    setDishes(getAllDishes())
    setCategories(getAllCategories())
  }, [])

  const handleDeleteDish = (id: string) => {
    if (window.confirm("Haqiqatan ham bu taomni o'chirmoqchimisiz?")) {
      deleteDish(id)
      setDishes(getAllDishes())
    }
  }

  const handleEditDish = (dish: Dish) => {
    setSelectedDish(dish)
    setIsEditDishDialogOpen(true)
  }

  const handleAddDishSuccess = () => {
    setIsAddDishDialogOpen(false)
    setDishes(getAllDishes())
  }

  const handleEditDishSuccess = () => {
    setIsEditDishDialogOpen(false)
    setDishes(getAllDishes())
  }

  const handleDeleteCategory = (id: string) => {
    if (
      window.confirm(
        "Haqiqatan ham bu kategoriyani o'chirmoqchimisiz? Bu kategoriyaga tegishli barcha taomlar ham o'chiriladi.",
      )
    ) {
      deleteCategory(id)
      setCategories(getAllCategories())
      setDishes(getAllDishes())
    }
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

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    return category ? category.name : "Kategoriya topilmadi"
  }

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen p-4 md:p-8">
      <Card className="border-2 border-green-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-green-800">Admin Panel</CardTitle>
          {activeTab === "dishes" ? (
            <Dialog open={isAddDishDialogOpen} onOpenChange={setIsAddDishDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Yangi taom
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Yangi taom qo'shish</DialogTitle>
                </DialogHeader>
                <DishForm categories={categories} onSuccess={handleAddDishSuccess} />
              </DialogContent>
            </Dialog>
          ) : (
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
          )}
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dishes" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="dishes">Taomlar</TabsTrigger>
              <TabsTrigger value="categories">Kategoriyalar</TabsTrigger>
            </TabsList>

            <TabsContent value="dishes">
              <div className="space-y-4">
                {categories.map((category) => {
                  const categoryDishes = dishes.filter((dish) => dish.categoryId === category.id)

                  if (categoryDishes.length === 0) return null

                  return (
                    <div key={category.id} className="space-y-4">
                      <h2 className="text-xl font-semibold text-green-800">{category.name}</h2>
                      <div className="grid grid-cols-1 gap-4">
                        {categoryDishes.map((dish) => (
                          <Card key={dish.id} className="overflow-hidden">
                            <div className="flex flex-col sm:flex-row">
                              <div className="relative h-24 w-24 flex-shrink-0">
                                <Image
                                  src={dish.image || "/placeholder.svg"}
                                  alt={dish.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex flex-1 flex-col justify-between p-4">
                                <div>
                                  <h3 className="font-medium">{dish.title}</h3>
                                  <p className="mt-1 text-sm text-gray-500 line-clamp-1">{dish.description}</p>
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                  <span className="font-medium text-green-700">
                                    {dish.price} {dish.currency}
                                  </span>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => handleEditDish(dish)}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Tahrirlash
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleDeleteDish(dish.id)}>
                                        <Trash className="mr-2 h-4 w-4" />
                                        O'chirish
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="categories">
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
                        <Button variant="outline" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                          <Trash className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">O'chirish</span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedDish && (
        <Dialog open={isEditDishDialogOpen} onOpenChange={setIsEditDishDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Taomni tahrirlash</DialogTitle>
            </DialogHeader>
            <DishForm dish={selectedDish} categories={categories} onSuccess={handleEditDishSuccess} />
          </DialogContent>
        </Dialog>
      )}

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
    </div>
  )
}
