'use client'
import { fetchSpotifyWebApi } from 'lib/providers/spotify/spotifyLogic';
import React, { useState } from 'react';
import { addPlaylist } from 'utils/database';
function PlaylistCreator() {
    const [trackUri, setTrackUri] = useState<any>('');
    const [addedTracks, setAddedTracks] = useState<any>([]);
    const [playlistName, setPlaylistName] = useState<any>('')
    const [creatingPlaylist, setCreatingPlaylist] = useState(false)
    const addTrackToList = () => {
        if (trackUri.trim() !== '') {
            setAddedTracks([...addedTracks, trackUri]);
            setTrackUri('');
        }
    };

    const handleStartPlaylist = () => {
        if (creatingPlaylist) {
            setCreatingPlaylist(false)
            return
        }
        if (!creatingPlaylist) {
            setCreatingPlaylist(true)
            return
        }
    }

    const createPlaylist = async (userId: any) => {
        //   if (addedTracks.length > 0) {
        const { id: user_id } = await fetchSpotifyWebApi('v1/me', 'GET');

        const playlist = await fetchSpotifyWebApi(`v1/users/${user_id}/playlists`, 'POST', {
            name: playlistName,
            description: 'Playlist created by the tutorial on subport.xyz',
            public: false,
        });

        const addToDb = await addPlaylist(userId, playlist.name, playlist.id)

        if (addToDb.addPlaylist) {
            console.log(playlist.name, playlist.id);

        }

        if (addToDb.addPlaylistError) {
            throw (addToDb.addPlaylistError)
        }
        //    for (const trackUri of addedTracks) {
        //       await fetchSpotifyWebApi(
        //           `v1/playlists/${playlist.id}/tracks?uris=${encodeURIComponent(trackUri)}`,
        //           'POST'
        //        );
        //      }

        //  }
    };

    return (
        <div className="block space-y-2 mt-2 mx-auto relative max-w-52 text-small">
            <div className="font-bold text-lg dark:text-zinc-200 text-zinc-900 items-center mx-auto flex space-x-2 content-center">

                <p>Your Playlists</p>

                <button
                    onClick={handleStartPlaylist}
                    className="bg-blue-700 dark:bg-blue-600 text-white px-2  rounded"
                > {creatingPlaylist ? 'x' : '+'}

                </button>
            </div>
            {creatingPlaylist && <div className='w-full min-w-52 space-y-2'>
                <input
                    type="text"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    placeholder="Name Your Playlist"
                    className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />

                <button
                    onClick={createPlaylist}
                    className="bg-blue-700 text-white px-4 py-2 rounded text-xs "
                >
                    Create Playlist
                </button></div>}
        </div>
    );
}

export default PlaylistCreator;
