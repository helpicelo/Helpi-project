import React, { Component } from 'react'


class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">

        <div class="d-grid">
           <p type="button" class="btn btn-info btn-lg btn-block">
                Buy or Sell using your Tokens in your wallet
           </p>
        </div>

        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">{this.props.a} Reserve</th>
              <th scope="col">{this.props.b} Reserve</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{(this.props.apoolBalance)} {(this.props.a)}</td>
              <td>{(this.props.bpoolBalance)} {(this.props.b)}</td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4" onSubmit={(event) => {
                event.preventDefault()
                let aamount
                aamount = this.ainput.value.toString()
                this.props.buy_a(aamount)
          }}>
          <div className="card-body">

            <form className="mb-3" >
              <div>
                <h5 className="card-title"><b> Buy {(this.props.a)}</b></h5>
                <span className="float-left text-secondary">Exchange Rate : {(this.props.exchangerate)} {this.props.a}/{this.props.b}</span>
                <span className="float-right text-muted">
                  Balance: {(this.props.bTokenBalance).toString()} {(this.props.b)}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  id = "amountvalue"
                  type="text"
                  ref={(input) => { this.ainput = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    &nbsp;&nbsp; {(this.props.a)}
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-info btn-block btn-lg">BUY!</button>
            </form>
          </div>
        </div>

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let bto
                let bamount
                bto = this.bto.value
                bamount = this.binput.value.toString()
                this.props.sell_a(bamount)
          }}>
              <div>
                <h5 className="card-title"><b>Sell {this.props.a}</b></h5>
                <span className="float-left text-secondary">Exchange Rate : {(this.props.exchangerate)} {this.props.a}/{this.props.b}</span>
                <span className="float-right text-muted">
                  Balance: {(this.props.aTokenBalance).toString()} {this.props.a}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.binput = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    &nbsp;&nbsp; {(this.props.a)}
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-info btn-block btn-lg">SELL!</button>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default Main;
