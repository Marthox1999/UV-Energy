import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import UVAdminNavbar from "components/Navbars/UVAdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";


import routes from "routes.js";
import {settingRoutes, adminRoutes, managerRoutes, operatorRoutes, electricTransformerRoutes, substationRoutes} from "adminRoutes.js";

import Cookies from 'universal-cookie';

const cookie = new Cookies();

class Admin extends Component {
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
      if (prop.layout === "/admin") {
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
      if (prop.layout === "/admin") {
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
  getSettingRoutes = settingRoutes => {
    return settingRoutes.map((prop, key) => {
      if (prop.layout === "/admin") {
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
      if (prop.layout === "/admin") {
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
      if (prop.layout === "/admin") {
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
      if (prop.layout === "/admin") {
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
      if (prop.layout === "/admin") {
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
      if (prop.layout === "/admin") {
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

  getBrandTextSetting = path => {
    for (let i = 0; i < settingRoutes.length - 1; i++) {
      if (
        this.props.location.pathname.indexOf(
          settingRoutes[i].layout + settingRoutes[i].path
        ) !== -1
      ) {
        return settingRoutes[i].name;
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

  getBrandTextOperator = path => {
    for (let i = 0; i < operatorRoutes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          operatorRoutes[i].layout + operatorRoutes[i].path
        ) !== -1
      ) {
        return operatorRoutes[i].name;
      }
    }
    return "Brand";
  };

  getBrandTextElectricTransformer = path => {
    for (let i = 0; i < electricTransformerRoutes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          electricTransformerRoutes[i].layout + electricTransformerRoutes[i].path
        ) !== -1
      ) {
        return electricTransformerRoutes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          settingRoutes={settingRoutes}
          managerRoutes={managerRoutes}
          adminRoutes={adminRoutes}
          substationRoutes={substationRoutes}
          operatorRoutes={operatorRoutes}
          electricTransformerRoutes={electricTransformerRoutes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <UVAdminNavbar/>
          <Switch>
            {this.getRoutes(routes)}
            {this.getSettingRoutes(settingRoutes)}
            {this.getAdminRoutes(adminRoutes)}
            {this.getManagerRoutes(managerRoutes)}
            {this.getsubstationRoutes(substationRoutes)}
            {this.getOperatorRoutes(operatorRoutes)}
            {this.getTransformerRoutes(electricTransformerRoutes)}
            <Redirect from="*" to="/admin/index" />
          </Switch>
          <Container fluid> 
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
