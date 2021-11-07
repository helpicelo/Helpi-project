import React, { Component } from 'react'


class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">

        <div class="d-grid">
           <p type="button" class="btn btn-info btn-lg btn-block">
                Now Directly Send <i>{this.props.a}</i> or <i>{this.props.b}</i> to anyone without having to swap currencies
                already in your wallet.
                <br></br><br></br>
                <i>Example: Jake send 100 <i>{this.props.a}</i> to Amy, however Amy will recieve {100*this.props.exchangerate} <i>{this.props.b}</i> into her wallet, which is
                the equivalent amount in her local currency when excahnged at the current exchange rate of {this.props.exchangerate}.</i>
           </p>
        </div>

        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">{this.props.a} Pool Balance</th>
              <th scope="col">{this.props.b} Pool Balance</th>
              <th scope="col">Exchange Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{(this.props.apoolBalance)} {(this.props.a)}</td>
              <td>{(this.props.bpoolBalance)} {(this.props.b)}</td>
              <td>{this.props.exchangerate} {(this.props.b)} / {this.props.a}</td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4" onSubmit={(event) => {
                event.preventDefault()
                let ato
                let aamount
                ato = this.ato.value
                aamount = this.ainput.value.toString()
                this.props.a_b(ato, aamount)
          }}>
          <div className="card-body">

            <form className="mb-3" >
              <div>
                <label className="float-left"><b>{(this.props.a)} to {(this.props.b)}</b></label>
                <span className="float-right text-muted">
                  Balance: {(this.props.aTokenBalance).toString()} {(this.props.a)}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.ato = input }}
                  className="form-control form-control-lg"
                  placeholder="Enter Receiver Address"
                  required />
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
              <button type="submit" className="btn btn-info btn-block btn-lg">SEND!</button>
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
                this.props.b_a(bto, bamount)
          }}>
              <div>
                <label className="float-left"><b>{this.props.b} to {this.props.a}</b></label>
                <span className="float-right text-muted">
                  Balance: {(this.props.bTokenBalance).toString()} {this.props.b}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.bto = input }}
                  className="form-control form-control-lg"
                  placeholder="Enter Receiver Address"
                  required />
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
                    &nbsp;&nbsp; {(this.props.b)}
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-info btn-block btn-lg">SEND!</button>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default Main;
