"use client";
import Link from "next/link";
import { Info, LogIn, LogOut, UserPlus } from "lucide-react";
import UserIcon from "./UserIcon";
import PostModal from "./PostModal";
import LogoutModal from "./LogoutModal";

type NavigationMenuProps = {
  menuOpen: boolean;
  isLogin: boolean;
  userIcon: string | null;
  onMenuClose: () => void;
};

export default function NavigationMenu({ menuOpen, isLogin, userIcon, onMenuClose }: NavigationMenuProps) {
  return (
    <nav
      className={`absolute inset-x-0 top-full bg-white text-gray-800 flex flex-col md:static md:flex md:flex-row md:bg-transparent md:text-white transition-all duration-300 ease-in-out transform ${
        menuOpen 
          ? "flex opacity-100 translate-y-0 pointer-events-auto" 
          : "flex opacity-0 -translate-y-2 pointer-events-none md:flex md:opacity-100 md:translate-y-0 md:pointer-events-auto"
      }`}
    >
      <ul className="flex flex-col md:flex-row md:items-center md:space-x-6 p-4 md:p-0">
        {/* User Icon - Mobile */}
        {isLogin && <UserIcon userIcon={userIcon} isMobile={true} onMenuClose={onMenuClose} />}
        
        <li className="md:hidden">
          <Link
            href="/about"
            onClick={onMenuClose}
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
              <PostModal onMenuClose={onMenuClose} />
            </li>
            <li>
              <LogoutModal>
                <button
                  onClick={onMenuClose}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </LogoutModal>
            </li>
            {/* User Icon - Desktop */}
            <UserIcon userIcon={userIcon} isMobile={false} />
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
            <li>
              <div className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition">
                <LogIn className="h-4 w-4" />
                <Link href="/login" onClick={onMenuClose}>Login</Link>
              </div>
            </li>
            <li>
              <Link
                href="/signup"
                onClick={onMenuClose}
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
  );
}