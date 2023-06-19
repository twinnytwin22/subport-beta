import React from 'react'
import MusicList from 'ui/Players/MusicList'

function page() {
    return (
        <div className='bg-gray-100 dark:bg-black py-4 md:px-4  w-full mx-auto justify center'>
            <MusicList />
        </div>
    )
}

export default page