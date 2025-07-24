'use server'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"

export async function login(formData: FormData) {
    const supabase =  await createClient()
    console.log('Login action called')
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }
    console.log('Login data:', data)

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error){
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/')
}