"use client"

import { Card } from '@/components/ui/card'
import { ICategory } from '@/types'
import { Pencil, Trash } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import CategoryForm from '@/components/category-form'

const CategoryList = ({categories}: {categories: ICategory[] }) => {
    const [isEditCategoryDialogOpen, setIsEditCategoryDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

    const handleEditCategory = (category: ICategory) => {
        setIsEditCategoryDialogOpen(true);
        setSelectedCategory(category);
    }

    const handleEditCategorySuccess = () => {
        setIsEditCategoryDialogOpen(false);
    };

    return (
        <>
        <div className="grid grid-cols-1 gap-4">
            {categories.map((category) => (
                <Card key={category._id} className="overflow-hidden">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">{category.name}</h3>
                            <p className="text-sm text-gray-500">/{category.type}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditCategory(category)}>
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only md:not-sr-only md:ml-2">Tahrirlash</span>
                            </Button>
                            {/* <Button variant="outline" size="sm" onClick={() => handleDeleteClick(category.id)}>
                                <Trash className="h-4 w-4" />
                                <span className="sr-only md:not-sr-only md:ml-2">O'chirish</span>
                            </Button> */}
                        </div>
                    </div>
                </Card>
            ))}
        </div>

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

        {/* <ConfirmDialog
            open={isConfirmDialogOpen}
            onOpenChange={setIsConfirmDialogOpen}
            title="Kategoriyani o'chirish"
            description="Haqiqatan ham bu kategoriyani o'chirmoqchimisiz? Bu kategoriyaga tegishli barcha taomlar ham o'chiriladi. Bu amalni ortga qaytarib bo'lmaydi."
            onConfirm={handleDeleteConfirm}
            confirmText="O'chirish"
        /> */}
      </>
    )
}

export default CategoryList