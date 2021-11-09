import React, { useEffect } from "react";
import { createPopper } from "@popperjs/core";
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';

//variables
let kit


const UserDropdown = (props) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);

  const [account, setAccount] = React.useState("");
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };


  const connectCeloWallet = async function () {
    if (window.celo) {
      try {
        //notification("⚠ Please approve this DApp to use it.")
        await window.celo.enable()
        //notificationOff()
        const web3 = new Web3(window.celo)
        kit = newKitFromWeb3(web3)

        const accounts = await kit.web3.eth.getAccounts()
        kit.defaultAccount = accounts[0]
        setAccount(accounts[0])
        //console.log({account})

        //  this.setState({ loading: false })
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


  useEffect(() => {
    connectCeloWallet()
  }, [])

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            {account != "" ? <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/375px-MetaMask_Fox.svg.png"
            /> : <span className="z-10 absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center">
              <i className="fas fa-question text-4xl"></i>
            </span>}
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-secondary"
          }
          onClick={(e) => e.preventDefault()}
        >
          {account}
        </a>
        {/* <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-secondary"
          }
          onClick={(e) => e.preventDefault()}
        >
          Action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-secondary"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-secondary"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-secondary"
          }
          onClick={(e) => e.preventDefault()}
        >
          Seprated link
        </a> */}
      </div>
    </>
  );
};

export default UserDropdown;
