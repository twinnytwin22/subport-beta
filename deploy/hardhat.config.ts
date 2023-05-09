import * as dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const polygonVerifyKey: any = process.env.POLYGONSCAN_API!;
const mumbaiApiKey: any = process.env.STAGING_ALCHEMY_KEY!;
const maticApiKey: any = process.env.PROD_ALCHEMY_KEY!;
const PK: any = process.env.PRIVATE_KEY!;

const config: HardhatUserConfig | any = {
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
      polygonMumbai: polygonVerifyKey,
      polygon: polygonVerifyKey,
    },
  },
  networks: {
    mumbai: {
      url: mumbaiApiKey,
      accounts: [PK],
    },
    matic: {
      chainId: 137,
      url: maticApiKey,
      accounts: [PK],
    },
  },
};
export default config;
