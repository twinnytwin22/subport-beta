"use client";

import { useStore } from "@/lib/providers/swiper/swiperStore";
import { motion } from "framer-motion";
import {
  A11y,
  Navigation,
  Pagination,
  Scrollbar,
  Swiper,
  SwiperSlide,
} from "lib/providers/swiper/swiper";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheck, FaHandFist, FaLocationPin, FaXmark } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function ProfileCard({ profile, index }: any) {
  const { likeProfile, dislikeProfile }: any = useStore();
  const [isSwiperActive, setIsSwiperActive] = useState(false); // Track if Swiper is being used
  const [swipeDirection, setSwipeDirection] = useState<null | string>(null); // Track swipe direction
  const router = useRouter()
  const path = usePathname()
  const handleDrag = (e: any, info: any) => {
    if (info.offset.x > 100) {
      setSwipeDirection("right");
    } else if (info.offset.x < -100) {
      setSwipeDirection("left");
    } else {
      setSwipeDirection(null); // Reset if not swiping far enough
    }
  };

  const handleSwipe = (info: any) => {
    if (info.offset.x > 150) {
      likeProfile(profile); // Swipe right for like
    } else if (info.offset.x < -150) {
      dislikeProfile(profile); // Swipe left for dislike
    }
    setTimeout(() => setSwipeDirection(null), 500); // Reset overlay after animation
  };

  return (
    <motion.div
      className="absolute z-0 bg-white dark:bg-zinc-950 text-black shadow-lg rounded-xl flex flex-col justify-center items-center border border-zinc-300 dark:border-zinc-800 max-w-sm md:max-w-md w-full"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      drag={!isSwiperActive} // Disable card drag if Swiper is active
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDrag={handleDrag} // Track drag movement
      onDragEnd={(e, info) => handleSwipe(info)} // Handle swipe on drag end
      style={{ zIndex: 10 - index }} // Ensure top profile is above the others
    >
      {/* Overlay for swiping */}
      {swipeDirection && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          className={`absolute z-10 inset-0 flex items-center justify-center rounded-xl ${
            swipeDirection === "right" ? "bg-blue-600" : "bg-black"
          }`}
        >
          <h1 className="text-7xl font-bold text-white scale-150">
            {swipeDirection === "right" ? <FaCheck /> : <FaXmark />}
          </h1>
        </motion.div>
      )}

      <div className="w-full relative min-w-full h-full top-0">
        {/* <div className="flex justify-between items-center p-3">
          <div>
            <FaGear className="text-black dark:text-white" />
          </div>
          <div>
            <FaMessage className="text-black dark:text-white" />
          </div>
        </div> */}
        <div className="relative aspect-square object-cover min-w-full">
          <Swiper
            className="max-w-sm md:max-w-md min-w-full rounded-t-xl"
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            onTouchStart={() => setIsSwiperActive(true)} // Activate Swiper interaction
            onTouchEnd={() => setIsSwiperActive(false)} // Deactivate Swiper interaction
          >
            {profile.images.map((image: string, index: number) => (
              <SwiperSlide key={index} className="object-cover aspect-square min-w-full">
                <Image
                 onClick={() => router.push(location + '/' + profile?.username)}
                  priority={false}
                  width={500}
                  height={500}
                  className="min-w-full aspect-square object-cover"
                  src={image}
                  style={{ objectFit: "cover" }}
                  alt="Song-cover"
                  placeholder="blur"
                  blurDataURL={"/images/stock/blur.png"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="w-full p-4">
        <h2 className="text-lg font-bold text-left w-full relative items-center flex text-black dark:text-white">
          {profile.display_name}
          <span className="text-xs hidden"> @{profile.username}</span>
        </h2>
        <h3 className="text-black dark:text-white text-left flex w-full">
          <FaLocationPin className="font-sm" /> {`${profile.city}, ${profile.country}`}
        </h3>

        <div className="text-left w-full">
          {profile.genres.map((genre: string, index: number) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-bold me-2 px-2.5 py-0.5 rounded dark:bg-blue-950 dark:text-blue-100 relative mx-auto"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
      <br />
      <div className="flex items-center justify-between w-full p-4 pb-8 relative">
  <div
    onClick={() => dislikeProfile(profile)}
    className="rounded-full border border-black dark:bg-zinc-200 px-4  w-24 h-24 flex items-center justify-center"
  >
    <FaXmark className="text-black font-extrabold  text-3xl" />
  </div>
  <div
    onClick={() => likeProfile(profile)}
    className="rounded-full border border-black bg-blue-500 px-2 w-24 h-24 flex items-center justify-center"
  >
    <FaCheck className="text-white font-extrabold  text-3xl" />
  </div>
  <div
    className="rounded-full border border-black bg-blue-800 px-2 w-24 h-24 flex items-center justify-center"
  >
    <FaHandFist className="text-white font-extrabold  text-3xl" />
  </div>
</div>

    </motion.div>
  );
}

export default ProfileCard;
