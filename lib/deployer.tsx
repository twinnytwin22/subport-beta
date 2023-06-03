import { ethers } from 'ethers';
import subportMeta from '../utils/subport.json';

const bytecode = subportMeta.bytecode;
const abi = subportMeta.abi;

const name = 'Twinny Testing Vars';
const tokenName = 'TTV';
const startDate = Math.round(Date.now() / 1000);
const endDate = 0;
const contractUri = 'ipfs://testcontracturi';
const totalSupply = 500;
// const totalSupply = data?.total_collectibles || 500;
const args = [name, tokenName, startDate, endDate, contractUri]

export async function deployContractS({ deployData }: any) {
  console.log(deployData)

  if (!abi) {
    throw new Error('Wallet client is not available');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum as any);

  // Get the signer
  const signer = provider.getSigner();

  console.log('signer:', signer, 'abi:', abi, 'bytecode:', bytecode);

  if (!(signer instanceof ethers.providers.JsonRpcSigner)) {
    throw new Error('Signer is not an AbstractSigner');
  } else {
    // Compute the contract deployment bytecode
    const contractFactory = new ethers.ContractFactory(abi, bytecode, signer);

    console.log(contractFactory, 'cf')
    // Deploy the contract
    const contract = await contractFactory.deploy(name, tokenName, startDate, endDate, contractUri, totalSupply);
    // Retrieve the contract address
    const contractAddress = contract.address;
    console.log(`Contract deployed at address: ${contractAddress}`);

    // Create a contract instance
    const contractInstance = new ethers.Contract(contractAddress, abi, signer);

    return contractInstance;
  }
}
