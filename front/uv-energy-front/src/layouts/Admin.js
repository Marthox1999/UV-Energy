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
import electricTransformerRoutes from "ElectricTransformersRoutes.js";
import substationRoutes from "SubstationRoutes.js";
import Cookies from 'universal-cookie';

const cookie = new Cookies();

class Admin extends React.Component {
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

  getElectricTransformerRoutes = ElectricTransformerRoutes => {
    return ElectricTransformerRoutes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            component={prop.component}
          />
        );
      } else {
        return null;
      }
    });
  };
  getSubstationRoutes = substationRoutes => {
    return substationRoutes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            component={prop.component}
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
          adminRoutes={adminRoutes}
          managerRoutes={managerRoutes}
          operatorRoutes={operatorRoutes}
          electricTransformerRoutes={electricTransformerRoutes}
          substationRoutes={substationRoutes}
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
            {this.getAdminRoutes(adminRoutes)}
            {this.getManagerRoutes(managerRoutes)}
            {this.getOperatorRoutes(operatorRoutes)}
            {this.getSubstationRoutes(substationRoutes)}
            {this.getElectricTransformerRoutes(electricTransformerRoutes)}
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
