import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';
import BigNumber from "bignumber.js";
import Token from 'abis/IERC20Token.json'
import CELOToken from 'abis/IERC20Token.json'
import Tokenaddress from '../tokenaddress.json';
const ERC20_DECIMALS = 18
let kit;

let loadContract = async function (contractABI, contractAddress) {
    const web3 = new Web3(window.celo);
    kit = newKitFromWeb3(web3);

    let contract = new kit.web3.eth.Contract(contractABI, contractAddress);
    return contract;
};

let formatBalance = async function (balance) {
    let Balance = BigNumber(balance).shiftedBy(-ERC20_DECIMALS)
    Balance = Balance.toFixed(2)
    return Balance;
};


let loadTokens = async function (tokenAddress ,account, contractAddress) {
    const web3 = new Web3(window.celo);
    kit = newKitFromWeb3(web3);

    let contract = new kit.web3.eth.Contract(Token.abi, tokenAddress);
    let accountBalance = await contract.methods.balanceOf(account).call()
    let contractBalance = await contract.methods.balanceOf(contractAddress).call()
    accountBalance = BigNumber(accountBalance).shiftedBy(-ERC20_DECIMALS)
    accountBalance = accountBalance.toFixed(2)
    contractBalance = BigNumber(contractBalance).shiftedBy(-ERC20_DECIMALS)
    contractBalance = contractBalance.toFixed(2)
    return {contract: contract, accountBalance: accountBalance, contractBalance: contractBalance};

};

export {loadTokens};
export {loadContract};
export {formatBalance};
