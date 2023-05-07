// SPDX-License-Identifier: MIT
/*
 * SubportOwnable.sol
 */

pragma solidity >=0.5.16 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

//@title Subwnable.sol
//@author subport 

contract SubportOwnable is Ownable {

	//@dev Ownership - list of subport members (owners)
	mapping (address => bool) internal _port;

	constructor() {
		//add subport and then subport deployer
		_port[0x690A0e1Eaf12C8e4734C81cf49d478A2c6473A73] = true; // crib deployer
		_port[0xF7bBd4736D4400519fB540cD7849D561Ef03Ca08] = true; // subport deployer
	}

	//@dev Custom modifier for multiple owners
	modifier isSubport()
	{
		require(isInPort(_msgSender())," Caller not part of the port.");
		_;
	}

	//@dev Determine if address `a` is an approved owner
	function isInPort(address a) public view returns (bool) 
	{
		return _port[a];
	}

	//@dev Add `a` to the subport
	function addToPort(address a) public onlyOwner
	{
		require(!isInPort(a), "Address already in the port.");
		_port[a] = true;
	}

	//@dev Remove `a` from the subport
	function removeFromPort(address a) public onlyOwner
	{
		require(isInPort(a), "Address already not in the port.");
		_port[a] = false;
	}
	

}