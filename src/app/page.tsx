import Image from "next/image";

import Post from "@/interfaces/domain/post";
import { fetchMetadata } from "@/lib/fetchMetadata";
import InfraPost from "@/interfaces/infrastructure/post";
import { mergePostData } from "@/lib/mergePostData";

const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(
      `${process.env.HOST_URL || "http://localhost:3001"}/posts`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error(`Error fetching posts: ${response.statusText}`);
      return [];
    }
    const data = await response.json();
    const mergedPosts = await Promise.all(
      data.map(async (post: InfraPost) => {
        const metadata = await fetchMetadata(post.music_url);
        if (metadata) {
          return mergePostData(post, metadata);
        }
      }),
    );
    return mergedPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export default async function Home() {
  const posts = await getPosts();
  posts && console.log("Posts fetched:", posts);
  return (
    <main className="flex-1 px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Welcome to Musica</h1>
        <p className="mt-4">Share your favorite music with the world!</p>
      </div>
    </main>
  );
}
