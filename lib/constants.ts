import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseImage } from "./hooks/downloadImage";
import { clientId } from "./providers/thirdweb/thirdweb";
import { createClient } from "@supabase/supabase-js";

export function useImagePath(url: SupabaseImage) {
  const imagePath = `https://qjfdpaecmjljkboepipm.supabase.co/storage/v1/object/public/avatars/${url}`;
  return imagePath;
}

export function useBgImagePath(url: SupabaseImage) {
  const imagePath = `https://qjfdpaecmjljkboepipm.supabase.co/storage/v1/object/public/profile_backgrounds/${url}`;
  return imagePath;
}

export function useIpfsImage(url: string) {
  const imagePath = url?.replace("ipfs://",`https://${ipfs.hostname}/ipfs/`)
  return imagePath
}

export function useIpfsUrl(url: string) {
  const imagePath = url?.replace("ipfs://",`https://${ipfs.hostname}/ipfs/`)
  return imagePath
}

export const ipfs = { 
  gatewayUrl: 'https://cloudflare-ipfs.com/ipfs/',
  hostname:'053c144674e91fcc39bf3a56a7511a32.ipfscdn.io'
} 

const auth = {
  persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
}

export const defaultUserImage = "/images/icons/default_user_image.jpg";
export const homePath = 'https://subport.vercel.app'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supaBase = createClientComponentClient({
  supabaseUrl,
  supabaseKey,
  options: { 
    
  }
});
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth
})