import React, { Component } from 'react'


class YieldMain extends Component {

  render() {
    return (
      <>

        <div>
            <h1 class="text-black text-bold text-lg text-xl"><b>CLAIM REWARDS</b></h1>
        </div>

        <div class="container mx-auto">
            <div class="flex m-4 bg-emerald-200 border-2 shadow-lg border-green-500 p-4 rounded-lg opacity-50">
            <p class="text-black text-semibold text-justified text-md">
                Unlock a fraction of the locked rewards every <b>Three Days</b>. You can only claim the unlocked rewards into your account.
            </p>
            </div>
        </div>

        <div class="container mx-auto">
            <div class="flex m-4">
                <div class="flex-1 bg-red-400 m-4 p-4 shadow-lg rounded-lg">
                <h4 class="text-white text-center text-bold text-lg">LOCKED REWARDS</h4>
                <p class="text-white text-center text-md">{this.props.lockedBalance}</p>
                </div>
                <div class="flex-1 bg-blue-400 m-4 p-4 shadow-lg rounded-lg">
                <h4 class="text-white text-center text-bold text-lg">UNLOCKED REWARDS</h4>
                <p class="text-white text-center text-md">{this.props.releasedBalance}</p>
                </div>
                <div class="flex-1 bg-emerald-400 m-4 p-4 shadow-lg rounded-lg">
                <h4 class="text-white text-center text-bold text-lg">CLAIMED REWARDS</h4>
                <p class="text-white text-center text-md">{this.props.redeemedBalance}</p>
                </div>
            </div>
        </div>

        <div class="flex flex-col mx-auto bg-white shadow-lg rounded-xl border-2 border-black-600 mb-6">
          <div class="flex w-full">
          <h1 class="text-black text-bold text-lg m-4 mb-2"><b>CLAIM REWARDS</b></h1>
          </div>

          <div class="flex flex-row m-2 mb-0">
            <div class="flex-1 w-1/2">
              <p class="text-black float-left text-semibold text-lg m-4">Unlocked Balance: {this.props.releasedBalance} HLP</p>
            </div>
            <div class="flex-1 w-1/2 ">
              <p class="text-black float-right text-bold text-lg m-4"></p>
            </div>
          </div>

          <div class="flex flex-col m-1">
            <form className="mb-3" onSubmit={(event) =>
                {
                event.preventDefault()
                let amount
                amount = this.amount.value.toString()
                this.props.redeemToken(amount)
                }}>
                <div class="flex flex-row m-4 mt-1 shadow-lg">
                    <div class="flex w-full">
                    <input type="text" ref={(input) => { this.amount = input }} className="flex-grow float-left" placeholder="0" required />
                    </div>
                    <div class="flex-none bg-red-400 items-center justify-center border border-black inline-block p-3">
                      <p class="text-white">HLP</p>
                    </div>
                </div>
                <div class="flex m-4 mb-2">
                    <button type="submit" className="block-inline bg-blueGray-800 text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow-lg hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full">CLAIM REWARDS</button>
                </div>
            </form>
          </div>
        </div>

      </>
    );
  }
}

export default YieldMain;
