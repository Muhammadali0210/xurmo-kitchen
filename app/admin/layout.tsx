import type React from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 mt-[50px] flex flex-col max-w-[1000px] w-full mx-auto ">
          <div>
            <h1 className="text-2xl font-bold text-green-800 md:text-3xl">Admin Panel</h1>
            <p className="text-sm text-green-600">Restoran menyusi va ma'lumotlarini boshqarish</p>
          </div>
          <div className="mt-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
