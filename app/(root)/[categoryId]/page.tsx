import { notFound } from "next/navigation"
import { getFoodByCategory } from "@/action/food.action"
import { ICategory, IFood } from "@/types"
import MenuList from "./_components/menu-list"
import { getCategoryById } from "@/action/category.action"


export default async function CategoryPage({ params }: { params: { categoryId: string } }) {
  const { categoryId } = params;
  const category: ICategory = await getCategoryById(categoryId);
  
  if (!category) {
    notFound()
  }

  // const dishes: IFood[] = await getFoodByCategory(category._id as string);

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="container px-4 py-12 mt-[40px] md:px-6 md:py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-800">{category.name}</h1>
        </div>
        {/* {dishes.length === 0 && <p className="text-center text-lg">No dishes found.</p>}
        {dishes.length > 0 && (
          <MenuList dishes={dishes} />
        )} */}
      </div>
    </div>
  )
}
