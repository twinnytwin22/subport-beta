import { reformatDate } from 'lib/hooks/formatDate';
import { headers } from 'next/headers';
import MinIEventCard from 'ui/Cards/Events/MinIEventCard';

async function getEventsForUserId(userId: any) {
    const host = headers().get('host');
    const protocol = process?.env.NODE_ENV === 'development' ? 'http' : 'https';
    const res = await fetch(`${protocol}://${host}/api/v1/getEvents`, {
        method: 'GET',
        cache: 'no-store',
    });

    const data = await res.json();

    // Filter events based on the user_id
    return data.filter((eventItem: { user_id: any; }) => eventItem.user_id === userId);
}

export async function ProfileEventsRow({ profile }: any) {
    const events = await getEventsForUserId(profile.id);

    if (events.length === 0) {
        return null; // No events for the user, return null or show a message
    }

    return (
        <div className="flex space-x-2 w-full overflow-x-scroll scroll h-fit items-center scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent ">
            {events.map((event: { date: any; id: any; }) => {
                const inputDate = event.date;
                const Dates = reformatDate(inputDate);

                return <MinIEventCard key={event.id} Dates={Dates} event={event} />;
            })}
        </div>
    );
}

export default ProfileEventsRow;
