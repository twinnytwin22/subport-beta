import { NextRequest, NextResponse } from "next/server";



export default async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const refreshToken = searchParams.get('refreshToken')
    if (req.method === 'POST') {
      const clientId = process.env.SPOTIFY_CLIENT_;
      const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  
      const tokenUrl = 'https://accounts.spotify.com/api/token';
      const data = new URLSearchParams();
      data.append('grant_type', 'client_credentials');
  
      const authHeader = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;
  
      try {
        const response = await fetch(tokenUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authHeader,
          },
          body: data,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const tokenData = await response.json();
        NextResponse.json({ access_token: tokenData.access_token, status: 200 });
      } catch (error) {
        console.error('Error:', error);
        NextResponse.json({ error: 'Internal Server Error', status: 500 });
      }
    } else {
        NextResponse.json({ error: 'Method Not Allowed', status: 405 });
    }
  }