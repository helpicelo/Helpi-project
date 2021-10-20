//import tokens
const HELPIToken = artifacts.require('HELPIToken')
const USDToken = artifacts.require('USDToken')
const INRToken = artifacts.require('INRToken')
const TokenSwitch = artifacts.require('TokenSwitch')
const YieldFarming = artifacts.require('YieldFarming')


module.exports = async function(deployer, network, accounts) {
  // Deploy Mock DAI Token
  //await deployer.deploy(DaiToken)
  //const daiToken = await DaiToken.deployed()

  // Deploy Helpi Token
  //await deployer.deploy(HELPIToken)
  const helpi = await HELPIToken.deployed()

  // Deploy USDT Token
  //await deployer.deploy(USDToken)
  //const usdt = await USDToken.deployed()

  // Deploy INR Token
  //await deployer.deploy(INRToken)
  //const inrt = await INRToken.deployed()

  // Deploy YieldFarming
  await deployer.deploy(YieldFarming, helpi.address)
  const yieldFarming = await YieldFarming.deployed()

  // Deploy TokenSwitch
  //await deployer.deploy(TokenSwitch, usdt.address, inrt.address)
  //const tokenSwitch = await TokenSwitch.deployed()

  // Transfer 100k INR and USDT tokens to TokenSwitch (100k)
  //await inrt.transfer(tokenSwitch.address, '100000000000000000000000')
  //await usdt.transfer(tokenSwitch.address, '100000000000000000000000')
  await helpi.transfer(yieldFarming.address, '10000000000000000000000') //10k coins
  //await yieldFarming.issueTokens()

  // Transfer 100 USDT tokens to investor
  //This will not happen in the actual scenerio
  //account 1 is usdt holder
  // account two should receive inrt
  //await usdt.transfer(accounts[1], '100000000000000000000')
}
