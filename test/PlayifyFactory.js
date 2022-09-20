const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PlayifyFactory - Test", async function () {
  let owner, chingunee, odko;
  let mockTokenContract, playifyFactoryContract;
  let oldTokenAddr, newTokenAddr, exchangeAddr;
  let exchangeContract, newTokenContract;

  const ADMIN_ROLE =
    "0x0000000000000000000000000000000000000000000000000000000000000000";
  const PAUSER_ROLE = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("PAUSER_ROLE")
  );
  const MINTER_ROLE = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("MINTER_ROLE")
  );

  beforeEach(async function () {
    [owner, chingunee, odko] = await ethers.getSigners();

    const MockToken = await ethers.getContractFactory("MockToken");
    mockTokenContract = await MockToken.deploy();
    await mockTokenContract.deployed();

    const PlayifyFactory = await ethers.getContractFactory("PlayifyFactory");
    playifyFactoryContract = await PlayifyFactory.deploy();
    await playifyFactoryContract.deployed();

    let result = await (
      await playifyFactoryContract
        .connect(chingunee)
        .updateToken(
          "ArdMoney",
          "ARDM",
          chingunee.address,
          mockTokenContract.address,
          5
        )
    ).wait();
    let updatedTokenEvent = result.events.find(
      (i) => i.event == "UpdatedToken"
    );
    oldTokenAddress = updatedTokenEvent.args.oldToken;
    newTokenAddress = updatedTokenEvent.args.newToken;
    exchangeAddress = updatedTokenEvent.args.exchange;

    exchangeContract = await ethers.getContractAt(
      "PlayifyExchange",
      exchangeAddress
    );
    newTokenContract = await ethers.getContractAt(
      "PlayifyToken",
      newTokenAddress
    );

    /*
    expect(await newTokenContract.name()).to.equal("ArdMoney");
    expect(await newTokenContract.symbol()).to.equal("ARDM");
    expect(
      await newTokenContract.hasRole(PAUSER_ROLE, chingunee.address)
    ).to.equal(true);
    expect(
      await exchangeContract.hasRole(ADMIN_ROLE, chingunee.address)
    ).to.equal(true);

    expect(
      await exchangeContract.hasRole(ADMIN_ROLE, playifyFactoryContract.address)
    ).to.equal(true);
    expect(
      await newTokenContract.hasRole(ADMIN_ROLE, playifyFactoryContract.address)
    ).to.equal(true); */
  });

  it("Exchange - Test", async function () {
    let tokenAmount = ethers.utils.parseUnits("1000", 18);
    await mockTokenContract.transfer(odko.address, tokenAmount);
    expect(await mockTokenContract.balanceOf(odko.address)).to.equal(
      tokenAmount
    );

    await mockTokenContract.connect(odko).approve(exchangeAddress, tokenAmount);
    await exchangeContract.connect(odko).buy(tokenAmount);
  });
});
