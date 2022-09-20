// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./PlayifyToken.sol";
import "./PlayifyExchange.sol";

contract PlayifyFactory {
  PlayifyToken public token;
  PlayifyExchange public exchange;

  event UpdatedToken(address indexed oldToken, address indexed newToken, address indexed exchange);

  function updateToken(
      string memory _name,
      string memory _symbol,
      address _admin,
      address _originalToken,
      uint _rate
  ) external returns(address, address) {
    token = new PlayifyToken(_name, _symbol, _admin);
    exchange = new PlayifyExchange(_admin, address(token), _originalToken,_rate);
    
    token.grantRole(keccak256("MINTER_ROLE"),address(exchange));
    emit UpdatedToken(_originalToken, address(token), address(exchange));
    return (
      address(token),
      address(exchange)
    );
  }
}
