"use client";

// import { ConnectToSubport } from "ui/Buttons/ConnectButton";
import { useAuthProvider } from "app/context/auth";
import { useRouter } from "next/navigation";

// Supabase auth needs to be triggered client-side
export default function LoginCard({ close }: any) {
  const { signInWithSpotify, signInWithGoogle, user } = useAuthProvider()

  return (
    <div className="relative z-[9999999px]">


      <div className="flex flex-col px-6 py-4 border-b rounded-t dark:border-zinc-600 relative min-w-full w-sm lg:w-full">
        <div className='cursor-pointer p-2 border dark:border-zinc-700 border-zinc-300 rounded text-sm w-24 text-center text-black dark:text-white bg-white dark:bg-black absolute right-5 top-3' onClick={() => close(false)}>Close</div>

        <h3 className="text-base font-semibold text-zinc-900 lg:text-xl dark:text-white">
          Sign in
        </h3>
      </div>
      <div className="p-6 w-full">
        <p className="text-sm font-normal text-zinc-600 dark:text-zinc-400">
          Connect with Spotify to login.
        </p>
        <ul className="my-4 space-y-3">

          <li onClick={signInWithSpotify}>
            <a
              href="#"
              className="flex items-center p-3 text-base font-bold text-zinc-900 rounded-md bg-zinc-50 hover:bg-zinc-100 group hover:shadow dark:bg-zinc-600 dark:hover:bg-zinc-600 dark:text-white"
            >
              <img className="w-5" src='/images/icons/spotify.png' />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Spotify
              </span>
            </a>
          </li>
          <li onClick={signInWithGoogle}>
            <div

              className="flex items-center p-3 text-base font-bold text-zinc-900 rounded-md bg-zinc-50 hover:bg-zinc-100 group hover:shadow dark:bg-zinc-600 dark:hover:bg-zinc-600 dark:text-white"
            >

              <img className="w-5" src="/images/icons/icons8-google-96.png" />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Google
              </span>
            </div>
          </li>
          {user &&
            <li>
              <a
                href="#"
                className="flex items-center p-3 text-base font-bold text-zinc-900 rounded-md bg-zinc-50 hover:bg-zinc-100 group hover:shadow dark:bg-zinc-600 dark:hover:bg-zinc-600 dark:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="h-5"
                  viewBox="0 0 512 512"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <radialGradient
                      cx="0%"
                      cy="50%"
                      fx="0%"
                      fy="50%"
                      r="100%"
                      id="radialGradient-1"
                    >
                      <stop stopColor="#5D9DF6" offset="0%"></stop>
                      <stop stopColor="#006FFF" offset="100%"></stop>
                    </radialGradient>
                  </defs>
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g id="logo">
                      <rect
                        id="base"
                        fill="url(#radialGradient-1)"
                        x="0"
                        y="0"
                        width="512"
                        height="512"
                        rx="256"
                      ></rect>
                      <path
                        d="M169.209772,184.531136 C217.142772,137.600733 294.857519,137.600733 342.790517,184.531136 L348.559331,190.179285 C350.955981,192.525805 350.955981,196.330266 348.559331,198.676787 L328.82537,217.99798 C327.627045,219.171241 325.684176,219.171241 324.485851,217.99798 L316.547278,210.225455 C283.10802,177.485633 228.89227,177.485633 195.453011,210.225455 L186.951456,218.549188 C185.75313,219.722448 183.810261,219.722448 182.611937,218.549188 L162.877976,199.227995 C160.481326,196.881474 160.481326,193.077013 162.877976,190.730493 L169.209772,184.531136 Z M383.602212,224.489406 L401.165475,241.685365 C403.562113,244.031874 403.562127,247.836312 401.165506,250.182837 L321.971538,327.721548 C319.574905,330.068086 315.689168,330.068112 313.292501,327.721609 C313.292491,327.721599 313.29248,327.721588 313.29247,327.721578 L257.08541,272.690097 C256.486248,272.103467 255.514813,272.103467 254.915651,272.690097 C254.915647,272.690101 254.915644,272.690105 254.91564,272.690108 L198.709777,327.721548 C196.313151,330.068092 192.427413,330.068131 190.030739,327.721634 C190.030725,327.72162 190.03071,327.721606 190.030695,327.721591 L110.834524,250.181849 C108.437875,247.835329 108.437875,244.030868 110.834524,241.684348 L128.397819,224.488418 C130.794468,222.141898 134.680206,222.141898 137.076856,224.488418 L193.284734,279.520668 C193.883897,280.107298 194.85533,280.107298 195.454493,279.520668 C195.454502,279.520659 195.45451,279.520651 195.454519,279.520644 L251.65958,224.488418 C254.056175,222.141844 257.941913,222.141756 260.338618,224.488222 C260.338651,224.488255 260.338684,224.488288 260.338717,224.488321 L316.546521,279.520644 C317.145683,280.107273 318.117118,280.107273 318.71628,279.520644 L374.923175,224.489406 C377.319825,222.142885 381.205562,222.142885 383.602212,224.489406 Z"
                        id="WalletConnect"
                        fill="#FFFFFF"
                        fillRule="nonzero"
                      ></path>
                    </g>
                  </g>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Email
                </span>
              </a>
            </li>}

        </ul>
        <div>
        </div>
      </div>


    </div>
  );
}


