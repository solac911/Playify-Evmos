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
      url: "https://eth.bd.evmos.dev:8545",
      chainId: 9000,
      accounts: [
        "8df38f7a48aee08eb4b9067d760fd4dcb65772f4e34d63165021942d95650769",
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
