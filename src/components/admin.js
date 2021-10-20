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
import AdminMain from './Main_components/adminMain'
import './App.css'

//contracts address
const ERC20_DECIMALS = 18
const yieldfarmingaddress = "0xd0f1c400f3CeFb2c41440c965dCF3c1107eB8560"
//const celoTokenaddress = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9"
//const cusdTokenaddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"
const helpiTokenaddress = "0x3d51e077bcCF32678d6FC3721Bfc2D105EB7652f"

//variables
let kit

class Admin extends Component {

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
            let admin = await yieldFarming.methods.owner().call()
            this.setState({ admin: admin.toString() })

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

  issueTokens = () =>{
    this.setState({ loading: true})
    this.state.yieldFarming.methods.issueTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false})
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      admin: '0x0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading){
        content = <p id="loader" className="text-center">Loading...</p>
    }else if (this.state.account == this.state.admin){
        content = <AdminMain
            issueTokens = {this.issueTokens}
        />
    }else{
        content = <button type="button" class="btn btn-danger btn-lg btn-block">ACCESS DENIED! YOU ARE NOT ADMIN</button>
    }
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">

              <div class="d-grid">
                 <button type="button" class="btn btn-outline-danger btn-lg btn-block">ADMIN PAGE</button>
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

export default Admin;
