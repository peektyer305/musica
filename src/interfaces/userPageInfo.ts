import Post from "./domain/post";
import User from "./domain/user";

//ビジネスロジックにより必要なユーザー情報があれば追加する
export interface UserPageInfo{
  user: User;
  posts: Post[];
}

