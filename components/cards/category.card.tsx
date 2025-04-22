import { ICategory } from '@/types'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <Link
      key={category._id}
      href={`/${category._id}`}
      className="group relative overflow-hidden rounded-2xl border-2 border-green-400 bg-white  shadow-lg transition-all hover:border-green-500 hover:shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-green-50 opacity-50 rounded-2xl"></div>
      <div className="relative p-6 sm:p-8">
        <h3 className="text-2xl font-bold text-green-800">{category.name}</h3>
        <div className="mt-4 flex items-center text-sm font-medium text-green-600">
          Menyuni ko'rish
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard