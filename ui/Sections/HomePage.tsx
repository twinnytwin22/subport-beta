"use client";
import React from "react";
import AppStore from "ui/Cards/AppStore";
import CollectCard from "ui/Cards/CollectCard";

function HomePage() {
  return (
    <div className="h-screen w-full mx-auto mt-8 content-center">
      <div className="flex md:grid md:grid-cols-10 justify-center justify-items-center content-center gap-16 w-full max-w-screen">
        <div className="w-full hidden lg:block md:col-span-10 lg:col-span-4 bg-black">
          <h1 className="text-2xl mb-4">Home</h1>
          <AppStore />
        </div>

        <div
          className="flex flex-col space-y-10 md:col-span-10 lg:col-span-6 w-full justify-center content-center mx-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <CollectCard />
          <CollectCard />
          <CollectCard />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
