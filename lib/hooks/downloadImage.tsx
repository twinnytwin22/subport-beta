import { supabaseAdmin } from "app/supabase-admin"
export type SupabaseImage = {
    path: string
}

export async function downloadImage(path: SupabaseImage) {
    try {
        const { data, error } = await supabaseAdmin.storage.from('avatars').download(path as any)
        if (error) {
            throw error
        }

        const url = URL.createObjectURL(data)

        return url
    } catch (error) {
        console.log('Error downloading image: ', error)
    }
}