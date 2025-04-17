import MenuCard from '@/components/cards/menu.card'
import { IFood } from '@/types'

const MenuList = ({ dishes }: { dishes: IFood[]}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dishes.map((dish) => (
            <MenuCard key={dish._id} dish={dish} />
        ))}
    </div>
  )
}

export default MenuList