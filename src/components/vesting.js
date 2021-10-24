import React, { Component } from 'react'
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';
import BigNumber from "bignumber.js";
import Tokenaddress from '../tokenaddress.json';

// token contracts
import USDToken from '../abis/USDToken.json'
import INRToken from '../abis/INRToken.json'
import HelpiToken from '../abis/HELPIToken.json'
import YieldFarming from '../abis/YieldFarming.json'
import CELOToken from '../abis/IERC20Token.json'
import cUSDToken from '../abis/IERC20Token.json'

// components
import Navbar from './Navbar'
import VestingMain from './Main_components/vestingMain'
import './App.css'

//contracts address
const ERC20_DECIMALS = 18
const yieldfarmingaddress = Tokenaddress.YIELD
const helpiTokenaddress = Tokenaddress.HELPI

//variables
let kit

class Vesting extends Component {

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
            this.setState({account: accounts[0]})
            //console.log(account)

            this.setState({ loading: false })
            console.log("Account connected")

            //contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress)
            // yieldaddress address
            const yieldFarming = new kit.web3.eth.Contract(YieldFarming.abi, yieldfarmingaddress)
            this.setState({ yieldFarming })
            let lockedBalance = await yieldFarming.methods.vestedamount(this.state.account).call()
            lockedBalance = BigNumber(lockedBalance).shiftedBy(-ERC20_DECIMALS)
            this.setState({ lockedBalance: lockedBalance.toString() })
            let releasedBalance = await yieldFarming.methods.releasedamount(this.state.account).call()
            releasedBalance = BigNumber(releasedBalance).shiftedBy(-ERC20_DECIMALS)
            this.setState({ releasedBalance: releasedBalance.toString() })
            let redeemedBalance = await yieldFarming.methods.redeemedamount(this.state.account).call()
            redeemedBalance = BigNumber(redeemedBalance).shiftedBy(-ERC20_DECIMALS)
            this.setState({ redeemedBalance: redeemedBalance.toString() })
            let time = await yieldFarming.methods.vestedtime(this.state.account).call()
            console.log("time:",time)
            this.setState({ time: time.toString()})
            console.log("Yieldfarming loaded")


            //helpi token contract
            const helpiToken = new kit.web3.eth.Contract(HelpiToken.abi, helpiTokenaddress)
            this.setState({ helpiToken })
            //let helpiTokenBalance = await helpiToken.methods.balanceOf(this.state.account).call()
            //helpiTokenBalance = BigNumber(helpiTokenBalance).shiftedBy(-ERC20_DECIMALS)
            //this.setState({ helpiTokenBalance: helpiTokenBalance.toString() })
            console.log("HELPI loaded")

            console.log("All Contracts loaded")

         } catch (error) {
             //notification(`⚠️ ${error}.`)
             console.log({error})
             //this.setState({ loading: false })
         }
     } else {
            //notification("⚠️ Please install the CeloExtensionWallet.")
            console.log("Error! - Else section")
     }
  }

  // Function sections

  releaseToken = (time) =>{
    console.log("current time", time)
    console.log("state time", this.state.time)
    let statetime = this.state.time
    console.log(time - statetime)
    if(time - statetime >= 86400000){
    time = time.toString()
    this.setState({ loading: true})
    this.state.yieldFarming.methods.releasetoken(time).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false})
    })
  }
  }

  redeemToken = (amount) =>{
    amount = BigNumber(amount).shiftedBy(ERC20_DECIMALS)
    this.setState({ loading: true})
    this.state.yieldFarming.methods.redeemtoken(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false})
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      hepliToken: {},
      time: '0',
      yieldFarming: {},
      lockedBalance: '0',
      releasedBalance: '0',
      redeemedBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading){
        content = <p id="loader" className="text-center">Loading...</p>
    }else{
        content = <VestingMain
            lockedBalance = {this.state.lockedBalance}
            releasedBalance = {this.state.releasedBalance}
            redeemedBalance = {this.state.redeemedBalance}
            releaseToken = {this.releaseToken}
            redeemToken = {this.redeemToken}
        />
    }

    let currenttime = (new Date()).getTime()
    if(currenttime - this.state.time < 86400000){
        alert = <button type="button" class="btn btn-danger btn-lg btn-block">TOKENS CAN BE UNLOCKED EVERY 24 HOURS</button>
    }else{
        alert = <button type="submit" class="btn btn-success btn-lg btn-block"
                onClick={(event) => {
                event.preventDefault()
                let time
                time = (new Date()).getTime()
                this.releaseToken(time)}}>
                UNLOCK NEW TOKENS
                </button>
    }
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">

              <div class="d-grid">
                 <button type="button" class="btn btn-outline-danger btn-lg btn-block">VESTING POOL</button>
              </div>

               {content}
               {alert}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Vesting;
