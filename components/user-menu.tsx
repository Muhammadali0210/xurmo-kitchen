"use client"
import {
    Contact,
    FolderTree,
    Home,
    LayoutDashboard,
    LogOut,
    Menu,
    MessageSquare,
    Phone,
    Settings,
    UtensilsCrossed,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

export function UserMenu() {
    const pathname = usePathname()
    const isAdminPage = pathname.startsWith('/admin');
    const router = useRouter();

    const pageHandler = (path: string) => {
        router.push(path)
    }

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/logout')
            if (res.ok) {
              router.refresh()
            } else {
              console.error('Logout failed')
              alert('Logout failed')
            }
        } catch (error) {
          console.error("Logout failed", error)        
        }
      }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size={"icon"}>
                    <Menu />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-4">
                {!isAdminPage ? (
                    <>
                        <DropdownMenuLabel>Sahifalar</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => pageHandler('/')}>
                                <Home />
                                <span>Bosh sahifa</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => pageHandler('/about')}>
                                <UtensilsCrossed />
                                <span>Biz haqimizda</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => pageHandler('/contacts')}>
                                <Contact />
                                <span>Kontaktlar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.open('https://t.me/Abdulaziz1643', '_blank')}>
                                <MessageSquare />
                                <span>Bog'lanish</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </>
                ) : (
                    <>
                        <DropdownMenuLabel>Admin Sahifalar</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => pageHandler('/')}>
                                <Home />
                                <span>Bosh sahifa</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => pageHandler('/admin')}>
                                <LayoutDashboard />
                                <span>Dashboard</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => pageHandler('/admin/menu')}>
                                <UtensilsCrossed />
                                <span>Menyular</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => pageHandler('/admin/categories')}>
                                <FolderTree />
                                <span>Kategoriyalar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => pageHandler('/admin/contacts')}>
                                <Phone />
                                <span>Kontaktlar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => pageHandler('/admin/galery')}>
                                <MessageSquare />
                                <span>Galereya</span>
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem onClick={() => pageHandler('/admin/settings')}>
                                <Settings />
                                <span>Settings</span>
                            </DropdownMenuItem> */}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
                            <LogOut />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

