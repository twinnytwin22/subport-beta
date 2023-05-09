const hre = require("hardhat");

const name = 'Twinny Testing Vars';
const tokenName = 'TTV';
const startDate = Math.round(Date.now() / 1000);
const endDate = 0;
const contractUri = 'ipfs://testcontracturi';
const totalSupply = 500;

async function main({name, tokenName, startDate, endDate, contractUri, totalSupply}) {

  // assume you have these variables after uploading to IPFS and deploying the contract
  const Contract = await hre.ethers.getContractFactory('SBPRT721');
  const contract = await Contract.deploy(name, tokenName, startDate, endDate, contractUri, totalSupply);
  await contract.deployed();

  console.log('SBPRT721 deployed to:', contract.address, 'with start date of:', startDate);
  // Wait for 1 minute before running verification
  console.log('Waiting for 1 minute before verifying contract...');
  await new Promise(resolve => setTimeout(resolve, 30000)); // 1 minute delay
 
  const contractAbi = Contract.interface.format('json');

  // verify the contract on Etherscan
  const verification = await hre.run('verify:verify',{
    network: 'mumbai',
    apiKey: process.env.POLYGONSCAN_API,
    address: contract.address,
    abi: contractAbi,
    constructorArguments: [name, tokenName, startDate, endDate, contractUri, totalSupply],
  });
    {verification && console.log('contract verified')};
}
const runDeploy = async ({name, tokenName, startDate, endDate, contractUri, totalSupply}) => {
  try {
    await main({name, tokenName, startDate, endDate, contractUri, totalSupply});
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runDeploy({name, tokenName, startDate, endDate, contractUri, totalSupply});

module.exports = { runDeploy };


