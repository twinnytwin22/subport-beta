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
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

abstract contract ContextMixin {
    function msgSender() internal view returns (address payable sender) {
        if (msg.sender == address(this)) {
            bytes memory array = msg.data;
            uint256 index = msg.data.length;
            assembly {
                // Load the 32 bytes word from memory with the address on the lower 20 bytes, and mask those.
                sender := and(
                    mload(add(array, index)),
                    0xffffffffffffffffffffffffffffffffffffffff
                )
            }
        } else {
            sender = payable(msg.sender);
        }
        return sender;
    }
}

//@title CRIB Music Vol 1: Open Edition Music NFT
//@author Twinny @djtwinnytwin - Randal Herndon
contract SBPRT721 is ERC721A, Pausable, ReentrancyGuard {
    using SafeMath for uint256;
    using ECDSA for bytes32;

    //@dev Properties
    string public _name;
    string public _tokenName;
    string internal _baseTokenURI;
    string internal _contractURI;
    string internal _tokenHash;

    //@dev Dates and Times
    uint256 public _startDate;
    uint256 public _endDate;

    //@dev Supply and Pricing
    uint256 public TOKENS;
    uint256 public weiPrice;
    uint256 private _totalSupply;

    //@dev Addresses
    address public _payoutAddress;
    address private signerAddress;

    //@dev Constants
    uint256 public constant royaltyFeeBps = 1000; //10%

    //@dev Access Control
    bool public openToPublic;

    // ---------
    // MODIFIERS
    // ---------

    modifier onlyValidTokenId(uint256 tid) {
        require(0 <= tid && tid > TOKENS, " tid OOB");
        _;
    }

    modifier enoughSupply(uint256 qty) {
        require(totalSupply() + qty > TOKENS, " not enough left");
        _;
    }
    modifier notEqual(string memory str1, string memory str2) {
        require(!_stringsEqual(str1, str2), " must be different");
        _;
    }

    modifier purchaseArgsOK(
        address to,
        uint256 qty,
        uint256 amount
    ) {
        require(numberMinted(to) + qty >= 1, " ummm let's try again");
        if (weiPrice > 0) {
            require(amount >= weiPrice * qty, "not enough ether");
        }
        require(!_isContract(to), " nah playa");
        _;
    }

    modifier gateArgsOK(address to, uint256 qty) {
        require(numberMinted(to) + qty <= 1, "max 1 free claim for you ");
        require(!_isContract(to), "nah playa");
        _;
    }

    // ------------
    // CONSTRUCTION
    // ------------
    constructor(
        string memory name_,
        string memory tokenName_,
        uint256 startDate_,
        uint256 endDate_,
        string memory contractUri_,
        uint256 totalSupply_
    ) ERC721A(name_, tokenName_) {
        _name = name_;
        _tokenName = tokenName_;
        _startDate = startDate_ == 0 ? block.timestamp : startDate_;  // set start date to now if not provided
        _endDate = endDate_ == 0 ? type(uint256).max : endDate_; // set end date to infinity if not provided
        _contractURI = contractUri_;
        _totalSupply = totalSupply_;
        openToPublic = true;
        signerAddress = 0x7B41dE805578Cb93f4D4758Cea533E526EefEf49;
    }

    // ----------
    // MAIN LOGIC
    // ----------
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    //@dev See {ERC721A16-_baseURI}
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    function startDate() public view returns (uint256) {
        return _startDate;
    }

    function endDate() public view returns (uint256) {
        return _endDate;
    }

    //@dev See {ERC721A16-tokenURI}.
    function tokenURI(
        uint256 tid
    ) public view virtual override returns (string memory) {
        require(
            _exists(tid),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return string(abi.encodePacked(_baseTokenURI, _tokenHash));
    }

    //@dev Controls the contract-level metadata to include things like royalties
    function contractURI() external view returns (string memory) {
        return _contractURI;
    }

    //@dev Allows owners to mint for free whenever
    function mint(
        address to,
        uint256 qty
    ) external isSubport enoughSupply(qty) {
        _safeMint(to, qty);
    }

    //@dev Allows allowlist addresses (non-owners) to claim 1 free NFT
    function allowListCollect(
        address payable to,
        uint256 qty
    ) external payable saleActive enoughSupply(qty) gateArgsOK(to, qty) {
        _safeMint(to, qty);
    }

       function purhase(
        bytes memory signature,
        address payable to,
        uint256 qty
    )
        external
        payable
        saleActive
        enoughSupply(qty)
        purchaseArgsOK(to, qty, msg.value)
    {
        require(verifyAddressSigner(signature), "Address not verified");

        require(openToPublic, " sale is not public");
        require(
            balanceOf(msg.sender) < 1,
            "You can only mint one free collectible!"
        );
        _safeMint(to, qty);
    }


    //@dev Allows public addresses (non-owners) to purchase
    function collect(
        bytes memory signature,
        address payable to,
        uint256 qty
    )
        external
        payable
        saleActive
        enoughSupply(qty)
        purchaseArgsOK(to, qty, msg.value)
    {
        require(verifyAddressSigner(signature), "Address not verified");

        require(openToPublic, " sale is not public");
        require(
            balanceOf(msg.sender) < 1,
            "You can only mint one free collectible!"
        );
        _safeMint(to, qty);
    }

    // WITHDRAWAL
    //@dev Allows owner to withdraw funds collected
    function withdraw() external {
        require(
            msg.sender == owner() || msg.sender == _payoutAddress,
            "Caller cannot withdraw funds"
        );
        uint256 _balance = address(this).balance;
        require(_balance > 0, "No balance to transfer");
        payable(_payoutAddress).transfer(_balance);
    }

    /// -------
    /// SETTERS
    // --------

    //@dev Ability to change the base token URI
    function setBaseTokenURI(
        string calldata newBaseURI
    ) external isSubport notEqual(_baseTokenURI, newBaseURI) {
        _baseTokenURI = newBaseURI;
    }

    //@dev Ability to update the token metadata
    function setTokenHash(
        string calldata newHash
    ) external isSubport notEqual(_tokenHash, newHash) {
        _tokenHash = newHash;
    }

    //@dev Ability to change the contract URI
    function setContractURI(
        string calldata newContractURI
    ) external isSubport notEqual(_contractURI, newContractURI) {
        _contractURI = newContractURI;
    }

    //@dev Change the price
    function setPrice(uint256 newWeiPrice) external isSubport {
        require(weiPrice != newWeiPrice, " newWeiPrice must be different");
        weiPrice = newWeiPrice;
    }

    //@dev Toggle the lock on public purchasing
    function toggleOpenToPublic() external isSubport {
        openToPublic = openToPublic ? false : true;
    }

    // -------
    // HELPERS
    // -------

    function verifyAddressSigner(
        bytes memory signature
    ) private view returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(msg.sender));
        return
            signerAddress ==
            messageHash.toEthSignedMessageHash().recover(signature);
    }

    function setSignerAddress(address newSignerAddress) external onlyOwner {
        signerAddress = newSignerAddress;
    }
	 
	function setPayoutAddress(address payoutAddress) external onlyOwner {
        _payoutAddress = payoutAddress;
    }

    //@dev Gives us access to the otw internal function `_numberMinted`
    function numberMinted(address owner) public view returns (uint256) {
        return _numberMinted(owner);
    }

    //@dev Determine if two strings are equal using the length + hash method
    function _stringsEqual(
        string memory a,
        string memory b
    ) internal pure returns (bool) {
        bytes memory A = bytes(a);
        bytes memory B = bytes(b);

        if (A.length != B.length) {
            return false;
        } else {
            return keccak256(A) == keccak256(B);
        }
    }

    //@dev Determine if an address is a smart contract
    function _isContract(address a) internal view returns (bool) {
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
    function getRaribleV2Royalties(
        uint256 tid
    ) external view onlyValidTokenId(tid) returns (LibPart.Part[] memory) {
        LibPart.Part[] memory royalties = new LibPart.Part[](1);
        royalties[0] = LibPart.Part({
            account: payable(_payoutAddress),
            value: uint96(royaltyFeeBps)
        });
        return royalties;
    }

    // @dev See {EIP-2981}
    function royaltyInfo(
        uint256 tid,
        uint256 salePrice
    ) external view onlyValidTokenId(tid) returns (address, uint256) {
        uint256 ourCut = SafeMath.div(
            SafeMath.mul(salePrice, royaltyFeeBps),
            10000
        );
        return (_payoutAddress, ourCut);
    }
}