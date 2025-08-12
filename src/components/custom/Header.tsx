"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Music, Info, PlusCircle, LogOut, LogIn, UserPlus } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  //現在のユーザー情報を取得
  const getCurrentUser = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

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
    getCurrentUser();
  }, []);

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
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
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
          <ul className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
            <li>
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
              </>
            ) : (
              <>
                <li>
                  <div className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition">
                    <LogIn className="h-4 w-4" />
                    <Link href="/login">Login</Link>
                  </div>
                </li>
                <li>
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
