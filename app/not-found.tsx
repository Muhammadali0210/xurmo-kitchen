import Link from "next/link"

export default function NotFound() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="container flex flex-col items-center justify-center px-4 py-16 text-center md:px-6 md:py-24">
        <h1 className="text-4xl font-bold tracking-tighter text-green-800 sm:text-5xl">404 - Topilmadi</h1>
        <p className="mt-4 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Siz qidirayotgan taom mavjud emas yoki o'chirilgan.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-600"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  )
}
