"use client"

import { useState } from "react"
import Image from "next/image"
import { Pencil, Trash, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DishForm from "@/components/dish-form"
import { ICategory, IFood } from "@/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { deleteFood } from "@/action/food.action"

interface MenuListProps {
    dishes: IFood[]
    categories: ICategory[]
    selectedId: string
}

const MenuList = ({ dishes, categories, selectedId }: MenuListProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathName = usePathname()

    const [selectedDish, setSelectedDish] = useState<IFood | null>(null)
    const [isEditDishDialogOpen, setIsEditDishDialogOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(selectedId)

    const handleChangeCategory = (categoryId: string) => {
        const newCategoryId = categoryId
        setActiveTab(newCategoryId)
        const params = new URLSearchParams(searchParams)
        params.set("categoryId", newCategoryId)
        router.push(`/admin/menu?${params.toString()}`)
    }

    const handleDeleteDish = async (id: string) => {
        if (window.confirm("Haqiqatan ham bu taomni o'chirmoqchimisiz?")) {
            await deleteFood(id, pathName);
        }
    }

    const handleEditDish = (dish: IFood) => {
        setIsEditDishDialogOpen(true)
        setSelectedDish(dish)
    }

    const handleEditDishSuccess = async () => {
        setIsEditDishDialogOpen(false)
    }
    return (
        <>
            <CardContent>
                <Tabs defaultValue="dishes" value={activeTab} onValueChange={handleChangeCategory}>
                    <TabsList className="mb-4 flex gap-4">
                        {categories.map((category) => (
                            <TabsTrigger key={category._id} value={category._id as string}>{category.name}</TabsTrigger>
                        ))}
                    </TabsList>
                    {categories.map((category) => (
                        <TabsContent key={category._id} value={category._id as string}>
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-green-800">{category.name}</h2>

                                {dishes.length > 0 && (
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

                                {dishes.length == 0 && (
                                    <div className="flex items-center justify-center min-h-[200px]">
                                        <p className="text-gray-500">Taomlar mavjud emas</p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>

            {selectedDish && (
                <Dialog open={isEditDishDialogOpen} onOpenChange={setIsEditDishDialogOpen}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Taomni tahrirlash</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <DishForm dish={selectedDish} categories={categories} onSuccess={handleEditDishSuccess} pathName={pathName} />
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}

export default MenuList