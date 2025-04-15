import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getDish, getCategory } from "@/lib/data"

export default function DishPage({ params }: { params: { id: string } }) {
  const dish = getDish(params.id)

  if (!dish) {
    notFound()
  }

  const category = getCategory(dish.categoryId)

  if (!category) {
    notFound()
  }

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <Link
          href={`/${category.slug}`}
          className="mb-6 inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          {category.name}ga qaytish
        </Link>

        <div className="overflow-hidden rounded-2xl border-2 border-green-100 bg-white shadow-lg">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative aspect-square overflow-hidden">
              <Image src={dish.image || "/placeholder.svg"} alt={dish.title} fill className="object-cover" priority />
            </div>
            <div className="flex flex-col justify-between p-6">
              <div>
                <h1 className="text-3xl font-bold text-green-800">{dish.title}</h1>
                <div className="mt-4 inline-block rounded-full bg-green-100 px-4 py-2 text-xl font-bold text-green-800">
                  {dish.price} {dish.currency}
                </div>
                <div className="mt-6 text-gray-700">
                  <p>{dish.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
