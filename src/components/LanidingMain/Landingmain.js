import React, { Component } from 'react'
import t1 from './assets/img/team/t1.JPG'
import t2 from './assets/img/team/t2.JPG'
import t3 from './assets/img/team/t3.JPG'

class landingMain extends Component {

  render() {
    return (
      <div>
        <header class="masthead">
            <div class="container">
                <div class="masthead-subheading text-lg">DeFi Applications</div>
                <div class="masthead-heading text-uppercase text-light">with Decentralized Stablecoin Pools and Farms</div>
            </div>
        </header>

        <br></br>
        <section class="page-section bg-light" id="portfolio">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase">Applications</h2>
                    <h5 class="section-subheading text-muted"><i>Helpi platform provides variety of services to its customers</i></h5>
                </div>
                <div class="row text-center">
                    <div class="service-box col-md-3">
                        <img src="https://img.icons8.com/office/80/000000/fund-accounting.png" class="service-img mr-3 mt-3"/>
                        <h4 class="my-3 text-primary">Fund Transfer</h4>
                        <p class="text-secondary text-justify">Make <b>Cross-border</b> fund transfers for to your Home country in your Native currency without dealing with external swaps.</p>
                    </div>
                    <div class="service-box col-md-3 ">
                        <img src="https://img.icons8.com/external-itim2101-flat-itim2101/64/000000/external-earning-accounting-itim2101-flat-itim2101.png" class="service-img mr-3 mt-3"/>
                        <h4 class="my-3 text-warning">Staking Pools</h4>
                        <p class="text-secondary text-justify">Stake <b>Celo</b> and <b>cUSD</b> tokens to earn Helpi Tokens as Rewards at high APR rates</p>
                    </div>
                    <div class="service-box col-md-3">
                        <img src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-vault-economy-kiranshastry-lineal-color-kiranshastry.png" class="service-img mr-3 mt-3"/>
                        <h4 class="my-3 text-danger">Vesting</h4>
                        <p class="text-secondary text-justify">Implemented to prevent Pumping and Dumping of Tokens by Whales to Protect your assets and earnings</p>
                    </div>
                    <div class="service-box col-md-3 ">
                        <img src="https://img.icons8.com/color/96/000000/connected-people.png" class="service-img mr-3 mt-3"/>
                        <h4 class="my-3 text-success">Contribute</h4>
                        <p class="text-secondary text-justify">Helpi is a Contribution based DeFi Network where each member in the ecosystem contributes and helps others to earn interest.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="page-section bg-light" id="team">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase">Our Amazing Team</h2>
                    <h3 class="section-subheading text-muted">The team with a vision</h3>
                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="team-member text-center">
                            <img class="team-img mx-auto rounded-circle" src={t1} alt="..." />
                            <h4>Felipe Montoya</h4>
                            <p class="text-muted">CEO and Business Developer</p>

                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="team-member text-center">
                            <img class="team-img mx-auto rounded-circle" src={t2} alt="..." />
                            <h4>Sebastian Tabares</h4>
                            <p class="text-muted">Development Manager</p>

                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="team-member text-center">
                            <img class="team-img mx-auto rounded-circle" src={t3} alt="..." />
                            <h4>Brindrajsinh Chauhan</h4>
                            <p class="text-muted">Blockchain Developer</p>

                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8 mx-auto text-center"><p class="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p></div>
                </div>
            </div>
        </section>

      </div>


    );
  }
}

export default landingMain;
