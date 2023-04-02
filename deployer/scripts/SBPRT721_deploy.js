const fse = require('fs-extra')
const { ethers, upgrades } = require("hardhat");

async function main() {
  // assume you have these variables after uploading to IPFS and deploying the contract

  // write the object to a JSON file

  const provider = new ethers.providers.JsonRpcProvider(); // Replace with your provider URL if needed

  const Contract = await ethers.getContractFactory('SBPRT721');
  const contract = await Contract.deploy();
  await contract.deployed();

  console.log('SBPRT721 deployed to:', contract.address);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
