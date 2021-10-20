import React, { Component } from 'react'
import dai from '../../dai.png'

class YieldMain extends Component {

  render() {
    return (
      <div id="content" className="mt-3">

        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">LOCKED BALANCE</th>
              <th scope="col">UNLOCKED BALANCE</th>
              <th scope="col">REDEEMED BALANCE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{(this.props.lockedBalance)} HLP</td>
              <td>{(this.props.releasedBalance)} HLP</td>
              <td>{(this.props.redeemedBalance)} HLP</td>
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
              <button type="submit" className="btn btn-primary btn-block btn-lg">REDEEM HELPI!</button>
            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default YieldMain;
