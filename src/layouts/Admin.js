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
              <Route path="/app/dashboard" exact component={Dashboard} />
              <Route path="/app/settings" exact component={Settings} />
              <Route path="/app/tables" exact component={Tables} />
              <Redirect from="/app" to="/app/vesting" />

              {/* <Route exact path="/yield" component={Staking} />
              <Route exact path="/vesting" component={Vesting} />
              <Route exact path="/usd-inr" component={USDINR} />
              <Route exact path="/usd-peso" component={USDPESO} />
              <Route exact path="/inr-peso" component={INRPESO} />
              <Route exact path="/buy-hUSD" component={buyUSD} />
              <Route exact path="/buy-hINR" component={buyINR} />
              <Route exact path="/buy-hPESO" component={buyPESO} />
              <Route exact path="/contribute" component={Contribute} /> */}
            </Switch>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
