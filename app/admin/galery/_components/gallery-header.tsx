"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import GalleryForm from "@/components/gallery-form"
import { usePathname } from "next/navigation"

const GalleryHeader = () => {
    const [isAddImageDialogOpen, setIsAddImageDialogOpen] = useState(false)
    const pathName = usePathname()

    const handleAddImageSuccess = async () => {
        setIsAddImageDialogOpen(false)
    }

    return (
        <CardHeader className="flex flex-row items-center justify-between max-md:p-2">
            <CardTitle className="text-2xl font-bold text-green-800">Galereya</CardTitle>
            <Dialog open={isAddImageDialogOpen} onOpenChange={setIsAddImageDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Qo'shish
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Yangi rasm qo'shish</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <GalleryForm onSuccess={handleAddImageSuccess} pathName={pathName} />
                </DialogContent>
            </Dialog>
        </CardHeader>
    )
}

export default GalleryHeader
