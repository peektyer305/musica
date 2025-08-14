import { createClient } from "@/utils/supabase/server";

export default async function fetchUserIconFromDb(userId: string | null): Promise<string | null> {
    if (!userId) return null;
    const supabase = await createClient();
    //userIdとprivate_idが一致する行のicon_urlを取得
    const { data, error } = await supabase
        .schema('app')
        .from('Users')
        .select('icon_url')
        .eq('private_id', userId)
        .single();
    
    if (error) {
        
        return null;
    }
    return data?.icon_url || null;
}