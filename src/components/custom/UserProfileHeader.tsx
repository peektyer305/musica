import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { CalendarIcon, MapPinIcon } from "lucide-react";

interface UserProfileHeaderProps {
  user: {
    id: string;
    name: string;
    client_id: string;
    icon_url?: string;
    description?: string;
    created_at: string;
  };
  isOwnProfile?: boolean;
}

export default function UserProfileHeader({ user, isOwnProfile = false }: UserProfileHeaderProps) {
  const formattedJoinDate = formatDate(user.created_at);

  return (
    <div className="bg-white">
      {/* Cover Photo Area */}
      <div className="h-32 sm:h-48 lg:h-52 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 relative">
        {/* Cover image would go here */}
      </div>
      
      {/* Profile Info */}
      <div className="px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-4">
          {/* Profile Picture */}
          <div className="relative -mt-16 sm:-mt-20 lg:-mt-24 mb-4 sm:mb-0">
            <div className="relative">
              {user.icon_url ? (
                <Image
                  src={user.icon_url}
                  alt={user.name}
                  width={150}
                  height={150}
                  className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full border-4 border-white bg-white shadow-lg object-cover"
                />
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full border-4 border-white bg-gray-200 shadow-lg flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl lg:text-4xl text-gray-500">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3">
            {isOwnProfile ? (
              <>
                <button className="px-4 py-2 border border-gray-300 rounded-full font-semibold text-sm hover:bg-gray-50 transition-colors">
                  Set up profile
                </button>
                <button className="px-4 py-2 bg-black text-white rounded-full font-semibold text-sm hover:bg-gray-900 transition-colors">
                  Edit profile
                </button>
              </>
            ) : (
              <>
                <button className="px-4 py-2 border border-gray-300 rounded-full font-semibold text-sm hover:bg-gray-50 transition-colors">
                  Message
                </button>
                <button className="px-4 py-2 bg-black text-white rounded-full font-semibold text-sm hover:bg-gray-900 transition-colors">
                  Follow
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* User Info */}
        <div className="space-y-3">
          {/* Name and Username */}
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              {user.name}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">@{user.client_id}</p>
          </div>
          
          {/* Bio */}
          {user.description && (
            <div className="text-gray-900 text-sm sm:text-base leading-relaxed max-w-2xl">
              {user.description}
            </div>
          )}
          
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              <span>Joined {formattedJoinDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}