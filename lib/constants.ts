import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseImage } from "./hooks/downloadImage";

export function useImagePath(url: SupabaseImage) {
  const imagePath = `https://qjfdpaecmjljkboepipm.supabase.co/storage/v1/object/public/avatars/${url}`;
  return imagePath;
}

export const defaultUserImage = "/images/icons/default_user_image.jpg";
export const homePath = 'https://subport.vercel.app'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClientComponentClient({
  supabaseUrl,
  supabaseKey,
});
