import React, { Component } from 'react'


class Main extends Component {

  render() {
    return (
      <>

        <div class="container mx-auto">
            <div class="flex m-4 bg-emerald-200 border-2 shadow-lg border-green-500 p-4 rounded-lg opacity-50">
                <p class="text-black text-semibold text-justified text-md">
                Now Directly Send <b>{this.props.a}</b> or <b>{this.props.b}</b> to anyone without having to swap currencies
                already in your wallet.
                <br></br><br></br>
                <i>Example: Jake send 100 <i>{this.props.a}</i> to Amy, however Amy will recieve {100 * this.props.exchangerate} <i>{this.props.b}</i> into her wallet, which is
                the equivalent amount in her local currency when excahnged at the current exchange rate of {this.props.exchangerate}.</i>
                </p>
            </div>
        </div>

        <div class="container mx-auto">
            <div class="flex m-4">
                <div class="flex-1 bg-yellow-400 m-4 p-4 shadow-lg rounded-lg">
                <h4 class="text-white text-center text-bold text-lg">{this.props.a} POOL</h4>
                <p class="text-white text-center text-md">{this.props.apoolBalance}</p>
                </div>
                <div class="flex-1 bg-blue-400 m-4 p-4 shadow-lg rounded-lg">
                <h4 class="text-white text-center text-bold text-lg">{this.props.b} POOL</h4>
                <p class="text-white text-center text-md">{this.props.bpoolBalance}</p>
                </div>
                <div class="flex-1 bg-emerald-400 m-4 p-4 shadow-lg rounded-lg">
                <h4 class="text-white text-center text-bold text-lg">EXCHANGE RATE</h4>
                <p class="text-white text-center text-md">{this.props.exchangerate} {this.props.b} / {this.props.a}</p>
                </div>
            </div>
        </div>

        <div class="flex flex-col mx-auto bg-white shadow-lg rounded-xl border-2 border-black-600 mb-6">
          <div class="flex w-full">
          <h1 class="text-black text-bold text-lg m-4 mb-2"><b>{this.props.a} - {this.props.b}</b></h1>
          </div>

          <div class="flex flex-row m-2 mb-0">
            <div class="flex-1 w-1/2">
              <p class="text-black float-left text-semibold text-lg ml-4">Wallet Balance: {this.props.aTokenBalance} {this.props.a}</p>
            </div>
            <div class="flex-1 w-1/2 ">
              <p class="text-black float-right text-bold text-lg"></p>
            </div>
          </div>

          <div class="flex flex-col m-1">
            <form className="mb-3" onSubmit={(event) =>
                {
                event.preventDefault()
                let ato
                let aamount
                ato = this.ato.value
                aamount = this.aamount.value.toString()
                this.props.a_b(ato, aamount)
                }}>
                <div class="flex flex-col m-4 mt-1 shadow-lg">
                    <div class="flex mt-2 mb-2">
                    <input type="text" ref={(input) => { this.ato = input }} className="flex-grow float-left" placeholder="Enter Receiver Address" required />
                    </div>
                    <div class="flex mt-2 mb-2">
                    <input type="text" ref={(input) => { this.aamount = input }} className="flex-grow float-left" placeholder="Enter Amount to be sent" required />
                    </div>

                </div>
                <div class="flex m-4 mb-2">
                    <button type="submit" className="block-inline bg-blueGray-800 text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow-lg hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full">SEND FUNDS</button>
                </div>
            </form>
          </div>
        </div>

      </>
    );
  }
}

export default Main;
