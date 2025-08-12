import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import InfraUser from "@/interfaces/infrastructure/user";
import InfraPost from "@/interfaces/infrastructure/post";
import Post from "@/interfaces/domain/post";
import User from "@/interfaces/domain/user";
import { formatDate } from "@/lib/utils";
import { fetchMetadata } from "@/lib/fetchMetadata";
import { mergePostData } from "@/lib/mergePostData";
import PostCard from "@/components/custom/PostCard";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: {
    userId: string;
  };
}

async function getUserData(userId: string): Promise<User | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .schema("app")
      .from("Users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

async function getUserPosts(userId: string): Promise<Post[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .schema("app")
      .from("Posts")
      .select(`
        *,
        Users(name, icon_url, client_id)
      `)
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
      })
    );

    return mergedPosts.filter((post): post is Post => post !== null);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return [];
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const { userId } = params;
  
  const [userData, userPosts] = await Promise.all([
    getUserData(userId),
    getUserPosts(userId),
  ]);

  if (!userData) {
    notFound();
  }

  const formattedJoinDate = formatDate(userData.created_at);

  return (
    <main className="flex-1 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* User Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center space-x-6">
            {userData.icon_url && (
              <Image
                src={userData.icon_url}
                alt={userData.name}
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {userData.name}
              </h1>
              <p className="text-lg text-gray-600 mb-2">@{userData.client_id}</p>
              <p className="text-sm text-gray-500">
                Joined {formattedJoinDate}
              </p>
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {userPosts.length}
              </div>
              <div className="text-gray-600">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-gray-600">Followers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-gray-600">Following</div>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6 text-center">Posts by {userData.name}</h2>
          {userPosts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No posts yet.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}