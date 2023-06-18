import subportMeta from '../../utils/subport.json';
import { publicClient } from 'lib/deployFunctions/deployer';

export interface DropData {
    info: any;
    metadata: any;
}

export async function readSingleContractURI(contractAddress: string) {
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
                info: contractURI[0],
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
