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


//contracts address
const ERC20_DECIMALS = 18

//variables
let kit

class Home extends Component {

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
            console.log("Home Account connected")

            console.log("All Home Contracts loaded")

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
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">


                <h1>Index Page</h1>
                <p>This will be the landing page of the site</p>


              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;