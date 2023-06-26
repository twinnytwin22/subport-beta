import React from "react";
import { readContractURIs, DropData } from "lib/hooks/readContractURIs";
import Views from "./Views";


async function ProfileContent({ drops, currentProfile }: any) {
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
                    <Views drops={dropsWithMetaData} currentProfile={currentProfile} />
                </div>
            );
        }
    } catch (error) {
        console.error('Error:', error);
    }

    return null;
}

export default ProfileContent;
