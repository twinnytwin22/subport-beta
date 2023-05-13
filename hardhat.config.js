require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-foundry");

const polygonVerifyKey = process.env.POLYGONSCAN_API;
const mumbaiApiKey = process.env.STAGING_ALCHEMY_KEY;
const maticApiKey = process.env.PROD_ALCHEMY_KEY;
const PK = process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
  },
  solidity: {
    version: "0.8.9",
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
