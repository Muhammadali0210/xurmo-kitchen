import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getFoodById } from "@/action/food.action"
import { IFood } from "@/types"
import { getCategoryById } from "@/action/category.action"

export default async function DishPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const dishes: IFood[] = await getFoodById(id);
  const dish: IFood = dishes[0];

  if (!dish) {
    notFound()
  }

  const category = await getCategoryById(dish.categoryId);

  if (!category) {
    notFound()
  }

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <Link
          href={`/${category._id}`}
          className="mb-6 mt-[40px] inline-flex items-center text-md font-medium text-green-600 hover:text-green-800"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          {category.name}ga qaytish
        </Link>

        {dish && (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
            <div className="grid lg:gap-8 gap-0 md:grid-cols-2 grid-cols-1">
              <div className="relative md:aspect-square max-md:h-[320px] max-sm:h-[240px] grid-cols-1 overflow-hidden">
                <Image src={dish.image || "/placeholder.svg"} alt={dish.title} fill className="object-cover" style={{ backgroundPosition: "center center" }} priority />
              </div>
              <div className="flex flex-col justify-between lg:p-6 md:p-4 p-3">
                <div className="">
                  <h1 className="text-3xl font-bold text-green-800">{dish.title}</h1>
                  <div className="mt-4 mr-auto inline-block rounded-full bg-green-100 px-4 py-2 text-xl font-bold text-green-800">
                    {dish.price.toLocaleString("en-US")} {dish.currency}
                  </div>
                  <div className="mt-6 text-gray-700">
                    <p>{dish.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
