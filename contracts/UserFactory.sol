// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IUserNft.sol";
import "./UserNft.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract UserFactory is AccessControl {
  mapping(address => uint) public addressToUserId;
  mapping(address => bool) public userHasNft;
  mapping(uint => address) public idToUserAddress;
  uint public usersLength = 0;

  UserNft public nft;

  constructor() {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    nft = new UserNft(address(this));
  }

  function createUser(
    string memory _username,
    string memory _email
  ) external {
    require(userHasNft[msg.sender] == false,"ACCOUNT ALREADY HAS NFT");

    uint id = nft.userMint(
      msg.sender,
      _username,
      _email
    );
    
    addressToUserId[msg.sender] = id; 
    idToUserAddress[id] = msg.sender;
    userHasNft[msg.sender] = true;
    usersLength += 1;
  }
}