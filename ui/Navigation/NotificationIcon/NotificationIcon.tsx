'use client';
import { useAuthProvider } from 'app/context/auth';
import { supabaseAdmin } from 'lib/constants';
import { useHandleOutsideClick } from 'lib/hooks/handleOutsideClick';
import React, { useEffect, useState } from 'react';

function NotificationContainer({ notifications }: { notifications: string[] }) {
  return (
    <div className="notification z-0 bottom-16 md:bottom-10 absolute -mr-2 md:top-20 -mt-1 right-1 h-96 md:h-full min-h-[500px] w-72 text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-md dark:bg-black dark:border-zinc-800 dark:text-white opacity-[95%] ">
      <div className="relative h-full overflow-y-scroll">
        <div className="sticky top-0 left-0 right-0 dark:bg-black bg-white">
          <h1 className="text-center dark:text-zinc-100 text-zinc-800 py-2 ">
            Notifications
          </h1>
          <hr className="border-zinc-200 dark:border-zinc-800 border w-full " />
        </div>
        <ul className="overflow-y-auto p-4 space-y-2">
          {notifications.map((notification: any) => (
            <li key={notification.id} className="p-2">
              {/* Render each notification item */}
              <p className="text-sm">{notification?.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function NotificationIcon() {
  const { user } = useAuthProvider();
  const [notifications, setNotifications] = useState<any>(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpenMenu = () => {
    setOpen((prevState) => !prevState);
  };

  useHandleOutsideClick(isOpen, setOpen, 'notification');

  useEffect(() => {
    const getNotifications = async () => {
      let { data, error } = await supabaseAdmin
        .from('notifications')
        .select('*')
        .eq('user_id', user?.id);

      if (error) {
        throw error;
      }
      setNotifications(data);
    };
    getNotifications();
  }, []);

  // Calculate the notification count
  const notificationCount = notifications?.length || 0;

  return (
    <React.Fragment>
      <div className="relative w-8 notification" onClick={handleOpenMenu}>
        {/* Red bubble with notification count */}
        {notificationCount > 0 && (
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full text-xs">
            {notificationCount}
          </div>
        )}

        {/* The notification icon SVG */}
        <svg
          className="w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
      </div>
      {isOpen && <NotificationContainer notifications={notifications} />}
    </React.Fragment>
  );
}
