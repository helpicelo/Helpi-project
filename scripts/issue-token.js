const YieldFarming = artifacts.require('YieldFarming')

module.exports = async function(callback) {
  let yieldFarm = await YieldFarming.deployed()
  await yieldFarm.issueTokens()
  // Code goes here...
  console.log("Tokens issued!")
  callback()
}
