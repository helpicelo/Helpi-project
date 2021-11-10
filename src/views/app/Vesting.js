import React, { Component } from 'react'
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';
import BigNumber from "bignumber.js";
import Tokenaddress from '../../tokenaddress.json';

// token contracts
import USDToken from 'abis/USDToken.json'
import INRToken from 'abis/INRToken.json'
import HelpiToken from 'abis/HELPIToken.json'
import stakingcontract from 'abis/StakingContract.json'

// components
import VestingMain from 'components/app/Vesting'

//contracts address
const ERC20_DECIMALS = 18
const yieldfarmingaddress = Tokenaddress.STAKING
const helpiTokenaddress = Tokenaddress.HELPI

//variables
let kit

class Vesting extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      hepliToken: {},
      currentTime: '0',
      time: '0',
      yieldFarming: {},
      lockedBalance: '0',
      releasedBalance: '0',
      redeemedBalance: '0',
      loading: true
    }
  }

  // This will call the celo blockchain data functions function and load the web3
  async componentWillMount() {
    await this.connectCeloWallet()
    await this.getIpTime()
  }

  getIpTime = async function () {
    const response = await fetch(Tokenaddress.TIME_URL);
    const data = await response.json();
    this.setState({ currentTime: data.unixtime })
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
        //console.log(account)

        this.setState({ loading: false })
        console.log("Account connected")

        //contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress)
        // yieldaddress address
        const yieldFarming = new kit.web3.eth.Contract(stakingcontract.abi, yieldfarmingaddress)
        this.setState({ yieldFarming })
        let lockedBalance = await yieldFarming.methods.lockedBalance(this.state.account).call()
        lockedBalance = BigNumber(lockedBalance).shiftedBy(-ERC20_DECIMALS)
        lockedBalance = lockedBalance.toFixed(2)
        this.setState({ lockedBalance: lockedBalance.toString() })
        let releasedBalance = await yieldFarming.methods.unlockedBalance(this.state.account).call()
        releasedBalance = BigNumber(releasedBalance).shiftedBy(-ERC20_DECIMALS)
        releasedBalance = releasedBalance.toFixed(2)
        this.setState({ releasedBalance: releasedBalance.toString() })
        let redeemedBalance = await yieldFarming.methods.redeemedBalance(this.state.account).call()
        redeemedBalance = BigNumber(redeemedBalance).shiftedBy(-ERC20_DECIMALS)
        redeemedBalance = redeemedBalance.toFixed(2)
        this.setState({ redeemedBalance: redeemedBalance.toString() })
        let time = await yieldFarming.methods.lastRelease(this.state.account).call()
        this.setState({ time: time.toString() })
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
        console.log({ error })
        //this.setState({ loading: false })
      }
    } else {
      //notification("⚠️ Please install the CeloExtensionWallet.")
      console.log("Error! - Else section")
    }
  }

  // Function sections

  releaseToken = () => {
    this.setState({ loading: true })
    this.state.yieldFarming.methods.releaseTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }


  redeemToken = (amount) => {
    amount = BigNumber(amount).shiftedBy(ERC20_DECIMALS)
    this.setState({ loading: true })
    this.state.yieldFarming.methods.redeemTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }


  render() {
    let content
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <VestingMain
        lockedBalance={this.state.lockedBalance}
        releasedBalance={this.state.releasedBalance}
        redeemedBalance={this.state.redeemedBalance}
        releaseToken={this.releaseToken}
        redeemToken={this.redeemToken}
      />
    }
    console.log("This is the current time", this.state.currentTime)
    console.log("This is the state time", (this.state.time))
    console.log("Difference", (this.state.currentTime) - this.state.time)
    if (this.state.currentTime - this.state.time <= 259200) {
      alert = <button type="button" className="btn btn-danger btn-lg btn-block">TOKENS CAN BE UNLOCKED EVERY 72 HOURS</button>
    } else {
      alert = <button type="submit" className="my-4 block-inline bg-primary text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
        onClick={(event) => {
          event.preventDefault()
          this.releaseToken(this.state.currentTime)
        }}>
        UNLOCK NEW TOKENS
      </button>
    }
    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <div className="row">
              <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
                <div className="">

                  <div className="d-grid">
                    <div className="border inline-block border-primary p-2">VESTING POOL</div>
                  </div>

                  {content}
                  {alert}
                  <div className="">
                    You can Unlock 1/60 part of your Helpi Balance every 3 Days
                  </div>

                </div>
              </main>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Vesting;
