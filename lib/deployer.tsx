'use client'
import { useSigner }  from 'wagmi'
import { ethers } from 'ethers';
import { sign } from 'jsonwebtoken';
import { getDefaultProvider } from '@ethersproject/providers';
import { ContractFactory } from '@ethersproject/contracts';
import { keccak256 } from '@ethersproject/keccak256';
import { Signer } from '@ethersproject/abstract-signer';

export async function deployContractWithWagmi({contractName, contractArgs, network, abi, bytecode}: any) {
  // Get the signer from wagmi
  const signer = useSigner();
  if (signer) {
    throw new Error('Signer is not an AbstractSigner');
  }
  // Compute the contract deployment bytecode
  const contractFactory = new ethers.ContractFactory(abi, bytecode, signer);
  // Deploy the contract
  const contract = await contractFactory.deploy()
  // Retrieve the contract address
  const contractAddress = contract.contractAddress;
  console.log(`Contract deployed at address: ${contractAddress}`);

  // Create a contract instance
  const contractInstance = new ethers.Contract(contractAddress, abi);

  return contractInstance;
}


export async function deployTest(data: any){
  const contractAddress = '0x148280a1395af6F430248c2E4B8063c69B7cA23E'
  const deployData = [
    contractAddress,
    data.name,
    data.description,
    data.total_collectibles,
    data.ipfsHash, 
    data.ownerAddress
  ]
  console.log('Deploy Test:', data , 'Deploy Data from Test', deployData)
  return data
}