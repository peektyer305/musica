"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Music, User, LogOut, Plus } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { redirect, usePathname } from "next/navigation"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  const pathname = usePathname()
  useEffect( () => {
    const getStatus = async () => {
        const supabase = createClient()
            const { data, error } = await supabase.auth.getUser()
            data && setIsLogin(true)
            error && console.error("Error fetching user:", error)
            console.log("No session found, user is not logged in")
            setIsLogin(false)
    }
    getStatus()
  }, [pathname])
  const handleLogout = () => {
    const logout = async () => {
        const supabase = createClient()
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error("Logout error:", error)
        } else {
            setIsLogin(false)
            console.log("Logged out successfully")
        }
       redirect('/')
    }
    logout()
  }

  const handlePost = () => {
    // 投稿処理をここに実装
    console.log("投稿")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* ロゴとプロダクト名 */}
        <Link href="/" className="flex items-center space-x-2 ml-2 md:ml-8">
          <Music className="h-6 w-6" />
          <span className="text-xl font-bold">Musica</span>
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/about" className="transition-colors">
            About
          </Link>

          {isLogin ? (
            <>
              <Button variant="ghost" size="sm" onClick={handlePost} className="flex items-center space-x-2 cursor-pointer">
                <Plus className="h-4 w-4" />
                <span>Post</span>
              </Button>

              <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center space-x-2 cursor-pointer">
                <span>Logout</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <span>Mypage</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link href="/signup" className="flex items-center cursor-pointer">
                <Button size="sm" className="cursor-pointer">Sign Up</Button>
              </Link>
            </div>
          )}
        </nav>

        {/* モバイルメニュー */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="px-0 text-base focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden hover:bg-transparent"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="pr-0">
            <div className="flex flex-col space-y-4 mt-6">
              <Link
                href="/about"
                className="text-sm font-medium transition-colors hover:text-primary "
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              {isLogin ? (
                <>
                  <div className="flex items-center space-x-3 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" className="cursor-pointer" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">User</span>
                  </div>

                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      handlePost()
                      setIsOpen(false)
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4 cursor-pointer" />
                    Post
                  </Button>

                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4 cursor-pointer" />
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start cursor-pointer">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-start cursor-pointer">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
