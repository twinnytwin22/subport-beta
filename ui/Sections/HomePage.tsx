import React from "react";
import AppStore from "ui/Cards/AppStore";
import CollectCard from "ui/Cards/Collect/CollectCard";


async function HomePage({ drops }: any) {

  return drops && (
    <div className="w-full mx-auto mt-8 mb-20 content-center my-8">
      <div className="flex md:grid md:grid-cols-10 justify-center justify-items-center content-center gap-16 w-full mx-auto">
        <div className="w-full hidden xl:block md:col-span-10 lg:col-span-4 relative">
          <div className="fixed max-w-md mx-auto justify-center ml-16">
            <h1 className="text-2xl mb-4">Home</h1>
            <AppStore />
          </div>
        </div>

        <div
          className="flex flex-col space-y-10 md:col-span-10 xl:col-span-6 w-full justify-center content-center mx-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {drops?.slice(0, 3).map(({ drop, metaData }: any) => (
            <div key={drop?.id}>
              <CollectCard drop={drop} metaData={metaData} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );


}

export default HomePage;
