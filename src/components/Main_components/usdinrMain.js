import React, { Component } from 'react'


class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">

        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">USD Pool Balance</th>
              <th scope="col">INR Pool Balance</th>
              <th scope="col">Exchange Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{(this.props.usdpoolBalance)} USDT</td>
              <td>{(this.props.inrpoolBalance)} INRT</td>
              <td>{this.props.exchangerate} INRT / USDT</td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4" onSubmit={(event) => {
                event.preventDefault()
                let to
                let inramount
                to = this.to.value
                inramount = this.input.value.toString()
                this.props.usdt_inrt(to, inramount)
          }}>
          <div className="card-body">

            <form className="mb-3" >
              <div>
                <label className="float-left"><b>USDT to INRT</b></label>
                <span className="float-right text-muted">
                  Balance: {(this.props.usdTokenBalance).toString()} USDT
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.to = input }}
                  className="form-control form-control-lg"
                  placeholder="Enter Receiver Address"
                  required />
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    &nbsp;&nbsp; USDT
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">SEND!</button>
            </form>
          </div>
        </div>

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let usdto
                let usdamount
                usdto = this.usdto.value
                usdamount = this.usdinput.value.toString()
                this.props.inrt_usdt(usdto, usdamount)
          }}>
              <div>
                <label className="float-left"><b>INRT to USDT</b></label>
                <span className="float-right text-muted">
                  Balance: {(this.props.inrTokenBalance).toString()} INRT
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.usdto = input }}
                  className="form-control form-control-lg"
                  placeholder="Enter Receiver Address"
                  required />
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.usdinput = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    &nbsp;&nbsp; INRT
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">SEND!</button>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default Main;
