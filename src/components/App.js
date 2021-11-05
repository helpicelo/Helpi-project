import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom';
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';
import BigNumber from "bignumber.js";

// token contracts
import USDToken from '../abis/USDToken.json'
import INRToken from '../abis/INRToken.json'
import TokenSwitch from '../abis/TokenSwitch.json'

// components
import Navbar from './Navbar'
import './App.css'
import Yield from './yield.js'
import Home from './Home.js'
import USDINR from './Token_components/usd_inr.js'
import USDPESO from './Token_components/usd_peso.js'
import INRPESO from './Token_components/inr_peso.js'
import Vesting from './vestingtry.js'
import Admin from './admin.js'
import Contribute from './contribute.js'
import Staking from './staking.js'

//contracts address
const ERC20_DECIMALS = 18

//variables
let kit

class App extends Component {

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
            console.log("App Account connected")

            console.log("App Page loaded")

         } catch (error) {
             //notification(`⚠️ ${error}.`)
             console.log("Error! -  App Catch section")
             //this.setState({ loading: false })
         }
     } else {
            //notification("⚠️ Please install the CeloExtensionWallet.")
            console.log("Error! - Else section")
     }
  }

  // Function sections


  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading){
        content = <p id="loader" className="text-center">Loading...</p>
    }
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">

              <Route exact path="/" component = {Home}/>
              <Route exact path="/yield" component = {Staking}/>
              <Route exact path="/vesting" component = {Vesting}/>
              <Route exact path="/admin" component = {Admin}/>
              <Route exact path="/usd-inr" component = {USDINR}/>
              <Route exact path="/usd-peso" component = {USDPESO}/>
              <Route exact path="/inr-peso" component = {INRPESO}/>
              <Route exact path="/contribute" component = {Contribute}/>

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
