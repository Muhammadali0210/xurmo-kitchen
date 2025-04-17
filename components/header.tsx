import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  return (
    <header className="border-b bg-white/50 backdrop-blur-xl shadow-sm fixed top-0 inset-x-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
            <span className="text-white font-bold">X</span>
          </div>
          <span className="text-xl font-bold text-green-800">Xurmo kitchen</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <div className="flex gap-3 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="h-6 w-6 text-green-600" viewBox="0 0 24 24"><path fill="currentColor" d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3M6.025 9l1.65-1.65L7.25 5H5.025q.125 1.025.35 2.025T6.025 9m8.95 8.95q.975.425 1.988.675T19 18.95v-2.2l-2.35-.475zm0 0"/></svg>
            <p className="font-medium text-green-600">+998 97 666 40 80</p>
          </div>
          
          <Link href="/admin" className="text-sm font-medium text-green-700 hover:text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="h-6 w-6 text-green-600" viewBox="0 0 24 24"><path fill="currentColor" d="M12 23C6.443 21.765 2 16.522 2 11V5l10-4l10 4v6c0 5.524-4.443 10.765-10 12M4 6v5a10.58 10.58 0 0 0 8 10a10.58 10.58 0 0 0 8-10V6l-8-3Z"/><circle cx="12" cy="8.5" r="2.5" fill="currentColor"/><path fill="currentColor" d="M7 15a5.78 5.78 0 0 0 5 3a5.78 5.78 0 0 0 5-3c-.025-1.896-3.342-3-5-3c-1.667 0-4.975 1.104-5 3"/></svg>
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle ></SheetTitle>
            <SheetDescription>
            </SheetDescription>
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/" className="text-green-700 hover:text-green-500">
                Bosh Sahifa
              </Link>
              <Link href="/admin" className="text-green-700 hover:text-green-500">
                Admin
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
