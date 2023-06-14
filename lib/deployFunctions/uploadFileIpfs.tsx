'use client'

const Auth = Buffer.from(
  process.env.INFURA_API_KEY + ":" + process.env.INFURA_API_KEY_SECRET,
).toString("base64");

import { ThirdwebStorage } from "@thirdweb-dev/storage";
const storage = new ThirdwebStorage({
  gatewayUrls: [
    "https://subport.infura-ipfs.io/ipfs/",
    "https://ipfs.thirdwebcdn.com/ipfs/",
    "https://gateway.ipfscdn.io/ipfs/",
    "https://cloudflare-ipfs.com/ipfs/",
    "https://ipfs.io/ipfs/",
  ], 
  
});

export async function uploadHashToIpfs({ data }: any) {
  const uri = await storage.upload(data)
  if (uri) {
    console.log(data)
    return uri
  }
};

export async function uploadToIpfs(deployData: any) {
  const uri = await storage.upload(deployData)
  if (uri) {
    console.log(deployData)
    return uri
  }
};

export async function uploadToAudio(audioFile: any) {
  const uri = await storage.upload(audioFile)
  if (uri) {
    console.log(audioFile)
    return uri
  }
};

export async function uploadToMedia(imageFile: any) {
  const uri = await storage.upload(imageFile)
  if (uri) {
    console.log(imageFile)
    return uri
  }
};

export const uploadContractMediaToIpfs = async (imageFile: any, audioFile: any) => {
  console.log(imageFile, audioFile, "ia upipfs");
  // Upload image file to IPF
  const imageResult = await uploadToMedia(imageFile)
  // Upload audio file to IPFS
  const audioResult = await uploadToAudio(audioFile)
  return { image: imageResult, audio: audioResult }
};
