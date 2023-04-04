'use client'
import { useSigner }  from 'wagmi'
import { ethers } from 'ethers';
import { sign } from 'jsonwebtoken';
const { getDefaultProvider } = require('@ethersproject/providers');
const { ContractFactory } = require('@ethersproject/contracts');
const { keccak256 } = require('@ethersproject/keccak256');
const { Signer } = require('@ethersproject/abstract-signer');

export async function deployContractWithWagmi({contractName, contractArgs, network, abi, bytecode}: any) {
  // Initialize the provider
  const provider = network ? new ethers.providers.JsonRpcProvider(network) : getDefaultProvider();
  // Get the signer from wagmi
  const signer = useSigner();
  if (!Signer(signer)) {
    throw new Error('Signer is not an AbstractSigner');
  }
  // Compute the contract deployment bytecode
  const contractFactory = new ethers.ContractFactory(abi, bytecode, signer ? signer : provider);
  // Deploy the contract
  const contract = await contractFactory.deploy()
  // Retrieve the contract address
  const contractAddress = contract.contractAddress;
  console.log(`Contract deployed at address: ${contractAddress}`);

  // Create a contract instance
  const contractInstance = new ethers.Contract(contractAddress, abi);

  return contractInstance;
}


export async function deployTest({name, description}:any){
  const contractAddress = '0x148280a1395af6F430248c2E4B8063c69B7cA23E'
  const data = [
    contractAddress,
    name,
    description
  ]
  console.log('Name:', name, 'Description:', description)
  console.log('Deploy Test:',data)
  return data
}