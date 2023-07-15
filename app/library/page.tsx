import React from 'react'
import MusicList from 'ui/Players/MusicList'
export const revalidate = 60// revalidate this page every 60 seconds

function page() {
    return (
        <div className='bg-gray-100 dark:bg-black py-4 md:px-4  w-full mx-auto justify center'>
            <MusicList />
        </div>
    )
}

export default page