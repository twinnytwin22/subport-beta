import { NextResponse } from 'next/server';
export async function GET() {
  console.log('if this prints were good');

  return NextResponse.json({ status: 200 });
}
