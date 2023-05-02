import { signInWithSpotify } from "ui/Auth/AuthComponent"

export const ConnectSpotifyButton = () => {
    return (
<div onClick={signInWithSpotify}>
                  <div
                    className="flex items-center p-3 text-base font-bold text-zinc-900 rounded-lg bg-zinc-50 hover:bg-zinc-100 group hover:shadow dark:bg-zinc-600 dark:hover:bg-zinc-600 dark:text-white"
                  >
                    <img className="w-5" src='/spotify.png'/>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Connect Spotify
                    </span>
                  </div>
                </div>
    )
}