"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Pencil, Trash, Plus, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DishForm from "@/components/dish-form"
import { IFood } from "@/types"
import { getFoodByCategory, deleteFood } from "@/action/food.action"

export default function AdminDashboardPage() {
  const [selectedDish, setSelectedDish] = useState<IFood | null>(null)
  const [isAddDishDialogOpen, setIsAddDishDialogOpen] = useState(false)
  const [isEditDishDialogOpen, setIsEditDishDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("oshxona")
  const [isLoading, setIsLoading] = useState(false)
  const [dishes, setDishes] = useState<IFood[]>([])

  async function fetchData() {
    setIsLoading(true)
    const res = await getFoodByCategory(activeTab)
    setDishes(res)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    fetchData();
  }, [activeTab])


  const handleDeleteDish = async (_id: string) => {
    if (window.confirm("Haqiqatan ham bu taomni o'chirmoqchimisiz?")) {
      await deleteFood(_id);
      await fetchData();
    }
  }

  const handleEditDish = (dish: IFood) => {
    setIsEditDishDialogOpen(true)
    setSelectedDish(dish)
  }

  const handleAddDishSuccess = async() => {
    setIsAddDishDialogOpen(false)
    await fetchData();
  }

  const handleEditDishSuccess = async () => {
    setIsEditDishDialogOpen(false)
    await fetchData();
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
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <DishForm onSuccess={handleAddDishSuccess} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dishes" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="oshxona">Oshxona taomlari</TabsTrigger>
              <TabsTrigger value="choyxona">Choyhona taomlari</TabsTrigger>
            </TabsList>

            <TabsContent value="oshxona">
              <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-green-800">Oshxona taomlari</h2>
                  {isLoading && (
                    <div className="flex items-center justify-center py-10">
                      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
                    </div>
                  )}

                  {!isLoading && dishes.length > 0 && (
                      <div className="grid grid-cols-1 gap-4">
                        {dishes.map((dish) => (
                          <Card key={dish._id} className="overflow-hidden">
                            <div className="flex flex-col sm:flex-row">
                              <div className="relative sm:h-[150px] h-[150px] w-full sm:w-[150px]">
                                <Image
                                  src={dish.image || "/palov.jpeg"}
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
                                      <DropdownMenuItem onClick={() => handleDeleteDish(dish._id as any)}>
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
                  )}

                  {!isLoading && dishes.length == 0 && (
                    <div className="flex items-center justify-center min-h-[200px]">
                      <p className="text-gray-500">Taomlar mavjud emas</p>
                    </div>
                  )}
              </div>
            </TabsContent>

            <TabsContent value="choyxona">
              <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-green-800">Choyxona taomlari</h2>
                  {isLoading && (
                    <div className="flex items-center justify-center  py-10">
                      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
                    </div>
                  )}

                  {!isLoading && dishes.length > 0 && (
                      <div className="grid grid-cols-1 gap-4">
                        {dishes.map((dish) => (
                          <Card key={dish._id} className="overflow-hidden">
                            <div className="flex flex-col sm:flex-row">
                              <div className="relative sm:h-[150px] h-[150px] w-full sm:w-[150px]">
                                <Image
                                  src={dish.image || "/palov.jpeg"}
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
                                      <DropdownMenuItem onClick={() => handleDeleteDish(dish._id as any)}>
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
                  )}

                  {!isLoading && dishes.length == 0 && (
                    <div className="flex items-center justify-center min-h-[200px]">
                      <p className="text-gray-500">Taomlar mavjud emas</p>
                    </div>
                  )}
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
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <DishForm dish={selectedDish} onSuccess={handleEditDishSuccess} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

let mockDishes: IFood[] = [
  {
    _id: "1",
    title: "Osh (Palov)",
    price: 20,
    currency: "USZ",
    description:
      "An'anaviy o'zbek guruch taomi go'sht, sabzi va ziravorlar bilan. Mazali ta'm va xushbo'y hid uchun sekin pishirilgan.",
    image: "/placeholder.svg?height=400&width=600",
    category: "oshxona", // kitchen dishes
  },
  {
    _id: "2",
    title: "Lag'mon",
    price: 18,
    currency: "USZ",
    description:
      "Qo'lda cho'zilgan ugra go'sht, sabzavotlar va xushbo'y ziravorlar sousi bilan. To'yimli va qoniqarli taom.",
    image: "/placeholder.svg?height=400&width=600",
    category: "oshxona", // kitchen dishes
  },
  {
    _id: "3",
    title: "Shashlik",
    price: 22,
    currency: "USZ",
    description:
      "Marinadlangan go'sht sixlari mukammal darajada pishirilgan. Yangi sabzavotlar va an'anaviy non bilan tortiladi.",
    image: "/placeholder.svg?height=400&width=600",
    category: "oshxona", // kitchen dishes
  },
  {
    _id: "4",
    title: "Manti",
    price: 16,
    currency: "USZ",
    description: "Go'sht va piyoz bilan to'ldirilgan bug'langan chuchvara. Qatiq sousi bilan tortiladi.",
    image: "/placeholder.svg?height=400&width=600",
    category: "oshxona", // kitchen dishes
  },
  {
    _id: "5",
    title: "Somsa",
    price: 12,
    currency: "USZ",
    description:
      "Go'sht va piyoz bilan to'ldirilgan pishirilgan pishiriq. Tashqi tomoni qarsildoq, ichki qismi sersuv.",
    image: "/placeholder.svg?height=400&width=600",
    category: "oshxona", // kitchen dishes
  },
  {
    _id: "6",
    title: "Ko'k choy",
    price: 5,
    currency: "USZ",
    description: "Sopol idishda tortilgan an'anaviy ko'k choy. Dam olish va hazm qilish uchun juda mos.",
    image: "/placeholder.svg?height=400&width=600",
    category: "choyxona", // tearoom dishes
  },
  {
    _id: "7",
    title: "Limonli qora choy",
    price: 6,
    currency: "USZ",
    description: "Yangi limon bo'lagi bilan tortilgan xushbo'y qora choy. Yangilovchi va tetiklantiruvchi.",
    image: "/placeholder.svg?height=400&width=600",
    category: "choyxona", // tearoom dishes
  },
  {
    _id: "8",
    title: "Mevali choy",
    price: 8,
    currency: "USZ",
    description: "Quritilgan mevalar va rezavorlar bilan qora choy aralashmasi. Shirin va xushbo'y.",
    image: "/placeholder.svg?height=400&width=600",
    category: "choyxona", // tearoom dishes
  },
  {
    _id: "9",
    title: "Baklava",
    price: 10,
    currency: "USZ",
    description:
      "Maydalangan yong'oqlar bilan to'ldirilgan va asal bilan shirinlashtirilgan filo qatlamlaridan tayyorlangan shirin pishiriq. Choy uchun mukammal hamroh.",
    image: "/placeholder.svg?height=400&width=600",
    category: "choyxona", // tearoom dishes
  },
  {
    _id: "10",
    title: "Chak-chak",
    price: 9,
    currency: "USZ",
    description: "Xamir va asaldan tayyorlangan shirin desert. Qarsildoq va mazali.",
    image: "/placeholder.svg?height=400&width=600",
    category: "choyxona", // tearoom dishes
  },
]
