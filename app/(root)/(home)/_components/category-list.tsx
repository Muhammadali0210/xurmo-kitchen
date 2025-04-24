import CategoryCard from "@/components/cards/category.card"
import { ICategory } from "@/types"

const CategoryList = ({ categories }: { categories: ICategory[] }) => {
  return (
    <>
      {categories.length === 0 && (
        <p className="text-center text-lg my-10">No categories found.</p>
      )}
      {categories.length > 0 && (

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:gap-10 mt-12">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      )}
    </>
  )
}

export default CategoryList