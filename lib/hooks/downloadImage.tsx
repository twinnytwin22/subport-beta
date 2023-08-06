import { supabase } from "lib/constants"
import { cache } from "react"
export type SupabaseImage = {
    path: string
}

export const downloadImage = cache(async (path: SupabaseImage) => {
    try {
        const { data, error } = await supabase.storage.from('avatars').download(path as any)
        if (error) {
            throw error
        }

        const url = URL.createObjectURL(data)

        return url
    } catch (error) {
        console.log('Error downloading image: ', error)
    }
})

