'use client'
import React from 'react';
import { useWalletClient } from 'wagmi'
import { ethers } from 'ethers';
import { sign } from 'jsonwebtoken';
import { getDefaultProvider } from '@ethersproject/providers';
import { ContractFactory } from '@ethersproject/contracts';
import { keccak256 } from '@ethersproject/keccak256';
import { Signer } from '@ethersproject/abstract-signer';


export async function DeployTest(data: any) {
  const { data: walletClient } = useWalletClient()
  const contractAddress = '0x148280a1395af6F430248c2E4B8063c69B7cA23E'
  const deployData = [
    walletClient,
    contractAddress,
    data.name,
    data.start_date,
    data.end_date,
    data.description,
    data.total_collectibles,
    data.ipfsHash,
    data.ownerAddress
  ]
  // const name = data.name
  // const tokenName = data.name
  // const endDate = data.end_date
  // const startDate = data.start_date
  // const contractUri = data?.ipfsHash || 'ipfs://testcontracturi';
  // const totalSupply = data.total_collectibles

  const name = data?.name || 'Twinny Testing Vars';
  const tokenName = 'TTV';
  const startDate = Math.round(Date.now() / 1000);
  const endDate = 0;
  const contractUri = 'ipfs://testcontracturi';
  const totalSupply = data?.total_collectibles || 500;

  console.log('Deploy Test:', data, 'Deploy Data from Test', deployData)
  return data
}