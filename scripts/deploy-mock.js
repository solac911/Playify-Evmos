const fs = require('fs');
const path = require('path');
const hre = require("hardhat");

async function main() {
  const MockToken = await ethers.getContractFactory("MockToken");
  const mockTokenContract = await MockToken.deploy();
  await mockTokenContract.deployed();

  console.log("mockTokenContract deployed to:", mockTokenContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });