'use client'
import { create } from "ipfs-http-client";
export const uploadToIpfs = async (imageFile: any, audioFile: any) => {
    const projectId = process.env.NEXT_PUBLIC_INFURA_ID;
    const projectSecret = process.env.NEXT_PUBLIC_INFURA_SECRET;
    const auth =
      "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
    const ipfs =  create({
      timeout: "2m",
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });
  
    // Upload image file to IPFS
    const imageResult = await ipfs.add(imageFile);
    const imageUrl = `ipfs://${imageResult.path}`;
  
    // Upload audio file to IPFS
    const audioResult = await ipfs.add(audioFile);
    const audioUrl = `ipfs://${audioResult.path}`;
  
    return { image: imageUrl, audio: audioUrl };
  };
  