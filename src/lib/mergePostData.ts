import Post from "@/interfaces/domain/post";
import Metadata from "@/interfaces/infrastructure/metadata";
import InfraPost from "@/interfaces/infrastructure/post";

export function mergePostData(posts: InfraPost, metadata: Metadata): Post {
    metadata = {
        title: metadata.title,
        description: metadata.description,
        image: metadata.image,
        url: metadata.url,
    };
    return {
        id: posts.id,
        created_at: posts.created_at,
        title: posts.title,
        content: posts.content,
        music_url: posts.music_url,
        image_url: posts.image_url,
        user_id: posts.user_id,
        Users: {
            name: posts.Users.name,
            icon_url: posts.Users.icon_url,
            client_id: posts.Users.client_id,
        },
        music: {
            title: metadata.title ?? "",
            description: metadata.description ?? "",
            image_url: metadata.image ?? "",
            url: metadata.url ?? "",
        },
    };
}