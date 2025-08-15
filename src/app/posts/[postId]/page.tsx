import { createClient } from "@/utils/supabase/server";
import Post from "@/interfaces/domain/post";
import { fetchMetadata } from "@/lib/fetchMetadata";
import { mergePostData } from "@/lib/mergePostData";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{
    postId: string;
  }>;
}

async function getPostData(postId: string): Promise<Post | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .schema("app")
      .from("Posts")
      .select(
        `
        *,
        Users(name, icon_url, client_id)
      `,
      )
      .eq("id", postId)
      .single();

    if (error) {
      console.error("Error fetching post:", error);
      return null;
    }

    const metadata = await fetchMetadata(data.music_url);
    if (metadata) {
      return mergePostData(data, metadata);
    }
    return null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { postId } = await params;

  const postData = await getPostData(postId);

  if (!postData) {
    notFound();
  }

  const formattedCreatedAt = formatDate(postData.created_at);

  return (
    <main className="flex-1 bg-gray-50 min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="bg-white border rounded-lg shadow-lg overflow-hidden">
          {/* User Info Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 bg-gray-100 border-b">
            <Link
              href={`/users/${postData.user_id}`}
              className="flex items-center hover:opacity-80 transition-opacity min-w-0 flex-1"
            >
              {postData.Users.icon_url && (
                <Image
                  src={postData.Users.icon_url}
                  alt={postData.Users.name}
                  className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 rounded-full object-cover flex-shrink-0"
                  width={300}
                  height={300}
                />
              )}
              <div className="ml-2 sm:ml-3 md:ml-4 min-w-0 flex-1">
                <div className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate">
                  {postData.Users.name}
                </div>
                <p className="text-gray-500 text-xs sm:text-sm md:text-base truncate">
                  @{postData.Users.client_id}
                </p>
              </div>
            </Link>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 ml-2 flex-shrink-0">
              {formattedCreatedAt}
            </div>
          </div>

          {/* Music Content */}
          <div className="p-3 sm:p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
              {/* Music Image */}
              <div className="flex-shrink-0 w-full max-w-sm mx-auto md:mx-0 md:w-64 lg:w-80">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md">
                  <a
                    href={postData.music_url}
                    target="_blank"
                    rel="noreferrer"
                    className="block h-full"
                  >
                    <Image
                      src={postData.music.image_url}
                      alt={postData.music.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      width={1280}
                      height={720}
                    />
                  </a>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-6 min-w-0">
                {/* Music Info */}
                <div className="space-y-2 sm:space-y-3">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 break-words">
                    {postData.music.title}
                  </h1>
                  {postData.music.description && (
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed break-words">
                      {postData.music.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                    <span>🎵</span>
                    <a
                      href={postData.music_url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-blue-600 underline break-all"
                    >
                      Listen on original platform
                    </a>
                  </div>
                </div>

                {/* Post Content */}
                <div className="border-t pt-3 sm:pt-4 md:pt-6 space-y-2 sm:space-y-3">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 break-words">
                    {postData.title}
                  </h2>
                  {postData.content && (
                    <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-wrap break-words">
                      {postData.content}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Navigation */}
        <div className="mt-4 sm:mt-6 md:mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
