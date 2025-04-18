import Link from "next/link"
import { ArrowRight } from "lucide-react"
import CategoryCard from "@/components/cards/category.card"
import CategoryList from "./_components/category-list"
import { getAllCategories } from "@/action/category.action"

export default async function Home() {
  const categories = await getAllCategories()

  return (
    // <div className="flex min-h-screen flex-col bg-gradient-to-b from-green-50 to-white" style={{ backgroundImage: "url('/image.webp')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} >
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-green-100 relative"  >
      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-800 opacity-0 z-10"></div> */}
      <main className="flex-1 relative z-20">
        <section className="w-full py-32" >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-green-600 sm:text-4xl md:text-5xl" style={{textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)"}}>
                  Bizning Menyularimiz
                </h1>
              </div>
            </div>
            <CategoryList categories={categories} />

            {/* <div className="flex justify-center items-center gap-10 lg:mt-[100px] mt-[45px]">
              <a href="#">
                <img src="/instagram.png" alt="Instagram" className="w-[48px] h-[48px]" />
              </a>
              <a href="#">
                <img src="/facebook.png" alt="Instagram" className="w-[48px] h-[48px]" />
              </a>
              <a href="#">
                <img src="/telegram.png" alt="Instagram" className="w-[48px] h-[48px]" />
              </a>
            </div> */}
          </div>
        </section>
      </main>
    </div>
  )
}


