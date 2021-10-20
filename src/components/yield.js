import React, { Component } from 'react'
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';
import BigNumber from "bignumber.js";

// token contracts
import USDToken from '../abis/USDToken.json'
import INRToken from '../abis/INRToken.json'
import HelpiToken from '../abis/HELPIToken.json'
import YieldFarming from '../abis/YieldFarming.json'
import CELOToken from '../abis/IERC20Token.json'
import cUSDToken from '../abis/IERC20Token.json'

// components
import Navbar from './Navbar'
import YieldMain from './Main_components/YieldMain'
import './App.css'

//contracts address
const ERC20_DECIMALS = 18
const yieldfarmingaddress = "0xd0f1c400f3CeFb2c41440c965dCF3c1107eB8560"
const celoTokenaddress = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9"
const cusdTokenaddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"
const helpiTokenaddress = "0x3d51e077bcCF32678d6FC3721Bfc2D105EB7652f"

//variables
let kit

class Yield extends Component {

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
            //console.log({account})

            this.setState({ loading: false })
            console.log("Yield Account connected")

            //contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress)
            // tokenswitch address
            const yieldFarming = new kit.web3.eth.Contract(YieldFarming.abi, yieldfarmingaddress)
            this.setState({ yieldFarming })
            console.log("Yield farming connected")
            let apr = await yieldFarming.methods.apr().call()
            this.setState({ apr: apr.toString() })
            console.log("APR")
            let celostakingBalance = await yieldFarming.methods.celostakingBalance(this.state.account).call()
            celostakingBalance = BigNumber(celostakingBalance).shiftedBy(-ERC20_DECIMALS)
            this.setState({ celostakingBalance: celostakingBalance.toString() })
            console.log("Celo")
            let cusdstakingBalance = await yieldFarming.methods.cusdstakingBalance(this.state.account).call()
            cusdstakingBalance = BigNumber(cusdstakingBalance).shiftedBy(-ERC20_DECIMALS)
            this.setState({ cusdstakingBalance: cusdstakingBalance.toString() })
            console.log("CUSD")
            let helpiTokenBalance = await yieldFarming.methods.vestedamount(this.state.account).call()
            console.log("helpi balce")
            helpiTokenBalance = BigNumber(helpiTokenBalance).shiftedBy(-ERC20_DECIMALS)
            this.setState({ helpiTokenBalance: helpiTokenBalance.toString() })
            console.log("Yield Farming loaded")

            //Celo and cusd token contract
            let celoToken = await new kit.web3.eth.Contract(CELOToken.abi, celoTokenaddress)
            this.setState({ celoToken })
            console.log("cusd")
            let celoTokenBalance = await celoToken.methods.balanceOf(this.state.account).call()
            celoTokenBalance = BigNumber(celoTokenBalance).shiftedBy(-ERC20_DECIMALS)
            this.setState({ celoTokenBalance: celoTokenBalance.toString() })
            let cusdToken = new kit.web3.eth.Contract(cUSDToken.abi, cusdTokenaddress)
            this.setState({ cusdToken })
            let cusdTokenBalance = await cusdToken.methods.balanceOf(this.state.account).call()
            cusdTokenBalance = BigNumber(cusdTokenBalance).shiftedBy(-ERC20_DECIMALS)
            this.setState({ cusdTokenBalance: cusdTokenBalance.toString() })
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
             console.log({error})
             //this.setState({ loading: false })
         }
     } else {
            //notification("⚠️ Please install the CeloExtensionWallet.")
            console.log("Error! - Else section")
     }
  }

  // Function sections

  stakeTokens = (tokentype, amount) => {
    this.setState({ loading: true})
    amount = BigNumber(amount).shiftedBy(ERC20_DECIMALS)
    if(tokentype == 0){
    this.state.celoToken.methods.approve(this.state.yieldFarming._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.yieldFarming.methods.stakeToken(tokentype, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false})
      })
    })
    }
    else{
    this.state.cusdToken.methods.approve(this.state.yieldFarming._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.yieldFarming.methods.stakeToken(tokentype, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false})
      })
    })
    }

  }

  unstakeTokens = (tokentype) =>{
    this.setState({ loading: true})
    this.state.yieldFarming.methods.unstakeTokens(tokentype).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false})
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
      apr: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading){
        content = <p id="loader" className="text-center">Loading...</p>
    }else{
        content = <YieldMain
            cusdTokenBalance = {this.state.cusdTokenBalance}
            celoTokenBalance = {this.state.celoTokenBalance}
            helpiTokenBalance = {this.state.helpiTokenBalance}
            apr = {this.state.apr}
            celostakingBalance = {this.state.celostakingBalance}
            cusdstakingBalance = {this.state.cusdstakingBalance}
            stakeTokens = {this.stakeTokens}
            unstakeTokens = {this.unstakeTokens}
        />
    }
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">

              <div class="d-grid">
                 <button type="button" class="btn btn-outline-danger btn-lg btn-block">YIELD FARMING</button>
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

export default Yield;
