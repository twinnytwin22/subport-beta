import { NextResponse } from "next/server"
import { verifySignature } from "@upstash/qstash/nextjs";
export async function GET() {
    console.log('if this prints were good')

 return NextResponse.json({'status': 200})
}

export default verifySignature(GET)