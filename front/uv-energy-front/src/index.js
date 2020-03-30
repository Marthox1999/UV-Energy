import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import ClientLayout from "layouts/Client.js"
import AuthLayout from "layouts/Auth.js";
import ManagerLayout from "layouts/Manager.js";
import OperatorLayout from "layouts/Operator.js"


import './i18n';

ReactDOM.render(
  <Suspense fallback={(<div>Loading...</div>)}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/manager" render={props => <ManagerLayout {...props} />} />
        <Route path="/operator" render={props => <OperatorLayout {...props} />} />
        <Route path="/client" render={props => <ClientLayout {...props} />} />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Redirect from="/" to="/auth" />
      </Switch>
    </BrowserRouter>
  </Suspense>,
  document.getElementById("root")
);
