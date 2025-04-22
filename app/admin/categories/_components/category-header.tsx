"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import CategoryForm from "@/components/category-form"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

const CategoryHeader = () => {
    const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);

    const handleAddCategorySuccess = () => {
        setIsAddCategoryDialogOpen(false);
    };

    return (
        <CardHeader className="flex flex-row items-center justify-between max-md:p-2">
            <CardTitle className="text-xl font-bold text-green-800">Kategoriyalar</CardTitle>
            <Dialog open={isAddCategoryDialogOpen} onOpenChange={setIsAddCategoryDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                        <Plus className="mr-1 h-4 w-4" />
                        Qo'shish
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
    )
}

export default CategoryHeader