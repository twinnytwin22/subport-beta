import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseImage } from "./hooks/downloadImage";
import { createClient } from "@supabase/supabase-js";
import { BrowserCookieAuthStorageAdapter } from "@supabase/auth-helpers-shared";

const authStorage = new BrowserCookieAuthStorageAdapter()


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


export const defaultUserImage = "/images/icons/default_user_image.jpg";
export const homePath = 'https://subport.vercel.app'
export const supabaseUrl = process.env.SUPABASE_URL 
                        || process.env.NEXT_PUBLIC_SUPABASE_URL!
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabaseSRkey = process.env.SUPABASE_SERVICE_ROLE_KEY 
                          || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
export const supabase = createClientComponentClient({
 supabaseUrl,
 supabaseKey,
});


export const supabaseAuth = createClient(
  supabaseUrl,
  supabaseSRkey,
    {
      auth: {
        flowType: 'pkce',
        storage: authStorage,
      //  persistSession: true,
      //detectSessionInUrl: true,
      //  autoRefreshToken: true
      }
    }
);



export const supabaseApi = createClient(
  supabaseUrl,
  supabaseKey,
  {auth: {
    storage: authStorage,
  }}

);

export const supabaseClient =
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth:{
   //   flowType: 'pkce',
      storage: authStorage,
    //  persistSession: false
    }}
  );
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseSRkey,
    {
      auth: {
      //  flowType: 'pkce',
        storage: authStorage,
      //  persistSession: true
      }
    }
);