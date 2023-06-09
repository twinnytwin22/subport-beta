import Link from "next/link";
import React from "react";

const HeartIcon = () => {
  return (
    <>
      <svg
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
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        ></path>
      </svg>
    </>
  );
};

const CommentIcon = () => {
  return (
    <>
      <svg
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
          d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        ></path>
      </svg>
    </>
  );
};

const CollectIcon = () => {
  return (
    <>
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
        />
      </svg>
    </>
  );
};

const MenuDots = () => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  );
};

function CollectCard({ drop }: any) {
  return (
    <div className="flex flex-col static mx-auto w-full content-center justify-center">
      <div className="max-w-lg mx-auto bg-white border border-zinc-200 rounded-lg dark:bg-zinc-900 dark:border-zinc-700 pt-3 shadow-xl shadow-zinc-200 dark:shadow-zinc-900">
        <div className="flex h-8 mb-2 justify-between items-center">
          <div className="block">
            <p className="text-[10px] pl-3">Created by</p>
            <Link href="/user">
              <p className="font-bold text-sm pl-3">@djtwinnytwin</p>
            </Link>
          </div>
          <div className="flex h-8 pr-3 hover:scale-110">
            <MenuDots />
          </div>
        </div>
        <a href="#">
          <img className="" src="/gravitron.png" alt="" />
        </a>
        <div className="p-5 text-zinc-900 dark:text-white">
          <a href="#">
            <h5 className="mb-2 text-lg font-bold tracking-tight ">
              Gravitrion
            </h5>
          </a>
          <div className="flex justify-between items-center mb-2">
            <div className="grid grid-cols-3 max-h-6 max-w-xs">
              <div className="flex h-6 hover:scale-105 space-x-2">
                45
                <HeartIcon />
              </div>
              <div className="flex h-6 hover:scale-105 space-x-2">
                8<CommentIcon />
              </div>
              <div className="flex h-6 hover:scale-105 space-x-2">
                111
                <CollectIcon />
              </div>
            </div>
            <Link
              href="/nft/song"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Collect
            </Link>
          </div>
          <p className="text-xs">Collected by You & 67 more</p>
        </div>
      </div>
    </div>
  );
}

export default CollectCard;
