import React, { Component } from 'react'
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';
import BigNumber from "bignumber.js";
import Tokenaddress from '../../tokenaddress.json';

//Importing Utilities
import {connectWallet} from '../../Utilis/connectWallet.js';
import {loadContract} from '../../Utilis/ContractUtilis.js';
import {formatBalance} from '../../Utilis/ContractUtilis.js';
import {loadTokens} from '../../Utilis/ContractUtilis.js';

// token contracts
import USDToken from 'abis/USDToken.json'
import INRToken from 'abis/INRToken.json'
import HelpiToken from 'abis/HELPIToken.json'
import ERCToken from 'abis/IERC20Token.json'
import CELOToken from 'abis/IERC20Token.json'
import cUSDToken from 'abis/IERC20Token.json'
import stakingcontract from 'abis/StakingContract.json'

// components
import YieldMain from 'components/app/YieldMain'
import TitlePill from '../../components/Pills/TitlePill.js'

//contracts address
const ERC20_DECIMALS = 18
const yieldfarmingaddress = Tokenaddress.STAKING
const helpiTokenaddress = Tokenaddress.HELPI

//variables
let kit

class Staking extends Component {

    constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      tokenName: "CELO",
      hepliToken: {},
      Token: {},
      yieldFarming: {},
      TokenBalance: '0',
      helpiTokenBalance: '0',
      stakingBalance: '0',
      APR: '100000',
      loading: true
    };
    this.handleClick = this.handleClick.bind(this)
  }


  async componentWillMount() {
    let accounts = await connectWallet();
    this.setState({account: accounts})
    await this.loadingContracts("CELO")
    await this.loadingTokens("CELO")
  }

  loadingContracts = async function (_token) {
  console.log()
      try {
        const web3 = new Web3(window.celo);
        kit = newKitFromWeb3(web3);

        const yieldFarming = await loadContract(stakingcontract.abi, yieldfarmingaddress)
        this.setState({ yieldFarming })
        let stakingBalance = await yieldFarming.methods.balanceOf(Tokenaddress[_token], this.state.account).call()
        stakingBalance = await formatBalance(stakingBalance)
        this.setState({ stakingBalance: stakingBalance.toString() })
        let testTime = await yieldFarming.methods.lastContribution(this.state.account).call()
        let helpiTokenBalance = await yieldFarming.methods.lockedBalance(this.state.account).call()
        helpiTokenBalance = await formatBalance(helpiTokenBalance)
        this.setState({ helpiTokenBalance: helpiTokenBalance.toString() })
        console.log("Main Contract loaded")

      } catch (error) {
        console.log("Error! -  Main Contract section")
        console.log({ error })
      }
  }

  loadingTokens = async function (_token) {
      try {
        const web3 = new Web3(window.celo);
        kit = newKitFromWeb3(web3);
        this.setState({ loading: false })

        let Token = await loadTokens(Tokenaddress[_token], this.state.account, yieldfarmingaddress)
        this.setState({Token: Token.contract})
        this.setState({TokenBalance: Token.accountBalance})
        let StakedBalance = Token.contractBalance
        let APR = (0.0000317 * 31540000) / StakedBalance
        APR = APR.toFixed(2)
        this.setState({ APR: APR.toString() })
        console.log("Token Loaded")

        //helpi token contract
        const helpiToken = await loadContract(HelpiToken.abi, helpiTokenaddress)
        this.setState({ helpiToken })
        console.log("HELPI loaded")

      } catch (error) {
        console.log("Error! -  Token section")
        console.log({ error })
      }
  }

  // Function sections
  stakeTokens = (tokentype, amount) => {
  console.log(amount)
    this.setState({ loading: true })
    amount = BigNumber(amount).shiftedBy(ERC20_DECIMALS)
    this.state.Token.methods.approve(this.state.yieldFarming._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.yieldFarming.methods.StakeTokens(this.state.Token._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
         this.setState({ loading: false })
       })
     })
  }

  unstakeTokens = (tokentype) => {
      this.setState({ loading: true })
      this.state.yieldFarming.methods.unStakeTokens(Tokenaddress[this.state.tokenName]).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
  }

  contribute = () => {
    this.setState({ loading: true })
    this.state.yieldFarming.methods.Contribute().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  handleClick = event => {
        let a = event.target.value
        this.setState({tokenName: event.target.value})
        console.log("this is a",a)
        this.loadingContracts(a)
        this.loadingTokens(a)
  }


  render() {
    let content
    if (this.state.celoAPR == "Infinity") {
      this.state.celoAPR = "100000"
    }
    if (this.state.cusdAPR == "Infinity") {
      this.state.cusdAPR = "100000"
    }
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <YieldMain
        tokenName = {this.state.tokenName}
        TokenBalance={this.state.TokenBalance}
        helpiTokenBalance={this.state.helpiTokenBalance}
        APR={this.state.APR}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
        contribute={this.contribute}
      />
    }
    let a =
    <button type="submit" value = "CELO" class= {this.state.tokenName === "CELO" ? "block-inline w-1/2 rounded-none text-white text-center text-xl bg-red-400": "block-inline w-1/2 rounded-none text-black text-center text-xl bg-white-400" } onClick={this.handleClick}>
    Stake Celo
    </button>
    let b =
    <button type="submit" value = "cUSD" class= {this.state.tokenName === "cUSD" ? "block-inline w-1/2 rounded-none text-white text-center text-xl bg-red-400": "block-inline w-1/2 rounded-none text-black text-center text-xl bg-white-400" } onClick={this.handleClick}>
    Stake cUSD
    </button>
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '80%' }}>
            <div className="">
            <div>
                {TitlePill(a,b)}
                {content}
            </div>
            </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Staking;
