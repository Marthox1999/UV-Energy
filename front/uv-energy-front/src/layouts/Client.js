import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import UVAdminNavbar from "components/Navbars/UVAdminNavbar.js";
import SidebarC from "components/Sidebar/SidebarC.js";

import routes from "routes.js";

import clientRoutes from "clientRoutes.js";

import Cookies from 'universal-cookie';

const cookie = new Cookies();

class Client extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVerified: false,
      credentials: cookie.get('notCredentials'),
    };
  };
  componentWillMount(){
    if (typeof this.state.credentials === 'undefined'){
      this.props.history.push({
        pathname: '/auth/login'
      })
    }
    
  }
  componentDidUpdate(e) {
    return clientRoutes.map((prop, key) => {
      if (prop.layout === "/client") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getClientRoutes = clientRoutes => {
    return clientRoutes.map((prop, key) => {
      if (prop.layout === "/client") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/client") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandTextClient = path => {
    for (let i = 0; i < clientRoutes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          clientRoutes[i].layout + clientRoutes[i].path
        ) !== -1
        ) {
          return clientRoutes[i].name;
        }
      }
      return "Brand";
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
        ) {
          return routes[i].name;
        }
      }
      return "Brand";
  };
  render() {
    return (
      <>
        <SidebarC
          {...this.props}
          routes={routes}
          clientRoutes={clientRoutes}
          logo={{
            innerLink: "/client/index",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <UVAdminNavbar/>
          <Switch>
            {this.getRoutes(routes)}
            {this.getClientRoutes(clientRoutes)}
            <Redirect from="*" to="/client/index" />
          </Switch>
          <Container fluid> 
          </Container>
        </div>
      </>
    );
  }
}

export default Client;
