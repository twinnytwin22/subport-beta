
import * as dotenv from 'dotenv'
dotenv.config()
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";

const config: HardhatUserConfig = {
  paths: {
		sources: "./contracts",
		artifacts: "./artifacts",
	  },
  solidity: {
    version: "0.8.9",
    settings: {
        optimizer: {
            enabled: true,
            runs: 2000, 
            details: {
              yul: true,
              yulDetails: {
                stackAllocation: true,
                optimizerSteps: "dhfoDgvulfnTUtnIf",
              },
        },
      },
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API! as any,
      polygon: process.env.POLYGONSCAN_API! as any,
       
    },
  },
  networks: {
    mumbai: {
      url: process.env.STAGING_ALCHEMY_KEY as any,
      accounts: [process.env.PRIVATE_KEY!] as any,
    },
    matic: {
      chainId: 137,
      url: process.env.PROD_ALCHEMY_KEY as any,
      accounts: [process.env.PRIVATE_KEY!] as any,
    },
    mainnet: {
      chainId: 1,
      url: process.env.PROD_ALCHEMY_KEY as any,
      accounts: [process.env.PRIVATE_KEY!] as any,
    },
  },
};
export default config;
