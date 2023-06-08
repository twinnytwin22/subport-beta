'use client'
import { ThirdwebStorage } from "@thirdweb-dev/storage";
const storage = new ThirdwebStorage();



export async function uploadHashToIpfs(deployData: any) {
  const uri = await storage.upload(deployData)
  if (uri) {
    console.log(deployData)
    return uri
  }
}

export async function uploadToIpfs(deployData: any) {
  const uri = await storage.upload(deployData)
  if (uri) {
    console.log(deployData)
    return uri
  }
}


export async function uploadToAudio(audioFile: any) {
  const uri = await storage.upload(audioFile)
  if (uri) {
    console.log(audioFile)
    return uri
  }
}


export async function uploadToMedia(imageFile: any) {
  const uri = await storage.upload(imageFile)
  if (uri) {
    console.log(imageFile)
    return uri
  }
}

export const uploadContractMediaToIpfs = async (imageFile: any, audioFile: any) => {
  console.log(imageFile, audioFile, "ia upipfs");
  // Upload image file to IPF
  const imageResult = await uploadToMedia(imageFile)
  // Upload audio file to IPFS
  const audioResult = await uploadToAudio(audioFile)
  return { image: imageResult, audio: audioResult }
};
;