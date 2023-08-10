import { storage } from "lib/providers/thirdweb/thirdweb";
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
