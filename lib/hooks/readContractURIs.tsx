import subportMeta from '../../utils/subport.json';
import { publicClient } from 'lib/deployFunctions/deployer';


export interface DropData {
    info: any;
    metadata: any;
}

export async function readContractURIs(contractAddresses: any) {
    const fallbackUrls = [
        "https://subport.infura-ipfs.io/ipfs/",
        "https://gateway.ipfscdn.io/ipfs/",
        "https://cloudflare-ipfs.com/ipfs/",
        "https://ipfs.io/ipfs/"
    ];

    try {
        const client = publicClient;
        const contractURICalls = contractAddresses.map((address: any) => {
            return {
                address,
                abi: subportMeta.abi,
                functionName: 'contractURI',
            };
        });
        const contractURIs = await client.multicall({
            contracts: contractURICalls,
            allowFailure: false,
        });

        const httpUrls = await Promise.all(contractURIs.map(async (ipfsUrl: any) => {
            const ipfsHash = ipfsUrl.replace('ipfs://', '');
            for (const fallbackUrl of fallbackUrls) {
                const url = fallbackUrl + ipfsHash;
                try {
                    const response = await fetch(url);
                    if (response.ok) {
                        return url;
                    }
                } catch (error) {
                    console.error(`Error fetching data from ${url}:`, error);
                }
            }
            throw new Error(`All fallback URLs failed for IPFS hash ${ipfsHash}`);
        }));

        //  console.log('Contract HTTP URLs:');
        //   httpUrls.forEach((url, i) => {
        //      console.log(`Contract ${i + 1}: ${url}`);
        //  });

        const contractJsonDataPromises = httpUrls.map(async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Fetch failed');
                }
                const jsonData = await response.json();
                return jsonData;
            } catch (error) {
                console.error(`Error fetching data from ${url}:`, error);
                // Fallback logic here, e.g., retry with a different URL or provide default data
                return {}; // Return default data or handle the fallback case accordingly
            }
        });

        const contractJsonData = await Promise.all(contractJsonDataPromises);

        // console.log('Contract JSON Data:');
        // contractJsonData.forEach((data, i) => {
        //     console.log(`Contract ${i + 1}:`, data);
        //  });

        const coupledData: DropData[] = contractURIs.map((uri, i) => ({
            info: uri,
            metadata: contractJsonData[i],
        }));

        return coupledData;
    } catch (error) {
        console.error('Error reading contract URIs:', error);
        throw error;
    }
}
