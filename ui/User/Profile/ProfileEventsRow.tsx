import { reformatDate } from 'lib/hooks/formatDate';
import MinIEventCard from 'ui/Cards/Events/MinIEventCard';
import { fetchAllEvents } from 'utils/use-server';

async function getEventsForUserId(userId: any) {
  const [events] = await Promise.all([fetchAllEvents()]);
  // Filter events based on the user_id
  return events.filter(
    (eventItem: { user_id: any }) => eventItem.user_id === userId
  );
}

export async function ProfileEventsRow({ profile }: any) {
  const events = await getEventsForUserId(profile.id);

  if (events.length === 0) {
    return null; // No events for the user, return null or show a message
  }

  return (
    <div className="flex space-x-2 w-full overflow-x-scroll  h-fit items-center scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent ">
      {events.map((event: { date: any; id: any }) => {
        const inputDate = event.date;
        const Dates = reformatDate(inputDate);

        return <MinIEventCard key={event.id} Dates={Dates} event={event} />;
      })}
    </div>
  );
}

export default ProfileEventsRow;
