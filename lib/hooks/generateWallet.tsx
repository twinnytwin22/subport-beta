import { ethers } from "ethers";

export async function generateWallet() {
    const wallet = ethers.Wallet.createRandom();
    return wallet;
  }