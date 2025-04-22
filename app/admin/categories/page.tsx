import { Card, CardContent } from "@/components/ui/card"
import CategoryHeader from "./_components/category-header"
import CategoryList from "./_components/category-list"
import { getAllCategories } from "@/action/category.action"

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories()
  

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-100 max-md:p-0 p-0">
        <CategoryHeader/>
        <CardContent className="max-md:p-2">
          <CategoryList categories={categories} />
        </CardContent>
      </Card>
    </div>
  )
}
