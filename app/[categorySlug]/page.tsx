import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getCategoryBySlug, getDishesByCategory } from "@/lib/data"

export default function CategoryPage({ params }: { params: { categorySlug: string } }) {
  const category = getCategoryBySlug(params.categorySlug)

  if (!category) {
    notFound()
  }

  const dishes = getDishesByCategory(params.categorySlug)

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-800">{category.name}</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish) => (
            <Link
              key={dish.id}
              href={`/dish/${dish.id}`}
              className="group block overflow-hidden rounded-2xl border-2 border-green-100 bg-white shadow-md transition-all hover:border-green-300 hover:shadow-lg"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={dish.image || "/placeholder.svg"}
                  alt={dish.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-green-800">{dish.title}</h3>
                  <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    {dish.price} {dish.currency}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
