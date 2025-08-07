'use server'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"
import { UserInfo } from "@/interfaces/user"


export async function login(formData: FormData) {
    const supabase =  await createClient()
    console.log('Login action called')
    const loginData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }
    console.log('Login data:', loginData)

    const { data, error } = await supabase.auth.signInWithPassword(loginData)

    
    
    error && console.error('Login error:', error)
    error && redirect('/error')

    revalidatePath('/', 'layout')
    redirect('/private/mypage')

}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/private/mypage')
}