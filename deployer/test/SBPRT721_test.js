const { expect } = require("chai");

describe("SUBPORT contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const SUBPORT = await ethers.getContractFactory("SBPRT721");

    const hardhatToken = await SUBPORT.deploy();

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    console.log('Owner:',owner.address)
    console.log('Your smart Contract:',hardhatToken.address)
  });
});