import { Card, CardContent } from "@/components/ui/card"
import CategoryHeader from "./_components/category-header"
import CategoryList from "./_components/category-list"
import { getAllCategories } from "@/action/category.action"

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories()
  

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-100">
        <CategoryHeader />
        <CardContent>
          <CategoryList categories={categories} />
        </CardContent>
      </Card>
    </div>
  )
}
