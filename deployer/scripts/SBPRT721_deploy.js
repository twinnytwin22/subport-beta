const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const name = "Always";
  const tokenName = "ALWAYS";
  const startDate = 0; // Provide the desired start date value
  const endDate = 0; // Provide the desired end date value
  const contractUri = "ipfs://Qmc4EVqGs6WBiwvt1goc3G6HxJ1Bpcmn4YGeyhtA7GGADa/0";
  const tokenHash = "QmWHQVs9EuuK8aeTWdX2Ss3sCxGKizu6cbEPyZqT16EpXz/0";
  const totalSupply = 500; // Provide the desired total supply value

  const TokenContract = await ethers.getContractFactory("SBPRT721");
  const token = await TokenContract.deploy(
    name,
    tokenName,
    startDate,
    endDate,
    contractUri,
    tokenHash,
    totalSupply
  );

  console.log("Token address:", token.address);

  // Wait for 30 seconds to ensure bytecode is available
  console.log("Waiting for bytecode to be available...");
  await new Promise((resolve) => setTimeout(resolve, 30000));
  console.log("Bytecode is available!");

  // Verify the contract
  await token.deployed();
  console.log("Verifying contract...");
  await hre.run("verify:verify", {
    address: token.address,
    constructorArguments: [
      name,
      tokenName,
      startDate,
      endDate,
      contractUri,
      tokenHash,
      totalSupply,
    ],
  });
  console.log("Contract verified!");

  // Mint 3 tokens
  const to = deployer.address;
  const qty = 3;
  console.log(`Minting ${qty} tokens to address ${to}...`);
  await token.mint(to.toString(), qty);
  console.log("Tokens minted!");

  // Additional code or interactions with the contract can be added here
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
