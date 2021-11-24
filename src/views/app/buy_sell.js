import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom';
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';
import BigNumber from "bignumber.js";
import Tokenaddress from 'tokenaddress.json';
import Currency from 'CurrencyToken.json';

//Importing Utilities
import {connectWallet} from '../../Utilis/connectWallet.js';
import {loadContract} from '../../Utilis/ContractUtilis.js';
import {formatBalance} from '../../Utilis/ContractUtilis.js';
import {loadTokens} from '../../Utilis/ContractUtilis.js';

// token contracts
import ERCToken from 'abis/IERC20Token.json' //ERC20
import Exchange from 'abis/ExchangeContract.json'

// components
import TokenMain from '../../components/app/exchangeMain'
import TitlePill from '../../components/Pills/TitlePill.js'

//variables **Change needed here
let kit
//currencies to convert with currency code
let a_currency = "INR"
let b_currency = "CELO"
// tokens for that currencies
let a_token = "hINR"
let b_token = "CELO"

//contracts address
const ERC20_DECIMALS = 18
const contractaddress = Tokenaddress.BUY_SELL
const aTokenaddress = Tokenaddress.INRT
const bTokenaddress = Tokenaddress.CELO


class USD_INR extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      a: "hUSD",
      b: "CELO",
      aToken: {},
      bToken: {},
      contract: {},
      aTokenBalance: '0',
      bTokenBalance: '0',
      apoolBalance: '0',
      bpoolBalance: '0',
      exchangerate: '5.49',
      amount: '0',
      loading: true
    }
    this.handleChange = this.handleChange.bind(this)
  }

  // This will call the celo blockchain data functions function and load the web3
  async componentWillMount() {
    let accounts = await connectWallet();
    this.setState({account: accounts})
    await this.loadingContracts()
    await this.loadingTokens(Currency[this.state.a].address, Currency["CELO"].address)
    //await this.getExchangeRate()
  }

  loadingContracts = async function () {
      try {
        const web3 = new Web3(window.celo);
        kit = newKitFromWeb3(web3);

        //contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress)
        // tokenswitch address
        const contract = await loadContract(Exchange.abi, contractaddress)
        this.setState({ contract })
        console.log("Exchange Token loaded")

      } catch (error) {
        console.log("Error! -  Main Contract section")
        console.log({ error })
      }
  }

  loadingTokens = async function (address_a, address_b) {
      try {
        const web3 = new Web3(window.celo);
        kit = newKitFromWeb3(web3);
        this.setState({ loading: false })

        let aToken = await loadTokens(address_a, this.state.account, contractaddress)
        this.setState({aToken: aToken.contract})
        this.setState({aTokenBalance: aToken.accountBalance})
        this.setState({apoolBalance: aToken.contractBalance})

        let bToken = await loadTokens(address_b, this.state.account, contractaddress)
        this.setState({bToken: bToken.contract})
        this.setState({bTokenBalance: bToken.accountBalance})
        this.setState({bpoolBalance: bToken.contractBalance})


      } catch (error) {
        console.log("Error! -  Token section")
        console.log({ error })
      }
  }

   updateValue = async function (atoken){
    this.setState({aTokenaddress: Currency[atoken].address})
    let exchangevalue = Currency[atoken].exchange_rate * Currency["CELO"].exchange_rate
    exchangevalue = exchangevalue.toFixed(2)
    this.setState({exchangerate: exchangevalue})
    this.loadingTokens(Currency[atoken].address, Currency["CELO"].address)

    console.log("We are in the update function")
  }

  // Function sections
  // Sell INR(a)
  buy_a = (aamount) => {
    let mul
    this.setState({ loading: true})
    aamount = BigNumber(aamount).shiftedBy(ERC20_DECIMALS)
    let new_exchangerate = BigNumber(this.state.exchangerate).shiftedBy(2)
    if(this.state.exchangerate > 0){
        let mul = false
    }else{ mul = true }
    this.state.bToken.methods.approve(this.state.contract._address, aamount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.contract.methods.buyToken(this.state.aToken._address, this.state.bToken._address, aamount, new_exchangerate, mul).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false})
      })
    })
  }

  sell_a = (bamount) => {
    let mul
    this.setState({ loading: true})
    bamount = BigNumber(bamount).shiftedBy(ERC20_DECIMALS)
    let new_exchangerate = BigNumber(this.state.exchangerate).shiftedBy(2)
    if(this.state.exchangerate > 0){
        let mul = false
    }else{ mul = true }
    this.state.aToken.methods.approve(this.state.contract._address, bamount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.contract.methods.sellToken(this.state.bToken._address, this.state.aToken._address, bamount, new_exchangerate, mul).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false})
      })
    })
  }

  handleChange = event => {
        let a = event.target.value
        this.setState({a: event.target.value})
        this.updateValue(event.target.value)

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
            buy_a = {this.buy_a}
            sell_a = {this.sell_a}

        />
    }
    let a =
    <select class="flex w-full rounded-none text-center text-lg text-white bg-red-400 border-white-400" onChange={this.handleChange}>
        <option class="bg-white text-black" value="hUSD">BUY / SELL hUSD</option>
        <option class="bg-white text-black" value="hINR">BUY / SELL hINR</option>
        <option class="bg-white text-black"value="hPESO">BUY / SELL hPESO</option>
    </select>
    let b = <></>

    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '80%' }}>
              <div className="content mr-auto ml-auto">

                {TitlePill(a,b)}
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

