import subportMeta from '../../utils/subport.json';
import { publicClient } from 'lib/deployFunctions/deployer';

export async function readContractURIs(contractAddresses: any) {
    try {
        const client = publicClient;
        const contractURICalls = contractAddresses.map((address: any) => {
            return {
                address,
                abi: subportMeta.abi,
                functionName: 'contractURI',
            };
        });
        const contractURIs = await client.multicall({ contracts: contractURICalls, allowFailure: false });
        console.log('Contract URIs:');
        contractURIs.forEach((uri, i) => {
            console.log(`Contract ${i + 1}: ${uri}`);
        });
        return contractURIs;
    } catch (error) {
        console.error('Error reading contract URIs:', error);
        throw error;
    }
}
