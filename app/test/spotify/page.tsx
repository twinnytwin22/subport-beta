import React from 'react'
import ConnectToSpotifyButton from 'ui/TestUI/ConnectSpotifyTest'
import MyComponent from 'ui/TestUI/SpotifyTesting'

function Page() {
    return (
        <div>
            <MyComponent />
            <ConnectToSpotifyButton />
        </div>
    )
}

export default Page