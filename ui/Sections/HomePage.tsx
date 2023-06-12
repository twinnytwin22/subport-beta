import { fetchCollectibles } from "lib/hooks/functions";
import React from "react";
import AppStore from "ui/Cards/AppStore";
import CollectCard from "ui/Cards/CollectCard";
import { readContractURIs } from "lib/hooks/readContractURIs";

async function HomePage() {
  const drops = await fetchCollectibles();
  let metaData = null
  let dropData = null
  try {
    const contractAddresses = drops?.map(drop => drop.contractAddress);
    if (contractAddresses) {
      // Reading URIs
      const res = await readContractURIs(contractAddresses).catch(console.error);
      metaData = res

      console.log(metaData, 'transformed meta')
    }
  } catch (error) {
    console.error('Error:', error);
  }

  return (
    <div className="w-full mx-auto mt-8 content-center">
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
          {drops?.map((drop: any, metaData: any) => (
            <div key={drop?.id}>
              <CollectCard drop={drop} metaData={metaData} /></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
