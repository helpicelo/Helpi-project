require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config()

const { FORNO_CELO_MAINNET, FORNO_CELO_TESTNET, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      from: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
    },
    alfajores: {
      url: FORNO_CELO_TESTNET,
      accounts: [PRIVATE_KEY],
      live: true,
      gasPrice: 0.5 * 10 ** 9,
      gas: 8000000,
    },
    celo_mainnet: {
      url: FORNO_CELO_MAINNET,
      accounts: [PRIVATE_KEY]
    }
  },
  paths: {
    sources: "./src/contracts",
    tests: "./src/test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  solidity: {
    version: "0.5.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};
