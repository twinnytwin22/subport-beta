'use client'
import { IpfsUploader, StorageDownloader, ThirdwebStorage } from "@thirdweb-dev/storage";
const gatewayUrls = [
  "https://subport.infura-ipfs.io/ipfs/",
  "https://ipfs.thirdwebcdn.com/ipfs/",
  "https://gateway.ipfscdn.io/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/",
  "https://ipfs.io/ipfs/",
]

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID
const secretKey = process.env.THIRDWEB_SECRET_KEY!
const uploader = new IpfsUploader();
const storage = new ThirdwebStorage({ uploader, gatewayUrls, clientId, secretKey });

export async function uploadHashToIpfs({ data }: any) {
  const uri = await storage.upload(data)
  if (uri) {
    return uri
  }
};

export const uploadToIpfs = async (deployData: any) => {
  const uri = await storage.upload(deployData)
  if (uri) {
    return uri
  }
};

export async function uploadToAudio(audioFile: any) {
  const uri = await storage.upload(audioFile)
  if (uri) {
    return uri
  }
};

export async function uploadToMedia(imageFile: any) {
  const uri = await storage.upload(imageFile)
  if (uri) {
    return uri
  }
};

export const uploadContractMediaToIpfs = async (imageFile: any, audioFile: any) => {  // Upload image file to IPF
  const imageResult = await uploadToMedia(imageFile)
  // Upload audio file to IPFS
  const audioResult = await uploadToAudio(audioFile)
  return { image: imageResult, audio: audioResult }
};
