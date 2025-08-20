import { createClient } from "@/utils/supabase/server";
import InfraPost from "@/interfaces/infrastructure/post";
import Post from "@/interfaces/domain/post";
import { fetchMetadata } from "@/lib/fetchMetadata";
import { mergePostData } from "@/lib/mergePostData";
import PostCard from "@/components/custom/PostCard";
import UserProfileHeader from "@/components/custom/UserProfileHeader";
import UserStats from "@/components/custom/UserStats";
import { notFound } from "next/navigation";
import fetchAppUserFromAppId from "@/lib/fetchAppUserFromAppId";

interface UserPageProps {
  params: {
    userId: string;
  };
}

async function getUserPosts(userId: string): Promise<Post[]> {
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
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching user posts:", error);
      return [];
    }

    const mergedPosts = await Promise.all(
      data.map(async (post: InfraPost) => {
        const metadata = await fetchMetadata(post.music_url);
        if (metadata) {
          return mergePostData(post, metadata);
        }
        return null;
      }),
    );

    return mergedPosts.filter((post): post is Post => post !== null);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return [];
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const { userId } =  await params;

  const [userData, userPosts] = await Promise.all([
    fetchAppUserFromAppId(userId),
    getUserPosts(userId),
  ]);

  if (!userData) {
    notFound();
  }

  const userStats = {
    following: userData.following?.length || 0,
    followers: userData.followers?.length || 0,
    posts: userPosts.length,
  };

  return (
    <main className="flex-1 bg-white">
      <div className="w-auto mx-auto">
        {/* User Profile Header */}
        <UserProfileHeader user={userData} isOwnProfile={false} />

        {/* User Stats */}
        <UserStats stats={userStats} />

        {/* User Posts */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {userPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16 lg:py-20">
              <div className="max-w-md mx-auto">
                <div className="text-gray-400 text-6xl sm:text-7xl mb-6">
                  🎵
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  When {userData.name} shares music, it will show up here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
