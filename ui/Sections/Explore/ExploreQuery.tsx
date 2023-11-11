import { useQuery } from '@tanstack/react-query';

// Define a fetch function to get events

// Use the useQuery hook to fetch and cache events
const EventsQuery = (fetchEvents: any) => {
  return useQuery({queryKey:['events', fetchEvents]});
};

export default EventsQuery;
