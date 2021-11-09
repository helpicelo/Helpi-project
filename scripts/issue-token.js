// const YieldFarming = artifacts.require('YieldFarming')
const hre = require("hardhat");
const { BigNumber, utils } = require('ethers');

// const contractAddress = require("../src/tokenaddress.json")

async function main() {
  const accounts = await ethers.getSigners();

  const userAccount = accounts[1]
  console.log("second address:", userAccount.address)

  // get the contracts ABI
  // const Weth = await ethers.get?ContractFactory('WETH');
  const Helpi = await hre.ethers.getContractFactory("HELPIToken");
  const OtherToken = await hre.ethers.getContractFactory("HELPIToken");
  const Stacking = await hre.ethers.getContractFactory("StakingContract");

  // instantiate other token
  const weth = await OtherToken.deploy();
  await weth.deployed();

  // instantiate helpi token
  const helpi = await Helpi.deploy()
  await helpi.deployed()


  // instantiate stacking contract
  let stacking = await Stacking.deploy(helpi.address)
  await stacking.deployed()

  //transfer tokens to 2nd account
  await helpi.transfer(userAccount.address, utils.parseEther('100'))


  console.log('balance: ', (await helpi.balanceOf(accounts[0].address)).value)
  // add some account to the stacking contract

  // await stacking.StakeTokens(weth.address, 100)

  // contribute for all addresses
  // await stacking.Contribute()

  console.log("Tokens issued!")
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });