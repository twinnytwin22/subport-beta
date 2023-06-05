import { outputFile, readFile } from "fs-extra";
import fs from 'fs-extra'
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
    try {
      // Upload json file to IPFS
      const jsonData = collectibleData;
      const jsonContent = JSON.stringify(jsonData);
      const file = `/tmp/${collectibleData.name}-metadata.json`
      await outputFile(
        file,
        jsonContent,
      );
      const data = await fs.readFile(file, 'utf8')
      console.log(
        `metadata was successfully saved to ${collectibleData.name}-metadata.json file`
      );
      try {
        // Upload audio file to IPFS
        const hashResult = await ipfs.add(data);
        console.log(hashResult, "hrs");
        const hashUrl = `ipfs://${hashResult.path}`;
        console.log(hashUrl, "hashUrl");
        return { ipfsHash: hashUrl };
      } catch (err) {
        console.error(err)
      }

    } catch (err) {
      console.error(err)
    }

  } catch (err) {
    console.error(err)
  }
};