import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom';
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';
import BigNumber from "bignumber.js";
import Tokenaddress from '../../tokenaddress.json';

// token contracts
import ERCToken from '../../abis/IERC20Token.json' //ERC20
import MutateToken from '../../abis/MutateToken.json'

// components
import Navbar from './../Navbar'
import TokenMain from '../Main_components/Main'
import './../App.css'
import Yield from './../yield.js'
import Home from './../Home.js'

//contracts address
const ERC20_DECIMALS = 18
const mutatetokenaddress = Tokenaddress.MUTATE
const aTokenaddress = Tokenaddress.USDT
const bTokenaddress = Tokenaddress.cPESO

//variables
let kit


class USD_cPESO extends Component {

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
            const mutatetoken = new kit.web3.eth.Contract(MutateToken.abi, mutatetokenaddress)
            this.setState({ mutatetoken })
            /*let exchangerate = await tokenSwitch.methods.exchangerate().call()
            this.setState({ exchangerate: exchangerate.toString() })*/
            console.log("Mutate Token loaded")

            //USD token contract
            const atoken = new kit.web3.eth.Contract(ERCToken.abi, aTokenaddress)
            this.setState({ atoken })
            let aTokenBalance = await atoken.methods.balanceOf(this.state.account).call()
            aTokenBalance = BigNumber(aTokenBalance).shiftedBy(-ERC20_DECIMALS)
            this.setState({ aTokenBalance: aTokenBalance.toString() })
            let apoolBalance = await atoken.methods.balanceOf(mutatetokenaddress).call()
            apoolBalance = BigNumber(apoolBalance).shiftedBy(-ERC20_DECIMALS)
            this.setState({ apoolBalance: apoolBalance.toString() })
            console.log("a Token loaded")

            //cPESO Token
            const btoken = new kit.web3.eth.Contract(ERCToken.abi, bTokenaddress)
            this.setState({ btoken})
            let bTokenBalance = await btoken.methods.balanceOf(this.state.account).call()
            bTokenBalance = BigNumber(bTokenBalance).shiftedBy(-ERC20_DECIMALS)
            this.setState({ bTokenBalance: bTokenBalance.toString() })
            let bpoolBalance = await btoken.methods.balanceOf(mutatetokenaddress).call()
            bpoolBalance = BigNumber(bpoolBalance).shiftedBy(-ERC20_DECIMALS)
            this.setState({ bpoolBalance: bpoolBalance.toString() })
            console.log("b Token loaded")


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
  // USDT(a) - cPESO(b)
  a_b = (ato, aamount) => {
    this.setState({ loading: true})
    aamount = BigNumber(aamount).shiftedBy(ERC20_DECIMALS)
    this.state.aToken.methods.approve(this.state.mutatetoken._address, aamount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.mutatetoken.methods.mutate(aTokenaddress, bTokenaddress, ato, aamount, this.state.exchangerate, true).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false})
      })
    })
  }

  b_a = (bto, bamount) => {
    this.setState({ loading: true})
    bamount = BigNumber(bamount).shiftedBy(ERC20_DECIMALS)
    this.state.aToken.methods.approve(this.state.mutatetoken._address, bamount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.mutatetoken.methods.mutate(aTokenaddress, bTokenaddress, bto, bamount, this.state.exchangerate, false).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false})
      })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      a: 'USDT',
      b: 'cPESO',
      atoken: {},
      btoken: {},
      mutatetoken: {},
      aTokenBalance: '0',
      bTokenBalance: '0',
      apoolBalance: '0',
      bpoolBalance: '0',
      exchangerate: '3756',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading){
        content = <p id="loader" className="text-center">Loading...</p>
    }else{
        content = <TokenMain
            a = {this.state.a}
            b = {this.state.b}
            aTokenBalance = {this.state.aTokenBalance}
            bTokenBalance = {this.state.bTokenBalance}
            apoolBalance = {this.state.apoolBalance}
            bpoolBalance = {this.state.bpoolBalance}
            exchangerate = {this.state.exchangerate}
            a_b = {this.a_b}
            b_a = {this.b_a}
        />
    }
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                 <div class="d-grid">
                 <button type="button" class="btn btn-outline-danger btn-lg btn-block">{this.state.a}-{this.state.b} POOL</button>
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

export default USD_cPESO;
