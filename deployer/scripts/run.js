/*
 * Deployment script for TwinnyKiku.sol
 *
 * Author: Twinny
 * Created: October 5th, 2022
 */

const { ethers, upgrades } = require("hardhat");

async function main() {
  const gas = { 'gasPrice': 50000 }
  const TwinnyKiku = await ethers.getContractFactory("TwinnyKiku");
  const instance = await TwinnyKiku.deploy("ruminate");
  console.log("SUPER! contract deployed to address:", instance.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error);
    process.exit(1);
  });