'use client'
import { fetchSpotifyWebApi } from 'lib/providers/spotify/spotifyLogic';
import { useEffect, useState } from 'react';


function generateRandomString(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string | undefined) {
    function base64encode(string: any) {
        return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(string))))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return base64encode(digest);
}

function ConnectToSpotifyButton() {
    const [connected, setConnected] = useState(false);

    const handleConnect = () => {
        const clientId: any = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!

        const redirectUri: any = 'http://localhost:3000'
        const codeVerifier = generateRandomString(128);

        generateCodeChallenge(codeVerifier).then(codeChallenge => {
            const state = generateRandomString(16);
            const scope = 'user-read-private user-read-email';

            localStorage.setItem('code_verifier', codeVerifier);

            const args = new URLSearchParams({
                response_type: 'code',
                client_id: clientId,
                scope: scope,
                redirect_uri: redirectUri,
                state: state,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge
            });

            window.location.href = 'https://accounts.spotify.com/authorize?' + args;
        });
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            const codeVerifier = localStorage.getItem('code_verifier') || ''; // Assign empty string as default
            const redirectUri: any = process.env.SPOTIFY_REDIRECT_URI!;

            const body = new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
                client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
                code_verifier: codeVerifier
            });

            fetchSpotifyWebApi('api/token', 'POST', body)
                .then(data => {
                    const accessToken = data.access_token;
                    localStorage.setItem('access_token', accessToken);
                    setConnected(true);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, []);

    return (
        <div>
            {connected ? (
                <div>
                    <p>You are connected to Spotify.</p>
                    {/* Display connected user information or perform API calls */}
                </div>
            ) : (
                <button onClick={handleConnect}>Connect to Spotify</button>
            )}
        </div>
    );
}

export default ConnectToSpotifyButton;
