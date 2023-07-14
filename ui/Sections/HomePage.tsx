import { fetchCollectibles } from "utils/database";
import React from "react";
import AppStore from "ui/Cards/AppStore";
import CollectCard from "ui/Cards/Collect/CollectCard";
import { readContractURIs, DropData } from "lib/hooks/readContractURIs";


async function HomePage() {
  try {

    const drops = await fetchCollectibles();
    const contractAddresses = drops?.map(drop => drop.contract_address);

    if (contractAddresses) {
      const metaData: any = await readContractURIs(contractAddresses).catch(console.error);

      const dropsWithMetaData: any = drops?.map((drop, index) => ({
        drop,
        metaData: metaData[index]?.metadata
      }));

      //      console.log('Drops with MetaData:', dropsWithMetaData);

      return dropsWithMetaData && (
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
              {dropsWithMetaData?.map(({ drop, metaData }: any) => (
                <div key={drop?.id}>
                  <CollectCard drop={drop} metaData={metaData} />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  } catch (error) {
    console.error('Error:', error);
  }

  return null;
}

export default HomePage;
