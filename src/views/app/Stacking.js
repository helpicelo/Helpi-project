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
import CELOToken from 'abis/IERC20Token.json'
import cUSDToken from 'abis/IERC20Token.json'
import stakingcontract from 'abis/StakingContract.json'

// components
import YieldMain from 'components/app/main-components/YieldMain'

//contracts address
const ERC20_DECIMALS = 18
const yieldfarmingaddress = Tokenaddress.STAKING
const celoTokenaddress = Tokenaddress.CELO
const cusdTokenaddress = Tokenaddress.cUSD
const helpiTokenaddress = Tokenaddress.HELPI

//variables
let kit

class Staking extends Component {

    constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      hepliToken: {},
      celoToken: {},
      cusdToken: {},
      yieldFarming: {},
      celoTokenBalance: '0',
      cusdTokenBalance: '0',
      helpiTokenBalance: '0',
      celostakingBalance: '0',
      cusdstakingBalance: '0',
      celoAPR: '100000',
      cusdAPR: '100000',
      apr: '0',
      test: false,
      loading: true
    }
  }

  // This will call the celo blockchain data functions function and load the web3
  async componentWillMount() {
    let accounts = await connectWallet();
    this.setState({account: accounts})
    await this.loadingContracts()
    await this.loadingTokens()
  }

  loadingContracts = async function () {
      try {
        const web3 = new Web3(window.celo);
        kit = newKitFromWeb3(web3);

        //contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress)
        // tokenswitch address
        const yieldFarming = await loadContract(stakingcontract.abi, yieldfarmingaddress)
        this.setState({ yieldFarming })
        let celostakingBalance = await yieldFarming.methods.balanceOf(celoTokenaddress, this.state.account).call()
        celostakingBalance = await formatBalance(celostakingBalance)
        this.setState({ celostakingBalance: celostakingBalance.toString() })
        let cusdstakingBalance = await yieldFarming.methods.balanceOf(cusdTokenaddress, this.state.account).call()
        cusdstakingBalance = await formatBalance(cusdstakingBalance)
        this.setState({ cusdstakingBalance: cusdstakingBalance.toString() })
        let testTime = await yieldFarming.methods.lastContribution(this.state.account).call()
        let helpiTokenBalance = await yieldFarming.methods.lockedBalance(this.state.account).call()
        helpiTokenBalance = await formatBalance(helpiTokenBalance)
        this.setState({ helpiTokenBalance: helpiTokenBalance.toString() })
        console.log("Main Contract loaded")

      } catch (error) {
        //notification(`⚠️ ${error}.`)
        console.log("Error! -  Main Contract section")
        console.log({ error })
        //this.setState({ loading: false })
      }
  }

  loadingTokens = async function () {
      try {
        const web3 = new Web3(window.celo);
        kit = newKitFromWeb3(web3);
        this.setState({ loading: false })

        let celoToken = await loadTokens(celoTokenaddress, this.state.account, yieldfarmingaddress)
        this.setState({celoToken: celoToken.contract})
        this.setState({celoTokenBalance: celoToken.accountBalance})
        let celoStakedBalance = celoToken.contractBalance
        let celoAPR = (0.0000317 * 31540000) / celoStakedBalance
        celoAPR = celoAPR.toFixed(2)
        this.setState({ celoAPR: celoAPR.toString() })
        console.log("Celo Loaded")

        let cusdToken = await loadTokens(cusdTokenaddress, this.state.account, yieldfarmingaddress)
        this.setState({cusdToken: cusdToken.contract})
        this.setState({cusdTokenBalance: cusdToken.accountBalance})
        let cusdStakedBalance = cusdToken.contractBalance
        let cusdAPR = (0.0000317 * 3154000000) / cusdStakedBalance
        cusdAPR = cusdAPR.toFixed(2)
        this.setState({ cusdAPR: cusdAPR.toString() })
        console.log("cUSD Loaded")

        //helpi token contract
        const helpiToken = await loadContract(HelpiToken.abi, helpiTokenaddress)
        this.setState({ helpiToken })
        console.log("HELPI loaded")

      } catch (error) {
        //notification(`⚠️ ${error}.`)
        console.log("Error! -  Token section")
        console.log({ error })
        //this.setState({ loading: false })
      }
  }

  // Function sections
  stakeTokens = (tokentype, amount) => {
  console.log(amount)
    this.setState({ loading: true })
    amount = BigNumber(amount).shiftedBy(ERC20_DECIMALS)
    if (tokentype == 0) {
      this.state.celoToken.methods.approve(this.state.yieldFarming._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.state.yieldFarming.methods.StakeTokens(this.state.celoToken._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
        })
      })
    }
    else {
      this.state.cusdToken.methods.approve(this.state.yieldFarming._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.state.yieldFarming.methods.StakeTokens(this.state.cusdToken._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
        })
      })
    }

  }

  unstakeTokens = (tokentype) => {
    if (tokentype == 0) {
      this.setState({ loading: true })
      this.state.yieldFarming.methods.unStakeTokens(celoTokenaddress).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    } else {
      this.setState({ loading: true })
      this.state.yieldFarming.methods.unStakeTokens(cusdTokenaddress).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    }
  }

  contribute = () => {
    this.setState({ loading: true })
    this.state.yieldFarming.methods.Contribute().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
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
        cusdTokenBalance={this.state.cusdTokenBalance}
        celoTokenBalance={this.state.celoTokenBalance}
        helpiTokenBalance={this.state.helpiTokenBalance}
        celoAPR={this.state.celoAPR}
        cusdAPR={this.state.cusdAPR}
        celostakingBalance={this.state.celostakingBalance}
        cusdstakingBalance={this.state.cusdstakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
        contribute={this.contribute}
      />
    }
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '80%' }}>
            <div className="">
            <div>

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
