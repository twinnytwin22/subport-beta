'use-server'
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/database.types';
import { cache } from 'react';
export const createServerClient = cache(() => {
const cookieStore = cookies()
return createServerComponentClient<Database>({ cookies: () => cookieStore })
})