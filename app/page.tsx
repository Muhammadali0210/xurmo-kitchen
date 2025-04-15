import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getAllCategories } from "@/lib/data"

export default function Home() {
  const categories = getAllCategories()

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-green-50 to-white">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-green-800 sm:text-4xl md:text-5xl">
                  Bizning Menyu
                </h1>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 mt-12">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className="group relative overflow-hidden rounded-2xl border-2 border-green-200 bg-white shadow-md transition-all hover:border-green-400 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-green-50 opacity-50 rounded-2xl"></div>
                  <div className="relative p-6 sm:p-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-green-800">{category.name}</h3>
                    <div className="mt-4 flex items-center text-sm font-medium text-green-600">
                      Menyuni ko'rish
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
