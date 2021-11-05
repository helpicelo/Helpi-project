import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Yield from './yield.js'
import Home from './Home.js'
import App from './App.js'
import Vesting from './vesting.js'


class Navbar extends Component {

  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <a class="navbar-brand text-decoration-none text-white" href="#"><Link to="/">HELPI</Link></a>

        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
               <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown"><Link to="/mutate">Mutate Tokens</Link></a>
                    <div class="dropdown-menu">
                        <li><a class="dropdown-item" href="#"><Link to="/usd-inr">USD-INRT</Link></a></li>
                        <li><a class="dropdown-item" href="#"><Link to="/usd-peso">USD-cPESO</Link></a></li>
                        <li><a class="dropdown-item" href="#"><Link to="/inr-peso">INRT-cPESO</Link></a></li>
                    </div>
               </li>
              <li><a class="nav-item text-decoration-none nav-link" href="#"><Link to="/yield">Staking Pool</Link></a></li>
              <li><a class="nav-item text-decoration-none nav-link" href="#"><Link to="/vesting">Vesting</Link></a></li>
               <li><a class="nav-item text-decoration-none nav-link" href="#"><Link to="/contribute">Contribute</Link></a></li>
              <li><a class="nav-item text-decoration-none nav-link" href="#">About Us</a></li>
              <li><a class="nav-item text-decoration-none nav-link" href="#">Paper</a></li>
            </div>
            </div>

        <div className="navbar float-right px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                <button class="btn btn-success btn-sm navbar-btn">{this.props.account}</button>
            </li>
        </div>

      </nav>
    );
  }
}

export default Navbar;
