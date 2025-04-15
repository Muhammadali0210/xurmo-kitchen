export interface Category {
  id: string
  name: string
  slug: string
}

export interface Dish {
  id: string
  title: string
  price: number
  currency: string
  description: string
  image: string
  categoryId: string
}

// Initial categories
let mockCategories: Category[] = [
  {
    id: "1",
    name: "Oshxona Taomlari",
    slug: "kitchen-dishes",
  },
  {
    id: "2",
    name: "Choyxona Taomlari",
    slug: "tearoom-dishes",
  },
]

// Initial dishes with updated structure to use categoryId
let mockDishes: Dish[] = [
  {
    id: "1",
    title: "Osh (Palov)",
    price: 20,
    currency: "USZ",
    description:
      "An'anaviy o'zbek guruch taomi go'sht, sabzi va ziravorlar bilan. Mazali ta'm va xushbo'y hid uchun sekin pishirilgan.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "1", // kitchen dishes
  },
  {
    id: "2",
    title: "Lag'mon",
    price: 18,
    currency: "USZ",
    description:
      "Qo'lda cho'zilgan ugra go'sht, sabzavotlar va xushbo'y ziravorlar sousi bilan. To'yimli va qoniqarli taom.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "1", // kitchen dishes
  },
  {
    id: "3",
    title: "Shashlik",
    price: 22,
    currency: "USZ",
    description:
      "Marinadlangan go'sht sixlari mukammal darajada pishirilgan. Yangi sabzavotlar va an'anaviy non bilan tortiladi.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "1", // kitchen dishes
  },
  {
    id: "4",
    title: "Manti",
    price: 16,
    currency: "USZ",
    description: "Go'sht va piyoz bilan to'ldirilgan bug'langan chuchvara. Qatiq sousi bilan tortiladi.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "1", // kitchen dishes
  },
  {
    id: "5",
    title: "Somsa",
    price: 12,
    currency: "USZ",
    description:
      "Go'sht va piyoz bilan to'ldirilgan pishirilgan pishiriq. Tashqi tomoni qarsildoq, ichki qismi sersuv.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "1", // kitchen dishes
  },
  {
    id: "6",
    title: "Ko'k choy",
    price: 5,
    currency: "USZ",
    description: "Sopol idishda tortilgan an'anaviy ko'k choy. Dam olish va hazm qilish uchun juda mos.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "2", // tearoom dishes
  },
  {
    id: "7",
    title: "Limonli qora choy",
    price: 6,
    currency: "USZ",
    description: "Yangi limon bo'lagi bilan tortilgan xushbo'y qora choy. Yangilovchi va tetiklantiruvchi.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "2", // tearoom dishes
  },
  {
    id: "8",
    title: "Mevali choy",
    price: 8,
    currency: "USZ",
    description: "Quritilgan mevalar va rezavorlar bilan qora choy aralashmasi. Shirin va xushbo'y.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "2", // tearoom dishes
  },
  {
    id: "9",
    title: "Baklava",
    price: 10,
    currency: "USZ",
    description:
      "Maydalangan yong'oqlar bilan to'ldirilgan va asal bilan shirinlashtirilgan filo qatlamlaridan tayyorlangan shirin pishiriq. Choy uchun mukammal hamroh.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "2", // tearoom dishes
  },
  {
    id: "10",
    title: "Chak-chak",
    price: 9,
    currency: "USZ",
    description: "Xamir va asaldan tayyorlangan shirin desert. Qarsildoq va mazali.",
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "2", // tearoom dishes
  },
]

// Category functions
export function getAllCategories(): Category[] {
  return mockCategories
}

export function getCategory(id: string): Category | undefined {
  return mockCategories.find((category) => category.id === id)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return mockCategories.find((category) => category.slug === slug)
}

export function addCategory(category: Omit<Category, "id">): Category {
  const newCategory = {
    ...category,
    id: String(mockCategories.length + 1),
  }
  mockCategories.push(newCategory)
  return newCategory
}

export function updateCategory(id: string, category: Partial<Category>): Category | undefined {
  const index = mockCategories.findIndex((c) => c.id === id)
  if (index !== -1) {
    mockCategories[index] = { ...mockCategories[index], ...category }
    return mockCategories[index]
  }
  return undefined
}

export function deleteCategory(id: string): Category | undefined {
  const index = mockCategories.findIndex((c) => c.id === id)
  if (index !== -1) {
    const category = mockCategories[index]
    mockCategories = mockCategories.filter((c) => c.id !== id)
    // Delete all dishes in this category
    mockDishes = mockDishes.filter((dish) => dish.categoryId !== id)
    return category
  }
  return undefined
}

// Dish functions
export function getAllDishes(): Dish[] {
  return mockDishes
}

export function getDishes(categoryId: string): Dish[] {
  return mockDishes.filter((dish) => dish.categoryId === categoryId)
}

export function getDishesByCategory(categorySlug: string): Dish[] {
  const category = getCategoryBySlug(categorySlug)
  if (!category) return []
  return mockDishes.filter((dish) => dish.categoryId === category.id)
}

export function getDish(id: string): Dish | undefined {
  return mockDishes.find((dish) => dish.id === id)
}

export function addDish(dish: Omit<Dish, "id">): Dish {
  const newDish = {
    ...dish,
    id: String(mockDishes.length + 1),
  }
  mockDishes.push(newDish)
  return newDish
}

export function updateDish(id: string, dish: Partial<Dish>): Dish | undefined {
  const index = mockDishes.findIndex((d) => d.id === id)
  if (index !== -1) {
    mockDishes[index] = { ...mockDishes[index], ...dish }
    return mockDishes[index]
  }
  return undefined
}

export function deleteDish(id: string): Dish | undefined {
  const index = mockDishes.findIndex((d) => d.id === id)
  if (index !== -1) {
    const dish = mockDishes[index]
    mockDishes = mockDishes.filter((d) => d.id !== id)
    return dish
  }
  return undefined
}
