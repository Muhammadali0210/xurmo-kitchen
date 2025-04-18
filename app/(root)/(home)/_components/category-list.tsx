import CategoryCard from "@/components/cards/category.card"
import { ICategory } from "@/types"

const CategoryList = ({categories}: {categories: ICategory[]}) => {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-12 lg:gap-16 mt-12">
        {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
        ))}
    </div>
  )
}

export default CategoryList