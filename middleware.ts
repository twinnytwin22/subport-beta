import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession, useSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';
export async function middleware(request: NextRequest, c: any) {
    const url:any = request?.nextUrl.pathname   
    
    
}

export const config = {};
