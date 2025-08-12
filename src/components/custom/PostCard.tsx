
import { formatDate } from "@/lib/utils";
import Post from "@/interfaces/domain/post";
import Image from "next/image";
import Link from "next/link";

export default function PostCard(props: { post: Post }) {
  const { post } = props;
  const formattedCreatedAt = formatDate(post.created_at);
  return (
    <div className="bg-white border rounded-lg shadow-lg overflow-hidden flex flex-col w-full max-w-lg mx-auto mb-8">
      {/* User Info */}
      <div className="flex items-center p-4 bg-gray-100">
        <Link href={`/users/${post.user_id}`} className="flex items-center">
        {post.Users.icon_url && (
          <Image
            src={post.Users.icon_url}
            alt={post.Users.name}
            className="h-12 w-12 rounded-full object-cover"
            width={300}
            height={300}
          />
        )}
        <div className="ml-3 text-base font-semibold truncate max-w-[140px]">
          {post.Users.name}
          <p className="text-gray-500 text-sm">@{post.Users.client_id}</p>
        </div>
        </Link>
        <div className="ml-auto text-xs text-gray-600 whitespace-nowrap">
          {formattedCreatedAt}
        </div>
      </div>

      {/* Image Carousel in Square */}
      <div className="relative w-full aspect-square">
        <div className="absolute inset-0 flex">
          <div className="embla__slide flex-shrink-0 w-full">
            <a href={post.music_url} target="_blank" rel="noreferrer">
              <Image
                src={post.music.image_url}
                alt={post.music.title}
                className="w-full h-full object-cover"
                width={1280}
                height={720}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col space-y-2">
        <h3 className="text-lg font-bold truncate">{post.music.title}</h3>
        <p className="text-sm text-gray-700 line-clamp-3">{post.music.description}</p>
        <h4 className="text-base font-semibold truncate">{post.title}</h4>
        <p className="text-gray-600 text-sm line-clamp-4">{post.content}</p>
      </div>
    </div>
  );
}
