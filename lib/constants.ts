import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from './providers/supabase/supabase-client-server';

export function useImagePath(url: string) {
  if(url.startsWith('https')){
    return url
      }
  const imagePath = `https://vmyqkspfxrzxteohsrbk.supabase.co/storage/v1/object/public/avatars/${url}`;
  return imagePath;
}

export function useBgImagePath(url: string) {''

  if(url.startsWith('https')){
return url
  }
  
  const imagePath = `https://vmyqkspfxrzxteohsrbk.supabase.co/storage/v1/object/public/profile_backgrounds/${url}`;
  return imagePath;
}

export function useIpfsImage(url: string) {
  const imagePath = url?.replace('ipfs://', `https://${ipfs.hostname}/ipfs/`);
  return imagePath;
}

export function useIpfsUrl(url: string) {
  const imagePath = url?.replace('ipfs://', `https://${ipfs.hostname}/ipfs/`);
  return imagePath;
}

export const ipfs = {
  gatewayUrl: 'https://cloudflare-ipfs.com/ipfs/',
  hostname: '053c144674e91fcc39bf3a56a7511a32.ipfscdn.io'
};

export const defaultUserImage = '/images/icons/default_user_image.jpg';
export const homePath = 'https://subport.vercel.app';
export const supabaseUrl =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabaseSRkey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;
export const supabase = createClientComponentClient({
  supabaseUrl,
  supabaseKey,
  isSingleton: false
});

export const supabaseAuth = createClient();

export const supabaseApi = createClient();

export const supabaseClient = createClient();
export const supabaseAdmin = createClient();

export const redirectUrl = (location: Location) =>
  `${location.origin}/api/auth/callback`;
