import { NextApiRequest, NextApiResponse } from "next";
import { deployContractViem } from "lib/deployer";
import { createClient } from "@supabase/supabase-js";
import { create } from "ipfs-http-client";
import { Database } from "types/supabase";
import { writeFile } from "fs/promises";

const supabaseUrl = "https://hlrcgzujgosmqgepcemj.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default async function handler(req: any, res: NextApiResponse) {
  // Get the user ID from the authentication provider (NextAuth.js)
  if (req.method === "POST") {
    let ipfsHash = null; // Declare the ipfsHash variable outside the try-catch block

    try {
      // Get the form data from the request body
      const collectibleData = {
        ...req.body,
      };
      console.log(collectibleData, 'CData')
      /// Upload Collection Data to IPFS
      try {
        ipfsHash = await uploadToIpfs({ collectibleData });
        console.log("Upload successful! IPFS hash:", ipfsHash);

        const wallet = collectibleData.address;
        console.log(wallet);

        // Deploy the contract using the form data
        const deployData = {
          name: collectibleData?.name,
          tokenName: collectibleData?.name,
          startDate: collectibleData?.start_date,
          endDate: collectibleData.end_date,
          contractUri: ipfsHash,
          totalSupply: collectibleData?.total_collectibles,
        };
        res.json({ message: 'deploying...', deployData })

        const contractAddress = await deployContractViem({ deployData });

        // Add Collection to Supabase
        const { data: collectible, error } = await supabase
          .from("drops")
          .insert([
            { userId: collectibleData?.id },
            { contractAddress: contractAddress }
          ])
          .eq("userId", collectibleData?.id);

        if (error) {
          console.error(error);
          res
            .status(500)
            .json({ success: false, error: "Error inserting collectible" });
          return;
        }

        // Return a JSON response with the contract address
        res.json({ success: true, contractAddress, collectible });
      } catch (error) {
        console.error("Error deploying:", error);
        res
          .status(500)
          .json({ success: false, error: "Error deploying" });
        return;
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, error: "Error creating collectible" });
    }
  } else {
    res.status(404).json({ success: false, error: "Endpoint not found" });
  }
}

const uploadToIpfs = async ({ collectibleData }: any) => {
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
  await writeFile(
    `/tmp/${collectibleData.name}-metadata.json`,
    jsonContent,
    "utf8"
  );
  console.log(
    `metadata was successfully saved to ${collectibleData.name}-metadata.json file`
  );

  // Upload audio file to IPFS
  const hashResult = await ipfs.add(jsonContent);
  console.log(hashResult, "hrs");
  const hashUrl = `ipfs://${hashResult.path}`;
  console.log(hashUrl, "hashUrl");
  return { ipfsHash: hashUrl };
};