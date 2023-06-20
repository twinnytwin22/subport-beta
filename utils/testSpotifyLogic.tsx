'use client'
import { useEffect } from 'react';

function generateRandomString(length: number): string {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  function base64encode(array: number[]): string {
    return btoa(String.fromCharCode.apply(null, array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  const byteArray = Array.from(new Uint8Array(digest)); // Convert Uint8Array to a regular array

  return base64encode(byteArray);
}

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const redirectUri = 'http://localhost:8080';

export default function SpotifyAuth() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetchAccessToken(code).then(() => {
        // Additional actions after fetching access token
      });
    }
  }, []);

  function authorizeWithSpotify() {
    let codeVerifier = generateRandomString(128);

    generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      let state = generateRandomString(16);
      let scope = 'user-read-private user-read-email';

      localStorage.setItem('code_verifier', codeVerifier);

      let args = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
      });

      window.location.href = 'https://accounts.spotify.com/authorize?' + args;
    });
  }

  async function fetchAccessToken(code: string) {
    let codeVerifier2 = localStorage.getItem('code_verifier') || '';

    let body: URLSearchParams | string = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier2,
    });

    // Convert the body to a string if using fetch
    if (typeof body !== 'string') {
      body = body.toString();
    }

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function handleConnectSpotify() {
    authorizeWithSpotify();
  }

  return (
    <div>
      <button onClick={handleConnectSpotify} className="p-4 bg-green-800 dark:bg-green-600 justify-center text-white rounded-lg mx-auto font-bold hover:scale-105 duration-200 ease-in-out">
        Connect with Spotify</button>
    </div>
  );
}
