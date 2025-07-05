import { Card } from "@/components/ui/card"

import { getAllGallery } from "@/action/galery.action"
import GalleryHeader from "./_components/gallery-header";
import GalerList from "./_components/galer-list";

export default async function Page() {
  const galery = await getAllGallery();
  console.log(galery)


  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      <Card className="border border-gray-200 w-full mx-auto p-0 bg-[#f7f7f7]">
        <GalleryHeader />
        
        {galery.length === 0 && (
          <div className="w-full h-[200px] flex items-center justify-center">
            <h2>Galery mavjud emas</h2>
          </div>
        )}

        {galery.length > 0 && (
          <div className="mt-5">
            <GalerList gallery={galery} />
          </div>
        )}
      </Card>
    </div>
  )
}
