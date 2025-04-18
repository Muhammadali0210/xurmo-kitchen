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

export function UserMenu() {
    const pathname = usePathname()
    const isAdminPage = pathname.startsWith('/admin')

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
                            <DropdownMenuItem>
                                <Home />
                                <span>Bosh sahifa</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Contact />
                                <span>Kontaktlar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
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
                            <DropdownMenuItem>
                                <Home />
                                <span>Bosh sahifa</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <LayoutDashboard />
                                <span>Dashboard</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <UtensilsCrossed />
                                <span>Menyular</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FolderTree />
                                <span>Kategoriyalar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Phone />
                                <span>Kontaktlar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings />
                                <span>Settings</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:text-red-600 hover:bg-red-50">
                            <LogOut />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

