"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, UtensilsCrossed, FolderTree, Settings, Phone, LayoutDashboard, Menu } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  isActive: boolean
  onClick?: () => void
}

function NavItem({ href, icon, children, isActive, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive ? "bg-green-100 text-green-900" : "text-green-700 hover:bg-green-50 hover:text-green-900",
      )}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{children}</span>
    </Link>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const navItems = [
    {
      href: "/admin",
      icon: <LayoutDashboard className="h-4 w-4" />,
      label: "Bosh sahifa",
    },
    {
      href: "/admin/menu",
      icon: <UtensilsCrossed className="h-4 w-4" />,
      label: "Taomlar",
    },
    {
      href: "/admin/categories",
      icon: <FolderTree className="h-4 w-4" />,
      label: "Kategoriyalar",
    },
    {
      href: "/admin/contacts",
      icon: <Phone className="h-4 w-4" />,
      label: "Kontaktlar",
    },
    {
      href: "/admin/settings",
      icon: <Settings className="h-4 w-4" />,
      label: "Sozlamalar",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 mt-[50px] flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-green-800 md:text-3xl">Admin Panel</h1>
            <p className="text-sm text-green-600">Restoran menyusi va ma'lumotlarini boshqarish</p>
          </div>
          <div className="block md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="mt-8 space-y-1">
                  {navItems.map((item) => (
                    <NavItem
                      key={item.href}
                      href={item.href}
                      icon={item.icon}
                      isActive={pathname === item.href}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </NavItem>
                  ))}
                  <hr className="my-4 border-t border-green-100" />
                  <NavItem href="/" icon={<Home className="h-4 w-4" />} isActive={false} onClick={() => setOpen(false)}>
                    Asosiy saytga qaytish
                  </NavItem>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:gap-8">
          {/* Sidebar Navigation - Desktop */}
          <aside className="hidden space-y-2 md:block">
            <div className="rounded-lg border-2 border-green-100 bg-white p-4 shadow-sm">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <NavItem key={item.href} href={item.href} icon={item.icon} isActive={pathname === item.href}>
                    {item.label}
                  </NavItem>
                ))}
              </nav>
            </div>
            <div className="rounded-lg border-2 border-green-100 bg-white p-4 shadow-sm">
              <Link href="/" className="flex items-center text-sm font-medium text-green-700 hover:text-green-500">
                <Home className="mr-2 h-4 w-4" />
                Asosiy saytga qaytish
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  )
}
