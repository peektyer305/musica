export default interface InfraUser {
  id: string;
  name: string;
  description?: string;
  icon_url?: string;
  client_id: string;
  created_at: string;
  updated_at?: string;
  following: string[] | null;
  followers: string[] | null;
}