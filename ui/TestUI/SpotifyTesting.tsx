'use client'

import { stringify } from "querystring";


function MyComponent({ track }: any) {
    return (
        <div>
            <audio controls>
                <source src={track.track_href} />
            </audio>
            <h1>{track.track_href}</h1>
        </div>
    );
}

export default MyComponent;
