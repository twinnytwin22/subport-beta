'use client'
import { fetchSpotifyWebApi } from 'lib/providers/spotify/spotifyLogic';
import { useEffect, useState } from 'react';



function GetSpotifyData({ url }: any) {
    const [metadata, setMetadata] = useState<any>(null);

    useEffect(() => {
        // Extract track ID from the URL
        const trackId = url.match(/track\/(\w+)/)[1];

        // Generate Spotify URI
        const trackUri = `spotify:track:${trackId}`;

        // Get track metadata using Spotify Web API
        fetchSpotifyWebApi(`v1/tracks/${trackId}`, 'GET')
            .then(trackData => {
                // Extract relevant metadata
                const trackName = trackData.name;
                const artistName = trackData.artists[0].name;
                const albumName = trackData.album.name;
                const audioSource = trackData.preview_url;

                // Create JSON object with metadata
                const metadata = {
                    trackUri: trackUri,
                    trackName: trackName,
                    artistName: artistName,
                    albumName: albumName,
                    audioSource: audioSource
                };

                // Set the metadata state
                setMetadata(metadata);
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }, [url]);

    if (!metadata) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Your form fields */}
            <input type="text" value={metadata.trackUri} readOnly />
            <input type="text" value={metadata.trackName} readOnly />
            <input type="text" value={metadata.artistName} readOnly />
            <input type="text" value={metadata.albumName} readOnly />
            <input type="text" value={metadata.audioSource} readOnly />

            {/* JSON output */}
            <pre>{JSON.stringify(metadata, null, 2)}</pre>
        </div>
    );
}

// Example usage
const SpotifyUrl = 'https://open.spotify.com/track/4pnDR3Dbsn19PE7VRbI4ed';

function MyComponent() {
    return (
        <div>
            <h1>Spotify Track Metadata</h1>
            <GetSpotifyData url={SpotifyUrl} />
        </div>
    );
}

export default MyComponent;
