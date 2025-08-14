"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Music, Info, PlusCircle, LogOut, LogIn, UserPlus, User } from "lucide-react";
import Image from "next/image";

type HeaderProps = {
    initialUser: any | null;
  };

export default function Header({ initialUser }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const isLogin = !!initialUser;
  const userIcon = initialUser?.user_metadata?.avatar_url || null;

  // スクロール時のヘッダー表示制御
  const controlHeader = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // スクロールアップまたは上部にいる場合は表示
        setIsVisible(true);
      } else {
        // スクロールダウンの場合は非表示
        setIsVisible(false);
        setMenuOpen(false); // モバイルメニューを閉じる
      }
      
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);
      return () => {
        window.removeEventListener('scroll', controlHeader);
      };
    }
  }, [lastScrollY]);
  return (
    <header className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-white fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto px-6 md:py-2 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight flex items-center"
        >
          <Music className="inline-block mr-2 h-7 w-7 " /> Musica
        </Link>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
        <nav
          className={`absolute inset-x-0 top-full bg-white text-gray-800 flex flex-col md:static md:flex md:flex-row md:bg-transparent md:text-white ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-6 p-4 md:p-0">
            {/* User Icon - Mobile */}
            {isLogin && userIcon && (
              <li className="md:hidden border-b border-gray-300 pb-3 mb-3">
                <div className="flex items-center gap-3 px-3 py-2">
                  {userIcon.startsWith('@static/') ? (
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <User className="h-10 w-10 text-gray-600" />
                    </div>
                  ) : (
                    <Image
                      src={userIcon}
                      alt="User Avatar"
                      className="h-10 w-10 rounded-full object-cover"
                      width={40}
                      height={40}
                    />
                  )}
                  <span className="font-medium text-gray-900">Profile</span>
                </div>
              </li>
            )}
            
            <li className="md:hidden">
              <Link
                href="/about"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition"
              >
                <Info className="h-4 w-4" />
                About
              </Link>
            </li>
            {isLogin ? (
              <>
                <li className="hidden md:block">
                  <Link
                    href="/about"
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition"
                  >
                    <Info className="h-4 w-4" />
                    About
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition"
                    // onClick={() => setReadyPost(true)}
                  >
                    <PlusCircle className="h-4 w-4" />
                    Post
                  </button>
                </li>
                <li>
                  <Link
                    href="/logout"
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Link>
                </li>
                {/* User Icon - Desktop */}
                {userIcon && (
                  <li className="hidden md:flex md:items-center">
                    <div className="flex items-center px-3 py-2">
                      {userIcon.startsWith('@static/') ? (
                        <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
                          <User className="h-14 w-14" />
                        </div>
                      ) : (
                        <Image
                          src={userIcon}
                          alt="User Avatar"
                          className="h-14 w-14 rounded-full object-cover border-2 border-white/20"
                          width={80}
                          height={80}
                        />
                      )}
                    </div>
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="hidden md:block">
                  <Link
                    href="/about"
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition"
                  >
                    <Info className="h-4 w-4" />
                    About
                  </Link>
                </li>
                <li className="hidden md:block">
                  <div className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition">
                    <LogIn className="h-4 w-4" />
                    <Link href="/login">Login</Link>
                  </div>
                </li>
                <li className="hidden md:block">
                  <Link
                    href="/signup"
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition"
                  >
                    <UserPlus className="h-4 w-4" />
                    SignUp
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
