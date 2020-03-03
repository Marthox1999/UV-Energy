import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import UVAdminNavbar from "components/Navbars/UVAdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import adminRoutes from "adminRoutes.js";
import managerRoutes from "managerRoutes.js";
import operatorRoutes from "operatorRoutes.js";

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVerified: false,
      credentials:this.props.location.notCredentials
    };
  };
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
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

  getManagerRoutes = managerRoutes => {
    console.log(managerRoutes)
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

  getBrandTextManager = path => {
    for (let i = 0; i < managerRoutes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          managerRoutes[i].layout + managerRoutes[i].path
        ) !== -1
      ) {
        return managerRoutes[i].name;
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

  render() {
    console.log(this.props.location.state)
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          adminRoutes={adminRoutes}
          managerRoutes={managerRoutes}
          operatorRoutes={operatorRoutes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <UVAdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
            brandTextManager={this.getBrandTextManager(this.props.location.pathname)}
            brandTextAdmin={this.getBrandTextAdmin(this.props.location.pathname)}
            brandTextOperator={this.getBrandTextOperator(this.props.location.pathname)}
          />
          <Switch>
            {this.getAdminRoutes(adminRoutes)}
            {this.getManagerRoutes(managerRoutes)}
            {this.getOperatorRoutes(operatorRoutes)}
            {this.getRoutes(routes)}
            <Redirect from="*" to="/admin/index" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
