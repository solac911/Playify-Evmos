// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract UserNft is ERC721, AccessControl {
    using Counters for Counters.Counter;
    UserDetail[] public userDetails;    
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    Counters.Counter private _tokenIdCounter;

    struct UserDetail {
    string username;
    string email;
    uint[] records;
    }
    constructor(address _userFactory) ERC721("UnihornClientNFT", "UNIH-CLIENT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);

        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, _userFactory);
        _tokenIdCounter.increment();
    }

    function userMint(
      address to,
      string memory _username,
      string memory _email
    ) external onlyRole(MINTER_ROLE) returns(uint) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);

        UserDetail memory detail;
        detail.username = _username;
        detail.email = _email;
        userDetails.push(detail);
        return tokenId;
    }

    function getClientDetail(uint id) external view returns(UserDetail memory){
      return userDetails[id-1];
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
