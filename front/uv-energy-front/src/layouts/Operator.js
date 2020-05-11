import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import UVAdminNavbar from "components/Navbars/UVAdminNavbar.js";
import SidebarO from "components/Sidebar/SidebarO.js";

import routes from "routes.js";
import {clientRoutes, electricTransformerRoutes, substationRoutes} from "operatorRoutes.js";

import Cookies from 'universal-cookie';

const cookie = new Cookies();

class Operator extends React.Component {
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
    return routes.map((prop, key) => {
      if (prop.layout === "/operator") {
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
      if (prop.layout === "/operator") {
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
      if (prop.layout === "/operator") {
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
  getTransformerRoutes = transformerRoutes => {
    return transformerRoutes.map((prop, key) => {
      if (prop.layout === "/operator") {
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
  getsubstationRoutes = substationRoutes => {
    return substationRoutes.map((prop, key) => {
      if (prop.layout === "/operator") {
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
        <SidebarO
          {...this.props}
          routes={routes}
          clientRoutes={clientRoutes}
          electricTransformerRoutes={electricTransformerRoutes}
          substationRoutes={substationRoutes}
          logo={{
            innerLink: "/operator/index",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <UVAdminNavbar/>
          <Switch>
            {this.getRoutes(routes)}
            {this.getClientRoutes(clientRoutes)}
            {this.getsubstationRoutes(substationRoutes)}
            {this.getTransformerRoutes(electricTransformerRoutes)}
            <Redirect from="*" to="/operator/index" />
          </Switch>
          <Container fluid>
          </Container>
        </div>
      </>
    );
  }
}

export default Operator;
