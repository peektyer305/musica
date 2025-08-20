"use client";
import { useState } from "react";
import { User } from "lucide-react";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import DomainUser from "@/interfaces/domain/user";
import Link from "next/link";

type UserIconProps = {
  userIcon: string | null;
  appUser: DomainUser | null;
  isMobile?: boolean;
  onMenuClose?: () => void;
};

export default function UserIcon({ userIcon, appUser, isMobile = false, onMenuClose }: UserIconProps) {
  if (!userIcon) return null;

  if (isMobile) {
    return (
      <li className="md:hidden border-b border-gray-300 pb-3 mb-3">
        <button
          onClick={onMenuClose}
          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 transition"
        >
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
          <span className="font-medium text-gray-900">{appUser?.name}</span>
          <span className="text-sm text-gray-500">@{appUser?.client_id}</span>
        </button>
      </li>
    );
  }

  // Desktop version with modal menu
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <li className="hidden md:flex md:items-center">
      <Sheet open={userMenuOpen} onOpenChange={setUserMenuOpen}>
        <SheetTrigger asChild>
          <button className="flex items-center px-3 py-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
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
          </button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md bg-white" aria-describedby="user-menu">
          <SheetHeader className="space-y-3 pb-6">
            <div className="flex items-center gap-3">
              {userIcon.startsWith('@static/') ? (
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
              ) : (
                <Image
                  src={userIcon}
                  alt="User Avatar"
                  className="h-12 w-12 rounded-full object-cover"
                  width={48}
                  height={48}
                />
              )}
              <SheetTitle className="text-xl font-bold text-gray-800">{appUser?.name}</SheetTitle>
              <span className="text-sm text-gray-500">@{appUser?.client_id}</span>
            </div>
          </SheetHeader>
          <div className="space-y-2 ml-5">
           <Link href={`users/${appUser?.id}`} onClick={() => setUserMenuOpen(false)}>
             My Page
           </Link>
          </div>
        </SheetContent>
      </Sheet>
    </li>
  );
}