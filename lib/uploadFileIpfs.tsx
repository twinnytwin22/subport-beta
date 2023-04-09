import { create } from "ipfs-http-client";
import * as fs from 'fs';
export const uploadHashToIpfs = async (collectibleData: any) => {
    console.log(collectibleData, 'csd')
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
  
  
    // Upload json file to IPFS
    const jsonData = { collectibleData };
    const jsonContent = JSON.stringify(jsonData);
    fs.writeFile('contract.json', jsonContent, 'utf8', function (err) {
      if (err) {
        console.error(err);
        throw err;
      }
      console.log('Contract address saved to contract.json file');
    });
    // Upload audio file to IPFS
    const hashResult = await ipfs.add(jsonContent);
    const hashUrl = `ipfs://${hashResult.path}`;
    console.log(hashUrl, 'hashUrl')
    return { hash: hashUrl };
  }