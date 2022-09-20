const fs = require('fs');
const path = require('path');
const hre = require("hardhat");

async function main() {
  const PlayifyFactory = await ethers.getContractFactory("PlayifyFactory");
  const playifyFactoryContract = await PlayifyFactory.deploy();
  await playifyFactoryContract.deployed();

  const UserFactory = await ethers.getContractFactory("UserFactory");
  const userFactoryContract = await UserFactory.deploy();
  await userFactoryContract.deployed();

  console.log("playifyFactoryContract deployed to:", playifyFactoryContract.address);
  console.log("userFactoryContract deployed to:", userFactoryContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });