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

        <table className="table table-borderless text-secondary text-center">
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
              <div>
                <h4 className="card-title">Stake Celo Tokens</h4>
                <label className="float-left text-success font-weight-bold text-sm">APR: {(this.props.celoAPR)}%</label>
                <span className="float-right text-muted">
                  Wallet Balance: {(this.props.celoTokenBalance)} CELO
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.celoamount = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    &nbsp;&nbsp;&nbsp; Celo
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-info btn-block btn-lg">STAKE CELO!</button>
            </form>
            <button
              type="submit"
              className="btn btn-link btn-block btn-sm"
              onClick={(event) => {
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
              <div>
                <h4 className="card-title">Stake cUSD Tokens</h4>
                <label className="float-left text-success font-weight-bold">APR: {(this.props.cusdAPR)}% </label>
                <span className="float-right text-muted">
                  Balance: {(this.props.cusdTokenBalance)} cUSD
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.cusdamount = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    &nbsp;&nbsp;&nbsp; cUSD
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-info btn-block btn-lg">STAKE cUSD!</button>
            </form>
            <button
              type="submit"
              className="btn btn-link btn-block btn-sm"
              onClick={(event) => {
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
