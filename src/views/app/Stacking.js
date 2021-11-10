import React, { Component } from 'react'
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';
import BigNumber from "bignumber.js";
import Tokenaddress from '../../tokenaddress.json';

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

  // This will call the celo blockchain data functions function and load the web3
  async componentWillMount() {
    await this.connectCeloWallet()
  }

  connectCeloWallet = async function () {
    if (window.celo) {
      try {
        //notification("⚠ Please approve this DApp to use it.")
        await window.celo.enable()
        //notificationOff()
        const web3 = new Web3(window.celo)
        kit = newKitFromWeb3(web3)

        const accounts = await kit.web3.eth.getAccounts()
        kit.defaultAccount = accounts[0]
        this.setState({ account: accounts[0] })
        //console.log({account})

        this.setState({ loading: false })
        console.log("Yield Account connected")

        //contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress)
        // tokenswitch address
        const yieldFarming = new kit.web3.eth.Contract(stakingcontract.abi, yieldfarmingaddress)
        this.setState({ yieldFarming })
        console.log("Yield farming connected")
        let celostakingBalance = await yieldFarming.methods.balanceOf(celoTokenaddress, this.state.account).call()
        celostakingBalance = BigNumber(celostakingBalance).shiftedBy(-ERC20_DECIMALS)
        this.setState({ celostakingBalance: celostakingBalance.toString() })
        console.log("Celo")
        let cusdstakingBalance = await yieldFarming.methods.balanceOf(cusdTokenaddress, this.state.account).call()
        cusdstakingBalance = BigNumber(cusdstakingBalance).shiftedBy(-ERC20_DECIMALS)
        this.setState({ cusdstakingBalance: cusdstakingBalance.toString() })
        console.log("CUSD")
        let testTime = await yieldFarming.methods.lastContribution(this.state.account).call()
        //cusdstakingBalance = BigNumber(cusdstakingBalance).shiftedBy(-ERC20_DECIMALS)
        //this.setState({ cusdstakingBalance: cusdstakingBalance.toString() })
        console.log("This is the last updated time:", testTime.toString())
        console.log("CUSD")
        let helpiTokenBalance = await yieldFarming.methods.lockedBalance(this.state.account).call()
        helpiTokenBalance = BigNumber(helpiTokenBalance).shiftedBy(-ERC20_DECIMALS)
        console.log("This is the help balalce", helpiTokenBalance.toString())
        helpiTokenBalance = helpiTokenBalance.toFixed(2)
        this.setState({ helpiTokenBalance: helpiTokenBalance.toString() })
        console.log("Yield Farming loaded")

        //Celo and cusd token contract
        let celoToken = await new kit.web3.eth.Contract(CELOToken.abi, celoTokenaddress)
        this.setState({ celoToken })
        console.log("cusd")
        let celoTokenBalance = await celoToken.methods.balanceOf(this.state.account).call()
        celoTokenBalance = BigNumber(celoTokenBalance).shiftedBy(-ERC20_DECIMALS)
        celoTokenBalance = celoTokenBalance.toFixed(2)
        this.setState({ celoTokenBalance: celoTokenBalance.toString() })
        let cusdToken = new kit.web3.eth.Contract(cUSDToken.abi, cusdTokenaddress)
        this.setState({ cusdToken })
        let cusdTokenBalance = await cusdToken.methods.balanceOf(this.state.account).call()
        cusdTokenBalance = BigNumber(cusdTokenBalance).shiftedBy(-ERC20_DECIMALS)
        cusdTokenBalance = cusdTokenBalance.toFixed(2)
        this.setState({ cusdTokenBalance: cusdTokenBalance.toString() })
        console.log("Before this")
        let celoStakedBalance = await celoToken.methods.balanceOf(yieldfarmingaddress).call()
        celoStakedBalance = BigNumber(celoStakedBalance).shiftedBy(-ERC20_DECIMALS)
        celoStakedBalance = celoStakedBalance.toFixed(2)
        console.log("celo staked:", celoStakedBalance)
        let celoAPR = (0.0000317 * 31540000) / celoStakedBalance
        console.log("celo APR:", celoAPR)
        this.setState({ celoAPR: celoAPR.toString() })
        let cusdStakedBalance = await cusdToken.methods.balanceOf(yieldfarmingaddress).call()
        cusdStakedBalance = BigNumber(cusdStakedBalance).shiftedBy(-ERC20_DECIMALS)
        console.log("cusd staked:", cusdStakedBalance)
        let cusdAPR = (0.0000317 * 3154000000) / cusdStakedBalance
        cusdAPR = cusdAPR.toFixed(2)
        this.setState({ cusdAPR: cusdAPR.toString() })
        console.log("cusd APR:", cusdAPR)
        console.log("Celo and cUSD tokens loaded")

        //helpi token contract
        const helpiToken = new kit.web3.eth.Contract(HelpiToken.abi, helpiTokenaddress)
        this.setState({ helpiToken })
        /*let helpiTokenBalance = await helpiToken.methods.balanceOf(this.state.account).call()
        helpiTokenBalance = BigNumber(helpiTokenBalance).shiftedBy(-ERC20_DECIMALS)
        this.setState({ helpiTokenBalance: helpiTokenBalance.toString() })*/
        console.log("HELPI loaded")

        console.log("All Contracts loaded")

      } catch (error) {
        //notification(`⚠️ ${error}.`)
        console.log("Error! -  Catch section")
        console.log({ error })
        //this.setState({ loading: false })
      }
    } else {
      //notification("⚠️ Please install the CeloExtensionWallet.")
      console.log("Error! - Else section")
    }
  }

  // Function sections

  stakeTokens = (tokentype, amount) => {
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
      loading: true
    }
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
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">

                <div class="d-grid">
                  <div className="border inline-block border-primary p-2">YIELD FARMING</div>
                </div>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Staking;
