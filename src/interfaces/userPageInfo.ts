import Post from "./domain/post";

//ビジネスロジックにより必要なユーザー情報があれば追加する
export interface UserPageInfo{
  id: string;
  name: string;
  description?: string;
  icon_url?: string;
  client_id: string;
  created_at: string;
  updated_at?: string;
  posts: Post[];
}

