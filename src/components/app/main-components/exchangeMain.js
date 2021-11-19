import React, { Component } from 'react'


class Main extends Component {

  render() {
    return (
      <>

        <div>
            <h1 class="text-black text-bold text-lg text-xl"><b>EXCHANGE TOKENS</b></h1>
        </div>

        <div class="container mx-auto">
            <div class="flex m-4 bg-emerald-200 border-2 shadow-lg border-green-500 p-4 rounded-lg opacity-50">
            <p class="text-black text-semibold text-justified text-md">
                Buy or Sell using your Tokens in your wallet
            </p>
            </div>
        </div>

        <div class="container mx-auto">
            <div class="flex m-4">
                <div class="flex-1 bg-yellow-400 m-4 p-4 shadow-lg rounded-lg">
                <h4 class="text-white text-center text-bold text-lg">{this.props.a} Reserve</h4>
                <p class="text-white text-center text-md">{(this.props.apoolBalance)} {(this.props.a)}</p>
                </div>
                <div class="flex-1 bg-blue-400 m-4 p-4 shadow-lg rounded-lg">
                <h4 class="text-white text-center text-bold text-lg">{this.props.b} Reserve</h4>
                <p class="text-white text-center text-md">{(this.props.bpoolBalance)} {(this.props.b)}</p>
                </div>

            </div>
        </div>

        <div class="flex flex-col mx-auto bg-white shadow-lg rounded-xl border-2 border-black-600 mb-6">
          <div class="flex w-full">
          <h1 class="text-black text-bold text-lg m-4 mb-2"><b> Buy {(this.props.a)}</b></h1>
          </div>

          <div class="flex flex-row m-2 mb-0">
            <div class="flex-1 w-1/2">
              <p class="text-black float-left text-semibold text-lg m-4">Wallet Balance: {this.props.bTokenBalance} {this.props.b}</p>
            </div>
            <div class="flex-1 w-1/2 ">
              <p class="text-black float-right text-bold text-lg m-4"><b>Exchange Rate: {this.props.exchangerate} {this.props.a} / {this.props.b}</b></p>
            </div>
          </div>

          <div class="flex flex-col m-1">
            <form className="mb-3" onSubmit={(event) =>
                {
                event.preventDefault()
                let aamount
                aamount = this.ainput.value.toString()
                this.props.a_b(aamount)
                }}>
                <div class="flex flex-row m-4 mt-1 shadow-lg">
                    <div class="flex w-full">
                    <input type="text" ref={(input) => { this.ainput = input }} className="flex-grow float-left" placeholder="Buying Quantity" required />
                    </div>
                    <div class="flex-none bg-red-400 items-center justify-center border border-black inline-block p-3">
                      <p class="text-white">{this.props.a}</p>
                    </div>
                </div>
                <div class="flex m-4 mb-2">
                    <button type="submit" className="block-inline bg-blueGray-800 text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow-lg hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full">BUY {this.props.a}</button>
                </div>
            </form>
          </div>
        </div>


        <div class="flex flex-col mx-auto bg-white shadow-lg rounded-xl border-2 border-black-600 mt-6">
          <div class="flex w-full">
          <h1 class="text-black text-bold text-lg m-4 mb-2"><b> SELL {(this.props.a)}</b></h1>
          </div>

          <div class="flex flex-row m-2 mb-0">
            <div class="flex-1 w-1/2">
              <p class="text-black float-left text-semibold text-lg m-4">Wallet Balance: {this.props.aTokenBalance} {this.props.a}</p>
            </div>
            <div class="flex-1 w-1/2 ">
              <p class="text-black float-right text-bold text-lg m-4"><b>Exchange Rate: {this.props.exchangerate} {this.props.a} / {this.props.b}</b></p>
            </div>
          </div>

          <div class="flex flex-col m-1">
            <form className="mb-3" onSubmit={(event) =>
                {
                event.preventDefault()
                let bamount
                bamount = this.binput.value.toString()
                this.props.b_a(bamount)
                }}>
                <div class="flex flex-row m-4 mt-1 shadow-lg">
                    <div class="flex w-full">
                    <input type="text" ref={(input) => { this.binput = input }} className="flex-grow float-left" placeholder="Selling Quantity" required />
                    </div>
                    <div class="flex-none bg-red-400 items-center justify-center border border-black inline-block p-3">
                      <p class="text-white">{this.props.a}</p>
                    </div>
                </div>
                <div class="flex m-4 mb-2">
                    <button type="submit" className="block-inline bg-blueGray-800 text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow-lg hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full">SELL {this.props.a}</button>
                </div>
            </form>
          </div>
        </div>


      </>
    );
  }
}

export default Main;
