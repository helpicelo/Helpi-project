import React, { Component } from 'react'


class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">

        <div class="d-grid">
          <p type="button" class="my-4">
            Now Directly Send <i>{this.props.a}</i> or <i>{this.props.b}</i> to anyone without having to swap currencies
            already in your wallet.
            <br></br><br></br>
            <i>Example: Jake send 100 <i>{this.props.a}</i> to Amy, however Amy will recieve {100 * this.props.exchangerate} <i>{this.props.b}</i> into her wallet, which is
              the equivalent amount in her local currency when excahnged at the current exchange rate of {this.props.exchangerate}.</i>
          </p>
        </div>

        <table className="table-auto w-full text-muted text-center">
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
              <div className="input-group mb-4">
                <label htmlFor="" className="flex flex-col">
                  <div className="flex justify-between">
                    <label className="float-left"><b>{(this.props.a)} to {(this.props.b)}</b></label>
                    <span className="float-right text-muted">
                      Balance: {(this.props.aTokenBalance).toString()} {(this.props.a)}
                    </span>
                  </div>
                  <input
                    type="text"
                    ref={(input) => { this.ato = input }}
                    className="flex-grow"
                    placeholder="Enter Receiver Address"
                    required />
                </label>
              </div>
              <label htmlFor="" className="flex flex-col">
                <div className="flex">
                  <input
                    id="amountvalue"
                    type="text"
                    ref={(input) => { this.ainput = input }}
                    className="flex-grow"
                    placeholder="0"
                    required />
                  <div className="bg-gray-100 flex items-center justify-center border border-black inline-block px-4 relative" style={{ left: "-1px" }}>
                    {(this.props.a)}
                  </div>
                </div>
              </label>
              <button type="submit" className="mt-4 block-inline bg-blueGray-800 text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">SEND!</button>
            </form>
          </div >
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
                <div className="input-group mb-4">
                  <label htmlFor="" className="flex flex-col">
                    <div className="flex justify-between">
                      <span className="float-left"><b>{this.props.b} to {this.props.a}</b></span>
                      <span className="float-right text-muted">
                        Balance: {(this.props.bTokenBalance).toString()} {this.props.b}
                      </span>
                    </div>
                    <input
                      type="text"
                      ref={(input) => { this.bto = input }}
                      className="flex-grow"
                      placeholder="Enter Receiver Address"
                      required />
                  </label>
                </div>
                <label htmlFor="" className="flex flex-col">
                  <div className="flex">
                    <input
                      type="text"
                      ref={(input) => { this.binput = input }}
                      className="flex-grow"
                      placeholder="0"
                      required />
                    <div className="bg-gray-100 flex items-center justify-center border border-black inline-block px-4 relative" style={{ left: "-1px" }}>
                      {(this.props.b)}
                    </div>
                  </div>
                </label>
                <button type="submit" className="mt-4 block-inline bg-blueGray-800 text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">SEND!</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
