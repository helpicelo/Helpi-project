import React, { Component } from 'react'


class YieldMain extends Component {

  render() {
    return (
      <div id="content" className="mt-3">

        <div class="d-grid">
          <p type="button" class="btn btn-info btn-lg btn-block">
            Helpi Rewards are locked in the system and can only be <i>Unlocked</i> after every <b>72 Hours</b>. You
            can only release a fraction of our Locked Helpi Rewards at a time. However You
            can Redeem Unlocked Reward Tokens into your wallet at any time.
          </p>
        </div>

        <table className="table-auto w-full text-muted text-center">
          <thead>
            <tr>
              <th scope="col"><i>Locked Balance</i></th>
              <th scope="col"><i>Unlocked Balance</i></th>
              <th scope="col"><i>Redeemed Balance</i></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><i>{(this.props.lockedBalance)} HLP</i></td>
              <td><i>{(this.props.releasedBalance)} HLP</i></td>
              <td><i>{(this.props.redeemedBalance)} HLP</i></td>
            </tr>
          </tbody>
        </table>

        <div className="rounded-2xl border border-primary p-4" >

          <div className="card-body">

            <form className="" onSubmit={(event) => {
              event.preventDefault()
              let amount
              amount = this.redeemamount.value.toString()
              this.props.redeemToken(amount)
            }}>
              <h4 className="text-2xl">Redeem Tokens</h4>
              <div className="input-group mb-4">
                <label htmlFor="" className="flex flex-col">
                  <span className="text-gray-700">
                    Balance: {(this.props.releasedBalance)} HLP
                  </span>
                  <div className="flex">
                    <input
                      type="text"
                      ref={(input) => { this.redeemamount = input }}
                      className="flex-grow"
                      placeholder="0"
                      required />
                    <div className="bg-gray-100 flex items-center justify-center border border-black inline-block px-4 relative" style={{ left: "-1px" }}>
                      HLP
                    </div>
                  </div>
                </label>
              </div>
              <a type="submit" className="block-inline bg-blueGray-800 text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">REDEEM HELPI!</a>
            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default YieldMain;
