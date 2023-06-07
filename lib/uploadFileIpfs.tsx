'use client'
import { promises as fs } from 'fs';
import { create } from "ipfs-http-client";


export const uploadHashToIpfs = async ({ collectibleData }: any) => {

  try {
    // Upload json file to IPFS
    const projectId = process.env.NEXT_PUBLIC_INFURA_ID;
    const projectSecret = process.env.NEXT_PUBLIC_INFURA_SECRET;
    const auth =
      "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
    const ipfs = create({
      timeout: "2m",
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });

    // Upload json file to IPFS
    const jsonData = collectibleData;
    const jsonContent = JSON.stringify(jsonData);
    console.log(jsonData, 'jd', jsonContent, 'jc');
    try {
      const response = await fetch('/api/createContractMeta', {
        method: 'POST',
        body: JSON.stringify({ name, jsonContent }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log(`metadata was successfully saved to ${name}-metadata.json file`);
      } else {
        console.error('Failed to create the file.');
      }
    } catch (error) {
      console.error(error);

    }

  } catch (err) {
    console.error(err);
  }
};
