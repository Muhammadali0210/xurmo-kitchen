import { Card } from "@/components/ui/card"
import MenuHeader from "./_components/menu-header"
import MenuList from "./_components/menu-list"
import { getDishesByCategoryId } from "@/action/food.action"
import { getAllCategories } from "@/action/category.action"

interface Props {
  searchParams: {
    categoryId?: string
  }
}

export default async function AdminDashboardPage({ searchParams }: Props) {
  const categories = await getAllCategories()

  const { categoryId } = await searchParams
  // Default ID: 1-kategoriya IDsi
  const defaultCategoryId = categories[0]?._id || ""

  // Agar queryda id bo'lmasa, defaultdan foydalansin
  const selectedCategoryId = categoryId || defaultCategoryId

  const dishes = await getDishesByCategoryId(selectedCategoryId)


  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      <Card className="border border-gray-200 w-full mx-auto p-0">
        {categories.length === 0 ? (
            <div className="w-full h-[200px] flex items-center justify-center">
              <h2>Kategoriyalar mavjud emas</h2>
            </div>
          ) : (
            <>
              <MenuHeader categories={categories} />
              <MenuList dishes={dishes} categories={categories} selectedId={selectedCategoryId} />
            </>
          )
        }
      </Card>
    </div>
  )
}
