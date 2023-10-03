import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseImage } from "./hooks/downloadImage";
import { createClient } from "@supabase/supabase-js";
import { BrowserCookieAuthStorageAdapter, createSupabaseClient } from "@supabase/auth-helpers-shared";
import { Database } from "types/Database";
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
export const supabase = createClientComponentClient<Database>({
 supabaseUrl,
 supabaseKey,
 isSingleton: false
});


export const supabaseAuth = createClient<Database>(
  supabaseUrl,
  supabaseSRkey,
    {
      auth: {
        flowType: 'pkce',
        storage: new BrowserCookieAuthStorageAdapter(),
       // storageKey: 'auth',
        
      //  persistSession: true,
      //detectSessionInUrl: true,
      //  autoRefreshToken: true
      }
    }
);



export const supabaseApi = createClient<Database>(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
    storage: new BrowserCookieAuthStorageAdapter(),
   // storageKey:'api'
  }}

);

export const supabaseClient =
  createClient<Database>(
   supabaseUrl,
    supabaseKey,
    { auth:{
   //   flowType: 'pkce',
      storage: new BrowserCookieAuthStorageAdapter(),
    //  storageKey: 'client'
    //  persistSession: false
    }}
  );
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseSRkey,
    {
      auth: {
      //  flowType: 'pkce',
        storage: new BrowserCookieAuthStorageAdapter(),
      //  storageKey: 'admin',
      //  persistSession: true
      }
    }
);

export const redirectUrl = (location: Location) => `${location.origin}/api/auth/callback` 
