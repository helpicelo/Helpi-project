import React, { Component } from 'react'


class YieldMain extends Component {

  render() {
    return (
      <div id="content" className="mt-3">


        <div className="card mb-4" >

          <div className="card-body">
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              onClick={(event) => {
                event.preventDefault()
                this.props.issueTokens()
              }}>
                Issue New Helpi Tokens!
              </button>
          </div>
        </div>


      </div>
    );
  }
}

export default YieldMain;
