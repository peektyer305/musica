export default interface Post {
  id: number;
  created_at: string;
  title: string;
  content?: string;
  music_url: string;
  image_url?: string;
  user_id: string;
  Users: {
    name: string;
    icon_url?: string;
    client_id: string;
  };
  music: {
    title: string;
    description?: string;
      image_url: string;
        url: string;
  };
}