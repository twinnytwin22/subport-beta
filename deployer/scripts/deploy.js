/*
 * Deployment script for CribMusicVol1.sol
 *
 * Author: Twinny
 * Created: Feb. 3thO, 2023
 */

const { ethers, upgrades } = require("hardhat");

async function main() {
  const gas = { 'gasPrice': 50000 }
  const CRIBMusicV1  = await ethers.getContractFactory("CRIBMusicV1");
  const instance = await CRIBMusicV1 .deploy();
  console.log("CRIB Music Vo1 1! contract deployed to address:", instance.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error);
    process.exit(1);
  });