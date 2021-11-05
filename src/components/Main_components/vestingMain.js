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

        <table className="table table-borderless text-muted text-center">
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

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                amount = this.redeemamount.value.toString()
                this.props.redeemToken(amount)
              }}>
              <div>
                <h4 className="card-title">Redeem Tokens</h4>
                <span className="float-right text-muted">
                  Balance: {(this.props.releasedBalance)} HLP
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.redeemamount = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    &nbsp;&nbsp;&nbsp; HLP
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-info btn-block btn-lg">REDEEM HELPI!</button>
            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default YieldMain;
