import { createClient } from "@/utils/supabase/server";

export default async function fetchUserIconFromAuthId(userId: string | null, userAvator: string): Promise<string> {
    const supabase = await createClient();
    //userIdとprivate_idが一致する行のicon_urlを取得
    const { data, error } = await supabase
        .schema('app')
        .from('Users')
        .select('icon_url')
        .eq('private_id', userId)
        .single();
    
    if (error) {
        console.log("Error fetching user icon:", error);
        return userAvator; // Return default icon.
    }
    return data?.icon_url
}