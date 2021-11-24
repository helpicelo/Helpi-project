import React, { Component } from 'react'
import CardInfo from '../../Cards/CardInfo.js'
import Pill from '../../Pills/pills.js'

class YieldMain extends Component {

  render() {

    let information =
    <p>
        Stake <i>{this.props.tokenName}</i> and earn <i>Helpi Tokens</i> as a reward according to the Return rate. To earn more
        reward, stake the tokens for longer durations and keep contributing to the network every 24 hours or less through the <b>Contribute</b> Tab.
    </p>

    return (
      <>

        {CardInfo(information)}

        <div class="container mx-auto">
            <div class="flex m-4">
                {Pill("yellow", "LOCKED " + this.props.tokenName, this.props.stakingBalance)}
                {Pill("emerald", "HELPI REWARDS", this.props.helpiTokenBalance)}
            </div>
        </div>

        <div class="flex flex-col mx-auto bg-white shadow-lg rounded-xl border-2 border-black-600 mb-6">
          <div class="flex w-full">
          <h1 class="text-black text-bold text-lg m-4 mb-2"><b>STAKE {this.props.tokenName}</b></h1>
          </div>

          <div class="flex flex-row m-2 mb-0">
            <div class="flex-1 w-1/2">
              <p class="text-black float-left text-semibold text-lg m-4">Wallet Balance: {this.props.TokenBalance} {this.props.tokenName}</p>
            </div>
            <div class="flex-1 w-1/2 ">
              <p class="text-black float-right text-bold text-lg m-4"><b>APR%: {this.props.APR}</b></p>
            </div>
          </div>

          <div class="flex flex-col m-1">
            <form className="mb-3" onSubmit={(event) =>
                {
                event.preventDefault()
                let amount
                amount = this.celoamount.value.toString()
                this.props.stakeTokens(this.props.tokenName, amount)
                }}>
                <div class="flex flex-row m-4 mt-1 shadow-lg">
                    <div class="flex w-full">
                    <input type="text" ref={(input) => { this.celoamount = input }} className="flex-grow float-left" placeholder="0" required />
                    </div>
                    <div class="flex-none bg-red-400 items-center justify-center border border-black inline-block p-3">
                      <p class="text-white">{this.props.tokenName}</p>
                    </div>
                </div>
                <div class="flex m-4 mb-2">
                    <button type="submit" className="block-inline bg-blueGray-800 text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow-lg hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full">STAKE {this.props.tokenName}!</button>
                </div>
            </form>
            <div class="flex mt-1 mb-5 mx-4">
                <button type="submit"
                className="block-inline bg-primary text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full"
                onClick={(event) =>
                {
                event.preventDefault()
                this.props.unstakeTokens(this.props.tokenName)
                }}>
                UN-STAKE {this.props.tokenName}...
                </button>
            </div>
          </div>
        </div>

      </>
    );
  }
}

export default YieldMain;
