"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Pencil, Trash, Plus, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { deleteDish, type Dish, type Category } from "@/lib/data"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DishForm from "@/components/dish-form"
import CategoryForm from "@/components/category-form"

export default function AdminDashboardPage() {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)
  const [isAddDishDialogOpen, setIsAddDishDialogOpen] = useState(false)
  const [isEditDishDialogOpen, setIsEditDishDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dishes")
  const router = useRouter()


  const handleDeleteDish = (id: string) => {
    if (window.confirm("Haqiqatan ham bu taomni o'chirmoqchimisiz?")) {
      deleteDish(id)
      // qayta yuklash kerak
    }
  }

  const handleEditDish = (dish: Dish) => {
    setSelectedDish(dish)
    setIsEditDishDialogOpen(true)
  }

  const handleAddDishSuccess = () => {
    setIsAddDishDialogOpen(false)
    // qayta yuklash kerak
  }

  const handleEditDishSuccess = () => {
    setIsEditDishDialogOpen(false)
    // qayta yuklash kerak
  }

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen p-4 md:p-8">
      <Card className="border border-gray-200 mt-[60px] lg:w-[80%] 2xl:w-[1200px] mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-green-800">Admin Panel</CardTitle>
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
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dishes" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="dishes">Oshxona taomlari</TabsTrigger>
              <TabsTrigger value="categories">Choyhona taomlari</TabsTrigger>
            </TabsList>

            <TabsContent value="dishes">
            <div className="space-y-4">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-green-800">Oshxona taomlari</h2>
                  <div className="grid grid-cols-1 gap-4">


                    {mockDishes.map((dish) => (
                      <Card key={dish.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative sm:h-[150px] h-[150px] w-full sm:w-[150px]">
                            <Image
                              src={"/palov.jpeg"}
                              alt={dish.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex flex-1 flex-col justify-between p-4">
                            <div>
                              <h3 className="font-medium">{dish.title}</h3>
                              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{dish.description}</p>
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
              </div>
            </TabsContent>

            <TabsContent value="categories">
              <div className="space-y-4">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-green-800">Choyhona taomlari</h2>
                  <div className="grid grid-cols-1 gap-4">

                    {mockDishes.map((dish) => (
                      <Card key={dish.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative sm:h-[150px] h-[150px] w-full sm:w-[150px]">
                            <Image
                              src={"/palov.jpeg"}
                              alt={dish.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex flex-1 flex-col justify-between p-4">
                            <div>
                              <h3 className="font-medium">{dish.title}</h3>
                              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{dish.description}</p>
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
    </div>
  )
}


let categories: Category[] = [
  {
    id: "1",
    name: "Oshxona Taomlari",
    slug: "kitchen-dishes",
  },
  {
    id: "2",
    name: "Choyxona Taomlari",
    slug: "tearoom-dishes",
  },
]

let mockDishes: Dish[] = [
  {
    id: "1",
    title: "Osh (Palov)",
    price: 20,
    currency: "USZ",
    description:
      "An'anaviy o'zbek guruch taomi go'sht, sabzi va ziravorlar bilan. Mazali ta'm va xushbo'y hid uchun sekin pishirilgan.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "1", // kitchen dishes
  },
  {
    id: "2",
    title: "Lag'mon",
    price: 18,
    currency: "USZ",
    description:
      "Qo'lda cho'zilgan ugra go'sht, sabzavotlar va xushbo'y ziravorlar sousi bilan. To'yimli va qoniqarli taom.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "1", // kitchen dishes
  },
  {
    id: "3",
    title: "Shashlik",
    price: 22,
    currency: "USZ",
    description:
      "Marinadlangan go'sht sixlari mukammal darajada pishirilgan. Yangi sabzavotlar va an'anaviy non bilan tortiladi.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "1", // kitchen dishes
  },
  {
    id: "4",
    title: "Manti",
    price: 16,
    currency: "USZ",
    description: "Go'sht va piyoz bilan to'ldirilgan bug'langan chuchvara. Qatiq sousi bilan tortiladi.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "1", // kitchen dishes
  },
  {
    id: "5",
    title: "Somsa",
    price: 12,
    currency: "USZ",
    description:
      "Go'sht va piyoz bilan to'ldirilgan pishirilgan pishiriq. Tashqi tomoni qarsildoq, ichki qismi sersuv.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "1", // kitchen dishes
  },
  {
    id: "6",
    title: "Ko'k choy",
    price: 5,
    currency: "USZ",
    description: "Sopol idishda tortilgan an'anaviy ko'k choy. Dam olish va hazm qilish uchun juda mos.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "2", // tearoom dishes
  },
  {
    id: "7",
    title: "Limonli qora choy",
    price: 6,
    currency: "USZ",
    description: "Yangi limon bo'lagi bilan tortilgan xushbo'y qora choy. Yangilovchi va tetiklantiruvchi.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "2", // tearoom dishes
  },
  {
    id: "8",
    title: "Mevali choy",
    price: 8,
    currency: "USZ",
    description: "Quritilgan mevalar va rezavorlar bilan qora choy aralashmasi. Shirin va xushbo'y.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "2", // tearoom dishes
  },
  {
    id: "9",
    title: "Baklava",
    price: 10,
    currency: "USZ",
    description:
      "Maydalangan yong'oqlar bilan to'ldirilgan va asal bilan shirinlashtirilgan filo qatlamlaridan tayyorlangan shirin pishiriq. Choy uchun mukammal hamroh.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "2", // tearoom dishes
  },
  {
    id: "10",
    title: "Chak-chak",
    price: 9,
    currency: "USZ",
    description: "Xamir va asaldan tayyorlangan shirin desert. Qarsildoq va mazali.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "2", // tearoom dishes
  },
]