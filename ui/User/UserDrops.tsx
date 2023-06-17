import { fetchCollectibles } from "utils/database";
import React from "react";
import AppStore from "ui/Cards/AppStore";
import CollectCard from "ui/Cards/Collect/CollectCard";
import { readContractURIs, DropData } from "lib/hooks/readContractURIs";


async function UserDrops({ drops }: any) {
    try {
        const contractAddresses = drops?.map((drop: any) => drop.contractAddress);

        if (contractAddresses) {
            const metaData: any = await readContractURIs(contractAddresses).catch(console.error);

            const dropsWithMetaData: any = drops?.map((drop: any, index: any) => ({
                drop,
                metaData: metaData[index]?.metadata
            }));

            //      console.log('Drops with MetaData:', dropsWithMetaData);

            return dropsWithMetaData && (
                <div className="w-full mx-auto mt-8 mb-20 content-center my-8">
                    <div className="flex md:grid md:grid-cols-3 justify-center justify-items-center content-center gap-2.5 w-full mx-auto">


                        {dropsWithMetaData?.map(({ drop, metaData }: any) => (
                            <div key={drop?.id}>
                                <CollectCard drop={drop} metaData={metaData} />
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    } catch (error) {
        console.error('Error:', error);
    }

    return null;
}

export default UserDrops;
