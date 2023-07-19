import { cache } from 'react';
import subportMeta from '../../utils/subport.json';
import { publicClient } from './readContractURIs';

export interface DropData {
    info: any;
    metadata: any;
}

export const readSingleContractURI = cache(async (contractAddress: string) => {
    console.log(contractAddress, "CONTRACT_ADDRESS_READ")
    if (contractAddress) {

        const fallbackUrls = [
            "https://subport.infura-ipfs.io/ipfs/",
            "https://gateway.ipfscdn.io/ipfs/",
            "https://cloudflare-ipfs.com/ipfs/",
            "https://ipfs.io/ipfs/"
        ];

        try {
            const client = publicClient;

            const contractURI: any = await client.readContract({
                address: contractAddress as any,
                abi: subportMeta.abi,
                functionName: 'contractURI',
            });

            //  console.log(contractURI, 'URI FROM SINGLE READ')

            const ipfsUrl = contractURI.replace('ipfs://', '');
            let httpUrl: string | null = null;

            for (const fallbackUrl of fallbackUrls) {
                const url = fallbackUrl + ipfsUrl;
                try {
                    const response = await fetch(url);
                    if (response.ok) {
                        httpUrl = url;
                        break;
                    }
                } catch (error) {
                    console.error(`Error fetching data from ${url}:`, error);
                }
            }

            if (httpUrl === null) {
                throw new Error(`All fallback URLs failed for IPFS hash ${ipfsUrl}`);
            }

            //    console.log('Contract HTTP URL:', httpUrl);

            try {
                const response = await fetch(httpUrl);
                if (!response.ok) {
                    throw new Error('Fetch failed');
                }
                const jsonData = await response.json();

                //  console.log('Contract JSON Data:', jsonData);

                const coupledData: DropData = {
                    info: contractURI,
                    metadata: jsonData,
                };

                return coupledData;
            } catch (error) {
                console.error(`Error fetching data from ${httpUrl}:`, error);
                // Fallback logic here, e.g., retry with a different URL or provide default data
                return {}; // Return default data or handle the fallback case accordingly
            }
        } catch (error) {
            console.error('Error reading contract URI:', error);
            throw error;
        }
    }
}
)
