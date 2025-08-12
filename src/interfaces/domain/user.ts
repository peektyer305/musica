export default interface User {
  id: string;
  name: string;
  description?: string;
  icon_url?: string;
  client_id: string;
  created_at: string;
  updated_at?: string;
}