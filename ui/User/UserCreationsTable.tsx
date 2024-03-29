'use client';
import { useAuthProvider } from 'app/context/auth';
import Link from 'next/link';
import { FaEdit, FaExternalLinkAlt } from 'react-icons/fa';
import UserCreationsTableMenu from './UserCreationsTableMenu';

function UserCreationsTable({ sortedData }: any) {
  const { user, profile } = useAuthProvider();
  const userData = sortedData.filter((item: any) => item?.user_id === user?.id); // Filter items related to the userId

  return (
    <table className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400 mx-auto max-w-5xl border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
      <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-400 rounded-t-md">
        <tr>
          <th scope="col" className="px-1 md:px-6 py-3">
            Title
          </th>
          <th scope="col" className="px-1 md:px-6 py-3">
            Type
          </th>
          <th scope="col" className="px-1 md:px-6 py-3">
            Date
          </th>
          <th scope="col" className="px-1 md:px-6 py-3 hidden md:inline-block">
            Link
          </th>
          <th scope="col" className="px-1 md:px-6 py-3 hidden md:inline-block">
            Edit
          </th>
          <th scope="col" className="px-1 md:px-6 py-3 block md:hidden">
            Options
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-zinc-900 rounded-b-md">
        {userData.map((item: any) => {
          const props = {};
          return (
            <tr
              key={item.slug}
              className="bg-white border-b dark:bg-zinc-900 dark:border-zinc-700"
            >
              <td className="px-1 md:px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
                {item.title}
              </td>
              <td className="px-1 md:px-6 py-4 justify-center mx-auto">
                {item.type === 'event' ? (
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-700 dark:text-purple-400 border border-purple-400">
                    Event
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-700 dark:text-green-400 border border-green-400">
                    Collectible
                  </span>
                )}
              </td>
              <td className="px-1 md:px-6 py-4">
                {new Date(item.created_at).toLocaleDateString()}
              </td>
              <td className="px-1 md:px-6 py-4 hidden md:inline-block text-lg scale-90">
                <Link
                  href={`${item.type === 'event'
                    ? `/events/${item.slug}`
                    : `/drop/${item.slug}`
                    }`}
                >
                  <FaExternalLinkAlt />
                </Link>
              </td>
              <td className="px-1 md:px-6 py-4 hidden md:inline-block ml-4 text-lg">
                <Link
                  href={`${item.type === 'event'
                    ? `/events/${item.slug}`
                    : `/drop/${item.slug}`
                    }`}
                >
                  <FaEdit />
                </Link>
              </td>
              <td className="px-1 md:px-6 py-3 block md:hidden relative">
                <div>
                  <UserCreationsTableMenu profile={profile} {...item} />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default UserCreationsTable;
