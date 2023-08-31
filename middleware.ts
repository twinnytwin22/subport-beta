import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const cookieStore = req.cookies
  const allCookies = cookieStore.getAll()


  const res = NextResponse.next()
  cookieStore.set('subport', 'fast')  

 const supabase = createMiddlewareClient({ req, res })
 //console.log(allCookies, "ALL COOKIES IN MIDDLEWARE")
 await supabase.auth.getSession()
 //console.log(session, 'MIDDLEWARE SESSION')
  return res
}