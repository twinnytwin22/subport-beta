import { SupabaseImage } from "./hooks/downloadImage";

export function useImagePath(url: SupabaseImage) {
  const imagePath = `https://qjfdpaecmjljkboepipm.supabase.co/storage/v1/object/public/avatars/${url}`;
  return imagePath;
}

export const defaultUserImage = "/images/icons/default_user_image.jpg";
