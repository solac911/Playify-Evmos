require("@nomicfoundation/hardhat-toolbox");
require("hardhat-abi-exporter");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    test: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "0e690d92d5e806a4777922c93d0391d7bff0ad10c3fa1a4dab001d77100df3a0",
      ],
    },
  },
  abiExporter: {
    path: "./gamify-front/abi",
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
  },
};
