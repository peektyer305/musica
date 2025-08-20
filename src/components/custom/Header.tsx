"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Music } from "lucide-react";
import NavigationMenu from "./NavigationMenu";
import DomainUser from "@/interfaces/domain/user";
import { User } from "@supabase/supabase-js";

type HeaderProps = {
    authUser: User | null;
    appUser: DomainUser | null;
  };

export default function Header({ authUser, appUser }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  const isLogin = !!authUser;
  const defineUserIcon = () =>{
    if (appUser && appUser.icon_url) {
      return appUser.icon_url;
    }
    return authUser?.user_metadata?.avatar_url || "@static/avatar.png";
  }

  // ユーザーアイコンの定義
  const userIcon = defineUserIcon();

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

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handlePointerDownOutside = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('pointerdown', handlePointerDownOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('pointerdown', handlePointerDownOutside);
    };
  }, [menuOpen]);
  return (
    <header 
      ref={headerRef}
      className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-white fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-6 md:py-2 py-4 flex items-center justify-between">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
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
        <NavigationMenu 
          menuOpen={menuOpen}
          isLogin={isLogin}
          userIcon={userIcon}
          appUser={appUser}
          onMenuClose={() => setMenuOpen(false)}
        />
      </div>
    </header>
  );
}
