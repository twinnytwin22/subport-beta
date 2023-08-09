import React from 'react'
import CollectCard from 'ui/Cards/Collect/CollectCard'
import EventCard from 'ui/Cards/Events/EventCard'

const Feed: React.FC<{ data: any }> = ({ data }) => {


    return (
        <div className='space-y-4 w-full relative mx-auto justify-center'>
            <div className='flex flex-wrap gap-4 w-full mx-auto justify-center'>
                {data.map((item: any) => (
                    <div key={item.created_at}>
                        <div className=' max-w-lg lg:max-w-md xl:max-w-lg'>
                            {item.type === 'event' && <EventCard event={item} />}
                            {item.type === 'collectible' && <CollectCard metaData={item.data.metaData} drop={item.data.drop} />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Feed