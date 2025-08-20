import { createClient } from "@/utils/supabase/server";
import User from "@/interfaces/domain/user";

export default async function fetchAppUser(userId: string | null): Promise<User | null> {
    if (!userId) return null;
    
    const supabase = await createClient();
    // userIdとprivate_idが一致する行の全データを取得
    const { data, error } = await supabase
        .schema('app')
        .from('Users')
        .select('*')
        .eq('private_id', userId)
        .single();
    
    if (error) {
        console.log("Error fetching app user:", error);
        return null;
    }
    
    return data as User;
}