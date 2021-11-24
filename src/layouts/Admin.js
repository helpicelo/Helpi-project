import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views
import Dashboard from "views/app/Dashboard.js";
import Settings from "views/app/Settings.js";
import Tables from "views/app/Tables.js";
import Vesting from "views/app/Vesting";
import Staking from "views/app/Stacking";
import fundtransfer from 'views/app/fund_transfer.js'
import buysell from 'views/app/buy_sell.js'
import CONTRIBUTE from 'views/Contribute.js'

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="bg-primary pt-4 pb-4 pr-4 min-h-screen">
        <div className="relative md:ml-64 bg-white rounded-2xl min-h-screen-75 flex flex-col">
          <AdminNavbar />
          {/* Header */}
          {/* <HeaderStats /> */}
          {/*  -m-24 */}
          <div className="px-4 md:px-10 mx-auto w-full pt-24 flex-grow">
            <Switch>
              <Route path="/app/vesting" exact component={Vesting} />
              <Route path="/app/staking" exact component={Staking} />
              <Route exact path="/app/fund-transfer" component={fundtransfer} />
              <Route exact path="/app/contribute" component={CONTRIBUTE} />
              <Route exact path="/app/buy-sell" component={buysell} />

              {/* examples */}
              <Route path="/app/dashboard" exact component={Dashboard} />
              <Route path="/app/settings" exact component={Settings} />
              <Route path="/app/table" exact component={Tables} />


              <Redirect from="/app" to="/app/vesting" />
            </Switch>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
