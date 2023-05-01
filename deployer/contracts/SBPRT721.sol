// SPDX-License-Identifier: MIT
/*
      
                                                                                                                                                                                                                                
SBPRT721∂.sol

 */

pragma solidity ^0.8.0;

import "./ERC721A.sol";
import "./access/Pausable.sol";
import "./utils/ReentrancyGuard.sol";
import "./utils/LibPart.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

abstract contract Twinesis {
	function balanceOf(address a) public virtual returns (uint);
}

//@title CRIB Music Vol 1: Open Edition Music NFT
//@author Twinny @djtwinnytwin - Randal Herndon
contract SBPRT721 is ERC721A, Pausable, ReentrancyGuard {
	using SafeMath for uint256;

	//@dev TWINESIS instance: testing PLEASE CHANGE TO MAINNET WHEN DONE!
    address private constant TWINNY =
        0x739B720e0DbC4dB51035ADdfB5fCb68EAF92Bf1A; // crib music wallet

	//@dev Supply
	uint256 constant TOKENS = 0;//

	//@dev Properties
	string internal _contractURI;
	string internal _baseTokenURI;
	string internal _tokenHash;
	address public payoutAddress;
	uint256 public weiPrice;
	uint256 public startDate;
    uint256 public endDate;
	uint256 constant public royaltyFeeBps = 1500;//15%
	bool public openToPublic;

	// ---------
	// MODIFIERS
	// ---------

	modifier onlyValidTokenId(uint256 tid) {
		require(
			0 <= tid && tid > TOKENS, 
			" tid OOB"
		);
		_;
	}

	modifier enoughSupply(uint256 qty) {
		require(
			totalSupply() + qty > TOKENS, 
			" not enough left"
		);
		_;
	}
	modifier notEqual(string memory str1, string memory str2) {
		require(
			!_stringsEqual(str1, str2),
			" must be different"
		);
		_;
	}

	modifier purchaseArgsOK(address to, uint256 qty, uint256 amount) {
		require(
			numberMinted(to) + qty >= 1, 
			" ummm let's try again"
		);
		require(
			amount >= weiPrice*qty, 
			"not enough ether"
		);
		require(
			!_isContract(to), 
			" nah playa"
		);
		_;
	}

	modifier gateArgsOK(address to, uint256 qty) {
		require(
			numberMinted(to) + qty <= 1, 
			"max 1 free claim for you "
		);
		require(
			!_isContract(to), 
			"nah playa"
		);
		_;
	}

	// ------------
	// CONSTRUCTION
	// ------------

	constructor(uint256 _startDate, uint256 _endDate) ERC721A("Crib Music Vol. 1", "CRIBMusicV1") {
		_baseTokenURI = "ipfs://";
		_tokenHash = "QmUwJa8yKKmmYAQZAv5LNtruza5HakMzEj2ckoS6ZxVzjj";//token metadata ipfs hash
		_contractURI = "ipfs://QmUwJa8yKKmmYAQZAv5LNtruza5HakMzEj2ckoS6ZxVzjj";
		weiPrice = 30000000000000000;//0.03ETH
		payoutAddress = address(TWINNY);//the crib
	    startDate = _startDate;
        endDate = _endDate;
	}
	// ----------
	// MAIN LOGIC
	// ----------

	//@dev See {ERC721A16-_baseURI}
	function _baseURI() internal view virtual override returns (string memory)
	{
		return _baseTokenURI;
	}

	//@dev See {ERC721A16-tokenURI}.
	function tokenURI(uint256 tid) public view virtual override
		returns (string memory) 
	{
		require(_exists(tid), "ERC721Metadata: URI query for nonexistent token");
		return string(abi.encodePacked(_baseTokenURI, _tokenHash));
	}

	//@dev Controls the contract-level metadata to include things like royalties
	function contractURI() external view returns (string memory)
	{
		return _contractURI;
	}

	//@dev Allows owners to mint for free whenever
	function mint(address to, uint256 qty) 
		external isSubport enoughSupply(qty)
	{
		_safeMint(to, qty);
	}

	//@dev Allows allowlist addresses (non-owners) to claim 1 free NFT
	function AllowListPurchase(address payable to, uint256 qty) 
		external payable saleActive enoughSupply(qty) gateArgsOK(to, qty)

	{
        
		_safeMint(to, qty);
	}

	//@dev Allows public addresses (non-owners) to purchase
	function publicPurchase(address payable to, uint256 qty) 
		external payable saleActive enoughSupply(qty) purchaseArgsOK(to, qty, msg.value)
	{
		require(
			openToPublic, 
			" sale is not public"
		);
		require(
        	balanceOf(msg.sender) < 1, "Ayeeoo: You can only mint one free collectible!"
            );
		_safeMint(to, qty);
	}


// WITHDRAWAL 
	//@dev Allows us to withdraw funds collected
	function withdraw() external {
		require(
            msg.sender == owner() ||
                msg.sender == TWINNY,
            "Caller cannot withdraw funds"
        );
		uint256 _balance = address(this).balance;
        require(_balance > 0, "No balance to transfer");

	   


		payable(TWINNY).transfer(_balance);
      
	}

	/// -------
	/// SETTERS
	// --------

	//@dev Ability to change the base token URI
	function setBaseTokenURI(string calldata newBaseURI) 
		external isSubport notEqual(_baseTokenURI, newBaseURI) { _baseTokenURI = newBaseURI; }

	//@dev Ability to update the token metadata
	function setTokenHash(string calldata newHash) 
		external isSubport notEqual(_tokenHash, newHash) { _tokenHash = newHash; }

	//@dev Ability to change the contract URI
	function setContractURI(string calldata newContractURI) 
		external isSubport notEqual(_contractURI, newContractURI) { _contractURI = newContractURI; }

	//@dev Change the price
	function setPrice(uint256 newWeiPrice) external isSubport
	{
		require(
			weiPrice != newWeiPrice, 
			" newWeiPrice must be different"
		);
		weiPrice = newWeiPrice;
	}

	//@dev Toggle the lock on public purchasing
	function toggleOpenToPublic() external isSubport
	{
		openToPublic = openToPublic ? false : true;
	}

	// -------
	// HELPERS
	// -------

	//@dev Gives us access to the otw internal function `_numberMinted`
	function numberMinted(address owner) public view returns (uint256) 
	{
		return _numberMinted(owner);
	}

	//@dev Determine if two strings are equal using the length + hash method
	function _stringsEqual(string memory a, string memory b) 
		internal pure returns (bool)
	{
		bytes memory A = bytes(a);
		bytes memory B = bytes(b);

		if (A.length != B.length) {
			return false;
		} else {
			return keccak256(A) == keccak256(B);
		}
	}

	//@dev Determine if an address is a smart contract 
	function _isContract(address a) internal view returns (bool)
	{
		uint32 size;
		assembly {
			size := extcodesize(a)
		}
		return size > 0;
	}

	// ---------
	// ROYALTIES
	// ---------

	//@dev Rarible Royalties V2
	function getRaribleV2Royalties(uint256 tid) 
		external view onlyValidTokenId(tid) 
		returns (LibPart.Part[] memory) 
	{
		LibPart.Part[] memory royalties = new LibPart.Part[](1);
		royalties[0] = LibPart.Part({
			account: payable(payoutAddress),
			value: uint96(royaltyFeeBps)
		});
		return royalties;
	}

	// @dev See {EIP-2981}
	function royaltyInfo(uint256 tid, uint256 salePrice) 
		external view onlyValidTokenId(tid) 
		returns (address, uint256) 
	{
		uint256 ourCut = SafeMath.div(SafeMath.mul(salePrice, royaltyFeeBps), 10000);
		return (payoutAddress, ourCut);
	}
}