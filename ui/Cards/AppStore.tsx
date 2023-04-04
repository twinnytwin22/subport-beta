import React from "react";

function AppStore() {
  return (
    <div>
      <div className="w-md block p-2 text-center bg-white border border-zinc-200 rounded-lg shadow sm:p-6 dark:bg-zinc-900 dark:border-zinc-700">
        <h5 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">
          Coming Soon to App Stores
        </h5>
        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
          <a
            href="#"
            className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 focus:ring-4 focus:outline-none focus:ring-zinc-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:focus:ring-zinc-700"
          >
            <svg
              className="mr-3 w-5 h-5"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="apple"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
              ></path>
            </svg>
            <div className="text-left">
              <div className="mb-1 text-[10px]">Download on the</div>
              <div className="-mt-1 font-sans text-xs font-semibold">
                iOs App Store
              </div>
            </div>
          </a>
          <a
            href="#"
            className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 focus:ring-4 focus:outline-none focus:ring-zinc-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:focus:ring-zinc-700"
          >
            <svg
              className="mr-3 w-5 h-5"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google-play"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
              ></path>
            </svg>
            <div className="text-left">
              <div className="mb-1 text-[10px]">Get in on</div>
              <div className="-mt-1 font-sans text-xs font-semibold">
                Google Play
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AppStore;
