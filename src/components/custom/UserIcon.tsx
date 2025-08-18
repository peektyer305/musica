"use client";
import { User } from "lucide-react";
import Image from "next/image";

type UserIconProps = {
  userIcon: string | null;
  isMobile?: boolean;
  onMenuClose?: () => void;
};

export default function UserIcon({ userIcon, isMobile = false, onMenuClose }: UserIconProps) {
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
          <span className="font-medium text-gray-900">Profile</span>
        </button>
      </li>
    );
  }

  // Desktop version
  return (
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
  );
}