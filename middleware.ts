import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
export const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const supabaseKey =  process.env.SUPABASE_ANON_KEY|| process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const cookies = req.cookies.getAll()
  const res = NextResponse.next()
 const supabase = createMiddlewareClient({ req, res }, {supabaseKey, supabaseUrl})
 console.log(cookies, "ALL COOKIES IN MIDDLEWARE")
 const {data: session }= await supabase.auth.getSession()
 console.log(session, 'MIDDLEWARE SESSION')
  return res
}