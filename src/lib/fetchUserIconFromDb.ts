import { createClient } from "@/utils/supabase/server";

export default async function fetchUserIconFromDb(userId: string) {
    const supabase = await createClient();
    //userIdとprivate_idが一致する行のicon_urlを取得
    const { data, error } = await supabase.from('users').select('icon_url').eq('private_id', userId).single();
    if (error) {
        console.error("Error fetching user icon:", error);
        return null;
    }
    return data?.icon_url || null;
}