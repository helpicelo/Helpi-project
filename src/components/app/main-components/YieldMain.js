import React, { Component } from 'react'

class YieldMain extends Component {

  render() {
    return (
      <>
        <div>
            <h1 class="text-black text-bold text-lg text-xl"><b>STAKING POOLS</b></h1>
        </div>

        <div class="container mx-auto">
            <div class="flex m-4 bg-emerald-200 border-2 shadow-lg border-green-500 p-4 rounded-lg opacity-50">
            <p class="text-black text-semibold text-justified text-md">
                Stake <i>Celo</i> or <i>cUSD</i> and earn <i>Helpi Tokens</i> as a reward according to the Return rate. To earn more
                reward, stake the tokens for longer durations and keep contributing to the network every 24 hours or less through the <b>Contribute</b> Tab.
            </p>
            </div>
        </div>

        <div class="container mx-auto">
            <div class="flex m-4">
                <div class="flex-1 bg-yellow-400 m-4 p-4 shadow-lg rounded-lg">
                <h4 class="text-white text-center text-bold text-lg">LOCKED CELO</h4>
                <p class="text-white text-center text-md">{this.props.celostakingBalance}</p>
                </div>
                <div class="flex-1 bg-blue-400 m-4 p-4 shadow-lg rounded-lg">
                <h4 class="text-white text-center text-bold text-lg">LOCKED cUSD</h4>
                <p class="text-white text-center text-md">{this.props.cusdstakingBalance}</p>
                </div>
                <div class="flex-1 bg-emerald-400 m-4 p-4 shadow-lg rounded-lg">
                <h4 class="text-white text-center text-bold text-lg">HELPI REWARDS</h4>
                <p class="text-white text-center text-md">{this.props.helpiTokenBalance}</p>
                </div>
            </div>
        </div>

        <div class="flex flex-col mx-auto bg-white shadow-lg rounded-xl border-2 border-black-600 mb-6">
          <div class="flex w-full">
          <h1 class="text-black text-bold text-lg m-4 mb-2"><b>STAKE CELO</b></h1>
          </div>

          <div class="flex flex-row m-2 mb-0">
            <div class="flex-1 w-1/2">
              <p class="text-black float-left text-semibold text-lg m-4">Wallet Balance: {this.props.celoTokenBalance} Celo</p>
            </div>
            <div class="flex-1 w-1/2 ">
              <p class="text-black float-right text-bold text-lg m-4"><b>APR%: {this.props.celoAPR}</b></p>
            </div>
          </div>

          <div class="flex flex-col m-1">
            <form className="mb-3" onSubmit={(event) =>
                {
                event.preventDefault()
                let amount
                amount = this.celoamount.value.toString()
                this.props.stakeTokens(0, amount)
                }}>
                <div class="flex flex-row m-4 mt-1 shadow-lg">
                    <div class="flex w-full">
                    <input type="text" ref={(input) => { this.celoamount = input }} className="flex-grow float-left" placeholder="0" required />
                    </div>
                    <div class="flex-none bg-red-400 items-center justify-center border border-black inline-block p-3">
                      <p class="text-white">Celo</p>
                    </div>
                </div>
                <div class="flex m-4 mb-2">
                    <button type="submit" className="block-inline bg-blueGray-800 text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow-lg hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full">STAKE CELO!</button>
                </div>
            </form>
            <div class="flex mt-1 mb-5 mx-4">
                <button type="submit"
                className="block-inline bg-primary text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full"
                onClick={(event) =>
                {
                event.preventDefault()
                this.props.unstakeTokens(0)
                }}>
                UN-STAKE CELO...
                </button>
            </div>
          </div>
        </div>


        <div class="flex flex-col mx-auto bg-white shadow-lg rounded-xl border-2 border-black-600 mt-6">
          <div class="flex w-full">
          <h1 class="text-black text-bold text-lg m-4 mb-2"><b>STAKE cUSD</b></h1>
          </div>

          <div class="flex flex-row m-2 mb-0">
            <div class="flex-1 w-1/2">
              <p class="text-black float-left text-semibold text-lg m-4">Wallet Balance: {this.props.cusdTokenBalance} cUSD</p>
            </div>
            <div class="flex-1 w-1/2 ">
              <p class="text-black float-right text-bold text-lg m-4"><b>APR%: {this.props.cusdAPR}</b></p>
            </div>
          </div>

          <div class="flex flex-col m-1">
            <form className="mb-3" onSubmit={(event) =>
                {
                event.preventDefault()
                let amount
                amount = this.cusdamount.value.toString()
                this.props.stakeTokens(1, amount)
                }}>
                <div class="flex flex-row m-4 mt-1 shadow-lg">
                    <div class="flex w-full">
                    <input type="text" ref={(input) => { this.cusdamount = input }} className="flex-grow float-left" placeholder="0" required />
                    </div>
                    <div class="flex-none bg-red-400 items-center justify-center border border-black inline-block p-3">
                      <p class="text-white">cUSD</p>
                    </div>
                </div>
                <div class="flex m-4 mb-2">
                    <button type="submit" className="block-inline bg-blueGray-800 text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow-lg hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full">STAKE cUSD!</button>
                </div>
            </form>
            <div class="flex mt-1 mb-5 mx-4">
                <button type="submit"
                className="block-inline bg-primary text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full"
                onClick={(event) =>
                {
                event.preventDefault()
                this.props.unstakeTokens(0)
                }}>
                UN-STAKE cUSD...
                </button>
            </div>
          </div>
        </div>

      </>
    );
  }
}

export default YieldMain;
