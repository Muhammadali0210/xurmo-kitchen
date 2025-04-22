"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import DishForm from "@/components/dish-form"
import { ICategory } from "@/types"
import { usePathname } from "next/navigation"

const MenuHeader = ({ categories }: { categories: ICategory[] }) => {
    const [isAddDishDialogOpen, setIsAddDishDialogOpen] = useState(false)
    const pathName = usePathname()

    const handleAddDishSuccess = async () => {
        setIsAddDishDialogOpen(false)
    }

    return (
        <CardHeader className="flex flex-row items-center justify-between max-md:p-2">
            <CardTitle className="text-2xl font-bold text-green-800">Menyular</CardTitle>
            <Dialog open={isAddDishDialogOpen} onOpenChange={setIsAddDishDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Qo'shish
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Yangi taom qo'shish</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <DishForm onSuccess={handleAddDishSuccess} categories={categories} pathName={pathName} />
                </DialogContent>
            </Dialog>
        </CardHeader>
    )
}

export default MenuHeader