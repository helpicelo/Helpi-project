import React, { Component } from 'react'

class YieldMain extends Component {

  render() {
    return (
      <div id="content" className="mt-3">

        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">CELO STAKED</th>
              <th scope="col">cUSD STAKED</th>
              <th scope="col">HELPI REWARDS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{(this.props.celostakingBalance)} CELO</td>
              <td>{(this.props.cusdstakingBalance)} cUSD</td>
              <td>{(this.props.helpiTokenBalance)} HLP</td>
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
                <label className="float-left text-secondary text-lg">APR: {(this.props.apr)}%</label>
                <span className="float-right text-muted">
                  Balance: {(this.props.celoTokenBalance)} CELO
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
              <button type="submit" className="btn btn-primary btn-block btn-lg">STAKE CELO!</button>
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
                <label className="float-left text-secondary">APR: {(this.props.apr)}% </label>
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
              <button type="submit" className="btn btn-primary btn-block btn-lg">STAKE cUSD!</button>
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

        <button
          type="submit"
          className="btn btn-success btn-block btn-lg"
          onClick={(event) => {
          event.preventDefault()
          this.props.contribute()
          }}>
          CONTRIBUTE
        </button>

      </div>
    );
  }
}

export default YieldMain;
