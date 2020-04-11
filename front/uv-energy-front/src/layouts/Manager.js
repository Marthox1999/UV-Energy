import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import UVAdminNavbar from "components/Navbars/UVAdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import SidebarM from "components/Sidebar/SidebarM.js";

import routes from "routes.js";
import {managerRoutes, adminRoutes, operatorRoutes} from "managerRoutes.js";

import Cookies from 'universal-cookie';

const cookie = new Cookies();

class Manager extends React.Component {
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
      if (prop.layout === "/manager") {
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
      if (prop.layout === "/manager") {
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
  getManagerRoutes = managerRoutes => {
    return managerRoutes.map((prop, key) => {
      if (prop.layout === "/manager") {
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
  getAdminRoutes = adminRoutes => {
    return adminRoutes.map((prop, key) => {
      if (prop.layout === "/manager") {
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
  getOperatorRoutes = operatorRoutes => {
    return operatorRoutes.map((prop, key) => {
      if (prop.layout === "/manager") {
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

  getBrandTextAdmin = path => {
    for (let i = 0; i < adminRoutes.length - 1; i++) {
      if (
        this.props.location.pathname.indexOf(
          adminRoutes[i].layout + adminRoutes[i].path
        ) !== -1
      ) {
        return adminRoutes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
      <>
        <SidebarM
          {...this.props}
          routes={routes}
          managerRoutes={managerRoutes}
          adminRoutes={adminRoutes}
          operatorRoutes={operatorRoutes}
          logo={{
            innerLink: "/manager/index",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <UVAdminNavbar/>
          <Switch>
            {this.getRoutes(routes)}
            {this.getManagerRoutes(managerRoutes)}
            {this.getAdminRoutes(adminRoutes)}
            {this.getOperatorRoutes(operatorRoutes)}
            <Redirect from="*" to="/manager/index" />
          </Switch>
          <Container fluid>
          </Container>
        </div>
      </>
    );
  }
}

export default Manager;
