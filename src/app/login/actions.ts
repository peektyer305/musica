'use server'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"


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

export async function signInWithGithub() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: `${process.env.HOST_URL}/auth/callback`
        }
    })
    if (data.url) {
        redirect(data.url)
    }
    data && console.log('GitHub sign-in data:', data)
    if (error) {
        console.error('GitHub sign-in error:', error)
        throw new Error('Failed to sign in with GitHub')
    }
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