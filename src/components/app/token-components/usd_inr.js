import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom';
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';
import BigNumber from "bignumber.js";
import Tokenaddress from 'tokenaddress.json';

// token contracts
import ERCToken from 'abis/IERC20Token.json' //ERC20
import MutateToken from 'abis/MutateToken.json'

// components
import TokenMain from '../main-components/Main'

//variables **Change needed here
let kit
//currencies to convert with currency code
let a_currency = "USD"
let b_currency = "INR"
// tokens for that currencies
let a_token = "hUSD"
let b_token = "hINR"

//contracts address
const ERC20_DECIMALS = 18
const mutatetokenaddress = Tokenaddress.MUTATE
const aTokenaddress = Tokenaddress.USDT
const bTokenaddress = Tokenaddress.INRT


class USD_INR extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      a: a_token,
      b: b_token,
      atoken: {},
      btoken: {},
      mutatetoken: {},
      aTokenBalance: '0',
      bTokenBalance: '0',
      apoolBalance: '0',
      bpoolBalance: '0',
      exchangerate: '75',
      amount: '0',
      loading: true
    }
  }

  // This will call the celo blockchain data functions function and load the web3
  async componentWillMount() {
    await this.connectCeloWallet()
    await this.getExchangeRate()
  }

   getExchangeRate = async function () {
      var URL = Tokenaddress.URL + a_currency + "&to=" + b_currency
      const response = await fetch(URL);
      const data = await response.json();
      this.setState({ exchangerate: data.result.toFixed(2) })
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
            console.log("aToken loaded")
            let aTokenBalance = await atoken.methods.balanceOf(this.state.account).call()
            aTokenBalance = BigNumber(aTokenBalance).shiftedBy(-ERC20_DECIMALS)
            aTokenBalance = aTokenBalance.toFixed(2)
            this.setState({ aTokenBalance: aTokenBalance.toString() })
            console.log("aTokenbalance loaded")
            let apoolBalance = await atoken.methods.balanceOf(mutatetokenaddress).call()
            apoolBalance = BigNumber(apoolBalance).shiftedBy(-ERC20_DECIMALS)
            apoolBalance = apoolBalance.toFixed(2)
            this.setState({ apoolBalance: apoolBalance.toString() })
            console.log("a Token loaded")

            //cPESO Token
            const btoken = new kit.web3.eth.Contract(ERCToken.abi, bTokenaddress)
            this.setState({ btoken})
            let bTokenBalance = await btoken.methods.balanceOf(this.state.account).call()
            bTokenBalance = BigNumber(bTokenBalance).shiftedBy(-ERC20_DECIMALS)
            bTokenBalance = bTokenBalance.toFixed(2)
            this.setState({ bTokenBalance: bTokenBalance.toString() })
            let bpoolBalance = await btoken.methods.balanceOf(mutatetokenaddress).call()
            bpoolBalance = BigNumber(bpoolBalance).shiftedBy(-ERC20_DECIMALS)
            bpoolBalance = bpoolBalance.toFixed(2)
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
    let new_exchangerate = BigNumber(this.state.exchangerate).shiftedBy(2)
    this.state.atoken.methods.approve(this.state.mutatetoken._address, aamount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.mutatetoken.methods.mutate(aTokenaddress, bTokenaddress, ato, aamount, new_exchangerate, true).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false})
      })
    })
  }

  b_a = (bto, bamount) => {
    this.setState({ loading: true})
    bamount = BigNumber(bamount).shiftedBy(ERC20_DECIMALS)
    let new_exchangerate = BigNumber(this.state.exchangerate).shiftedBy(2)
    this.state.btoken.methods.approve(this.state.mutatetoken._address, bamount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.mutatetoken.methods.mutate(bTokenaddress, aTokenaddress, bto, bamount, new_exchangerate, false).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false})
      })
    })
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

export default USD_INR;
