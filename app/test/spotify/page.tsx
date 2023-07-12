import { fetchSpotifyTestApi } from 'lib/providers/spotify/spotifyLogic'
import { supabaseAdmin } from 'lib/providers/supabase/supabase-lib-admin'
import React from 'react'
import ConnectToSpotifyButton from 'ui/TestUI/ConnectSpotifyTest'
import MyComponent from 'ui/TestUI/SpotifyTesting'
import { cookies } from 'next/headers'

async function Page() {
    console.log(cookies())
    const { data: sesh } = await supabaseAdmin.auth.getSession()
    const { data } = await supabaseAdmin.auth.refreshSession()
    const { session } = data
    if (session) {
        console.log(session)
    }
    const URL = 'https://open.spotify.com/track/4pnDR3Dbsn19PE7VRbI4ed'
    const extractTrackId = (url: any) => {
        const parts = url.split('/');
        return parts[parts.length - 1];
    };
    // Extract track ID from the URL
    const trackId = extractTrackId(URL);
    console.log(trackId, 'id')
    // Generate Spotify URI
    const trackUri = `spotify:track:${trackId}`;

    console.log(trackUri, 'uri')
    const trackAudio = await fetchSpotifyTestApi(`v1/audio-features/${trackId}`, 'GET')

    if (trackAudio) {
        console.log(trackAudio)
    }

    return trackAudio && (
        <div>
            <MyComponent track={trackAudio} />
            <ConnectToSpotifyButton />
        </div>
    )
}

export default Page