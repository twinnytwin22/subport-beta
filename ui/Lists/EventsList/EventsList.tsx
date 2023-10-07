import { useIpfsImage } from 'lib/constants';
import { reformatDate } from 'lib/hooks/formatDate';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
function EventsCard({ event }: { event: any }) {
  const image = useIpfsImage(event?.image);
  const date = reformatDate(event.date)

  return (
    <div className=" max-w-sm min-w-max w-full overflow-hidden  m-4 bg-white border border-zinc-200 rounded-md dark:bg-black dark:border-zinc-700 shadow-md shadow-zinc-200 dark:shadow-zinc-900 ">
      <div className='relative  object-cover aspect-square w-72 '>
        <Link href={`/events/${event.slug}`}>
          <Image
            width={400}
            height={400}
            src={image}
            alt={event.title}
            className="aspect-square object-cover w-72 h-72 relative" />
        </Link>
      </div>
      <div className="px-6 pt-4 w-full">
        <div className="font-bold text-lg mb-2">{event.title}</div>
      </div>
      <div className="px-6 pb-4">
        <p className="text-zinc-700 dark:text-zinc-300 text-xs">
          {date.fullDate}</p>
        <p className="text-zinc-700 dark:text-zinc-300 text-xs w-60 h-8 overflow-y-scroll">
          {event.location}</p>
        <p className="text-zinc-600 hidden">
          {event.category}</p>
      </div>
      <div className="px-6 py-4 hidden">
        <span className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">
          {event.ticket_status}
        </span>
        <span className="inline-block bg-green-500 text-white rounded-full px-3 py-1 text-sm font-semibold">
          {event.price} {event.currency_type}
        </span>
      </div>
    </div>
  );
}




export const EventsList = ({ events }: { events: string[] }) => {
  return (
    <div className="flex  w-full overflow-x-scroll  mx-auto h-fit items-center scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent ">
      {events.map((event: any) => (
        <EventsCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList
