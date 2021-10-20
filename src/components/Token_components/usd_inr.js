import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom';
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';
import BigNumber from "bignumber.js";

// token contracts
import USDToken from '../../abis/USDToken.json'
import INRToken from '../../abis/INRToken.json'
import TokenSwitch from '../../abis/TokenSwitch.json'

// components
import Navbar from './../Navbar'
import TokenMain from '../Main_components/usdinrMain'
import './../App.css'
import Yield from './../yield.js'
import Home from './../Home.js'

//contracts address
const ERC20_DECIMALS = 18
const tokenSwitchaddress = "0x97B214B677192a37E678634236117bb582084039"
const usdTokenaddress = "0x805eA44C59Fd03078059F1b4ab3917Fc87EC6c95"
const inrTokenaddress = "0x7de46513ED9dD3E6f3232af8f30a7d2b88a73a2D"

//variables
let kit

class USD_INRT extends Component {

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
            console.log("Account connected")

            //contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress)
            // tokenswitch address
            const tokenSwitch = new kit.web3.eth.Contract(TokenSwitch.abi, tokenSwitchaddress)
            this.setState({ tokenSwitch })
            let exchangerate = await tokenSwitch.methods.exchangerate().call()
            this.setState({ exchangerate: exchangerate.toString() })
            console.log("Token switch loaded")

            //usd token contract
            const usdToken = new kit.web3.eth.Contract(USDToken.abi, usdTokenaddress)
            this.setState({ usdToken })
            let usdTokenBalance = await usdToken.methods.balanceOf(this.state.account).call()
            usdTokenBalance = BigNumber(usdTokenBalance).shiftedBy(-ERC20_DECIMALS)
            this.setState({ usdTokenBalance: usdTokenBalance.toString() })
            let usdpoolBalance = await usdToken.methods.balanceOf(tokenSwitchaddress).call()
            usdpoolBalance = BigNumber(usdpoolBalance).shiftedBy(-ERC20_DECIMALS)
            this.setState({ usdpoolBalance: usdpoolBalance.toString() })
            console.log("USDT loaded")

            //inrtoken
            const inrToken = new kit.web3.eth.Contract(INRToken.abi, inrTokenaddress)
            this.setState({ inrToken})
            let inrTokenBalance = await inrToken.methods.balanceOf(this.state.account).call()
            inrTokenBalance = BigNumber(inrTokenBalance).shiftedBy(-ERC20_DECIMALS)
            this.setState({ inrTokenBalance: inrTokenBalance.toString() })
            let inrpoolBalance = await inrToken.methods.balanceOf(tokenSwitchaddress).call()
            inrpoolBalance = BigNumber(inrpoolBalance).shiftedBy(-ERC20_DECIMALS)
            this.setState({ inrpoolBalance: inrpoolBalance.toString() })
            console.log("INRT loaded")


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

  usdt_inrt = (to, inramount) => {
    this.setState({ loading: true})
    inramount = BigNumber(inramount).shiftedBy(ERC20_DECIMALS)
    this.state.usdToken.methods.approve(this.state.tokenSwitch._address, inramount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.tokenSwitch.methods.usdt_inrt(to, inramount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false})
      })
    })
  }

  inrt_usdt = (usdto, usdamount) => {
    this.setState({ loading: true})
    usdamount = BigNumber(usdamount).shiftedBy(ERC20_DECIMALS)
    this.state.inrToken.methods.approve(this.state.tokenSwitch._address, usdamount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.tokenSwitch.methods.inrt_usdt(usdto, usdamount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false})
      })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      usdToken: {},
      inrToken: {},
      tokenSwitch: {},
      usdTokenBalance: '0',
      inrTokenBalance: '0',
      usdpoolBalance: '0',
      inrpoolBalance: '0',
      exchangerate: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading){
        content = <p id="loader" className="text-center">Loading...</p>
    }else{
        content = <TokenMain
            usdTokenBalance = {this.state.usdTokenBalance}
            inrTokenBalance = {this.state.inrTokenBalance}
            usdpoolBalance = {this.state.usdpoolBalance}
            inrpoolBalance = {this.state.inrpoolBalance}
            exchangerate = {this.state.exchangerate}
            usdt_inrt = {this.usdt_inrt}
            inrt_usdt = {this.inrt_usdt}
        />
    }
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                 <div class="d-grid">
                 <button type="button" class="btn btn-outline-danger btn-lg btn-block">USD-INRT POOL</button>
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

export default USD_INRT;
