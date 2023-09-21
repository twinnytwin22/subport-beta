import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/database.types';
export const createServerClient = () => {
const cookieStore = cookies()
return createServerComponentClient<Database>({ cookies: () => cookieStore })
}