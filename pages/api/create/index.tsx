import { NextApiRequest, NextApiResponse } from "next";
import { deployContractS } from "lib/deployer";
import { getServerSession } from "next-auth/next";
import { createClient } from "@supabase/supabase-js";
import { create } from "ipfs-http-client";
import { Database } from "types/supabase";
import { writeFile } from "fs/promises";
import { getAuthOptions } from "../auth/[...nextauth]";
const supabaseUrl = "https://hlrcgzujgosmqgepcemj.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

const name = "Twinny Testing Vars";
const tokenName = "TTV";
const startDate = Math.round(Date.now() / 1000);
const endDate = 0;
const contractUri = "ipfs://testcontracturi";
const totalSupply = 500;

export default async function handler(req: any, res: NextApiResponse) {
  const authOptions = getAuthOptions();
  // Get the user ID from the authentication provider (NextAuth.js)
  const session = await getServerSession(authOptions);
  console.log(session, "session for req");

  if (req.method === "POST") {
    let ipfsHash = null; // Declare the ipfsHash variable outside the try-catch block

    try {
      // Get the form data from the request body
      const collectibleData = {
        ...req.body,
        userId: session?.id,
      };

      /// Upload Collection Data to IPFS
      try {
        ipfsHash = await uploadToIpfs(collectibleData);
        console.log("Upload successful! IPFS hash:", ipfsHash);

        // Add Collection to Supabase
        const { data: collectible, error } = await supabase
          .from("collectibles")
          .insert(collectibleData)
          .eq("userId", session?.id);

        if (error) {
          console.error(error);
          res
            .status(500)
            .json({ success: false, error: "Error inserting collectible" });
          return;
        }

        const wallet = session?.user?.wallet_address;
        console.log(wallet);

        // Deploy the contract using the form data
        const deployData = {
          name: collectibleData.name,
          tokenName: collectibleData.name,
          startDate: collectibleData.start_date,
          endDate: collectibleData.end_date,
          contractUri: ipfsHash,
          totalSupply: collectibleData.total_collectibles,
        };
        console.log(deployData, 'deployData')

        const contractAddress = await deployContractS({ deployData });
        // Return a JSON response with the contract address
        res.json({ success: true, contractAddress });
      } catch (error) {
        console.error("Error uploading to IPFS:", error);
        res
          .status(500)
          .json({ success: false, error: "Error uploading to IPFS" });
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
  const jsonData = { collectibleData };
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
