import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';

let kit;

let connectWallet = async function () {
    if (window.celo) {
      try {
        //notification("⚠ Please approve this DApp to use it.")
        await window.celo.enable();
        //notificationOff()
        const web3 = new Web3(window.celo);
        kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        kit.defaultAccount = accounts[0];
        return accounts[0];
        //this.setState({ account: accounts[0] })
        //console.log({account})

      } catch (error) {
        //notification(`⚠️ ${error}.`)
        console.log("Error! -  Catch section");
        console.log({ error });
        //this.setState({ loading: false })
      }
    } else {
      //notification("⚠️ Please install the CeloExtensionWallet.")
      console.log("Error! - Else section");
    }
  };

export {connectWallet};