'use client'
import { deleteGallery } from '@/action/galery.action';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IGalery } from '@/types';
import { MoreVertical, Pencil, Trash } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

interface Props {
  gallery: IGalery[];
}

const GalerList = ({ gallery }: Props) => {
  const pathName = usePathname()
  const [isEditGalleryDialogOpen, setIsEditGalleryDialogOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<IGalery | null>(null);

  const handleDeleteGallery = async (id: string) => {
    if (window.confirm("Haqiqatan ham bu taomni o'chirmoqchimisiz?")) {
      await deleteGallery(id, pathName);
    }
  }

  const handleEditGalley = (img: IGalery) => {
    setIsEditGalleryDialogOpen(true)
    setSelectedGallery(img)
  }

  const handleEditgallerySuccess = async () => {
    setIsEditGalleryDialogOpen(false)
  }

  return (
    <div className='p-4'>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2">
        {gallery.map((item, index) => (
          <div key={index} className="flex items-center justify-center text-black p-1 shadow-md bg-white relative">
            <img src={item?.images[0]} alt={"img" + index} className="w-full h-full object-cover" />
            <div className='absolute top-2 right-2'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className='bg-white/70'>
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <DropdownMenuItem onClick={() => handleEditGalley(item)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Tahrirlash
                  </DropdownMenuItem> */}
                  <DropdownMenuItem onClick={() => handleDeleteGallery(item._id as any)}>
                    <Trash className="mr-2 h-4 w-4" />
                    O'chirish
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GalerList