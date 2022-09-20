const fs = require("fs");
const path = require("path");
const hre = require("hardhat");

async function main() {
  const PlayifyExchange = await ethers.getContractFactory("PlayifyExchange");
  const playifyExchangeContract = await PlayifyExchange.deploy();
  await playifyExchangeContract.deployed();

  console.log(
    "playifyExchangeContract deployed to:",
    playifyExchangeContract.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
