"use client"
import Link from "next/link"
import { UserMenu } from "./user-menu"
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function Header() {
  const pathname = usePathname()
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <header className="border-b bg-white/50 backdrop-blur-xl shadow-sm fixed top-0 inset-x-0 z-50 overflow-hidden">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
            <span className="text-white font-bold">X</span>
          </div>
          <span className="text-xl font-bold text-green-800">Xurmo kitchen</span>
        </Link> */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={"/logo-orign.png"} alt="logo" height={40} width={170} className="max-md:h-[40px] w-[150px] object-cover" />
        </Link>
        <nav className="flex items-center gap-6">
          {!isAdminPage && (
            <Link href="/admin" className="text-sm font-medium text-green-700 hover:text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="h-6 w-6 text-green-600" viewBox="0 0 24 24"><path fill="currentColor" d="M12 23C6.443 21.765 2 16.522 2 11V5l10-4l10 4v6c0 5.524-4.443 10.765-10 12M4 6v5a10.58 10.58 0 0 0 8 10a10.58 10.58 0 0 0 8-10V6l-8-3Z"/><circle cx="12" cy="8.5" r="2.5" fill="currentColor"/><path fill="currentColor" d="M7 15a5.78 5.78 0 0 0 5 3a5.78 5.78 0 0 0 5-3c-.025-1.896-3.342-3-5-3c-1.667 0-4.975 1.104-5 3"/></svg>
            </Link>
          )}
          <UserMenu />
        </nav>
      </div>
    </header>
  )
}
66