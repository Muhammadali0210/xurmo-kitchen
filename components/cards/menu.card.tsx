import { IFood } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const MenuCard = ({dish}: {dish: IFood}) => {
  return (
    <Link href={`/menu/${dish._id}`}>
      <div className="flex items-center gap-3 bg-white rounded-xl shadow-md p-3 hover:shadow-md transition">
        <div className="">
          <Image
            src={dish.image || "/placeholder.svg"}
            alt={dish.title}
            width={70}
            height={70}
            className="rounded-lg object-cover min-w-[70px] h-[70px]"
          />
        </div>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800 line-clamp-1">{dish.title}</h3>
          </div>

          <div className="text-green-700 font-semibold text-sm bg-green-100 px-3 py-1 rounded-full inline-block mr-auto">
            {dish.price.toLocaleString()} {dish.currency}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MenuCard