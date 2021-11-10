import React, { Component } from 'react'

class YieldMain extends Component {

  render() {
    return (
      <div id="content" className="mt-3">

        <div class="d-grid">
          <p type="button" class="btn btn-info btn-lg btn-block">
            Stake <i>Celo</i> or <i>cUSD</i> and earn <i>Helpi Tokens</i> as a reward according to the Return rate. To earn more
            reward, stake the tokens for longer durations and keep contributing to the network every 24 hours or less through the <b>Contribute</b> Tab.
          </p>
        </div>

        <table className="table-auto w-full text-muted text-center">
          <thead>
            <tr>
              <th scope="col"><i>Staked Celo</i></th>
              <th scope="col"><i>Staked cUSD</i></th>
              <th scope="col"><i>HELPI Rewards</i></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><i>{(this.props.celostakingBalance)} CELO</i></td>
              <td><i>{(this.props.cusdstakingBalance)} cUSD</i></td>
              <td><i>{(this.props.helpiTokenBalance)} HLP</i></td>
            </tr>
          </tbody>
        </table>


        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
              event.preventDefault()
              let amount
              amount = this.celoamount.value.toString()
              this.props.stakeTokens(0, amount)
            }}>
              <h4 className="text-2xl">Stake Celo Tokens</h4>
              <div className="input-group mb-4">
                <label htmlFor="" className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="text-gray-700">
                      Wallet Balance: {(this.props.celoTokenBalance)} CELO
                    </span>
                    <span className="">APR: {(this.props.celoAPR)}%</span>
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      ref={(input) => { this.celoamount = input }}
                      className="flex-grow"
                      placeholder="0"
                      required />
                    <div className="bg-gray-100 flex items-center justify-center border border-black inline-block px-4 relative" style={{ left: "-1px" }}>
                      Celo
                    </div>
                  </div>
                </label>
              </div>
              <button type="submit" className="block-inline bg-blueGray-800 text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">STAKE CELO!</button>
            </form>
            <button
              type="submit"
              className="my-4 block-inline bg-primary text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" onClick={(event) => {
                event.preventDefault()
                this.props.unstakeTokens(0)
              }}>
              UN-STAKE CELO...
            </button>
          </div>
        </div>

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
              event.preventDefault()
              let amount
              amount = this.cusdamount.value.toString()
              this.props.stakeTokens(1, amount)
            }}>
              <h4 className="text-2xl">Stake cUSD Tokens</h4>
              <div className="input-group mb-4">
                <label htmlFor="" className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="text-gray-700">
                      Balance: {(this.props.cusdTokenBalance)} cUSD
                    </span>
                    <span className="float-left text-success font-weight-bold">APR: {(this.props.cusdAPR)}% </span>
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      ref={(input) => { this.cusdamount = input }}
                      className="flex-grow"
                      placeholder="0"
                      required />
                    <div className="bg-gray-100 flex items-center justify-center border border-black inline-block px-4 relative" style={{ left: "-1px" }}>
                      cUSD
                    </div>
                  </div>
                </label>
              </div>
              <button type="submit" className="block-inline bg-blueGray-800 text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">STAKE cUSD!</button>
            </form>
            <button
              type="submit"
              className="my-4 block-inline bg-primary text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" onClick={(event) => {
                event.preventDefault()
                this.props.unstakeTokens(1)
              }}>
              UN-STAKE cUSD...
            </button>
          </div>
        </div>

      </div>
    );
  }
}

export default YieldMain;
