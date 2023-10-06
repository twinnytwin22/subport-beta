'use server'
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/database.types';
import { cache } from 'react';
import { create } from 'domain';
export const createServerClient = cache(() => {
const cookieStore = cookies()
return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

export async function getSession(){
    const supabase = createServerClient()
    const {data: session} = await supabase.auth.getSession()

    return session.session
}