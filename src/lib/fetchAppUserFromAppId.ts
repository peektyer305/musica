import { createClient } from "@/utils/supabase/server";
import DomainUser from "@/interfaces/domain/user";

export default async function fetchAppUserFromAppId(userId: string | null): Promise<DomainUser | null> {
    if (!userId) return null;
    
    const supabase = await createClient();
    // userIdとprivate_idが一致する行の全データを取得
    const { data, error } = await supabase
        .schema('app')
        .from('Users')
        .select('*')
        .eq('id', userId)
        .single();
    
    if (error) {
        console.log("Error fetching app user:", error);
        return null;
    }

    return {
        id: data.id,
        name: data.name,
        client_id: data.client_id,
        description: data.description || undefined,
        icon_url: data.icon_url || undefined,
        created_at: data.created_at,
        updated_at: data.updated_at || undefined,
        following: data.following || null,
        followers: data.followers || null,
    };
}